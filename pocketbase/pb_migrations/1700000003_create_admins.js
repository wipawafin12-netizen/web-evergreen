/// <reference path="../pb_data/types.d.ts" />

// Site admin accounts (separate from PocketBase superusers). These are the
// users who log into the website's back-office. Only existing admins may
// create/edit/delete other admins.
migrate((app) => {
    // Idempotent: if the collection already exists (e.g. created manually via
    // the PocketBase admin UI / MCP), don't try to recreate it — that would
    // abort the migration on startup.
    try {
        app.findCollectionByNameOrId("admins");
        console.log("[create_admins] collection already exists — skipping");
        return;
    } catch (_) {
        // not found -> create it below
    }

    const collection = new Collection({
        type: "auth",
        name: "admins",
        listRule: '@request.auth.collectionName = "admins"',
        viewRule: '@request.auth.collectionName = "admins"',
        createRule: '@request.auth.collectionName = "admins"',
        updateRule: '@request.auth.collectionName = "admins"',
        deleteRule: '@request.auth.collectionName = "admins"',
        passwordAuth: {
            enabled: true,
            identityFields: ["email"],
        },
        fields: [
            { type: "text", name: "name", max: 100 },
        ],
    });

    app.save(collection);
}, (app) => {
    app.delete(app.findCollectionByNameOrId("admins"));
});
