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
-- Table structure for license
-- ----------------------------
DROP TABLE IF EXISTS "license";
CREATE TABLE "license" (
  "level" varchar(10) NOT NULL,
  "name" varchar(100) NOT NULL,
  "amount" int4 NOT NULL,
  "time" int4 NOT NULL,
  "require" varchar(10) NOT NULL,
  "description" varchar(255) NOT NULL
)
;

-- ----------------------------
-- Records of license
-- ----------------------------
BEGIN;
INSERT INTO "license" VALUES ('A1', 'Bằng lái xe máy hạng A1', 25, 15, '21/25', 'Cấp cho người lái xe để điều khiển xe mô tô hai bánh có dung tích xy lanh từ 50 cm3 đến dưới 175 cm3.');
INSERT INTO "license" VALUES ('A2', 'Bằng lái xe máy hạng A2', 25, 15, '23/25', 'Cấp cho người lái xe để điều khiển xe mô tô hai bánh có dung tích xy lanh từ 175 cm3 trở lên và các loại xe quy định cho giấy phép lái xe hạng A1.');
INSERT INTO "license" VALUES ('B1', 'Bằng lái xe ôtô hạng B1', 30, 17, '27/30', 'Cấp cho người lái xe để điều khiển các xe số tự động 9 chỗ, dưới 3.5 tấn');
INSERT INTO "license" VALUES ('B2', 'Bằng lái xe ôtô hạng B2', 35, 20, '32/35', 'Cấp cho người lái xe để điều khiển các xe số sàn 9 chỗ, hành nghề lái xe thương mại');
COMMIT;

-- ----------------------------
-- Primary Key structure for table license
-- ----------------------------
ALTER TABLE "license" ADD CONSTRAINT "PK_License" PRIMARY KEY ("level");

-- ----------------------------
-- Table structure for result
-- ----------------------------
DROP TABLE IF EXISTS "result";
CREATE TABLE "result" (
  "id" int4 NOT NULL,
  "userID" int4 NOT NULL,
  "userName" varchar(100) NOT NULL,
  "level" varchar(10) NOT NULL,
  "licenseName" varchar(100) NOT NULL,
  "date" date,
  "result" varchar(10) NOT NULL
)
;

