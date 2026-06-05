/// <reference path="../pb_data/types.d.ts" />

// Seed the first admin account from environment variables on first deploy.
// Set INITIAL_ADMIN_EMAIL and INITIAL_ADMIN_PASSWORD in the server .env.
// If they are missing (or the admin already exists), this is a no-op — the
// collection-creation migrations above are never blocked by seeding.
migrate((app) => {
    try {
        const email = $os.getenv("INITIAL_ADMIN_EMAIL");
        const password = $os.getenv("INITIAL_ADMIN_PASSWORD");
        if (!email || !password) {
            console.log("[seed_admin] INITIAL_ADMIN_EMAIL/PASSWORD not set — skipping seed");
            return;
        }

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
        console.log("[seed_admin] seeded initial admin: " + email);
    } catch (err) {
        console.log("[seed_admin] skipped (" + err + ")");
    }
}, (app) => {
    // no-op down migration
});
