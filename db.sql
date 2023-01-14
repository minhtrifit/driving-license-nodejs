-- ----------------------------
-- Table structure for accounts
-- ----------------------------
DROP TABLE IF EXISTS "accounts";
CREATE TABLE "accounts" (
  "id" int4 NOT NULL,
  "name" varchar(100) NOT NULL,
  "username" varchar(50) NOT NULL,
  "password" varchar(255) NOT NULL,
  "type" varchar(10) NOT NULL
)
;

-- ----------------------------
-- Primary Key structure for table accounts
-- ----------------------------
ALTER TABLE "accounts" ADD CONSTRAINT "PK_Accounts" PRIMARY KEY ("id");

-- ----------------------------
-- Table structure for questions
-- ----------------------------
DROP TABLE IF EXISTS "questions";
CREATE TABLE "questions" (
  "id" int4 NOT NULL,
  "level" varchar(10) NOT NULL,
  "type" varchar(5) NOT NULL,
  "eliminated" varchar(5) NOT NULL,
  "quiz" varchar(255) NOT NULL,
  "choose" varchar[] NOT NULL,
  "ans" varchar(255) NOT NULL
)
;

-- ----------------------------
-- Records of accounts
-- ----------------------------
BEGIN;
-- INSERT INTO "questions" VALUES (1, 'A1', 'TEXT', 'NO', '', ARRAY ['','',''], '');
INSERT INTO "questions" VALUES (1, 'A1', 'TEXT', 'NO', 'Phần của đường bộ được sử dụng cho các phương tiện giao thông qua lại là gì?', ARRAY ['Phần mặt đường và lề đường','Phần đường xe chạy','Phần đường xe cơ giới'], 'Phần đường xe chạy');
INSERT INTO "questions" VALUES (2, 'A1', 'TEXT', 'NO', '“Làn đường” là gì?', ARRAY ['Là một phần của phần đường xe chạy được chia theo chiều dọc của đường, sử dụng cho xe chạy','Là một phần của phần đường xe chạy được chia theo chiều dọc của đường, có bề rộng đủ cho xe chạy an toàn','Là đường cho xe ô tô chạy, dừng, đỗ an toàn'], 'Là một phần của phần đường xe chạy được chia theo chiều dọc của đường, có bề rộng đủ cho xe chạy an toàn');
INSERT INTO "questions" VALUES (3, 'A1', 'TEXT', 'NO', 'Trong các khái niệm dưới đây, “dải phân cách” được hiểu như thế nào là đúng?', ARRAY ['Là bộ phận của đường để ngăn cách không cho các loại xe vào những nơi không được phép','Là bộ phận của đường để phân tách phần đường xe chạy và hành lang an toàn giao thông','Là bộ phận của đường để phân chia mặt đường thành hai chiều xe chạy riêng biệt hoặc để phân chia phần đường của xe cơ giới và xe thô sơ'], 'Là bộ phận của đường để phân chia mặt đường thành hai chiều xe chạy riêng biệt hoặc để phân chia phần đường của xe cơ giới và xe thô sơ');
INSERT INTO "questions" VALUES (4, 'A1', 'TEXT', 'NO', '“Dải phân cách” trên đường bộ gồm những loại nào?', ARRAY ['Dải phân cách gồm loại cố định và loại di động','Dải phân cách gồm tường chống ồn, hộ lan cứng và hộ lan mềm','Dải phân cách gồm giá long môn và biển báo hiệu đường bộ'], 'Dải phân cách gồm loại cố định và loại di động');
INSERT INTO "questions" VALUES (5, 'A1', 'TEXT', 'NO', 'Người lái xe được hiểu như thế nào trong các khái niệm dưới đây?', ARRAY ['Là người điều khiển xe cơ giới','Là người điều khiển xe thô sơ','Là người điều khiển xe có súc vật kéo'], 'Là người điều khiển xe cơ giới');
INSERT INTO "questions" VALUES (6, 'A1', 'TEXT', 'NO', 'Đường mà trên đó phương tiện tham gia giao thông được các phương tiện giao thông đến từ các hướng khác nhường đường khi qua nơi đường giao nhau, được cắm biển báo hiệu đường ưu tiên là loại đường gì?', ARRAY ['Đường không ưu tiên','Đường tỉnh lộ','Đường quốc lộ', 'Đường ưu tiên'], 'Đường ưu tiên');
INSERT INTO "questions" VALUES (7, 'A1', 'TEXT', 'NO', 'Khái niệm “phương tiện giao thông cơ giới đường bộ” được hiểu như thế nào là đúng?', ARRAY ['Gồm xe ô tô; máy kéo; xe mô tô hai bánh; xe mô tô ba bánh; xe gắn máy; xe cơ giới dùng cho người khuyết tật và xe máy chuyên dùng','Gồm ô tô; máy kéo; rơ moóc hoặc sơ mi rơ moóc được kéo bởi xe ô tô, máy kéo; xe mô tô hai bánh; xe mô tô ba bánh, xe gắn máy (kể cả xe máy điện) và các loại xe tương tự'], 'Gồm ô tô; máy kéo; rơ moóc hoặc sơ mi rơ moóc được kéo bởi xe ô tô, máy kéo; xe mô tô hai bánh; xe mô tô ba bánh, xe gắn máy (kể cả xe máy điện) và các loại xe tương tự');
INSERT INTO "questions" VALUES (8, 'A1', 'TEXT', 'NO', 'Khái niệm “phương tiện giao thông thô sơ đường bộ” được hiểu như thế nào là đúng?', ARRAY ['Gồm xe đạp (kể cả xe đạp máy, xe đạp điện), xe xích lô, xe lăn dùng cho người khuyết tật, xe súc vật kéo và các loại xe tương tự','Gồm xe đạp (kể cả xe đạp máy, xe đạp điện), xe gắn máy, xe cơ giới dùng cho người khuyết tật và xe máy chuyên dùng','Gồm xe ô tô, máy kéo, rơ moóc hoặc sơ mi rơ moóc được kéo bởi xe ô tô, máy kéo'], 'Gồm xe đạp (kể cả xe đạp máy, xe đạp điện), xe xích lô, xe lăn dùng cho người khuyết tật, xe súc vật kéo và các loại xe tương tự');
INSERT INTO "questions" VALUES (9, 'A1', 'TEXT', 'NO', '“Phương tiện tham gia giao thông đường bộ” gồm những loại nào?', ARRAY ['Phương tiện giao thông cơ giới đường bộ','Phương tiện giao thông thô sơ đường bộ và xe máy chuyên dùng','Cả ý 1 và ý 2'], 'Cả ý 1 và ý 2');
INSERT INTO "questions" VALUES (10, 'A1', 'TEXT', 'NO', '“Người tham gia giao thông đường bộ” gồm những đối tượng nào?', ARRAY ['Người điều khiển, người sử dụng phương tiện tham gia giao thông đường bộ','Người điều khiển, dẫn dắt súc vật; người đi bộ trên đường bộ','Cả ý 1 và ý 2'], 'Cả ý 1 và ý 2');
INSERT INTO "questions" VALUES (11, 'A1', 'TEXT', 'NO', '“Người điều khiển phương tiện tham gia giao thông đường bộ” gồm những đối tượng nào dưới đây?', ARRAY ['Người điều khiển xe cơ giới, người điều khiển xe thô sơ','Người điều khiển xe máy chuyên dùng tham gia giao thông đường bộ','Cả ý 1 và ý 2'], 'Cả ý 1 và ý 2');
INSERT INTO "questions" VALUES (12, 'A1', 'TEXT', 'NO', 'Khái niệm “người điều khiển giao thông” được hiểu như thế nào là đúng?', ARRAY ['Là người điều khiển phương tiện tham gia giao thông tại nơi thi công, nơi ùn tắc giao thông, ở bến phà, tại cầu đường bộ đi chung với đường sắt','Là cảnh sát giao thông, người được giao nhiệm vụ hướng dẫn giao thông tại nơi thi công, nơi ùn tắc giao thông, ở bến phà, tại cầu đường bộ đi chung với đường sắt','Là người tham gia giao thông tại nơi thi công, nơi ùn tắc giao thông, ở bến phà, tại cầu đường bộ đi chung với đường sắt'], 'Là cảnh sát giao thông, người được giao nhiệm vụ hướng dẫn giao thông tại nơi thi công, nơi ùn tắc giao thông, ở bến phà, tại cầu đường bộ đi chung với đường sắt');
INSERT INTO "questions" VALUES (13, 'A1', 'TEXT', 'NO', 'Trong các khái niệm dưới đây khái niệm “dừng xe” được hiểu như thế nào là đúng?', ARRAY ['Là trạng thái đứng yên của phương tiện giao thông không giới hạn thời gian để cho người lên, xuống phương tiện, xếp dỡ hàng hóa hoặc thực hiện công việc khác','Là trạng thái đứng yên tạm thời của phương tiện giao thông trong một khoảng thời gian cần thiết đủ để cho người lên, xuống phương tiện, xếp dỡ hàng hóa hoặc thực hiện công việc khác','Là trạng thái đứng yên của phương tiện giao thông không giới hạn thời gian giữa 02 lần vận chuyển hàng hóa hoặc hành khách'], 'Là trạng thái đứng yên tạm thời của phương tiện giao thông trong một khoảng thời gian cần thiết đủ để cho người lên, xuống phương tiện, xếp dỡ hàng hóa hoặc thực hiện công việc khác');
INSERT INTO "questions" VALUES (14, 'A1', 'TEXT', 'NO', 'Khái niệm “đỗ xe” được hiểu như thế nào là đúng?', ARRAY ['Là trạng thái đứng yên của phương tiện giao thông có thời hạn trong một khoảng thời gian cần thiết đủ để cho người lên, xuống phương tiện, xếp dỡ hàng hóa hoặc thực hiện công việc khác','Là trạng thái đứng yên của phương tiện giao thông không giới hạn thời gian'], 'Là trạng thái đứng yên của phương tiện giao thông không giới hạn thời gian');
INSERT INTO "questions" VALUES (15, 'A1', 'TEXT', 'YES', 'Cuộc đua xe chỉ được thực hiện khi nào?', ARRAY ['Diễn ra trên đường phố không có người qua lại','Được người dân ủng hộ','Được cơ quan có thẩm quyền cấp phép'], 'Được cơ quan có thẩm quyền cấp phép');
INSERT INTO "questions" VALUES (16, 'A1', 'TEXT', 'YES', 'Người điều khiển phương tiện giao thông đường bộ mà trong cơ thể có chất ma túy có bị nghiêm cấm hay không?', ARRAY ['Bị nghiêm cấm','Không bị nghiêm cấm','Không bị nghiêm cấm, nếu có chất ma túy ở mức nhẹ, có thể điều khiển phương tiện tham gia giao thông'], 'Bị nghiêm cấm');
INSERT INTO "questions" VALUES (17, 'A1', 'TEXT', 'YES', 'Sử dụng rượu, bia khi lái xe, nếu bị phát hiện thì bị xử lý như thế nào?', ARRAY ['Chỉ bị nhắc nhở','Bị xử phạt hành chính hoặc có thể bị xử lý hình sự tùy theo mức độ vi phạm','Không bị xử lý hình sự'], 'Bị xử phạt hành chính hoặc có thể bị xử lý hình sự tùy theo mức độ vi phạm');
INSERT INTO "questions" VALUES (18, 'A1', 'TEXT', 'YES', 'Theo luật phòng chống tác hại của rượu, bia, đối tượng nào dưới đây bị cấm sử dụng rượu, bia khi tham gia giao thông?', ARRAY ['Người điều khiển: Xe ô tô, xe mô tô, xe đạp, xe gắn máy','Người ngồi phía sau người điều khiển xe cơ giới','Người đi bộ','Cả ý 1 và ý 2'], 'Người điều khiển: Xe ô tô, xe mô tô, xe đạp, xe gắn máy');
INSERT INTO "questions" VALUES (19, 'A1', 'TEXT', 'YES', 'Hành vi điều khiển xe cơ giới chạy quá tốc độ quy định, giành đường, vượt ẩu có bị nghiêm cấm hay không?', ARRAY ['Bị nghiêm cấm tùy trường hợp','Không bị nghiêm cấm',''], 'Bị nghiêm cấm');
INSERT INTO "questions" VALUES (20, 'A1', 'TEXT', 'NO', 'Khi lái xe trong khu đô thị và đông dân cư trừ các khu vực có biển cấm sử dụng còi, người lái xe được sử dụng còi như thế nào trong các trường hợp dưới đây?', ARRAY ['Từ 22 giờ đêm đến 5 giờ sáng','Từ 5 giờ sáng đến 22 giờ tối','Từ 23 giờ đêm đến 5 giờ sáng hôm sau'], 'Từ 5 giờ sáng đến 22 giờ tối');
-- INSERT INTO "questions" VALUES (21, 'A1', 'TEXT', 'NO', '', ARRAY ['','',''], '');
-- INSERT INTO "questions" VALUES (22, 'A1', 'TEXT', 'NO', '', ARRAY ['','',''], '');
-- INSERT INTO "questions" VALUES (23, 'A1', 'TEXT', 'NO', '', ARRAY ['','',''], '');
-- INSERT INTO "questions" VALUES (24, 'A1', 'TEXT', 'NO', '', ARRAY ['','',''], '');
-- INSERT INTO "questions" VALUES (25, 'A1', 'TEXT', 'NO', '', ARRAY ['','',''], '');
-- INSERT INTO "questions" VALUES (26, 'A1', 'TEXT', 'NO', '', ARRAY ['','',''], '');
-- INSERT INTO "questions" VALUES (27, 'A1', 'TEXT', 'NO', '', ARRAY ['','',''], '');
-- INSERT INTO "questions" VALUES (28, 'A1', 'TEXT', 'NO', '', ARRAY ['','',''], '');
-- INSERT INTO "questions" VALUES (29, 'A1', 'TEXT', 'NO', '', ARRAY ['','',''], '');
-- INSERT INTO "questions" VALUES (30, 'A1', 'TEXT', 'NO', '', ARRAY ['','',''], '');
-- INSERT INTO "questions" VALUES (31, 'A1', 'TEXT', 'NO', '', ARRAY ['','',''], '');
-- INSERT INTO "questions" VALUES (32, 'A1', 'TEXT', 'NO', '', ARRAY ['','',''], '');
-- INSERT INTO "questions" VALUES (32, 'A1', 'TEXT', 'NO', '', ARRAY ['','',''], '');
-- INSERT INTO "questions" VALUES (34, 'A1', 'TEXT', 'NO', '', ARRAY ['','',''], '');
-- INSERT INTO "questions" VALUES (35, 'A1', 'TEXT', 'NO', '', ARRAY ['','',''], '');
-- INSERT INTO "questions" VALUES (36, 'A1', 'TEXT', 'NO', '', ARRAY ['','',''], '');
-- INSERT INTO "questions" VALUES (37, 'A1', 'TEXT', 'NO', '', ARRAY ['','',''], '');
-- INSERT INTO "questions" VALUES (38, 'A1', 'TEXT', 'NO', '', ARRAY ['','',''], '');
-- INSERT INTO "questions" VALUES (39, 'A1', 'TEXT', 'NO', '', ARRAY ['','',''], '');
-- INSERT INTO "questions" VALUES (40, 'A1', 'TEXT', 'NO', '', ARRAY ['','',''], '');
-- INSERT INTO "questions" VALUES (41, 'A1', 'TEXT', 'NO', '', ARRAY ['','',''], '');
-- INSERT INTO "questions" VALUES (42, 'A1', 'TEXT', 'NO', '', ARRAY ['','',''], '');
-- INSERT INTO "questions" VALUES (43, 'A1', 'TEXT', 'NO', '', ARRAY ['','',''], '');
-- INSERT INTO "questions" VALUES (44, 'A1', 'TEXT', 'NO', '', ARRAY ['','',''], '');
-- INSERT INTO "questions" VALUES (45, 'A1', 'TEXT', 'NO', '', ARRAY ['','',''], '');
-- INSERT INTO "questions" VALUES (46, 'A1', 'TEXT', 'NO', '', ARRAY ['','',''], '');
-- INSERT INTO "questions" VALUES (47, 'A1', 'TEXT', 'NO', '', ARRAY ['','',''], '');
-- INSERT INTO "questions" VALUES (48, 'A1', 'TEXT', 'NO', '', ARRAY ['','',''], '');
-- INSERT INTO "questions" VALUES (49, 'A1', 'TEXT', 'NO', '', ARRAY ['','',''], '');
-- INSERT INTO "questions" VALUES (50, 'A1', 'TEXT', 'NO', '', ARRAY ['','',''], '');
COMMIT;

-- ----------------------------
-- Primary Key structure for table questions
-- ----------------------------
ALTER TABLE "questions" ADD CONSTRAINT "PK_Questions" PRIMARY KEY ("id");