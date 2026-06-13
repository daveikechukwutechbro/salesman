INSERT INTO "Category" (id, name, description, icon, "sortOrder")
VALUES (gen_random_uuid(), 'Electronics', 'Gadgets and devices', '📱', 1)
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Category" (id, name, description, icon, "sortOrder")
VALUES (gen_random_uuid(), 'Fashion', 'Clothing and accessories', '👕', 2)
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Category" (id, name, description, icon, "sortOrder")
VALUES (gen_random_uuid(), 'Home & Living', 'Home decor and essentials', '🏠', 3)
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Category" (id, name, description, icon, "sortOrder")
VALUES (gen_random_uuid(), 'Beauty', 'Skincare and cosmetics', '💄', 4)
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Category" (id, name, description, icon, "sortOrder")
VALUES (gen_random_uuid(), 'Sports', 'Sports equipment and gear', '⚽', 5)
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Category" (id, name, description, icon, "sortOrder")
VALUES (gen_random_uuid(), 'Food & Drinks', 'Delicious treats and beverages', '🍕', 6)
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Category" (id, name, description, icon, "sortOrder")
VALUES (gen_random_uuid(), 'Toys & Games', 'Fun for all ages', '🎮', 7)
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Category" (id, name, description, icon, "sortOrder")
VALUES (gen_random_uuid(), 'Books', 'Reading materials', '📚', 8)
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Category" (id, name, description, icon, "sortOrder")
VALUES (gen_random_uuid(), 'Pet Supplies', 'Everything for your pets', '🐾', 9)
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Category" (id, name, description, icon, "sortOrder")
VALUES (gen_random_uuid(), 'Automotive', 'Car parts and accessories', '🚗', 10)
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Category" (id, name, description, icon, "sortOrder")
VALUES (gen_random_uuid(), 'Office Supplies', 'Work and stationery essentials', '📎', 11)
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Category" (id, name, description, icon, "sortOrder")
VALUES (gen_random_uuid(), 'Health & Wellness', 'Health, fitness and wellbeing', '💊', 12)
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Category" (id, name, description, icon, "sortOrder")
VALUES (gen_random_uuid(), 'Music', 'Instruments and audio gear', '🎵', 13)
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Category" (id, name, description, icon, "sortOrder")
VALUES (gen_random_uuid(), 'Garden & Outdoor', 'Gardening tools and outdoor living', '🌿', 14)
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'wireless-earbuds', 'Wireless Earbuds Pro', 'High-quality wireless earbuds with noise cancellation, 24h battery life, and comfortable fit. Perfect for music lovers and professionals.', 15, 25, 'https://picsum.photos/seed/earbuds/400/400', ARRAY[]::TEXT[], 50, id, true, 4.5, 128
FROM "Category" WHERE name = 'Electronics'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'smart-watch', 'Smart Watch Series 5', 'Feature-packed smartwatch with heart rate monitor, GPS tracking, and 7-day battery life. Water resistant to 50m.', 25, 40, 'https://picsum.photos/seed/watch/400/400', ARRAY[]::TEXT[], 30, id, true, 4.3, 89
FROM "Category" WHERE name = 'Electronics'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'phone-case', 'Premium Phone Case', 'Shockproof, slim-profile phone case with military-grade drop protection. Available in multiple colors.', 3, 5, 'https://picsum.photos/seed/phonecase/400/400', ARRAY[]::TEXT[], 200, id, false, 4, 256
FROM "Category" WHERE name = 'Electronics'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'usb-c-hub', '7-in-1 USB-C Hub', 'Multi-port adapter with HDMI 4K, SD card reader, USB 3.0 ports, and PD charging. Compatible with all USB-C devices.', 8, NULL, 'https://picsum.photos/seed/usbhub/400/400', ARRAY[]::TEXT[], 75, id, false, 4.2, 64
FROM "Category" WHERE name = 'Electronics'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'bluetooth-speaker', 'Portable Bluetooth Speaker', 'Waterproof speaker with 360° sound, 12h battery, and built-in microphone. Perfect for outdoor adventures.', 10, 18, 'https://picsum.photos/seed/speaker/400/400', ARRAY[]::TEXT[], 40, id, true, 4.6, 192
FROM "Category" WHERE name = 'Electronics'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'wireless-charger', 'Fast Wireless Charger', '15W fast wireless charging pad compatible with all Qi-enabled devices. Slim design with LED indicator.', 6, 10, 'https://picsum.photos/seed/charger/400/400', ARRAY[]::TEXT[], 100, id, false, 4.3, 145
FROM "Category" WHERE name = 'Electronics'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'webcam-hd', 'HD Webcam 1080p', 'Full HD webcam with built-in microphone and privacy shutter. Plug-and-play USB connection for laptops and desktops.', 7, NULL, 'https://picsum.photos/seed/webcam/400/400', ARRAY[]::TEXT[], 60, id, false, 4.1, 98
FROM "Category" WHERE name = 'Electronics'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'mechanical-keyboard', 'Mechanical Keyboard RGB', 'Compact mechanical keyboard with Cherry MX switches and per-key RGB lighting. Durable aluminum frame.', 12, 20, 'https://picsum.photos/seed/keyboard/400/400', ARRAY[]::TEXT[], 35, id, true, 4.6, 210
FROM "Category" WHERE name = 'Electronics'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'power-bank', '20000mAh Power Bank', 'High-capacity power bank with dual USB ports and fast charging support. Keep all your devices powered on the go.', 9, 15, 'https://picsum.photos/seed/powerbank/400/400', ARRAY[]::TEXT[], 80, id, false, 4.4, 178
FROM "Category" WHERE name = 'Electronics'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'mouse-wireless', 'Ergonomic Wireless Mouse', 'Wireless mouse with ergonomic design, silent clicks, and adjustable DPI. Long battery life up to 12 months.', 4, NULL, 'https://picsum.photos/seed/mouse/400/400', ARRAY[]::TEXT[], 120, id, false, 4.2, 156
FROM "Category" WHERE name = 'Electronics'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'cotton-t-shirt', 'Classic Cotton T-Shirt', '100% organic cotton t-shirt with a relaxed fit. Pre-shrunk, breathable fabric for all-day comfort.', 5, 8, 'https://picsum.photos/seed/tshirt/400/400', ARRAY[]::TEXT[], 150, id, true, 4.4, 310
FROM "Category" WHERE name = 'Fashion'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'denim-jacket', 'Vintage Denim Jacket', 'Classic denim jacket with a modern fit. Features button closure, chest pockets, and adjustable waist tabs.', 20, 35, 'https://picsum.photos/seed/jacket/400/400', ARRAY[]::TEXT[], 25, id, false, 4.7, 45
FROM "Category" WHERE name = 'Fashion'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'running-shoes', 'Lightweight Running Shoes', 'Breathable mesh running shoes with responsive cushioning and durable rubber outsole. Ideal for daily runs.', 18, 30, 'https://picsum.photos/seed/shoes/400/400', ARRAY[]::TEXT[], 60, id, true, 4.5, 178
FROM "Category" WHERE name = 'Fashion'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'sports-cap', 'Adjustable Sports Cap', 'Moisture-wicking baseball cap with UV protection. Adjustable strap fits all head sizes.', 3, NULL, 'https://picsum.photos/seed/cap/400/400', ARRAY[]::TEXT[], 120, id, false, 4.1, 88
FROM "Category" WHERE name = 'Fashion'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'wool-scarf', 'Premium Wool Scarf', 'Soft merino wool scarf with a classic herringbone pattern. Keeps you warm and stylish.', 7, 12, 'https://picsum.photos/seed/scarf/400/400', ARRAY[]::TEXT[], 45, id, false, 4.3, 56
FROM "Category" WHERE name = 'Fashion'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'leather-belt', 'Genuine Leather Belt', 'Handcrafted genuine leather belt with brushed metal buckle. Available in brown and black, sizes 30-42.', 8, 14, 'https://picsum.photos/seed/belt/400/400', ARRAY[]::TEXT[], 80, id, false, 4.4, 123
FROM "Category" WHERE name = 'Fashion'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'sunglasses', 'Aviator Sunglasses', 'Classic aviator sunglasses with UV400 protection and lightweight metal frame. Polarized lenses reduce glare.', 6, NULL, 'https://picsum.photos/seed/sunglasses/400/400', ARRAY[]::TEXT[], 90, id, true, 4.3, 167
FROM "Category" WHERE name = 'Fashion'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'backpack', 'Urban Daypack', 'Water-resistant daypack with padded laptop compartment, multiple pockets, and ergonomic shoulder straps. 20L capacity.', 10, 16, 'https://picsum.photos/seed/backpack/400/400', ARRAY[]::TEXT[], 55, id, false, 4.5, 201
FROM "Category" WHERE name = 'Fashion'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'wrist-watch', 'Minimalist Wrist Watch', 'Elegant minimalist watch with Japanese quartz movement, stainless steel case, and genuine leather strap.', 12, 20, 'https://picsum.photos/seed/watch2/400/400', ARRAY[]::TEXT[], 40, id, true, 4.6, 89
FROM "Category" WHERE name = 'Fashion'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'sneakers', 'Casual Canvas Sneakers', 'Comfortable canvas sneakers with cushioned sole. Perfect for everyday wear in multiple colorways.', 9, 15, 'https://picsum.photos/seed/sneakers/400/400', ARRAY[]::TEXT[], 70, id, false, 4.2, 134
FROM "Category" WHERE name = 'Fashion'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'scented-candle', 'Lavender Scented Candle', 'Hand-poured soy wax candle with natural lavender essential oil. Burns for 45+ hours in a glass jar.', 4, 7, 'https://picsum.photos/seed/candle/400/400', ARRAY[]::TEXT[], 80, id, false, 4.6, 234
FROM "Category" WHERE name = 'Home & Living'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'plant-pot', 'Ceramic Plant Pot', 'Minimalist ceramic pot with drainage hole and bamboo tray. Perfect for indoor plants and succulents.', 6, NULL, 'https://picsum.photos/seed/plantpot/400/400', ARRAY[]::TEXT[], 90, id, false, 4.2, 67
FROM "Category" WHERE name = 'Home & Living'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'throw-blanket', 'Ultra-Soft Throw Blanket', 'Plush microfiber blanket perfect for cozy nights. Machine washable, fade resistant, available in 5 colors.', 8, 14, 'https://picsum.photos/seed/blanket/400/400', ARRAY[]::TEXT[], 65, id, true, 4.8, 412
FROM "Category" WHERE name = 'Home & Living'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'desk-lamp', 'LED Desk Lamp', 'Adjustable LED desk lamp with 5 brightness levels, USB charging port, and touch control. Eye-care technology.', 7, 12, 'https://picsum.photos/seed/lamp/400/400', ARRAY[]::TEXT[], 55, id, false, 4.4, 143
FROM "Category" WHERE name = 'Home & Living'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'photo-frames', 'Set of 3 Photo Frames', 'Elegant wood-effect photo frames in 4x6, 5x7, and 8x10 sizes. Wall-mountable or tabletop display.', 5, 9, 'https://picsum.photos/seed/frames/400/400', ARRAY[]::TEXT[], 70, id, false, 4, 95
FROM "Category" WHERE name = 'Home & Living'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'wall-clock', 'Modern Wall Clock', 'Silent quartz wall clock with minimalist design. 12-inch diameter with easy-to-read numbers, runs on 1 AA battery.', 4, NULL, 'https://picsum.photos/seed/clock/400/400', ARRAY[]::TEXT[], 50, id, false, 4.3, 78
FROM "Category" WHERE name = 'Home & Living'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'cushion-set', 'Decorative Cushion Set', 'Set of 2 decorative cushions with removable covers. Soft velvet fabric with geometric patterns. 45x45cm.', 6, 10, 'https://picsum.photos/seed/cushion/400/400', ARRAY[]::TEXT[], 85, id, false, 4.1, 112
FROM "Category" WHERE name = 'Home & Living'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'rug', 'Handwoven Area Rug', 'Handwoven wool area rug with traditional patterns. Durable and stain-resistant. Available in multiple sizes.', 14, 22, 'https://picsum.photos/seed/rug/400/400', ARRAY[]::TEXT[], 20, id, true, 4.6, 67
FROM "Category" WHERE name = 'Home & Living'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'face-serum', 'Vitamin C Face Serum', 'Brightening serum with 20% Vitamin C, hyaluronic acid, and vitamin E. Reduces dark spots and fine lines.', 6, 10, 'https://picsum.photos/seed/serum/400/400', ARRAY[]::TEXT[], 100, id, true, 4.5, 287
FROM "Category" WHERE name = 'Beauty'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'lip-balm-set', 'Organic Lip Balm Set', 'Set of 4 organic lip balms in assorted flavors. Shea butter and coconut oil based, zero chemicals.', 3, NULL, 'https://picsum.photos/seed/lipbalm/400/400', ARRAY[]::TEXT[], 180, id, false, 4.3, 156
FROM "Category" WHERE name = 'Beauty'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'hair-oil', 'Argan Hair Oil', 'Pure argan oil from Morocco. Restores shine, reduces frizz, and repairs damaged hair. Suitable for all hair types.', 5, 8, 'https://picsum.photos/seed/hairoil/400/400', ARRAY[]::TEXT[], 85, id, false, 4.4, 201
FROM "Category" WHERE name = 'Beauty'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'perfume', 'Eau de Parfum', 'Long-lasting floral fragrance with notes of jasmine, rose, and sandalwood. 50ml spray bottle.', 12, 20, 'https://picsum.photos/seed/perfume/400/400', ARRAY[]::TEXT[], 35, id, true, 4.7, 89
FROM "Category" WHERE name = 'Beauty'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'moisturizer', 'Daily Face Moisturizer', 'Lightweight, non-greasy moisturizer with SPF 30. Hydrates and protects skin all day. Suitable for all skin types.', 5, 9, 'https://picsum.photos/seed/moisturizer/400/400', ARRAY[]::TEXT[], 95, id, false, 4.4, 223
FROM "Category" WHERE name = 'Beauty'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'nail-polish-set', 'Gel Nail Polish Set', 'Set of 6 long-lasting gel nail polishes in trendy colors. UV/LED cured, chip-resistant for up to 14 days.', 4, NULL, 'https://picsum.photos/seed/nailpolish/400/400', ARRAY[]::TEXT[], 110, id, false, 4.1, 89
FROM "Category" WHERE name = 'Beauty'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'face-mask-pack', 'Sheet Mask Variety Pack', '10-pack of premium sheet masks with different formulas: hyaluronic acid, collagen, green tea, and vitamin C.', 3, NULL, 'https://picsum.photos/seed/facemask/400/400', ARRAY[]::TEXT[], 200, id, false, 4.3, 178
FROM "Category" WHERE name = 'Beauty'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'eye-shadow-palette', 'Professional Eyeshadow Palette', '18-shade eyeshadow palette with matte, shimmer, and glitter finishes. Highly pigmented and blendable.', 7, 12, 'https://picsum.photos/seed/eyeshadow/400/400', ARRAY[]::TEXT[], 45, id, true, 4.5, 134
FROM "Category" WHERE name = 'Beauty'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'yoga-mat', 'Non-Slip Yoga Mat', 'Extra-thick 6mm yoga mat with alignment lines. Non-slip texture, lightweight and includes carry strap.', 8, 14, 'https://picsum.photos/seed/yogamat/400/400', ARRAY[]::TEXT[], 60, id, false, 4.5, 167
FROM "Category" WHERE name = 'Sports'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'water-bottle', 'Insulated Water Bottle', 'Double-wall vacuum insulated bottle. Keeps drinks cold 24h or hot 12h. 750ml capacity, BPA-free.', 6, NULL, 'https://picsum.photos/seed/bottle/400/400', ARRAY[]::TEXT[], 120, id, true, 4.6, 298
FROM "Category" WHERE name = 'Sports'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'resistance-bands', 'Resistance Bands Set', 'Set of 5 resistance bands with different tension levels. Includes door anchor, handles, and carry bag.', 4, 7, 'https://picsum.photos/seed/bands/400/400', ARRAY[]::TEXT[], 95, id, false, 4.2, 134
FROM "Category" WHERE name = 'Sports'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'jump-rope', 'Speed Jump Rope', 'Adjustable speed jump rope with ball bearings for smooth rotation. Foam handles for comfortable grip.', 2, NULL, 'https://picsum.photos/seed/jumprope/400/400', ARRAY[]::TEXT[], 150, id, false, 4.1, 78
FROM "Category" WHERE name = 'Sports'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'dumbbell-set', 'Adjustable Dumbbell Set', 'Space-saving adjustable dumbbells from 2kg to 20kg each. Quick-change weight selection mechanism.', 15, 25, 'https://picsum.photos/seed/dumbbell/400/400', ARRAY[]::TEXT[], 25, id, true, 4.7, 89
FROM "Category" WHERE name = 'Sports'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'fitness-tracker', 'Fitness Tracker Band', 'Slim fitness tracker with step counting, heart rate monitor, sleep tracking, and 7-day battery. Water resistant.', 8, NULL, 'https://picsum.photos/seed/fitband/400/400', ARRAY[]::TEXT[], 65, id, false, 4.3, 156
FROM "Category" WHERE name = 'Sports'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'foam-roller', 'High-Density Foam Roller', 'High-density foam roller for muscle recovery and myofascial release. 45cm length, includes exercise guide.', 5, 9, 'https://picsum.photos/seed/foamroller/400/400', ARRAY[]::TEXT[], 50, id, false, 4.4, 112
FROM "Category" WHERE name = 'Sports'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'gym-gloves', 'Weightlifting Gym Gloves', 'Breathable gym gloves with padded palm protection and adjustable wrist straps. Improves grip and prevents calluses.', 3, NULL, 'https://picsum.photos/seed/gymgloves/400/400', ARRAY[]::TEXT[], 85, id, false, 4, 67
FROM "Category" WHERE name = 'Sports'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'gourmet-coffee', 'Gourmet Coffee Beans', 'Single-origin Arabica coffee beans from Colombia. Medium roast with notes of chocolate and caramel. 250g bag.', 5, 8, 'https://picsum.photos/seed/coffee/400/400', ARRAY[]::TEXT[], 70, id, true, 4.7, 345
FROM "Category" WHERE name = 'Food & Drinks'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'tea-collection', 'Premium Tea Collection', 'Assorted box of 20 premium tea bags: green tea, chamomile, earl grey, and jasmine. Gift-worthy packaging.', 3, NULL, 'https://picsum.photos/seed/tea/400/400', ARRAY[]::TEXT[], 110, id, false, 4.3, 89
FROM "Category" WHERE name = 'Food & Drinks'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'chocolate-box', 'Belgian Chocolate Box', 'Handcrafted Belgian chocolates with assorted fillings. 24 pieces in a premium gift box.', 7, 12, 'https://picsum.photos/seed/chocolate/400/400', ARRAY[]::TEXT[], 50, id, true, 4.8, 423
FROM "Category" WHERE name = 'Food & Drinks'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'protein-bars', 'Protein Bars Variety Pack', 'Pack of 12 plant-based protein bars in 4 flavors. 20g protein per bar, no artificial sweeteners.', 4, 6, 'https://picsum.photos/seed/proteinbar/400/400', ARRAY[]::TEXT[], 90, id, false, 4.1, 156
FROM "Category" WHERE name = 'Food & Drinks'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'honey-jar', 'Raw Organic Honey', 'Pure raw organic honey from local farms. Unfiltered and unpasteurized, 500g glass jar. Rich in antioxidants.', 4, NULL, 'https://picsum.photos/seed/honey/400/400', ARRAY[]::TEXT[], 60, id, false, 4.5, 201
FROM "Category" WHERE name = 'Food & Drinks'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'hot-sauce', 'Artisan Hot Sauce Set', 'Set of 3 artisan hot sauces: mild smoky, medium jalapeno, and extra hot habanero. Small batch crafted.', 3, NULL, 'https://picsum.photos/seed/hotsauce/400/400', ARRAY[]::TEXT[], 75, id, false, 4.2, 89
FROM "Category" WHERE name = 'Food & Drinks'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'trail-mix', 'Premium Trail Mix', 'Hand-mixed trail blend with almonds, cashews, dried cranberries, dark chocolate chips, and coconut flakes. 400g.', 3, 5, 'https://picsum.photos/seed/trailmix/400/400', ARRAY[]::TEXT[], 100, id, false, 4.3, 134
FROM "Category" WHERE name = 'Food & Drinks'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'olive-oil', 'Extra Virgin Olive Oil', 'Cold-pressed extra virgin olive oil from Italy. Rich, fruity flavor perfect for salads and cooking. 500ml bottle.', 5, 8, 'https://picsum.photos/seed/oliveoil/400/400', ARRAY[]::TEXT[], 45, id, true, 4.6, 178
FROM "Category" WHERE name = 'Food & Drinks'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'board-game', 'Strategy Board Game', 'Award-winning strategy board game for 2-4 players. Average play time 45 minutes. Ages 10+.', 10, 16, 'https://picsum.photos/seed/boardgame/400/400', ARRAY[]::TEXT[], 30, id, false, 4.6, 212
FROM "Category" WHERE name = 'Toys & Games'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'puzzle-1000', '1000-Piece Puzzle', 'Beautiful landscape puzzle with 1000 pieces. High-quality thick cardboard pieces with anti-glare surface.', 5, NULL, 'https://picsum.photos/seed/puzzle/400/400', ARRAY[]::TEXT[], 45, id, false, 4.3, 88
FROM "Category" WHERE name = 'Toys & Games'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'card-game', 'Party Card Game', 'Hilarious party card game for 4-10 players. Quick to learn, hours of fun. Great for gatherings.', 4, 7, 'https://picsum.photos/seed/cardgame/400/400', ARRAY[]::TEXT[], 65, id, false, 4.4, 178
FROM "Category" WHERE name = 'Toys & Games'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'building-blocks', 'Creative Building Blocks', '500-piece building block set compatible with major brands. Includes base plates and idea booklet.', 8, 14, 'https://picsum.photos/seed/blocks/400/400', ARRAY[]::TEXT[], 40, id, false, 4.2, 134
FROM "Category" WHERE name = 'Toys & Games'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'rc-car', 'Remote Control Car', 'High-speed RC car with 2.4GHz remote, rechargeable battery, and durable construction. Speeds up to 30km/h.', 12, 20, 'https://picsum.photos/seed/rccar/400/400', ARRAY[]::TEXT[], 25, id, true, 4.5, 67
FROM "Category" WHERE name = 'Toys & Games'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'plush-toy', 'Giant Plush Teddy Bear', 'Extra-soft giant teddy bear measuring 100cm. Made from premium plush fabric with embroidered features.', 10, 16, 'https://picsum.photos/seed/teddy/400/400', ARRAY[]::TEXT[], 30, id, true, 4.7, 245
FROM "Category" WHERE name = 'Toys & Games'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'slime-kit', 'DIY Slime Making Kit', 'Complete slime making kit with glow-in-the-dark, glitter, and color-changing additives. Non-toxic and safe.', 3, NULL, 'https://picsum.photos/seed/slime/400/400', ARRAY[]::TEXT[], 90, id, false, 4.1, 156
FROM "Category" WHERE name = 'Toys & Games'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'kite', 'Large Rainbow Kite', 'Easy-to-fly rainbow delta kite with 50m line and winder. Perfect for beach and park flying. Durable ripstop nylon.', 4, NULL, 'https://picsum.photos/seed/kite/400/400', ARRAY[]::TEXT[], 55, id, false, 4, 45
FROM "Category" WHERE name = 'Toys & Games'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'cookbook', 'Healthy Recipes Cookbook', '200+ healthy and delicious recipes with nutritional information. Beautifully photographed, hardcover edition.', 6, 10, 'https://picsum.photos/seed/cookbook/400/400', ARRAY[]::TEXT[], 55, id, true, 4.6, 198
FROM "Category" WHERE name = 'Books'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'self-help-book', 'The Growth Mindset', 'Bestselling guide to personal development and achieving your goals. Practical strategies backed by science.', 5, 8, 'https://picsum.photos/seed/selfhelp/400/400', ARRAY[]::TEXT[], 80, id, false, 4.4, 267
FROM "Category" WHERE name = 'Books'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'fiction-novel', 'The Lost City', 'Gripping adventure novel set in the Amazon rainforest. Page-turner with twists and unforgettable characters.', 4, NULL, 'https://picsum.photos/seed/novel/400/400', ARRAY[]::TEXT[], 100, id, false, 4.3, 312
FROM "Category" WHERE name = 'Books'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'journal', 'Leather-Bound Journal', 'Premium leather journal with 240 lined pages. Acid-free paper with lay-flat binding. Ideal for writing and sketching.', 7, 12, 'https://picsum.photos/seed/journal/400/400', ARRAY[]::TEXT[], 40, id, false, 4.5, 89
FROM "Category" WHERE name = 'Books'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'children-book', 'Magical Bedtime Stories', 'Beautifully illustrated collection of 10 bedtime stories for children ages 3-8. Hardback, 120 pages.', 4, NULL, 'https://picsum.photos/seed/kidsbook/400/400', ARRAY[]::TEXT[], 65, id, true, 4.7, 234
FROM "Category" WHERE name = 'Books'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'science-book', 'The Science of Everything', 'Fascinating journey through physics, chemistry, and biology explained for curious minds. Illustrated, 350 pages.', 6, 10, 'https://picsum.photos/seed/sciencebook/400/400', ARRAY[]::TEXT[], 45, id, false, 4.5, 145
FROM "Category" WHERE name = 'Books'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'notebook-set', 'Premium Notebook Set', 'Set of 3 hardcover notebooks in A5 size. Includes dotted, lined, and blank pages. 192 pages each.', 5, 9, 'https://picsum.photos/seed/notebook/400/400', ARRAY[]::TEXT[], 100, id, false, 4.3, 167
FROM "Category" WHERE name = 'Books'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'language-guide', 'Spanish Language Guide', 'Complete Spanish learning guide with audio companion. Covers basics to advanced conversation. 300+ pages.', 4, NULL, 'https://picsum.photos/seed/spanish/400/400', ARRAY[]::TEXT[], 35, id, false, 4.2, 78
FROM "Category" WHERE name = 'Books'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'dog-leash', 'Retractable Dog Leash', 'Strong retractable dog leash up to 5 meters. Ergonomic handle with brake button. Suitable for dogs up to 30kg.', 4, 7, 'https://picsum.photos/seed/dogleash/400/400', ARRAY[]::TEXT[], 80, id, true, 4.4, 189
FROM "Category" WHERE name = 'Pet Supplies'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'cat-tower', 'Deluxe Cat Tower', 'Multi-level cat tree with scratching posts, cozy perches, and hanging toy. 150cm tall, plush fabric.', 14, 22, 'https://picsum.photos/seed/cattower/400/400', ARRAY[]::TEXT[], 20, id, true, 4.6, 78
FROM "Category" WHERE name = 'Pet Supplies'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'pet-bed', 'Orthopedic Pet Bed', 'Memory foam pet bed with removable, machine-washable cover. Available in multiple sizes for dogs and cats.', 8, 14, 'https://picsum.photos/seed/petbed/400/400', ARRAY[]::TEXT[], 40, id, false, 4.5, 156
FROM "Category" WHERE name = 'Pet Supplies'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'pet-bowls', 'Stainless Steel Pet Bowls', 'Set of 2 stainless steel pet bowls with non-slip silicone base. 500ml capacity each, dishwasher safe.', 3, NULL, 'https://picsum.photos/seed/petbowl/400/400', ARRAY[]::TEXT[], 120, id, false, 4.3, 98
FROM "Category" WHERE name = 'Pet Supplies'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'pet-grooming-kit', 'Professional Pet Grooming Kit', 'Complete grooming kit with brush, comb, nail clippers, and deshedding tool. Suitable for all coat types.', 6, 10, 'https://picsum.photos/seed/petgroom/400/400', ARRAY[]::TEXT[], 55, id, false, 4.2, 112
FROM "Category" WHERE name = 'Pet Supplies'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'fish-tank', 'Desktop Aquarium Kit', '20L desktop aquarium with LED lighting, filter system, and thermometer. Includes decoration set. Easy setup.', 12, 20, 'https://picsum.photos/seed/fishtank/400/400', ARRAY[]::TEXT[], 15, id, false, 4.1, 45
FROM "Category" WHERE name = 'Pet Supplies'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'pet-toys-set', 'Interactive Pet Toy Set', 'Set of 6 interactive dog toys: squeaky balls, rope tug, frisbee, and plush toys. Keeps pets entertained for hours.', 4, NULL, 'https://picsum.photos/seed/pettoys/400/400', ARRAY[]::TEXT[], 90, id, false, 4, 134
FROM "Category" WHERE name = 'Pet Supplies'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'car-vacuum', 'Portable Car Vacuum', 'Powerful handheld vacuum cleaner for cars. 8000Pa suction, wireless, USB rechargeable. Includes crevice tool and brush.', 8, 14, 'https://picsum.photos/seed/carvacuum/400/400', ARRAY[]::TEXT[], 45, id, true, 4.4, 167
FROM "Category" WHERE name = 'Automotive'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'phone-mount', 'Car Phone Mount', 'Universal dashboard/windshield phone mount with 360° rotation. One-touch clamp fits all phone sizes.', 3, NULL, 'https://picsum.photos/seed/phonemount/400/400', ARRAY[]::TEXT[], 150, id, false, 4.2, 234
FROM "Category" WHERE name = 'Automotive'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'seat-covers', 'Premium Car Seat Covers', 'Universal fit car seat covers in leatherette material. Set of 2 front seats with airbag compatibility.', 10, 18, 'https://picsum.photos/seed/seatcover/400/400', ARRAY[]::TEXT[], 35, id, false, 4.3, 89
FROM "Category" WHERE name = 'Automotive'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'air-freshener', 'Car Air Freshener Set', 'Set of 6 premium car air fresheners in assorted scents: new car, lavender, citrus, ocean, vanilla, and coffee.', 2, NULL, 'https://picsum.photos/seed/airfresh/400/400', ARRAY[]::TEXT[], 200, id, false, 4.1, 312
FROM "Category" WHERE name = 'Automotive'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'dash-cam', 'HD Dash Camera', '1080p dash cam with wide-angle lens, night vision, and motion detection. Supports up to 128GB microSD card.', 10, NULL, 'https://picsum.photos/seed/dashcam/400/400', ARRAY[]::TEXT[], 30, id, true, 4.5, 78
FROM "Category" WHERE name = 'Automotive'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'emergency-kit', 'Car Emergency Kit', '28-piece emergency kit with jumper cables, first aid, flashlight, reflective vest, tow rope, and more.', 7, 12, 'https://picsum.photos/seed/emergency/400/400', ARRAY[]::TEXT[], 50, id, false, 4.6, 145
FROM "Category" WHERE name = 'Automotive'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'steering-cover', 'Leather Steering Wheel Cover', 'Premium genuine leather steering wheel cover with sporty design. Universal fit 38-40cm. Improves grip and comfort.', 4, 7, 'https://picsum.photos/seed/steering/400/400', ARRAY[]::TEXT[], 80, id, false, 4.3, 112
FROM "Category" WHERE name = 'Automotive'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'desk-organizer', 'Bamboo Desk Organizer', 'Multi-compartment bamboo desk organizer with pen holder, phone stand, and drawer. Keeps your workspace tidy.', 6, 10, 'https://picsum.photos/seed/deskorg/400/400', ARRAY[]::TEXT[], 60, id, true, 4.4, 134
FROM "Category" WHERE name = 'Office Supplies'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'planner', 'Weekly & Monthly Planner', 'Undated 12-month planner with weekly and monthly spreads. Hardcover, lay-flat binding, includes stickers.', 4, NULL, 'https://picsum.photos/seed/planner/400/400', ARRAY[]::TEXT[], 90, id, false, 4.5, 201
FROM "Category" WHERE name = 'Office Supplies'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'pen-set', 'Premium Ballpoint Pen Set', 'Set of 5 luxury ballpoint pens with smooth ink flow. Each pen has a different color: black, blue, red, green, purple.', 3, NULL, 'https://picsum.photos/seed/pens/400/400', ARRAY[]::TEXT[], 150, id, false, 4.2, 178
FROM "Category" WHERE name = 'Office Supplies'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'whiteboard', 'Magnetic Whiteboard', '60x90cm magnetic whiteboard with stand. Double-sided, includes markers, eraser, and magnets. Perfect for home office.', 9, 15, 'https://picsum.photos/seed/whiteboard/400/400', ARRAY[]::TEXT[], 25, id, false, 4.3, 67
FROM "Category" WHERE name = 'Office Supplies'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'paper-shredder', 'Personal Paper Shredder', 'Cross-cut paper shredder for home office. Shreds up to 6 sheets at once, 15L bin, handles staples and paper clips.', 8, NULL, 'https://picsum.photos/seed/shredder/400/400', ARRAY[]::TEXT[], 35, id, false, 4.1, 89
FROM "Category" WHERE name = 'Office Supplies'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'monitor-stand', 'Adjustable Monitor Stand', 'Height-adjustable monitor stand with built-in storage drawer. Supports up to 15kg, fits screens up to 32 inches.', 7, 12, 'https://picsum.photos/seed/monitorstand/400/400', ARRAY[]::TEXT[], 40, id, true, 4.5, 112
FROM "Category" WHERE name = 'Office Supplies'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'stapler', 'Heavy Duty Stapler', 'Industrial stapler that staples up to 100 sheets. Ergonomic handle with soft grip, uses standard staples.', 5, NULL, 'https://picsum.photos/seed/stapler/400/400', ARRAY[]::TEXT[], 70, id, false, 4, 56
FROM "Category" WHERE name = 'Office Supplies'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'essential-oil-kit', 'Essential Oil Starter Kit', 'Set of 6 pure essential oils: lavender, peppermint, tea tree, eucalyptus, lemon, and orange. 10ml each.', 6, 10, 'https://picsum.photos/seed/essentialoil/400/400', ARRAY[]::TEXT[], 65, id, true, 4.5, 189
FROM "Category" WHERE name = 'Health & Wellness'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'massage-gun', 'Percussion Massage Gun', 'Deep tissue massage gun with 6 speed levels and 4 interchangeable heads. Quiet motor, rechargeable battery.', 12, 20, 'https://picsum.photos/seed/massagegun/400/400', ARRAY[]::TEXT[], 30, id, true, 4.6, 134
FROM "Category" WHERE name = 'Health & Wellness'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'acupressure-mat', 'Acupressure Mat & Pillow', 'Acupressure mat with 6000+ spikes and matching pillow. Relieves back pain, improves sleep and relaxation.', 5, 9, 'https://picsum.photos/seed/acupressure/400/400', ARRAY[]::TEXT[], 50, id, false, 4.3, 178
FROM "Category" WHERE name = 'Health & Wellness'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'sleep-mask', 'Premium Silk Sleep Mask', 'Luxury mulberry silk sleep mask with adjustable strap. Blocks 100% of light, gentle on skin, reduces eye pressure.', 3, NULL, 'https://picsum.photos/seed/sleepmask/400/400', ARRAY[]::TEXT[], 100, id, false, 4.4, 234
FROM "Category" WHERE name = 'Health & Wellness'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'fitness-journal', 'Health & Fitness Journal', 'Undated fitness journal to track workouts, meals, water intake, and mood. Includes habit tracker and meal planner.', 4, NULL, 'https://picsum.photos/seed/fitnessjournal/400/400', ARRAY[]::TEXT[], 75, id, false, 4.2, 89
FROM "Category" WHERE name = 'Health & Wellness'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'yoga-blocks', 'EVA Yoga Blocks Set', 'Set of 2 high-density EVA foam yoga blocks. Lightweight, supportive, and non-slip. Helps deepen stretches.', 3, 5, 'https://picsum.photos/seed/yogablocks/400/400', ARRAY[]::TEXT[], 85, id, false, 4.1, 67
FROM "Category" WHERE name = 'Health & Wellness'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'humidifier', 'Ultrasonic Room Humidifier', 'Quiet ultrasonic humidifier with 4L tank, runs up to 24 hours. Adjustable mist output, auto shut-off, LED light.', 8, 14, 'https://picsum.photos/seed/humidifier/400/400', ARRAY[]::TEXT[], 40, id, false, 4.5, 156
FROM "Category" WHERE name = 'Health & Wellness'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'acoustic-guitar', 'Beginner Acoustic Guitar', 'Full-size acoustic guitar with spruce top and rosewood body. Includes picks, spare strings, and carrying bag.', 20, 35, 'https://picsum.photos/seed/guitar/400/400', ARRAY[]::TEXT[], 20, id, true, 4.4, 89
FROM "Category" WHERE name = 'Music'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'headphones', 'Over-Ear Headphones', 'Studio-quality over-ear headphones with noise isolation, 40mm drivers, and plush ear cushions. Detachable cable.', 10, 18, 'https://picsum.photos/seed/headphones/400/400', ARRAY[]::TEXT[], 45, id, true, 4.5, 178
FROM "Category" WHERE name = 'Music'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'ukulele', 'Soprano Ukulele', 'Mahogany soprano ukulele with smooth fretboard and bright tone. Includes tuning pegs and beginner lesson booklet.', 8, 14, 'https://picsum.photos/seed/ukulele/400/400', ARRAY[]::TEXT[], 35, id, false, 4.3, 67
FROM "Category" WHERE name = 'Music'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'harmonica', 'Professional Harmonica', '10-hole diatonic harmonica in the key of C. Brass reeds with stainless steel cover. Great for blues and folk music.', 4, NULL, 'https://picsum.photos/seed/harmonica/400/400', ARRAY[]::TEXT[], 60, id, false, 4.2, 45
FROM "Category" WHERE name = 'Music'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'music-stand', 'Portable Music Stand', 'Adjustable sheet music stand with foldable design. Heavy-duty steel construction with carrying bag included.', 5, 9, 'https://picsum.photos/seed/musicstand/400/400', ARRAY[]::TEXT[], 50, id, false, 4.1, 78
FROM "Category" WHERE name = 'Music'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'midi-keyboard', 'USB MIDI Keyboard', '49-key USB MIDI controller with velocity-sensitive keys, pitch bend, and modulation wheel. Plug-and-play with all DAWs.', 12, 20, 'https://picsum.photos/seed/midi/400/400', ARRAY[]::TEXT[], 25, id, false, 4.4, 56
FROM "Category" WHERE name = 'Music'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'record-player', 'Vinyl Record Player', 'Belt-driven turntable with built-in speakers, USB recording, and vintage design. Plays 33/45/78 RPM records.', 15, 25, 'https://picsum.photos/seed/recordplayer/400/400', ARRAY[]::TEXT[], 15, id, true, 4.6, 112
FROM "Category" WHERE name = 'Music'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'gardening-set', 'Garden Tool Set', '9-piece garden tool set with stainless steel tools, pruning shears, gloves, and storage tote. Perfect for beginners.', 7, 12, 'https://picsum.photos/seed/gardentools/400/400', ARRAY[]::TEXT[], 55, id, true, 4.4, 145
FROM "Category" WHERE name = 'Garden & Outdoor'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'plant-seeds', 'Herb Garden Seed Kit', 'Complete herb garden kit with 6 herb seeds (basil, mint, parsley, cilantro, dill, chives), soil pellets, and labels.', 3, NULL, 'https://picsum.photos/seed/herbkit/400/400', ARRAY[]::TEXT[], 100, id, false, 4.3, 201
FROM "Category" WHERE name = 'Garden & Outdoor'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'hammock', 'Double Hammock with Stand', 'Comfortable double hammock with sturdy steel stand, 250kg capacity. Includes carrying bag for outdoor adventures.', 14, 22, 'https://picsum.photos/seed/hammock/400/400', ARRAY[]::TEXT[], 20, id, true, 4.6, 89
FROM "Category" WHERE name = 'Garden & Outdoor'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'watering-can', 'Decorative Watering Can', 'Galvanized steel watering can with 5L capacity. Classic design with brass rose sprinkler head. Rust-resistant.', 4, NULL, 'https://picsum.photos/seed/wateringcan/400/400', ARRAY[]::TEXT[], 65, id, false, 4.2, 78
FROM "Category" WHERE name = 'Garden & Outdoor'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'outdoor-lights', 'Solar Outdoor String Lights', '20m solar-powered string lights with 100 LED bulbs. Warm white, auto on/off, waterproof. Perfect for garden parties.', 6, 10, 'https://picsum.photos/seed/stringlights/400/400', ARRAY[]::TEXT[], 70, id, false, 4.5, 234
FROM "Category" WHERE name = 'Garden & Outdoor'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'picnic-blanket', 'Waterproof Picnic Blanket', 'Large 150x180cm picnic blanket with waterproof backing. Foldable with carrying handle. Sand-proof and easy to clean.', 5, NULL, 'https://picsum.photos/seed/picnic/400/400', ARRAY[]::TEXT[], 85, id, false, 4.3, 156
FROM "Category" WHERE name = 'Garden & Outdoor'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "Product" (id, slug, name, description, price, "comparePrice", image, images, stock, "categoryId", featured, rating, "reviewCount")
SELECT gen_random_uuid(), 'bird-feeder', 'Wooden Bird Feeder', 'Handcrafted wooden bird feeder with removable tray and roof. Holds up to 2kg of seeds. Weather-resistant finish.', 4, 7, 'https://picsum.photos/seed/birdfeeder/400/400', ARRAY[]::TEXT[], 40, id, false, 4.4, 67
FROM "Category" WHERE name = 'Garden & Outdoor'
ON CONFLICT (slug) DO NOTHING;

