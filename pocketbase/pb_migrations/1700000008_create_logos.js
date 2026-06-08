/// <reference path="../pb_data/types.d.ts" />

// Customer / partner logos shown in the "trusted by" marquees on the homepage,
// grouped into developer / contractor / hotel rows. Managed by admins, read
// publicly (only the active ones). When a group has no active logos the homepage
// falls back to its built-in logo set for that group.
migrate((app) => {
    const collection = new Collection({
        type: "base",
        name: "logos",
        listRule: 'active = true || @request.auth.collectionName = "admins"',
        viewRule: 'active = true || @request.auth.collectionName = "admins"',
        createRule: '@request.auth.collectionName = "admins"',
        updateRule: '@request.auth.collectionName = "admins"',
        deleteRule: '@request.auth.collectionName = "admins"',
        fields: [
            { type: "text", name: "name", max: 120 },
            {
                type: "file",
                name: "image",
                required: true,
                maxSelect: 1,
                maxSize: 2097152,
                mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"],
            },
            {
                type: "select",
                name: "group",
                required: true,
                maxSelect: 1,
                values: ["developer", "contractor", "hotel"],
            },
            { type: "number", name: "sort" },
            { type: "bool", name: "active" },
            { type: "autodate", name: "created", onCreate: true, onUpdate: false },
            { type: "autodate", name: "updated", onCreate: true, onUpdate: true },
        ],
    });

    app.save(collection);
}, (app) => {
    app.delete(app.findCollectionByNameOrId("logos"));
});
