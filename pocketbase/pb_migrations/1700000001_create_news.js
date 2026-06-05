/// <reference path="../pb_data/types.d.ts" />

// News / Promotions / Announcements — managed by site admins, read publicly
// (only when published).
migrate((app) => {
    const collection = new Collection({
        type: "base",
        name: "news",
        listRule: 'published = true || @request.auth.collectionName = "admins"',
        viewRule: 'published = true || @request.auth.collectionName = "admins"',
        createRule: '@request.auth.collectionName = "admins"',
        updateRule: '@request.auth.collectionName = "admins"',
        deleteRule: '@request.auth.collectionName = "admins"',
        fields: [
            { type: "text", name: "title_en", required: true, max: 200 },
            { type: "text", name: "title_th", required: true, max: 200 },
            { type: "text", name: "excerpt_en", max: 300 },
            { type: "text", name: "excerpt_th", max: 300 },
            { type: "editor", name: "body_en" },
            { type: "editor", name: "body_th" },
            {
                type: "file",
                name: "cover",
                maxSelect: 1,
                maxSize: 5242880,
                mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
            },
            { type: "bool", name: "published" },
            { type: "date", name: "publish_date" },
            { type: "autodate", name: "created", onCreate: true, onUpdate: false },
            { type: "autodate", name: "updated", onCreate: true, onUpdate: true },
        ],
    });

    app.save(collection);
}, (app) => {
    app.delete(app.findCollectionByNameOrId("news"));
});
