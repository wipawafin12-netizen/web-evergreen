/// <reference path="../pb_data/types.d.ts" />

// Leads — contact-form and factory-visit enquiries captured from the website.
// Anyone may submit (the public contact form creates a record), but only signed
// in admins can read them, change their status, or delete them.
migrate((app) => {
    const collection = new Collection({
        type: "base",
        name: "leads",
        listRule: '@request.auth.collectionName = "admins"',
        viewRule: '@request.auth.collectionName = "admins"',
        createRule: "", // public — the website contact form writes here
        updateRule: '@request.auth.collectionName = "admins"',
        deleteRule: '@request.auth.collectionName = "admins"',
        fields: [
            { type: "text", name: "name", required: true, max: 120 },
            { type: "text", name: "company", max: 160 },
            { type: "text", name: "phone", max: 40 },
            { type: "text", name: "email", max: 160 },
            { type: "text", name: "subject", max: 120 },
            { type: "text", name: "message", max: 2000 },
            // Factory-visit details (only present for "visit" enquiries).
            { type: "text", name: "visit_date", max: 20 },
            { type: "text", name: "visit_time", max: 10 },
            { type: "text", name: "visitors", max: 10 },
            { type: "select", name: "status", maxSelect: 1, values: ["new", "contacted", "done"] },
            { type: "autodate", name: "created", onCreate: true, onUpdate: false },
            { type: "autodate", name: "updated", onCreate: true, onUpdate: true },
        ],
    });

    app.save(collection);
}, (app) => {
    app.delete(app.findCollectionByNameOrId("leads"));
});
