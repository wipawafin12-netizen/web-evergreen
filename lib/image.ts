// Downscale + re-encode an image in the browser *before* it is uploaded.
//
// Why this exists: the admin forms used to push the raw file straight to
// PocketBase. A photographic banner exported as PNG is commonly 3-5 MB, so
// over a normal office uplink the "Save" button would spin for tens of
// seconds. Re-encoding at a sane resolution shrinks such files ~10-20x.
//
// IMPORTANT: do NOT output WebP here. PocketBase (v0.39) cannot generate
// thumbnails from WebP source files, and the admin lists/previews request
// thumbs (e.g. ?thumb=600x0) — a WebP upload renders as a broken image in
// the back-office. JPEG and PNG both thumbnail correctly, so we stick to
// those: JPEG for photos, PNG when transparency must be preserved (logos).

type ImageFormat = 'image/jpeg' | 'image/png';

type CompressOptions = {
    /** Longest edge in pixels. The image is scaled down to fit, never up. */
    maxDimension?: number;
    /** Quality for lossy (JPEG) encoding, 0..1. Ignored for PNG. */
    quality?: number;
    /** Output format. Use PNG to keep transparency (logos); default JPEG. */
    format?: ImageFormat;
};

// Formats we must never rasterize: GIF would lose its animation, SVG is a
// tiny vector already. These pass through untouched.
const PASS_THROUGH = ['image/gif', 'image/svg+xml'];

const EXT: Record<ImageFormat, string> = { 'image/jpeg': '.jpg', 'image/png': '.png' };

/**
 * Returns a downscaled JPEG/PNG File, or the original file unchanged when it
 * can't/shouldn't be compressed (non-image, gif/svg, decode failure, or when
 * the result would actually be larger).
 */
export async function compressImage(file: File, opts: CompressOptions = {}): Promise<File> {
    const { maxDimension = 1920, quality = 0.82, format = 'image/jpeg' } = opts;

    if (!file.type.startsWith('image/') || PASS_THROUGH.includes(file.type)) {
        return file;
    }

    let bitmap: ImageBitmap;
    try {
        bitmap = await createImageBitmap(file);
    } catch {
        return file; // undecodable -> let the server deal with the original
    }

    const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        bitmap.close?.();
        return file;
    }
    // JPEG has no alpha channel; transparent pixels would otherwise come out
    // black. Paint a white background first.
    if (format === 'image/jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
    }
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close?.();

    const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, format, quality)
    );
    // Keep the original if encoding failed or didn't actually save space.
    if (!blob || blob.size >= file.size) return file;

    const name = file.name.replace(/\.[^.]+$/, '') + EXT[format];
    return new File([blob], name, { type: format, lastModified: file.lastModified });
}
