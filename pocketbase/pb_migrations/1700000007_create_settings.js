/// <reference path="../pb_data/types.d.ts" />

// Site settings — a single record the website reads on every page (top CTA bar,
// contact details, social links). Publicly readable; only admins can edit. One
// row is seeded with the site's current hardcoded values so there is always
// something to edit and read.
migrate((app) => {
    const collection = new Collection({
        type: "base",
        name: "settings",
        listRule: "", // public read — needed by the homepage / footer / contact page
        viewRule: "",
        createRule: '@request.auth.collectionName = "admins"',
        updateRule: '@request.auth.collectionName = "admins"',
        deleteRule: '@request.auth.collectionName = "admins"',
        fields: [
            // Orange call-to-action bar at the very top of the homepage.
            { type: "bool", name: "cta_enabled" },
            { type: "text", name: "cta_title_en", max: 200 },
            { type: "text", name: "cta_title_th", max: 200 },
            { type: "text", name: "cta_subtitle_en", max: 200 },
            { type: "text", name: "cta_subtitle_th", max: 200 },
            { type: "text", name: "cta_button_en", max: 80 },
            { type: "text", name: "cta_button_th", max: 80 },
            { type: "text", name: "cta_link", max: 500 },
            // Contact details (homepage footer + contact page).
            { type: "text", name: "phone_office", max: 60 },
            { type: "text", name: "phone_sales", max: 60 },
            { type: "text", name: "email", max: 160 },
            { type: "text", name: "hours_en", max: 120 },
            { type: "text", name: "hours_th", max: 120 },
            { type: "text", name: "address_en", max: 400 },
            { type: "text", name: "address_th", max: 400 },
            { type: "text", name: "map_link", max: 1000 },
            // Social links.
            { type: "text", name: "facebook", max: 300 },
            { type: "text", name: "instagram", max: 300 },
            { type: "text", name: "line", max: 300 },
            { type: "text", name: "tiktok", max: 300 },
            { type: "autodate", name: "created", onCreate: true, onUpdate: false },
            { type: "autodate", name: "updated", onCreate: true, onUpdate: true },
        ],
    });

    app.save(collection);

    // Seed the single settings row, mirroring the site's current content.
    const rec = new Record(collection);
    rec.set("cta_enabled", true);
    rec.set("cta_title_en", "Not sure which door is right for you?");
    rec.set("cta_title_th", "ยังไม่แน่ใจว่าประตูแบบไหนเหมาะกับคุณ?");
    rec.set("cta_subtitle_en", "Try our interactive door finder tool");
    rec.set("cta_subtitle_th", "ลองใช้เครื่องมือค้นหาประตูแบบอินเทอร์แอคทีฟ");
    rec.set("cta_button_en", "Find Your Perfect Door");
    rec.set("cta_button_th", "ค้นหาประตูที่เหมาะกับคุณ");
    rec.set("cta_link", "https://door.chhindustry.com/");
    rec.set("phone_office", "02-921-9979");
    rec.set("phone_sales", "062-539-9980");
    rec.set("email", "mkt.evergreenchh@gmail.com");
    rec.set("hours_en", "Mon-Fri 8:30am - 4:30pm");
    rec.set("hours_th", "จันทร์-ศุกร์ 8:30 - 16:30 น.");
    rec.set("address_en", "9/1 Moo 2, Bang Len – Lat Lum Kaew Road, Khun Si, Sai Noi District, Nonthaburi 11150");
    rec.set("address_th", "9/1 หมู่ 2 ถนนบางเลน-ลาดหลุมแก้ว ต.ขุนศรี อ.ไทรน้อย จ.นนทบุรี 11150");
    rec.set("map_link", "https://maps.google.com/?q=9/1+หมู่+2+ถนนบางเลน-ลาดหลุมแก้ว+ต.ขุนศรี+อ.ไทรน้อย+จ.นนทบุรี+11150");
    rec.set("facebook", "https://www.facebook.com/Evergreenchh");
    rec.set("instagram", "https://www.instagram.com/evergreenchh");
    rec.set("line", "https://bit.ly/evergreenchh");
    rec.set("tiktok", "https://www.tiktok.com/@evergreen_chh");
    app.save(rec);
}, (app) => {
    app.delete(app.findCollectionByNameOrId("settings"));
});
