-- Database Seeding Statements
-- Run these statements in your Supabase SQL Editor to populate initial data.

-- 1. SEED SKILLS
INSERT INTO public.skills (name, category, level, icon_class, display_order) VALUES
('React', 'Frontend', 90, 'bx bxl-react', 1),
('Next.js', 'Frontend', 85, 'devicon-nextjs-plain', 2),
('JavaScript', 'Frontend', 90, 'bx bxl-javascript', 3),
('TypeScript', 'Frontend', 85, 'bx bxl-typescript', 4),
('Tailwind CSS', 'Frontend', 90, 'bx bxl-tailwind-css', 5),
('Node.js', 'Backend', 75, 'bx bxl-nodejs', 6),
('REST API', 'Backend', 80, 'bx bx-server', 7),
('Git/GitHub', 'Tools', 85, 'bx bxl-github', 8);

-- 2. SEED EDUCATION
INSERT INTO public.education (school_en, school_vi, degree_en, degree_vi, description_en, description_vi, start_date, end_date, is_current, display_order) VALUES
(
    'University of Software Engineering',
    'Trường Đại học Công nghệ Phần mềm',
    'Bachelor of Software Engineering',
    'Cử nhân Kỹ thuật Phần mềm',
    'Studied core software architecture, design patterns, data structures, algorithms, and modern web application development technologies.',
    'Học về kiến trúc phần mềm cốt lõi, mẫu thiết kế, cấu trúc dữ liệu, thuật toán và các công nghệ phát triển ứng dụng web hiện đại.',
    '2021-09-01',
    '2025-06-30',
    false,
    1
);

-- 3. SEED EXPERIENCES
INSERT INTO public.experiences (company, role_en, role_vi, description_en, description_vi, start_date, end_date, is_current, display_order) VALUES
(
    'Tech Startup HCMC',
    'Frontend Developer Intern',
    'Thực tập sinh Lập trình Frontend',
    'Collaborated in developing responsive customer dashboards, integrated REST APIs, and optimized page speed. Worked with React, TypeScript, and Tailwind CSS.',
    'Phối hợp phát triển bảng điều khiển khách hàng đáp ứng, tích hợp các API REST và tối ưu hóa tốc độ tải trang. Làm việc với React, TypeScript và Tailwind CSS.',
    '2024-01-15',
    '2024-07-15',
    false,
    1
);

