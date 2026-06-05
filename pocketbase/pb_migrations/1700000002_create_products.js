/// <reference path="../pb_data/types.d.ts" />

// Product catalog — managed by site admins, read publicly (only when published).
migrate((app) => {
    const collection = new Collection({
        type: "base",
        name: "products",
        listRule: 'published = true || @request.auth.collectionName = "admins"',
        viewRule: 'published = true || @request.auth.collectionName = "admins"',
        createRule: '@request.auth.collectionName = "admins"',
        updateRule: '@request.auth.collectionName = "admins"',
        deleteRule: '@request.auth.collectionName = "admins"',
        fields: [
            { type: "text", name: "name_en", required: true, max: 200 },
            { type: "text", name: "name_th", required: true, max: 200 },
            {
                type: "select",
                name: "category",
                required: true,
                maxSelect: 1,
                values: ["door", "doorframe", "flooring", "staircase", "wallpanel", "serviceshaft", "other"],
            },
            { type: "editor", name: "description_en" },
            { type: "editor", name: "description_th" },
            { type: "text", name: "spec_en", max: 500 },
            { type: "text", name: "spec_th", max: 500 },
            {
                type: "file",
                name: "images",
                maxSelect: 8,
                maxSize: 5242880,
                mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
            },
            { type: "bool", name: "featured" },
            { type: "number", name: "sort" },
            { type: "bool", name: "published" },
            { type: "autodate", name: "created", onCreate: true, onUpdate: false },
            { type: "autodate", name: "updated", onCreate: true, onUpdate: true },
        ],
    });

    app.save(collection);
}, (app) => {
    app.delete(app.findCollectionByNameOrId("products"));
});
