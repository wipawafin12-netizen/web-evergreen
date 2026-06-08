// Downscale + re-encode an image in the browser *before* it is uploaded.
//
// Why this exists: the admin forms used to push the raw file straight to
// PocketBase. A photographic banner exported as PNG is commonly 3-5 MB, so
// over a normal office uplink the "Save" button would spin for tens of
// seconds. Re-encoding to WebP at a sane resolution shrinks such files
// ~10-20x, making the save feel instant and the public site load faster too.

type CompressOptions = {
    /** Longest edge in pixels. The image is scaled down to fit, never up. */
    maxDimension?: number;
    /** WebP quality, 0..1. */
    quality?: number;
};

// Formats we must never rasterize: GIF would lose its animation, SVG is a
// tiny vector already. These pass through untouched.
const PASS_THROUGH = ['image/gif', 'image/svg+xml'];

/**
 * Returns a compressed WebP File, or the original file unchanged when it
 * can't/shouldn't be compressed (non-image, gif/svg, decode failure, or when
 * the result would actually be larger).
 */
export async function compressImage(file: File, opts: CompressOptions = {}): Promise<File> {
    const { maxDimension = 1920, quality = 0.82 } = opts;

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
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close?.();

    const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/webp', quality)
    );
    // Keep the original if encoding failed or didn't actually save space.
    if (!blob || blob.size >= file.size) return file;

    const name = file.name.replace(/\.[^.]+$/, '') + '.webp';
    return new File([blob], name, { type: 'image/webp', lastModified: file.lastModified });
}