-- 4. SEED PROJECTS
-- We insert the two original projects: Tianlongshop and Explore Vietnam
INSERT INTO public.projects (slug, title, short_description_en, short_description_vi, overview_en, overview_vi, problem_statement_en, problem_statement_vi, solution_en, solution_vi, features_en, features_vi, responsibilities_en, responsibilities_vi, development_process_en, development_process_vi, challenges_solutions_en, challenges_solutions_vi, technologies, status, is_featured, thumbnail_url, live_demo_url, github_url) VALUES
(
    'tianlongshop',
    'Tianlongshop',
    'A premium e-commerce platform for milk tea brand Tianlong, optimized for delivery and local payments.',
    'Nền tảng thương mại điện tử cao cấp cho thương hiệu trà sữa Tianlong, tối ưu hóa giao hàng và thanh toán nội địa.',
    'Tianlongshop is a custom-designed storefront built for a popular regional milk tea brand. The system enables real-time order customisation (sugar levels, toppings, ice level), features an interactive shopping cart, integrates map services for delivery tracking, and supports local secure checkout portals.',
    'Tianlongshop là một trang thương mại điện tử tùy chỉnh được xây dựng cho thương hiệu trà sữa nổi tiếng trong khu vực. Hệ thống cho phép tùy chỉnh đơn hàng thời gian thực (lượng đường, topping, đá), giỏ hàng tương tác, tích hợp dịch vụ bản đồ để theo dõi giao hàng và hỗ trợ cổng thanh toán nội địa bảo mật.',
    'The client needed a digital storefront capable of handling rapid order customisation and high concurrent traffic during promotion hours, which standard e-commerce templates could not support.',
    'Khách hàng cần một cửa hàng trực tuyến có khả năng xử lý tùy biến đơn hàng nhanh chóng và lượng truy cập đồng thời cao trong các giờ khuyến mãi, điều mà các mẫu e-commerce thông thường không hỗ trợ.',
    'We built a customized Next.js App Router client with localized state caching and a server-side engine that handles custom workflows and high load gracefully.',
    'Chúng tôi đã xây dựng client Next.js App Router tùy chỉnh với bộ nhớ cache trạng thái cục bộ và engine phía máy chủ xử lý mượt mà các quy trình làm việc tùy chỉnh và tải trọng cao.',
    ARRAY['Real-time product customisation', 'Interactive Cart & dynamic checkout', 'VNPay checkout integration', 'Instant order SMS confirmation'],
    ARRAY['Tùy chỉnh sản phẩm thời gian thực', 'Giỏ hàng tương tác & thanh toán động', 'Tích hợp thanh toán VNPay', 'Xác nhận đơn hàng qua SMS tức thì'],
    ARRAY['Lead Frontend Engineering', 'Architecture design', 'Checkout flow integration'],
    ARRAY['Trưởng nhóm Kỹ thuật Frontend', 'Thiết kế kiến trúc', 'Tích hợp quy trình thanh toán'],
    'Developed using Agile methodology over 3 months, iteratively gathering feedback on custom topping controls.',
    'Phát triển bằng phương pháp Agile trong 3 tháng, thu thập phản hồi lặp đi lặp lại về các bảng điều khiển topping tùy chỉnh.',
    'Integrating the payment gateway with flaky third-party APIs was mitigated by building a resilient webhook retry mechanism.',
    'Tích hợp cổng thanh toán với các API bên thứ ba không ổn định được khắc phục bằng cơ chế thử lại webhook bền bỉ.',
    ARRAY['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit'],
    'Completed',
    true,
    '/images/tianlong.png',
    'https://botuoituyetdoi.tianlong.vn/',
    'https://github.com/tienphat2910'
),
(
    'explore-vietnam',
    'Explore Vietnam',
    'A beautiful localized travel discovery platform showcasing top cultural and tourist destinations in Vietnam.',
    'Nền tảng khám phá du lịch bản địa hóa tuyệt đẹp giới thiệu các điểm đến văn hóa và du lịch hàng đầu tại Việt Nam.',
    'Explore Vietnam is a bilingual travel guide platform designed to guide international and domestic tourists. It features destination guides, interactive location search, route tracking, and review sections.',
    'Explore Vietnam là nền tảng hướng dẫn du lịch song ngữ được thiết kế để hướng dẫn khách du lịch quốc tế và trong nước. Nó có tính năng hướng dẫn điểm đến, tìm kiếm vị trí tương tác, theo dõi tuyến đường và phần đánh giá.',
    'Most tourism platforms lacked rich, responsive layouts and local recommendations translated accurately.',
    'Hầu hết các nền tảng du lịch đều thiếu bố cục phong phú, đáp ứng và các khuyến nghị địa phương được dịch chính xác.',
    'Implemented a Next.js localized router with high-resolution imagery and dynamic maps to drive tourist engagement.',
    'Đã triển khai một bộ định tuyến bản địa hóa Next.js với hình ảnh độ phân giải cao và bản đồ động để tăng mức độ tương tác của khách du lịch.',
    ARRAY['Bilingual support (EN/VI)', 'Interactive destination maps', 'Itinerary planner', 'Weather API widgets'],
    ARRAY['Hỗ trợ song ngữ (EN/VI)', 'Bản đồ điểm đến tương tác', 'Lập kế hoạch hành trình', 'Widget API thời tiết'],
    ARRAY['Frontend developer', 'UI translation pipeline', 'Map API integration'],
    ARRAY['Lập trình viên Frontend', 'Đường ống dịch UI', 'Tích hợp Map API'],
    'Built using Tailwind CSS for clean spacing, focusing on optimal core web vitals.',
    'Được xây dựng bằng Tailwind CSS để có khoảng cách sạch sẽ, tập trung vào tối ưu hóa core web vitals.',
    'Image loading performance was optimized using Next.js Image component and modern WebP formats, yielding 95+ lighthouse scores.',
    'Hiệu suất tải hình ảnh đã được tối ưu hóa bằng Next.js Image component và các định dạng WebP hiện đại, mang lại điểm số lighthouse 95+.',
    ARRAY['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    'Completed',
    true,
    '/images/explore-vietnam.png',
    'https://explorevietnam.vercel.app/en',
    'https://github.com/tienphat2910'
);

-- 5. SEED PROFILE (EXAMPLE)
-- NOTE: You MUST create an admin user in your Supabase Auth panel first.
-- Once you have the user's ID (e.g. 'd9b0a1d4-8d4b-4b2c-9a4f-5d4b8d2b2b2b'), 
-- replace 'YOUR_ADMIN_USER_UUID' below with that ID and execute the statement:
--
-- INSERT INTO public.profiles (
--     id, 
--     name, 
--     position_en, 
--     position_vi, 
--     bio_en, 
--     bio_vi, 
--     phone, 
--     email, 
--     address_en, 
--     address_vi, 
--     social_github, 
--     social_linkedin, 
--     social_facebook, 
--     social_instagram, 
--     resume_url
-- ) VALUES (
--     'YOUR_ADMIN_USER_UUID',
--     'Nguyen Tien Phat',
--     'Frontend Developer',
--     'Lập trình viên Frontend',
--     'I''m a passionate frontend developer specializing in creating responsive, interactive, and clean user interfaces. With a strong background in Informatics Engineering, I combine design sensibility with technical expertise to build exceptional digital experiences.',
--     'Tôi là một nhà phát triển frontend đam mê, chuyên tạo ra các giao diện người dùng đáp ứng, tương tác và sạch sẽ. Với nền tảng vững chắc trong ngành Kỹ thuật Thông tin, tôi kết hợp khả năng thẩm mỹ với chuyên môn kỹ thuật để xây dựng những trải nghiệm số xuất sắc.',
--     '+84 376 549 230',
--     'tienphat29102003@gmail.com',
--     'Ho Chi Minh City, Vietnam',
--     'Thành phố Hồ Chí Minh, Việt Nam',
--     'https://github.com/tienphat2910',
--     'https://www.linkedin.com/in/tienphat2910/',
--     'https://facebook.com/tien.phat29',
--     'https://www.instagram.com/_imphat29_/',
--     '/cv.pdf'
-- );
