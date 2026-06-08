/// <reference path="../pb_data/types.d.ts" />

// Homepage hero banners (the big rotating image carousel on the front page).
// Managed by site admins, read publicly — but only the ones marked active.
// When there are no active banners the website falls back to its built-in
// default images, so the hero is never empty.
migrate((app) => {
    const collection = new Collection({
        type: "base",
        name: "banners",
        listRule: 'active = true || @request.auth.collectionName = "admins"',
        viewRule: 'active = true || @request.auth.collectionName = "admins"',
        createRule: '@request.auth.collectionName = "admins"',
        updateRule: '@request.auth.collectionName = "admins"',
        deleteRule: '@request.auth.collectionName = "admins"',
        fields: [
            // Optional overlay text shown on top of the image. Leave blank for
            // an image-only banner (the current style).
            { type: "text", name: "title_en", max: 200 },
            { type: "text", name: "title_th", max: 200 },
            { type: "text", name: "subtitle_en", max: 300 },
            { type: "text", name: "subtitle_th", max: 300 },
            {
                type: "file",
                name: "image",
                required: true,
                maxSelect: 1,
                maxSize: 5242880,
                mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
            },
            // Where a click on the banner goes. Full URL (https://...) or an
            // internal path (e.g. /door). Plain text so relative paths are allowed.
            { type: "text", name: "link", max: 500 },
            { type: "bool", name: "active" },
            { type: "number", name: "sort" },
            { type: "autodate", name: "created", onCreate: true, onUpdate: false },
            { type: "autodate", name: "updated", onCreate: true, onUpdate: true },
        ],
    });

    app.save(collection);
}, (app) => {
    app.delete(app.findCollectionByNameOrId("banners"));
});