-- ----------------------------
-- Primary Key structure for table result
-- ----------------------------
ALTER TABLE "result" ADD CONSTRAINT "PK_Result" PRIMARY KEY ("id");

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
-- Records of questions
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
INSERT INTO "questions" VALUES (19, 'A1', 'TEXT', 'YES', 'Hành vi điều khiển xe cơ giới chạy quá tốc độ quy định, giành đường, vượt ẩu có bị nghiêm cấm hay không?', ARRAY ['Bị nghiêm cấm tùy trường hợp','Không bị nghiêm cấm','Bị nghiêm cấm'], 'Bị nghiêm cấm');
INSERT INTO "questions" VALUES (20, 'A1', 'TEXT', 'NO', 'Khi lái xe trong khu đô thị và đông dân cư trừ các khu vực có biển cấm sử dụng còi, người lái xe được sử dụng còi như thế nào trong các trường hợp dưới đây?', ARRAY ['Từ 22 giờ đêm đến 5 giờ sáng','Từ 5 giờ sáng đến 22 giờ tối','Từ 23 giờ đêm đến 5 giờ sáng hôm sau'], 'Từ 5 giờ sáng đến 22 giờ tối');
INSERT INTO "questions" VALUES (21, 'A1', 'TEXT', 'NO', 'Người lái xe sử dụng đèn như thế nào khi lái xe trong khu đô thị và đông dân cư vào ban đêm?', ARRAY ['Bất cứ đèn nào miễn là mắt nhìn rõ phía trước','Chỉ bật đèn chiếu xa (đèn pha) khi không nhìn rõ đường','Đèn chiếu xa (đèn pha) khi đường vắng, đèn pha chiếu gần (đèn cốt) khi có xe đi ngược chiều','Đèn chiếu gần (đèn cốt)'], 'Đèn chiếu gần (đèn cốt)');
INSERT INTO "questions" VALUES (22, 'A1', 'TEXT', 'NO', 'Trong trường hợp đặc biệt, để được lắp đặt, sử dụng còi, đèn không đúng với thiết kế của nhà sản xuất đối với từng loại xe cơ giới bạn phải đảm bảo yêu cầu nào dưới đây?', ARRAY ['Phải đảm bảo phụ tùng do đúng nhà sản xuất đó cung cấp','Phải được chấp thuận của cơ quan có thẩm quyền','Phải là xe đăng ký và hoạt động tại các khu vực có địa hình phức tạp'], 'Phải được chấp thuận của cơ quan có thẩm quyền');
INSERT INTO "questions" VALUES (23, 'A1', 'TEXT', 'YES', 'Ở phần đường dành cho người đi bộ qua đường, trên cầu, đầu cầu, đường cao tốc, đường hẹp, đường dốc, tại nơi đường bộ giao nhau cùng mức với đường sắt có được quay đầu xe hay không?', ARRAY ['Được phép','Không được phép','Tùy từng trường hợp'], 'Không được phép');
INSERT INTO "questions" VALUES (24, 'A1', 'TEXT', 'NO', 'Bạn đang lái xe phía trước có một xe cảnh sát giao thông không phát tín hiệu ưu tiên bạn có được phép vượt hay không?', ARRAY ['Không được vượt','Được vượt khi đang đi trên cầu','Được phép vượt khi đi qua nơi giao nhau có ít phương tiện cùng tham gia giao thông','Được vượt khi đảm bảo an toàn'], 'Được vượt khi đảm bảo an toàn');
INSERT INTO "questions" VALUES (25, 'A1', 'TEXT', 'NO', 'Bạn đang lái xe phía trước có một xe cứu thương đang phát tín hiệu ưu tiên bạn có được phép vượt hay không?', ARRAY ['Không được vượt','Được vượt khi đang đi trên cầu','Được phép vượt khi đi qua nơi giao nhau có ít phương tiện cùng tham gia giao thông', 'Được vượt khi đảm bảo an toàn'], 'Không được vượt');
INSERT INTO "questions" VALUES (26, 'A1', 'TEXT', 'YES', 'Người điều khiển xe mô tô hai bánh, ba bánh, xe gắn máy có được phép sử dụng xe để kéo hoặc đẩy các phương tiện khác khi tham gia giao thông không?', ARRAY ['Được phép','Nếu phương tiện được kéo, đẩy có khối lượng nhỏ hơn phương tiện của mình','Tùy trường hợp','Không được phép'], 'Không được phép');
INSERT INTO "questions" VALUES (27, 'A1', 'TEXT', 'YES', 'Khi điều khiển xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy, những hành vi buông cả hai tay; sử dụng xe để kéo, đẩy xe khác, vật khác; sử dụng chân chống của xe quệt xuống đường khi xe đang chạy có được phép hay không?', ARRAY ['Được phép','Tùy trường hợp','Không được phép'], 'Không được phép');
INSERT INTO "questions" VALUES (28, 'A1', 'TEXT', 'YES', 'Khi điều khiển xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy, những hành vi nào không được phép?', ARRAY ['Buông cả hai tay; sử dụng xe để kéo, đẩy xe khác, vật khác; sử dụng chân chống của xe quệt xuống đường khi xe đang chạy','Buông một tay; sử dụng xe để chở người hoặc hàng hóa; để chân chạm xuống đất khi khởi hành','Đội mũ bảo hiểm; chạy xe đúng tốc độ quy định và chấp hành đúng quy tắc giao thông đường bộ','Chở người ngồi sau dưới 16 tuổi'], 'Buông cả hai tay; sử dụng xe để kéo, đẩy xe khác, vật khác; sử dụng chân chống của xe quệt xuống đường khi xe đang chạy');
INSERT INTO "questions" VALUES (29, 'A1', 'TEXT', 'YES', 'Người ngồi trên xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy khi tham gia giao thông có được mang, vác vật cồng kềnh hay không?', ARRAY ['Được mang, vác tùy trường hợp cụ thể','Không được mang, vác','Được mang, vác nhưng phải đảm bảo an toàn','Được mang, vác tùy theo sức khỏe của bản thân'], 'Không được mang, vác');
INSERT INTO "questions" VALUES (30, 'A1', 'TEXT', 'YES', 'Người ngồi trên xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy khi tham gia giao thông có được bám, kéo hoặc đẩy các phương tiện khác không?', ARRAY ['Được phép','Được bám trong trường hợp phương tiện của mình bị hỏng','Được kéo, đẩy trong trường hợp phương tiện khác bị hỏng','Không được phép'], 'Không được phép');
INSERT INTO "questions" VALUES (31, 'A1', 'TEXT', 'YES', 'Người ngồi trên xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy khi tham gia giao thông có được sử dụng ô khi trời mưa hay không?', ARRAY ['Được sử dụng','Chỉ người ngồi sau được sử dụng','Không được sử dụng','Được sử dụng nếu không có áo mưa'], 'Không được sử dụng');
INSERT INTO "questions" VALUES (32, 'A1', 'TEXT', 'YES', 'Khi đang lên dốc người ngồi trên xe mô tô có được kéo theo người đang điều khiển xe đạp hay không?', ARRAY ['Chỉ được phép nếu cả hai đội mũ bảo hiểm','Không được phép','Chỉ được thực hiện trên đường thật vắng','Chỉ được phép khi người đi xe đạp đã quá mệt'], 'Không được phép');
INSERT INTO "questions" VALUES (33, 'A1', 'TEXT', 'YES', 'Hành vi sử dụng xe mô tô để kéo, đẩy xe mô tô khác bị hết xăng đến trạm mua xăng có được phép hay không?', ARRAY ['Chỉ được kéo nếu đã nhìn thấy trạm xăng','Chỉ được thực hiện trên đường vắng phương tiện cùng tham gia giao thông','Không được phép'], 'Không được phép');
INSERT INTO "questions" VALUES (34, 'A1', 'TEXT', 'YES', 'Hành vi vận chuyển đồ vật cồng kềnh bằng xe mô tô, xe gắn máy khi tham gia giao thông có được phép hay không?', ARRAY ['Không được vận chuyển','Chỉ được vận chuyển khi đã chằng buộc cẩn thận','Chỉ được vận chuyển vật cồng kềnh trên xe máy nếu khoảng cách về nhà ngắn hơn 2 km'], 'Không được vận chuyển');
INSERT INTO "questions" VALUES (35, 'A1', 'TEXT', 'NO', 'Người đủ bao nhiêu tuổi trở lên thì được điều khiển xe mô tô hai bánh, xe mô tô ba bánh có dung tích xi lanh từ 50 cm3 trở lên và các loại xe có kết cấu tương tự; xe ô tô tải, máy kéo có trọng tải dưới 3,5 tấn; xe ô tô chở người đến 9 chỗ ngồi?', ARRAY ['16 tuổi','18 tuổi','17 tuổi'], '18 tuổi');
INSERT INTO "questions" VALUES (36, 'A1', 'TEXT', 'NO', 'Người đủ 16 tuổi được điều khiển các loại xe nào dưới đây?', ARRAY ['Xe mô tô 2 bánh có dung tích xi lanh từ 50 cm3 trở lên','Xe gắn máy có dung tích xi lanh dưới 50 cm3','Xe ô tô tải dưới 3,5 tấn; xe chở người đến 9 chỗ ngồi'], 'Xe gắn máy có dung tích xi lanh dưới 50 cm3');
INSERT INTO "questions" VALUES (37, 'A1', 'TEXT', 'NO', 'Người có giấy phép lái xe mô tô hạng A1 không được phép điều khiển loại xe nào dưới đây?', ARRAY ['Xe mô tô có dung tích xi lanh 125 cm3','Xe mô tô có dung tích xi lanh từ 175 cm3 trở lên','Xe mô tô có dung tích xi lanh 100 cm3'], 'Xe mô tô có dung tích xi lanh từ 175 cm3 trở lên');
INSERT INTO "questions" VALUES (38, 'A1', 'TEXT', 'NO', 'Người có giấy phép lái xe mô tô hạng A1 được phép điều khiển loại xe nào dưới đây?', ARRAY ['Xe mô tô hai bánh có dung tích xi lanh từ 50 cm3 đến dưới 175 cm3','Xe mô tô ba bánh dùng cho người khuyết tật','Cả ý 1 và ý 2'], 'Cả ý 1 và ý 2');
INSERT INTO "questions" VALUES (39, 'A1', 'IMAGE', 'NO', 'Biển báo hiệu có dạng hình tròn, viền đỏ, nền trắng, trên nền có hình vẽ hoặc chữ số, chữ viết màu đen là loại biển gì dưới đây?', ARRAY ['Biển báo nguy hiểm','Biển báo cấm','Biển báo hiệu lệnh','Biển báo chỉ dẫn'], 'Biển báo cấm');
INSERT INTO "questions" VALUES (40, 'A1', 'IMAGE', 'NO', 'Biển báo hiệu có dạng tam giác đều, viền đỏ, nền màu vàng, trên có hình vẽ màu đen là loại biển gì dưới đây?', ARRAY ['Biển báo nguy hiểm','Biển báo cấm','Biển báo hiệu lệnh','Biển báo chỉ dẫn'], 'Biển báo nguy hiểm');
INSERT INTO "questions" VALUES (41, 'A1', 'IMAGE', 'NO', 'Biển báo hiệu hình tròn có nền xanh lam có hình vẽ màu trắng là loại biển gì dưới đây?', ARRAY ['Biển báo nguy hiểm','Biển báo cấm','Biển báo hiệu lệnh phải thi hành','Biển báo chỉ dẫn'], 'Biển báo hiệu lệnh phải thi hành');
INSERT INTO "questions" VALUES (42, 'A1', 'IMAGE', 'NO', 'Biển báo hiệu hình chữ nhật hoặc hình vuông hoặc hình mũi tên nền xanh lam là loại biển gì dưới đây?', ARRAY ['Biển báo nguy hiểm','Biển báo cấm','Biển báo hiệu lệnh phải thi hành','Biển báo chỉ dẫn'], 'Biển báo chỉ dẫn');
INSERT INTO "questions" VALUES (43, 'A1', 'TEXT', 'NO', 'Khi sử dụng giấy phép lái xe đã khai báo mất để điều khiển phương tiện cơ giới đường bộ, ngoài việc bị thu hồi giấy phép lái xe, chịu trách nhiệm trước pháp luật, người lái xe không được cấp giấy phép lái xe trong thời gian bao nhiêu năm?', ARRAY ['02 năm','03 năm','05 năm','04 năm'], '05 năm');
INSERT INTO "questions" VALUES (44, 'A1', 'IMAGE', 'NO', 'Khi gặp hiệu lệnh như dưới đây của cảnh sát giao thông thì người tham gia giao thông phải đi như thế nào là đúng quy tắc giao thông?', ARRAY ['Người tham gia giao thông ở các hướng phải dừng lại','Người tham gia giao thông ở các hướng được đi theo chiều gậy chỉ của cảnh sát giao thông','Người tham gia giao thông ở phía trước và phía sau người điều khiển được đi tất cả các hướng; người tham gia giao thông ở phía bên phải và phía bên trái người điều khiển phải dừng lại','Người tham gia giao thông ở phía trước và phía sau người điều khiển phải dừng lại; người tham gia giao thông ở phía bên phải và phía bên trái người điều khiển được đi tất cả các hướng'], 'Người tham gia giao thông ở phía trước và phía sau người điều khiển phải dừng lại; người tham gia giao thông ở phía bên phải và phía bên trái người điều khiển được đi tất cả các hướng');
INSERT INTO "questions" VALUES (45, 'A1', 'IMAGE', 'NO', 'Khi gặp hiệu lệnh như dưới đây của cảnh sát giao thông thì người tham gia giao thông phải đi như thế nào là đúng quy tắc giao thông?', ARRAY ['Người tham gia giao thông ở hướng đối diện cảnh sát giao thông được đi, các hướng khác cần phải dừng lại','Người tham gia giao thông được rẽ phải theo chiều mũi tên màu xanh ở bục cảnh sát giao thông','Người tham gia giao thông ở các hướng đều phải dừng lại trừ các xe ở trong khu vực giao nhau','Người ở hướng đối diện cảnh sát giao thông phải dừng lại, các hướng khác được đi trong đó có bạn'], 'Người tham gia giao thông ở các hướng đều phải dừng lại trừ các xe ở trong khu vực giao nhau');
INSERT INTO "questions" VALUES (46, 'A1', 'TEXT', 'NO', 'Tại nơi có biển báo hiệu cố định lại có báo hiệu tạm thời thì người tham gia giao thông phải chấp hành hiệu lệnh của báo hiệu nào?', ARRAY ['Biển báo hiệu cố định','Báo hiệu tạm thời'], 'Báo hiệu tạm thời');
INSERT INTO "questions" VALUES (47, 'A1', 'TEXT', 'NO', 'Trên đường có nhiều làn đường cho xe đi cùng chiều được phân biệt bằng vạch kẻ phân làn đường, người điều khiển phương tiện phải cho xe đi như thế nào?', ARRAY ['Cho xe đi trên bất kỳ làn đường nào hoặc giữa hai làn đường nếu không có xe phía trước; khi cần thiết phải chuyển làn đường, người lái xe phải quan sát xe phía trước để bảo đảm an toàn','Phải cho xe đi trong một làn đường và chỉ được chuyển làn đường ở những nơi cho phép; khi chuyển làn phải có tín hiệu báo trước và phải bảo đảm an toàn','Phải cho xe đi trong một làn đường, khi cần thiết phải chuyển làn đường, người lái xe phải quan sát xe phía trước để bảo đảm an toàn'], 'Phải cho xe đi trong một làn đường và chỉ được chuyển làn đường ở những nơi cho phép; khi chuyển làn phải có tín hiệu báo trước và phải bảo đảm an toàn');
INSERT INTO "questions" VALUES (48, 'A1', 'TEXT', 'NO', 'Trên đường một chiều có vạch kẻ phân làn đường, xe thô sơ và xe cơ giới phải đi như thế nào là đúng quy tắc giao thông?', ARRAY ['Xe thô sơ phải đi trên làn đường bên trái ngoài cùng, xe cơ giới, xe máy chuyên dùng đi trên làn đường bên phải','Xe thô sơ phải đi trên làn đường bên phải trong cùng, xe cơ giới, xe máy chuyên dùng đi trên làn đường bên trái','Xe thô sơ đi trên làn đường phù hợp không gây cản trở giao thông, xe cơ giới, xe máy chuyên dùng đi trên làn đường bên phải'], 'Xe thô sơ phải đi trên làn đường bên phải trong cùng, xe cơ giới, xe máy chuyên dùng đi trên làn đường bên trái');
INSERT INTO "questions" VALUES (49, 'A1', 'TEXT', 'NO', 'Bạn đang lái xe trong khu vực đô thi từ 22 giờ đến 5 giờ sáng hôm sau và cần vượt một xe khác, bạn cần báo hiệu như thế nào để đảm bảo an toàn giao thông?', ARRAY ['Phải báo hiệu bằng đèn hoặc còi','Chỉ được báo hiệu bằng còi','Phải báo hiệu bằng cả còi và đèn','Chỉ báo hiệu bằng đèn'], 'Chỉ báo hiệu bằng đèn');
INSERT INTO "questions" VALUES (50, 'A1', 'TEXT', 'NO', 'Khi điều khiển xe chạy trên đường biết có xe sau xin vượt nếu đủ điều kiện an toàn người lái xe phải làm gì?', ARRAY ['Tăng tốc độ và ra hiệu cho xe sau vượt, không được gây trở ngại cho xe sau vượt','Người điều khiển phương tiện phía trước phải giảm tốc độ, đi sát về bên phải của phần đường xe chạy cho đến khi xe sau đã vượt qua, không được gây trở ngại cho xe sau vượt','Cho xe tránh về bên trái mình và ra hiệu cho xe sau vượt; nếu có chướng ngại vật phía trước hoặc thiếu điều kiện an toàn chưa cho vượt được phải ra hiệu cho xe sau biết; cấm gây trở ngại cho xe xin vượt'], 'Người điều khiển phương tiện phía trước phải giảm tốc độ, đi sát về bên phải của phần đường xe chạy cho đến khi xe sau đã vượt qua, không được gây trở ngại cho xe sau vượt');
INSERT INTO "questions" VALUES (190, 'A1', 'IMAGE', 'NO', 'Theo tín hiệu đèn của xe cơ giới, xe nào vi phạm quy tắc giao thông?', ARRAY ['Xe mô tô','Xe ô tô con','Không xe nào vi phạm', 'Cả hai xe'], 'Cả hai xe');
INSERT INTO "questions" VALUES (191, 'A1', 'IMAGE', 'NO', 'Các xe đi theo hướng mũi tên, xe nào vi phạm quy tắc giao thông?', ARRAY ['Xe con','Xe tải','Xe con, xe tải'], 'Xe tải');
INSERT INTO "questions" VALUES (192, 'A1', 'IMAGE', 'NO', 'Các xe đi theo hướng mũi tên, xe nào vi phạm quy tắc giao thông?', ARRAY ['Xe tải, xe con','Xe khách, xe con','Xe khách, xe tải'], 'Xe khách, xe tải');
INSERT INTO "questions" VALUES (193, 'A1', 'IMAGE', 'NO', 'Các xe đi theo hướng mũi tên, xe nào vi phạm quy tắc giao thông?', ARRAY ['Xe con, xe khách, xe tải','Xe tải, xe khách, xe mô tô','Xe khách, xe mô tô, xe con', 'Cả bốn xe'], 'Xe tải, xe khách, xe mô tô');
INSERT INTO "questions" VALUES (194, 'A1', 'IMAGE', 'NO', 'Các xe đi theo hướng mũi tên, xe nào chấp hành đúng quy tắc giao thông?', ARRAY ['Xe tải, mô tô','Xe khách, mô tô','Xe tải, xe con','Mô tô, xe con'], 'Xe khách, mô tô');
INSERT INTO "questions" VALUES (195, 'A1', 'IMAGE', 'NO', 'Các xe đi theo thứ tự nào là đúng quy tắc giao thông đường bộ?', ARRAY ['Xe của bạn, mô tô, xe con','Xe con, xe của bạn, mô tô','Mô tô, xe con, xe của bạn'], 'Mô tô, xe con, xe của bạn');
INSERT INTO "questions" VALUES (196, 'A1', 'IMAGE', 'NO', 'Các xe đi theo thứ tự nào là đúng quy tắc giao thông đường bộ?', ARRAY ['Xe của bạn, mô tô, xe con','Xe con, xe của bạn, mô tô','Mô tô, xe con, xe của bạn'], 'Xe con, xe của bạn, mô tô');
INSERT INTO "questions" VALUES (197, 'A1', 'IMAGE', 'NO', 'Bạn xử lý như thế nào trong trường hợp này?', ARRAY ['Tăng tốc độ, rẽ phải trước xe tải và xe đạp','Giảm tốc độ, rẽ phải sau xe tải và xe đạp','Tăng tốc độ, rẽ phải trước xe đạp'], 'Giảm tốc độ, rẽ phải sau xe tải và xe đạp');
INSERT INTO "questions" VALUES (198, 'A1', 'IMAGE', 'NO', 'Xe nào dừng đúng theo quy tắc giao thông?', ARRAY ['Xe con','Xe mô tô','Cả hai xe đều đúng'], 'Xe con');
INSERT INTO "questions" VALUES (199, 'A1', 'IMAGE', 'NO', 'Xe của bạn đang di chuyển gần đến khu vực giao cắt với đường sắt, khi rào chắn đang dịch chuyển, bạn điều khiển xe như thế nào là đúng quy tắc giao thông?', ARRAY ['Quan sát nếu thấy không có tàu thì tăng tốc cho xe vượt qua đường sắt','Dừng lại trước rào chắn một khoảng cách an toàn','Ra tín hiệu, yêu cầu người gác chắn tàu kéo chậm Barie để xe bạn qua'], 'Dừng lại trước rào chắn một khoảng cách an toàn');
INSERT INTO "questions" VALUES (200, 'A1', 'IMAGE', 'NO', 'Trong tình huống dưới đây, xa đầu kéo kéo rơ moóc (xe container) đang rẽ phải, xe con màu xanh và xe máy phía sau xe container đi như thế nào để đảm bảo an toàn?', ARRAY ['Vượt về phía bên phải để đi tiếp','Giảm tốc độ chờ xe container rẽ xong rồi tiếp tục đi','Vượt về phía bên trái để đi tiếp'], 'Giảm tốc độ chờ xe container rẽ xong rồi tiếp tục đi');
COMMIT;

-- ----------------------------
-- Primary Key structure for table questions
-- ----------------------------
ALTER TABLE "questions" ADD CONSTRAINT "PK_Questions" PRIMARY KEY ("id");