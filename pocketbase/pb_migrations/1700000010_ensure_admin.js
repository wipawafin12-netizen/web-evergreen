/// <reference path="../pb_data/types.d.ts" />

// Ensure a known back-office admin exists with a known password.
//
// This is a *new* migration filename on purpose: PocketBase never re-runs an
// already-applied migration, so editing the earlier seed file does not help on
// instances where it already ran. This file is guaranteed to run once on the
// next deploy. It removes any stale record with this email and recreates it so
// the password is deterministic. It only touches this one account.
migrate((app) => {
    const email = "ai.chhthailand@gmail.com";
    const password = "chh_thailand";
    try {
        try {
            const existing = app.findFirstRecordByData("admins", "email", email);
            app.delete(existing);
            console.log("[ensure_admin] removed stale " + email);
        } catch (_) {
            // none existed — fine
        }

        const collection = app.findCollectionByNameOrId("admins");
        const record = new Record(collection);
        record.set("email", email);
        record.set("name", "Administrator");
        record.set("verified", true);
        record.setPassword(password);
        app.save(record);
        console.log("[ensure_admin] ensured admin " + email);
    } catch (err) {
        console.log("[ensure_admin] failed: " + err);
    }
}, (app) => {
    // no-op down migration
});
