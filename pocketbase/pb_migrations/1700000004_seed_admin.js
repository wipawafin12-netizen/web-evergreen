/// <reference path="../pb_data/types.d.ts" />

// Seed the first back-office admin account. Credentials are baked in so a fresh
// deploy always has a working login without needing any environment variables.
// INITIAL_ADMIN_EMAIL / INITIAL_ADMIN_PASSWORD may still be set in the server
// .env to override the defaults. If the admin already exists, this is a no-op.
migrate((app) => {
    try {
        const email = $os.getenv("INITIAL_ADMIN_EMAIL") || "ai.chhthailand@gmail.com";
        const password = $os.getenv("INITIAL_ADMIN_PASSWORD") || "chh_thailand";

        try {
            app.findFirstRecordByData("admins", "email", email);
            console.log("[seed_admin] admin already exists — skipping seed");
            return;
        } catch (_) {
            // not found -> create it below
        }

        const collection = app.findCollectionByNameOrId("admins");
        const record = new Record(collection);
        record.set("email", email);
        record.set("name", "Administrator");
        record.set("verified", true);
        record.setPassword(password);
        app.save(record);
        console.log("[seed_admin] seeded admin: " + email);
    } catch (err) {
        console.log("[seed_admin] skipped (" + err + ")");
    }
}, (app) => {
    // no-op down migration
});
