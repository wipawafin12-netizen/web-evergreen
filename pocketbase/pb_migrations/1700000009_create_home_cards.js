/// <reference path="../pb_data/types.d.ts" />

// Homepage "Collections" quick cards (Door / Doorframe / Service Shaft / ...).
// Managed by admins, read publicly (only the active ones). When there are no
// active cards the homepage falls back to its built-in card set.
migrate((app) => {
    const collection = new Collection({
        type: "base",
        name: "home_cards",
        listRule: 'active = true || @request.auth.collectionName = "admins"',
        viewRule: 'active = true || @request.auth.collectionName = "admins"',
        createRule: '@request.auth.collectionName = "admins"',
        updateRule: '@request.auth.collectionName = "admins"',
        deleteRule: '@request.auth.collectionName = "admins"',
        fields: [
            { type: "text", name: "title_en", max: 120 },
            { type: "text", name: "title_th", max: 120 },
            { type: "text", name: "description_en", max: 1000 },
            { type: "text", name: "description_th", max: 1000 },
            {
                type: "file",
                name: "image",
                required: true,
                maxSelect: 1,
                maxSize: 5242880,
                mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
            },
            { type: "text", name: "link", max: 500 },
            { type: "number", name: "sort" },
            { type: "bool", name: "active" },
            { type: "autodate", name: "created", onCreate: true, onUpdate: false },
            { type: "autodate", name: "updated", onCreate: true, onUpdate: true },
        ],
    });

    app.save(collection);
}, (app) => {
    app.delete(app.findCollectionByNameOrId("home_cards"));
});
