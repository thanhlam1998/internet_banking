# Internet Banking

![Badge](https://gitlab.com/khuedoan/internet-banking/badges/master/pipeline.svg)

## Mục lục

- [Internet Banking](#internet-banking)
  - [Mục lục](#mục-lục)
  - [Thuật toán bảo mật API](#thuật-toán-bảo-mật-api)
  - [Hướng dẫn sử dụng api](#hướng-dẫn-sử-dụng-api)
    - [API dành cho partner](#api-dành-cho-partner)
      - [Lấy thông tin tài khoản khách hàng bằng số tài khoản](#lấy-thông-tin-tài-khoản-khách-hàng-bằng-số-tài-khoản)
      - [Nạp tiền vào tài khoản](#nạp-tiền-vào-tài-khoản)
      - [Rút tiền từ tài khoản](#rút-tiền-từ-tài-khoản)
    - [API dành cho customer](#api-dành-cho-customer)
      - [Đăng Nhập](#đăng-nhập)
      - [Lấy tên khách hàng bằng số  tài khoản tín dụng](#lấy-tên-khách-hàng-bằng-số-tài-khoản-tín-dụng)
      - [Lấy toàn bộ danh sách tài khoản (credit + saving)](#lấy-toàn-bộ-danh-sách-tài-khoản-credit--saving)
      - [Xem lịch sử giao dịch](#xem-lịch-sử-giao-dịch)
      - [Chuyển khoản](#chuyển-khoản)
      - [Xác thực mã otp](#xác-thực-mã-otp)
      - [Reset mật khẩu](#reset-mật-khẩu)
      - [Xác thực otp đổi mật khẩu](#xác-thực-otp-đổi-mật-khẩu)
      - [Đổi mật khẩu](#đổi-mật-khẩu)
      - [CRUD thông tin gợi nhớ](#crud-thông-tin-gợi-nhớ)
        - [Xem thông tin gợi nhớ](#xem-thông-tin-gợi-nhớ)
        - [Tạo thông tin gợi nhớ](#tạo-thông-tin-gợi-nhớ)
        - [Xóa thông tin gợi nhớ](#xóa-thông-tin-gợi-nhớ)
        - [Chỉnh sửa thông tin gợi nhớ](#chỉnh-sửa-thông-tin-gợi-nhớ)
      - [Ghi nợ](#ghi-nợ)
        - [Thêm nợ](#thêm-nợ)
        - [Xóa nợ](#xóa-nợ)
        - [Lấy danh sách người nợ](#lấy-danh-sách-người-nợ)
        - [Lấy danh sách bị nợ](#lấy-danh-sách-bị-nợ)
    - [API dành cho employee](#api-dành-cho-employee)
      - [Đăng Nhập](#đăng-nhập-1)
      - [Thêm thông tin khách hàng vào hệ thống](#thêm-thông-tin-khách-hàng-vào-hệ-thống)
      - [Thêm tài khoản tiết kiệm](#thêm-tài-khoản-tiết-kiệm)
      - [Nạp tiền vào tài khoản khách hàng](#nạp-tiền-vào-tài-khoản-khách-hàng)
      - [Liệt kê lịch sử giao dịch của một khách hàng nhất định](#liệt-kê-lịch-sử-giao-dịch-của-một-khách-hàng-nhất-định)
      - [Tạo mới access_token cho employee](#tạo-mới-access_token-cho-employee)
    - [API dành cho admin](#api-dành-cho-admin)
      - [Đăng Nhập](#đăng-nhập-2)
      - [Thêm thông tin partner vào hệ thống](#thêm-thông-tin-partner-vào-hệ-thống)
      - [Tạo tài khoản employee](#tạo-tài-khoản-employee)
      - [Xóa tài khoản employee](#xóa-tài-khoản-employee)
      - [Cập nhật username của employee](#cập-nhật-username-của-employee)
      - [Cập nhật password của employee](#cập-nhật-password-của-employee)
      - [Liệt kê danh sách employee](#liệt-kê-danh-sách-employee)
      - [Lấy thông tin employee thông qua ID](#lấy-thông-tin-employee-thông-qua-id)
      - [Lấy lịch sử giao dịch với ngân hàng khác](#lấy-lịch-sử-giao-dịch-với-ngân-hàng-khác)
      - [Tạo mới access_token cho admin](#tạo-mới-access_token-cho-admin)
  - [Một số thông tin mặc định được khởi tạo cùng với project, dùng để test api](#một-số-thông-tin-mặc-định-được-khởi-tạo-cùng-với-project-dùng-để-test-api)
    - [Danh sách tài khoản có sẵn](#danh-sách-tài-khoản-có-sẵn)
    - [Thông tin khách hàng](#thông-tin-khách-hàng)
    - [Partner](#partner)
  - [Danh sách các ngân hàng  liên  kết](#danh-sách-các-ngân-hàng-liên-kết)
    - [Ngân hàng đại diện nhóm chẵn (PGP)](#ngân-hàng-đại-diện-nhóm-chẵn-pgp)
    - [Ngân hàng đại diện nhóm lẻ (RSA)](#ngân-hàng-đại-diện-nhóm-lẻ-rsa)
    - [Cách sử dụng api của ngân hàng RSA](#cách-sử-dụng-api-của-ngân-hàng-rsa)
      - [Lấy thông tin tài khoản khách hàng bằng số tài khoản rsa](#lấy-thông-tin-tài-khoản-khách-hàng-bằng-số-tài-khoản-rsa)
      - [Nạp tiền vào tài khoản rsa](#nạp-tiền-vào-tài-khoản-rsa)
  - [DevOps](#devops)
    - [Môi trường lập trình local với Docker Compose](#môi-trường-lập-trình-local-với-docker-compose)
    - [Tạo Kubernetes cluster trên GCP bằng Terraform](#tạo-kubernetes-cluster-trên-gcp-bằng-terraform)
    - [Deploy lên Kubernetes cluster trên Google Cloud](#deploy-lên-kubernetes-cluster-trên-google-cloud)
    - [GitlabCI](#gitlabci)
  - [Database diagram](#database-diagram)
  - [Trang web hữu ích](#trang-web-hữu-ích)

## Thuật toán bảo mật API

- encode sử dụng **base64** cho chuỗi hash và signature
- Signature sử dụng **rsa-sha256**, ví dụ chương trình tạo signature và verify bằng nodejs

```js
const crypto = require('crypto');
const fs = require('fs');

function RSASign(privateKey, data) {
  const sign = crypto.createSign('RSA-SHA256')
  const signature = sign.update(data).sign(privateKey, 'base64');
  console.log(signature);
  return signature;
}

function RSAVerify(publicKey, signature, data) {
  const verify = crypto.createVerify('RSA-SHA256');
  verify.update(data);
  console.log(verify.verify(publicKey, signature, 'base64'));
}

const privateKey = fs.readFileSync('linh.private.key');
const publicKey = fs.readFileSync('linh.public.key');

var dataToSign = '1589520986kQYtFpj7pJfi5VVfoeGD{"credit_number":"565572661049","amount":200000}';
var signature = RSASign(privateKey, dataToSign);
RSAVerify(publicKey, signature, dataToSign);
```

```html
OUTPUT
EpQlSKV/gkr41Y1I3XmyBtdxS51l3po1QZA19X2CQm6jSKkLecVVrlr6SNrXPSLMeRp+dBEdI+XIdwynTaiyrCY53MF/vm6cJAZ3ZkUb9a5p9nv3Qq4NzRTEJkZApviU7FZBbfxsV5wsqesTHtKeMGF9K5nh0sq5CXowGkwxtR8=
true
```

- Hash algo (cho **secret_text**) sử dụng **sha256**, ví dụ chương trình tạo chuỗi hash bằng nodejs

```js
const crypto = require('crypto');

const dataToHash = '1589520986kQYtFpj7pJfi5VVfoeGD{"credit_number":"565572661049","amount":200000}';
let hashString = crypto.createHash('sha256').update(dataToHash).digest('base64');
console.log(hashString);
```

```html
OUTPUT
d1JAmSmW2fXBElQ/NjXT7Yk+xQM1oWthn0iItHfL0io=
```

- Ví dụ cách encode and decode base64 bằng nodejs

```js
console.log(Buffer.from("Hello World").toString('base64'));
console.log(Buffer.from("SGVsbG8gV29ybGQ=", 'base64').toString('ascii'))
```

```html
OUTPUT
SGVsbG8gV29ybGQ=
Hello World
```

## Hướng dẫn sử dụng api

### API dành cho partner

#### Lấy thông tin tài khoản khách hàng bằng số tài khoản

```json
GET /api/partner/get-account-info?credit_number=565572661049

HEADER
"partner-code": "linh"
"timestamp": 1589520986
"authen-hash": "BNAX7ITAnYu8rVliY5b6z4Waxs2GMk64FZd+ivBmNMo="

```

- timestamp là thời điểm gởi request, format sử dụng unix utc second, có thể  xem ở <https://www.epochconverter.com/,> lưu ý timestamp không được **lớn hơn** hoặc nhỏ hơn quá **60**s so với thời gian thực
- partner-code là chuỗi code để xác định partner nào đã đăng kí api
- authen-hash là chuỗi hash sha256 của **timestamp+secret+body**, nếu body empty thì là **{}**,sau đó được encode base64 lại và gửi đi, ví dụ ở trên
- Không yêu cầu **authen-sig**

#### Nạp tiền vào tài khoản

```json
POST /api/partner/deposit

HEADER
"partner-code": "linh"
"timestamp": 1589520986
"authen-hash": "d1JAmSmW2fXBElQ/NjXT7Yk+xQM1oWthn0iItHfL0io="
"authen-sig": "EpQlSKV/gkr41Y1I3XmyBtdxS51l3po1QZA19X2CQm6jSKkLecVVrlr6SNrXPSLMeRp+dBEdI+XIdwynTaiyrCY53MF/vm6cJAZ3ZkUb9a5p9nv3Qq4NzRTEJkZApviU7FZBbfxsV5wsqesTHtKeMGF9K5nh0sq5CXowGkwxtR8="

BODY
{"credit_number":"565572661049","amount":200000}
```

- authen-sig là chuỗi signature được tạo bởi thuật toán **RSA-SHA256** của chuỗi **timestamp+secret+body**, xem ví dụ ở trên
  
#### Rút tiền từ tài khoản

```json
POST /api/partner/withdraw

HEADER
"partner-code": "linh"
"timestamp": 1589520986
"authen-hash": "d1JAmSmW2fXBElQ/NjXT7Yk+xQM1oWthn0iItHfL0io="
"authen-sig": "EpQlSKV/gkr41Y1I3XmyBtdxS51l3po1QZA19X2CQm6jSKkLecVVrlr6SNrXPSLMeRp+dBEdI+XIdwynTaiyrCY53MF/vm6cJAZ3ZkUb9a5p9nv3Qq4NzRTEJkZApviU7FZBbfxsV5wsqesTHtKeMGF9K5nh0sq5CXowGkwxtR8="

BODY
{"credit_number":"565572661049","amount":200000}
```

### API dành cho customer

#### Đăng Nhập

```json
POST /api/customer/login

BODY
{
    "username": "linh",
    "password": "linh"
}
```

- Hệ thống sẽ trả lại access token, dùng access_token để  xác thực danh tính user

#### Lấy tên khách hàng bằng số  tài khoản tín dụng

```json
GET /api/customer/get-credit-info?credit_number=565572661049

HEADER
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6MSwiaWF0IjoxNTkwODQ4NTQ3LCJleHAiOjE1OTA4NTQ1NDd9.F_IHlYq9QbpbJ5YmOVFrseZyqQaWzwBSYniZg8Ykdts"
```

#### Lấy toàn bộ danh sách tài khoản (credit + saving)

```json
GET /api/customer/get-list-account

HEADER
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6MSwiaWF0IjoxNTkwODQ4NTQ3LCJleHAiOjE1OTA4NTQ1NDd9.F_IHlYq9QbpbJ5YmOVFrseZyqQaWzwBSYniZg8Ykdts"
```

#### Xem lịch sử giao dịch

```json
GET /api/customer/transaction-history

HEADER
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6MSwiaWF0IjoxNTkwODQ4NTQ3LCJleHAiOjE1OTA4NTQ1NDd9.F_IHlYq9QbpbJ5YmOVFrseZyqQaWzwBSYniZg8Ykdts"
```

#### Chuyển khoản

```json
POST /api/customer/transfer-fund

HEADER
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6MSwiaWF0IjoxNTkwODQ4NTQ3LCJleHAiOjE1OTA4NTQ1NDd9.F_IHlYq9QbpbJ5YmOVFrseZyqQaWzwBSYniZg8Ykdts"

BODY
{
    "target_fullname": "nguyen van linh",
    "from_credit_number": "025917154505",
    "to_credit_number": "565572661049",
    "amount": 10000,
    "fee_payer": "sender",
    "partner_code": "local",
    "message": "hello dude"
}
```

- Nếu yêu cầu chuyển khoản thành công, mã otp sẽ được gửi vào email của customer yêu cầu chuyển khoản
- API trả về transaction_id

#### Xác thực mã otp

```json
POST /api/customer/verify-otp

HEADER
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6MSwiaWF0IjoxNTkwODQ4NTQ3LCJleHAiOjE1OTA4NTQ1NDd9.F_IHlYq9QbpbJ5YmOVFrseZyqQaWzwBSYniZg8Ykdts"

BODY
{
    "transaction_id": 12,
    "otp": "019628"
}
```

#### Reset mật khẩu

```json
POST /api/customer/reset-password

BODY
{
    "username": "linh",
    "identity_number": "025895863"
}
```

- Hệ thống sẽ trả về reset_id và mã otp được gửi vào email customer yêu cầu đổi mật khẩu

#### Xác thực otp đổi mật khẩu

```json
POST /api/customer/verify-otp-resetpass

BODY
{
    "reset_id": 1,
    "otp": "448890"
}
```

#### Đổi mật khẩu

```json
POST /api/customer/change-password

HEADER
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6MSwiaWF0IjoxNTkxOTQ1OTE0LCJleHAiOjE1OTE5NTE5MTR9.JRYklbQtj-jCvEXWj1109RfdZtHrecZYBBjrTHJuH8Y"

BODY
{
    "old_password": "noob",
    "new_password": "linh",
    "confirm_new_password": "linh"
}

```

#### CRUD thông tin gợi nhớ

```json
POST /api/customer/remind-list

HEADER
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6MSwiaWF0IjoxNTkxOTQ1OTE0LCJleHAiOjE1OTE5NTE5MTR9.JRYklbQtj-jCvEXWj1109RfdZtHrecZYBBjrTHJuH8Y"
```

##### Xem thông tin gợi nhớ

```json
GET /api/customer/remind-list

HEADER
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6MSwiaWF0IjoxNTkxOTQ1OTE0LCJleHAiOjE1OTE5NTE5MTR9.JRYklbQtj-jCvEXWj1109RfdZtHrecZYBBjrTHJuH8Y"
```

##### Tạo thông tin gợi nhớ

```json
POST /api/customer/remind-list

HEADER
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6MSwiaWF0IjoxNTkxOTQ1OTE0LCJleHAiOjE1OTE5NTE5MTR9.JRYklbQtj-jCvEXWj1109RfdZtHrecZYBBjrTHJuH8Y"

BODY
{
    "credit_number": "27893492732",
    "remind_name": "dmdcs",
    "partner_code": "hcmbank"
}
```

##### Xóa thông tin gợi nhớ

```json
DELETE /api/customer/remind-list

HEADER
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6MSwiaWF0IjoxNTkxOTQ1OTE0LCJleHAiOjE1OTE5NTE5MTR9.JRYklbQtj-jCvEXWj1109RfdZtHrecZYBBjrTHJuH8Y"

BODY
{
    "remind_id": 1
}
```

##### Chỉnh sửa thông tin gợi nhớ

```json
POST /api/customer/remind-list

HEADER
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6MSwiaWF0IjoxNTkxOTQ1OTE0LCJleHAiOjE1OTE5NTE5MTR9.JRYklbQtj-jCvEXWj1109RfdZtHrecZYBBjrTHJuH8Y"

BODY
{
    "remind_id": 1,
    "credit_number": "1111111111",
    "remind_name": "idkwtfigo",
    "partner_code": "changed"
}
```

#### Ghi nợ

##### Thêm nợ

```json
POST /api/customer/add-debt

HEADER
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6MSwiaWF0IjoxNTkxOTQ1OTE0LCJleHAiOjE1OTE5NTE5MTR9.JRYklbQtj-jCvEXWj1109RfdZtHrecZYBBjrTHJuH8Y"

BODY
{
    "debtor_credit": "565572661049",
    "amount": 500000,
    "content": "fuck this shit"
}
```

##### Xóa nợ

```json
PUT /api/customer/remove-debt

HEADER
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6MSwiaWF0IjoxNTkxOTQ1OTE0LCJleHAiOjE1OTE5NTE5MTR9.JRYklbQtj-jCvEXWj1109RfdZtHrecZYBBjrTHJuH8Y"

BODY
{
    "debt_id": 1
}
```

##### Lấy danh sách người nợ

```json
GET /api/customer/debts

HEADER
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6MSwiaWF0IjoxNTkxOTQ1OTE0LCJleHAiOjE1OTE5NTE5MTR9.JRYklbQtj-jCvEXWj1109RfdZtHrecZYBBjrTHJuH8Y"
```

##### Lấy danh sách bị nợ

```json
GET /api/customer/bedebts

HEADER
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6MSwiaWF0IjoxNTkxOTQ1OTE0LCJleHAiOjE1OTE5NTE5MTR9.JRYklbQtj-jCvEXWj1109RfdZtHrecZYBBjrTHJuH8Y"
```

### API dành cho employee

#### Đăng Nhập

```json
POST /api/employee/login

BODY
{
    "username": "trump",
    "password": "idiot"
}
```

- Hệ thống sẽ trả lại access token, dùng access_token để xác thực danh tính employee

#### Thêm thông tin khách hàng vào hệ thống

```json
POST /api/employee/add-customer

HEADER
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MSwiaWF0IjoxNTkyNzI2NTcyLCJleHAiOjE1OTI3MzI1NzJ9.AKHVQtvtqhPqWqfuOV6HjSBRkNDn7RDOBnLm9gyT9P0"

BODY
{
    "username": "linh",
    "password": "linh",
    "identity_number": "025895863",
    "phone_number": "0704468257",
    "firstname": "linh",
    "lastname": "nguyen van",
    "date_of_birth": "1998-11-12",
    "email_address": "linh1612340@gmail.com"
}
```

#### Thêm tài khoản tiết kiệm

```json
POST /api/employee/add-saving-account

HEADER
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MSwiaWF0IjoxNTkyNzI2NTcyLCJleHAiOjE1OTI3MzI1NzJ9.AKHVQtvtqhPqWqfuOV6HjSBRkNDn7RDOBnLm9gyT9P0"

BODY
{
    "customer_id": 1,
    "balance": 1000000
}
```

#### Nạp tiền vào tài khoản khách hàng

```json
POST /api/employee/deposit-customer-credit

HEADER
"acess-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MSwiaWF0IjoxNTkyNzMzNzYxLCJleHAiOjE1OTI3Mzk3NjF9.T_ieKGILrdE7YhZVyb0qIRQAque7ktPzcTVZ7Qk-6Ew"

BODY
{
  "credit_number": "025917154505",
  "amount": 200000
}
```

#### Liệt kê lịch sử giao dịch của một khách hàng nhất định

```json
GET /api/employee/get-customer-transactions?credit_number=025917154505

HEADER
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6MSwiaWF0IjoxNTkyNzI0OTYyLCJleHAiOjE1OTI3MzA5NjJ9.TQKAStKk_XbFc3kNmGFP4kkXaXYzNl1LjkrGpuWn9co"
```

#### Tạo mới access_token cho employee

```json
GET /api/employee/refresh-jwt

HEADER
"refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MSwiaWF0IjoxNTk1NzI4MzU1LCJleHAiOjE1OTgzMjAzNTV9.-WKjHKpq_ZeSifKT7AX_dzyLvmdZDeFKqWPBEHuyqz4"
```

### API dành cho admin

#### Đăng Nhập

```json
POST /api/admin/login

BODY
{
    "username": "admin",
    "password": "admin"
}
```

- Hệ thống sẽ trả lại access token, dùng access_token để xác thực danh tính admin

#### Thêm thông tin partner vào hệ thống

```json
POST /api/admin/add-partner

HEADER
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6MSwiaWF0IjoxNTkyNzI0OTYyLCJleHAiOjE1OTI3MzA5NjJ9.TQKAStKk_XbFc3kNmGFP4kkXaXYzNl1LjkrGpuWn9co"

BODY
{
    "partner_code": "bankdbb",
    "bankname": "bankdbb",
    "public_key": "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlHZk1BMEdDU3FHU0liM0RRRUJBUVVBQTRHTkFEQ0JpUUtCZ1FDRVVaSnd2VFlvcnVzdFFZK0YzaXFoSmUrTQordmsxMFYxZ2QrdFhBVDVlUTZCZngvRU9FRW9GaXduSC9JNUttUngzRDNhMkdIZ1dZSUxEbkNWbzVLbjZISC9SCkl1dmkxMXJsdks1Qzc5OFdZUmp2TmtPbGNmSTNNNml4UWYrZkFKU25mbE9xQ2NvUHAvUk0wSGdjeXdvVGtOV0sKUFFZcFBwazl0bm8vcWxPY3d3SURBUUFCCi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQ==",
    "partner_secret": "bankdbb"
}
```

- Hệ thống sẽ tự động tạo 1 bank_secret trả về

#### Tạo tài khoản employee

```json
POST /api/admin/add-employee

HEADER
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6MSwiaWF0IjoxNTkyNzI0OTYyLCJleHAiOjE1OTI3MzA5NjJ9.TQKAStKk_XbFc3kNmGFP4kkXaXYzNl1LjkrGpuWn9co"

BODY
{
    "username": "trump",
    "password": "idiot"
}
```

- Hệ thống sẽ tự động tạo 1 bank_secret trả về

#### Xóa tài khoản employee

```json
POST /api/admin/delete-employee

HEADER
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6MSwiaWF0IjoxNTkyNzI0OTYyLCJleHAiOjE1OTI3MzA5NjJ9.TQKAStKk_XbFc3kNmGFP4kkXaXYzNl1LjkrGpuWn9co"

BODY
{
    "employee_id": "3"
}
```

- Hệ thống sẽ trả về kết quả của database, ví dụ:

```json
{
  "fieldCount": 0,
  "affectedRows": 1,
  "insertId": 0,
  "serverStatus": 2,
  "warningCount": 0,
  "message": "",
  "protocol41": true,
  "changedRows": 0
}
```

Với affectedRows là 1, tức là đã xóa.

#### Cập nhật username của employee

```json
POST /api/admin/update-employee-username

HEADER
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6MSwiaWF0IjoxNTkyNzI0OTYyLCJleHAiOjE1OTI3MzA5NjJ9.TQKAStKk_XbFc3kNmGFP4kkXaXYzNl1LjkrGpuWn9co"

BODY
{
    "employee_id": "3",
    "username": "newname"
}
```

Hệ thống sẽ trả về kết quả từ database tương tự như trên.

#### Cập nhật password của employee

```json
POST /api/admin/update-employee-password

HEADER
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6MSwiaWF0IjoxNTkyNzI0OTYyLCJleHAiOjE1OTI3MzA5NjJ9.TQKAStKk_XbFc3kNmGFP4kkXaXYzNl1LjkrGpuWn9co"

BODY
{
    "employee_id": "3",
    "password": "newpassword"
}
```

Hệ thống sẽ trả về kết quả từ database tương tự như trên.

#### Liệt kê danh sách employee

```json
GET /api/admin/employee-list

HEADER
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6MSwiaWF0IjoxNTkyNzI0OTYyLCJleHAiOjE1OTI3MzA5NjJ9.TQKAStKk_XbFc3kNmGFP4kkXaXYzNl1LjkrGpuWn9co"
```

- Hệ thống sẽ trả về danh sách tất cả employee dưới dạng JSON

#### Lấy thông tin employee thông qua ID

```json
GET /api/admin/get-employee-info?employee_id=<ID của employee>

HEADER
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6MSwiaWF0IjoxNTkyNzI0OTYyLCJleHAiOjE1OTI3MzA5NjJ9.TQKAStKk_XbFc3kNmGFP4kkXaXYzNl1LjkrGpuWn9co"
```

Hệ thống sẽ trả về thông tin của employee duới dạng JSON, ví dụ:

```json
[
  {
    "username": "obama",
    "employee_id": 5,
    "hashed_password": "$2a$08$nLoMEK84g.U4JPuvjLKisu3Nl6Pt/tEVpX6VerU0kiEW6yDggD51a",
    "refresh_secret": "rQFn3MSsYZN2UzK8idJv"
  }
]
```

#### Lấy lịch sử giao dịch với ngân hàng khác

```json
GET /api/admin/get-interbank-transaction

HEADER
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6MSwiaWF0IjoxNTk1Njg3ODU4LCJleHAiOjE1OTU2OTM4NTh9._oPBPuPHot9dIgT7G8OonycB9rKLxfdA6Y8XuIVeUjY"

```

#### Tạo mới access_token cho admin

```json
GET /api/admin/refresh-jwt

HEADER
"refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6MSwiaWF0IjoxNTk1NzI3Nzk3LCJleHAiOjE1OTgzMTk3OTd9.370YsMDL7s6qLV9m9Qwx8FodfS_XDu8TzGHW2N2x4Ro"
```

## Một số thông tin mặc định được khởi tạo cùng với project, dùng để test api

### Danh sách tài khoản có sẵn

**Customer**

| Username      | Password      | Credit Number |
| :------------ | :------------ | :------------ |
| donaldtrump   | donaldtrump   | 625262950070  |
| barackobama   | barackobama   | 413951248131  |
| georgebush    | georgebush    | 400570008578  |
| billclinton   | billclinton   | 317616012583  |
| ronaldreagan  | ronaldreagan  | 821070931989  |
| jimmycarter   | jimmycarter   | 752756900169  |
| geraldford    | geraldford    | 597909357040  |
| richardnixon  | richardnixon  | 156395860413  |
| lyndonjohnson | lyndonjohnson | 107837111136  |
| johnkennedy   | johnkennedy   | 134965984343  |

**Employee**

| Username   | Password   |
| :--------- | :--------- |
| linhnguyen | linhnguyen |
| lamnguyen  | lamnguyen  |
| khuedoan   | khuedoan   |

**Admin**

| Username | Password |
| :------- | :------- |
| admin    | admin    |

### Thông tin khách hàng

- Thông tin khách hàng linh

```json
{
    "customer_id": 1,
    "username": "linh",
    "password": "linh",
    "identity_number": "025895863",
    "phone_number": "0704468257",
    "firstname": "LINH",
    "lastname": "NGUYEN VAN",
    "date_of_birth": "1998-11-12",
    "email_address": "linh1612340@gmail.com",
    "refresh_secret": "5FmWSukHG8PapSAcGrNS"
}
```

- credit account gắn liền với khách hàng

```json
{
    "customer_id": 1,
    "credit_number": "565572661049",
    "balance": 100000,
    "status": 1
}
```

### Partner

- Thông tin partner linh mặc định, public key ở dạng **base64**

```json
{
    "partner_id": 1,
    "partner_code": "linh",
    "bankname": "linhbank",
    "public_key": "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlHZk1BMEdDU3FHU0liM0RRRUJBUVVBQTRHTkFEQ0JpUUtCZ1FDSmxRWi9tMStpTGZLL2xwWURtaWNsZTZ2MApsbExXdGRZaFNrSDZidWlPck5iYVhWSC8vWmNHOVRwT0xVMXZMK1BrdnByQ1ovTjFTdHF6MHhOcnpjZFQwekZJCnhRU3IzMWZCMXF6RDIrVDRuakJjR1JPU3R2MHV4aGFhcm1XVkp3akxpYTBybEw3Z3JSTDBheHc0ckVTTTluc04KYmU4WG5KR1ZLdEZ5OU1YSEJ3SURBUUFCCi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQ==",
    "bank_secret": "kQYtFpj7pJfi5VVfoeGD",
    "partner_secret": "idk"
}
```

- partner linh public key

```html
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJlQZ/m1+iLfK/lpYDmicle6v0
llLWtdYhSkH6buiOrNbaXVH//ZcG9TpOLU1vL+PkvprCZ/N1Stqz0xNrzcdT0zFI
xQSr31fB1qzD2+T4njBcGROStv0uxhaarmWVJwjLia0rlL7grRL0axw4rESM9nsN
be8XnJGVKtFy9MXHBwIDAQAB
-----END PUBLIC KEY-----
```

- partner linh secret key

```html
-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgGFkPDYzYPPrWGryFdZXEXtjRFlBycKW/cAdiBLUCcNQMYgyB3Kc
+oPRy7TV17xsuZC8qovx6P1XT9CXOHg63j1bJtyEQRkCXr/V2l2tkJxtjcHYjtDd
j2uupLYqodZ3Sb+UMi0LkRdk8fVE+taVk/Fn6ny/lLvcRhNPb01/yevBAgMBAAEC
gYA88EoYo/djSHwvlsCBOEOxEADhVJ/ZCT9HaXMOTOy68D+994ffeEfsGWa8BR4T
QXivDs4r+LcPZgWEAEsON898j83HjClnvpAKPzPwuJch+fQz26DPau6UQWdfMm5q
1GVx1yYOujjwi2gETb1hGlhagiZV1X+APm84bry7knDgAQJBALFqWZqFjGBUO2ro
liFsnY52vtl/xdfTwRqhwW98uEfi9xiM8D634abaYWlGAOZDDOpSgvxRgoKsxqF6
lrYvbUECQQCMh76mrbjYTh9DeEaPlNGfcWvwgKZggpsKNAiNoxpcBglS2WJ67psH
yQgx7AQgg7XMGsNetQa7xVGPyhxoRl6BAkB72kl5NNfde5ALPxlndgK7rKvo/Gjq
FZqN8/Qs1z1yecCT8/fXYNj3eSZdro/8Lzy57CYi7OgWP3Vez0ydHJjBAkAzcqro
qKcIgalOcSUcAbawsbx7ow3GPWp3VM9g0zqeQBN/wlgce2hEdGPMqwRjxvRykcW+
0XVynu2aP7sgrcqBAkEAsIWp2vZJvbJnqHoJX0qEQECEVj49PmscBpKIJZZL8FVf
gP78h6zdxHh1xq/oLavoZue7xpP6nFMQmRrqPek8+A==
-----END RSA PRIVATE KEY-----
```

- bank RSA public key

```html
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJlQZ/m1+iLfK/lpYDmicle6v0
llLWtdYhSkH6buiOrNbaXVH//ZcG9TpOLU1vL+PkvprCZ/N1Stqz0xNrzcdT0zFI
xQSr31fB1qzD2+T4njBcGROStv0uxhaarmWVJwjLia0rlL7grRL0axw4rESM9nsN
be8XnJGVKtFy9MXHBwIDAQAB
-----END PUBLIC KEY-----
```

- bank RSA secret key

```html
-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQCJlQZ/m1+iLfK/lpYDmicle6v0llLWtdYhSkH6buiOrNbaXVH/
/ZcG9TpOLU1vL+PkvprCZ/N1Stqz0xNrzcdT0zFIxQSr31fB1qzD2+T4njBcGROS
tv0uxhaarmWVJwjLia0rlL7grRL0axw4rESM9nsNbe8XnJGVKtFy9MXHBwIDAQAB
AoGAFxRq3KlB58DxgfZPABeyDXWrqQI2r1Ids8PzQYGtfZG9ETCqetkdpssolsi+
vrI39r2K1KX/j2OZQKVeEq2YjFR+etusQzCRF6jqbk5O+/ajLL4veyxKQmTQXDVx
DwjsRDc1MvMsfqmnk5b0uYs9ntnT/iaqkLVtEwKMpnjFW/ECQQDvfz1wpjRKCduV
sdaH1JxqKw2mYu79Cyp7LkHKz0fvfg6SP7EAPt4j7dlBuA0n99OAklcvtfVpiXF3
rQOauC99AkEAkw/+JX4dfvGXOQ+fZerFamOUjVLEhH7I19wrHU4y56SDC2uQ1Q9n
xvxH81CxFTN7HXOKQ8uFNY06kyfzWNif0wJAd+dhMEPVy/eReymU+V4ljTXO2K2R
bxinBRLMl6gdILcgvnGqwS+4cY6EBdYKqCb4OdeKVPWpT1QjfcIeGtj51QJAMZgC
F/i4z7d/TOHk2kTbAG7GiQYxeZEcABeifoaBijajbrV+qStBzwwC454BqemrihoN
taErsgyHhVrCqOKcuwJAWyuluw+LXjvwY/sFgPXLqCPMfEP4kBXhqM/+hHK7ZerR
aLvYFAwzssSuUGlksRon0xjQ7M9P2+Bld3gcV6hUyg==
-----END RSA PRIVATE KEY-----
```

- Bank PGP public key

```html
-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: Keybase OpenPGP v1.0.0
Comment: https://keybase.io/crypto

xo0EXsNd1gEEANMSmHxTjdL1XBcP09QGmky3Z75ePYfK8ywBKWJriAdqgy3nNHC+
9Gn7yWxdG0yCIPUvsNfYFscXjyIWl2A5KUWgP7Tvnb88u1KDSV2WmXLJE+Mvxz28
IkoZsRcOHNe9UDNDjxqJMYc6+vXHn+6KktTNEv45k+WVvzcbUUDUveURABEBAAHN
HGxpbmggPGxpbmgxNjEyMzQwQGdtYWlsLmNvbT7CrQQTAQoAFwUCXsNd1gIbLwML
CQcDFQoIAh4BAheAAAoJEAqwub56bRzrrNMD/iXzoYWhGgD1PW8hq4x04eY1FDTh
UKIL7PNLqcWP/UIjIkVFwuJWPHRNKle804pLIOg1Kd0KKnefQ8/o48ekB8K3erlZ
I7fMozmIEqqmmTXZLSNCCPieAHmtrHrcemjzhLRn6qG2VVUNbQPpHuK0yNVcWTqR
RmbDeUyOMHja0Kf0zo0EXsNd1gEEAN1a3UNxi+/zqZbBSkAFGCBwGBzeg0GdRbgq
kn44z3Ue+T0/iswS/mxRGPdtMYvagL1cZzvGBilJgzCQg4R2Jt5UMoieDo+YrIe9
QrjjcopJ262Aee5aZB2Gu4YHbRMn4+hEKaTIpqL8rCLou/bhbkJG65YsDe8EiNwP
i9iMJmmtABEBAAHCwIMEGAEKAA8FAl7DXdYFCQ8JnAACGy4AqAkQCrC5vnptHOud
IAQZAQoABgUCXsNd1gAKCRBwACQaae7pkSQqBACN4v1lNA0ni2j2wJ29Piw4qRVv
2mPfFHag3ilHj7wiEscQuBMA+659TvWPemXrBycsNkD3McueFAy/svLE28tqy9z2
0udFIW7Jqni4q0nz7NInzyVXghF1Gv6KjnUppj1QLVyHar15Nr8IM8u1+vrVNgFC
zz3lwqI0oSYY4UY/2OcbBAC19IGj8bM4EmOf7IEJd9lLGIo/mkDloRONeOM7R/Hi
0aWuDeH4SViUdqz4303cdvf2LETVg16vffXzhOBUU+obLt0iKQrBS6QQLOFcxi1I
OmC76AG/MpsD+Dis0l4D0TN1g08qIN/4t0owcwenkkuKWCpSMnO+T8CkoeSXC/kH
C86NBF7DXdYBBADZTNl/VGoebXPlzJ5Sb0JZAnmMj8wTcd2hyT7WsrOvsu3t+qpR
5l3XOgZMg6QvnNI+QAPw/sb0GzG5B5Bgq/HXhyyosyFEGMRxDoC6YLwTVS1Nt5mM
dcHUuOipBWpbc6oZFUb5ldPibTYhyoWhjATwVjJArddBxl8rWq6vQ4mJxQARAQAB
wsCDBBgBCgAPBQJew13WBQkPCZwAAhsuAKgJEAqwub56bRzrnSAEGQEKAAYFAl7D
XdYACgkQPiF9sII2k1NKYAQApRbyELkB6/bkgyL/jJey95KobUzCv0tEdY7j0V/0
2srSRg4xiJjbfxtrZtZNV2XJnHY6Y1Yws8zWXtvWW7CASqOKvqu1CeAER6HXJS+y
KGGYzQaiwyDitLuTKpjsMp32YXBWkDMFaewsetRF1Q335/5us/oWOi/Q036X4B7J
VWZobgQAyvxrw3OVc3soHZtr31FgblZFIfLvIGvAUhzlHm7SGtkzQdd7UjLkG48a
aEaRRTz9FcbxFYI+68GOPX29aAbw3CcLBFXzPwH72E9v4uah4BapGFEFHrv+Zq2A
xrc92e45BI8C3nuBrgZEvZT9l5sGR9lcaCWq0NwmO1mQK53XX94=
=S6eu
-----END PGP PUBLIC KEY BLOCK-----
```

- Bank PGP private key

```html
-----BEGIN PGP PRIVATE KEY BLOCK-----
Version: Keybase OpenPGP v1.0.0
Comment: https://keybase.io/crypto

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
l5sGR9lcaCWq0NwmO1mQK53XX94=
=MZrG
-----END PGP PRIVATE KEY BLOCK-----
```

## Danh sách các ngân hàng  liên  kết

### Ngân hàng đại diện nhóm chẵn (PGP)

- Partner code:

```html
NaniBank
```

- Public key (RSA):

```html
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgsRrmYvqFeXGntLRa/84
Zx7I5iJkDYNVlCXCxr2WVAoYKkiQWW/jlDD4OEhKCZCJgVVGT43XxUkQ3sv7+eVO
1MO1iSbMql96VSBLwybIfPrFjMXnoXE4lgRy06lAmCSTmjvWZW6xrlGRwdkWNxIb
ktR6eRiI//ERKqhFM+XZ2ur/xTyv28hZhj8UInyHJogfPiX/cal1dr/7GKzqyqUp
/mRnta31hVZZsXb1LCQtynZI6pfUKLZ7jok4L7Lm+S9+D3dhcMxBwJD15IjCDtQE
37lhuaRWB72hOpNFXFEUWXl408SMRyqbGPps/u+TEmstyo9qyUvdwWEbMg3GmE7M
GQIDAQAB
-----END PUBLIC KEY-----
```

- Secrettext of partner:

```html
hi mom
```

- Secrettext of bank:

```html
M0ec3lAqjHV82v66VYDb
```

- Host address

```html
35.240.195.17
```

### Ngân hàng đại diện nhóm lẻ (RSA)

- Tên ngân hàng:

```html
bankdbb
```

- Public key (RSA):

```html
-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHvGfCrOsLPolKTOprqzguNp85gk
Gdh/wbCBtXBtX7ObMSPqBN0aFgijRfn0NKolIn0ievEiab82ttBO57FGgNWG+fm/
CqX72dOpit9A5WqdwKY5iI/0yO+WNMtJqLwJ5qs/Cp0EwFAbqMh/4Uxsyaiw029h
X2IJEdW8oYb+0mwPAgMBAAE=
-----END PUBLIC KEY-----
```

- Secrettext of partner:

```html
Tj0xYDEDiQF9f2GYCxSv
```

- Host address

```html
bankdbb.herokuapp.com
```

- Secrettext of bank:

### Cách sử dụng api của ngân hàng RSA

#### Lấy thông tin tài khoản khách hàng bằng số tài khoản rsa

```json
GET /api/partner-bank/info/:number

HEADER
"id": "bankdbb"
"ts": 1594529422
"sig": "483b18c7f62eeefabf68db1a58cda22a52276e6f"
```

- id là chuỗi code để xác định partner nào đã đăng kí api
- ts là thời điểm gởi request, format sử dụng unix utc second, có thể  xem ở <https://www.epochconverter.com/,> lưu ý timestamp không được **lớn hơn** hoặc nhỏ hơn quá **60**s so với thời gian thực
- sig là chuỗi hash sha1 của **timestamp+ ":" + JSON.stringify(body) + ":" + secret**, nếu body empty thì là **{}**,sau đó được encode hex lại và gửi đi, ví dụ ở trên
- **secret** là `bankdbb`

```
const crypto = require('crypto');

const dataToHash = '1594529422:{}:bankdbb';
let hashString = crypto.createHash('sha1').update(dataToHash).digest('hex');
console.log(hashString);
```

- Không yêu cầu **authen-sig**

#### Nạp tiền vào tài khoản rsa

```json
POST /api/partner-bank/add-money

HEADER
"id": "kianto"
"ts": 1593447476.9
"sig": "84671fa6b7b1e3c70ff1ecb5535ea8118871a9d6"
"verify": "bFxJPP9mZydi6bhUoHhgP25VlaZ+c38IKGXSxHIbcCdIZVKeOcEWU/cwLR2qWeP7QxGn+sRQtDkol1X5TTPfLzHSaUKZTreLJN3CoGho36UBpw+42mZxwAJlcODcH5yLETrC9WqFMJ6zRWCLR5+y4RgCeVzBt97vfObwjsStge0="

BODY
{"number":"6","money":"1000","username":"test","content":"abc"}
```

- username là tên hoặc username của người gửi
- verify là chuỗi signature lấy dữ liệu là **secretKey = "Tj0xYDEDiQF9f2GYCxSv"** được sign theo package của node-rsa như sau

```html
const NodeRSA = require('node-rsa');
const privateKey = new NodeRSA(privateKeyRSA);
const sig = privateKey.sign(secretKey, 'base64', 'base64');
```

## DevOps

### Môi trường lập trình local với Docker Compose

Cài đặt `docker` và `docker-compose`

Chạy app bao gồm frontend, backend, database trong các container:

```sh
docker-compose up --build
```

Restore database bằng script có sẵn:

```sh
cd mariadb
./restore.sh
```

### Tạo Kubernetes cluster trên GCP bằng Terraform

Cluster được provision bằng Terraform với state được lưu trên Terraform Cloud.

### Deploy lên Kubernetes cluster trên Google Cloud

Cài đặt `kubectl`

Build image nodejs và push lên [Docker Hub](https://hub.docker.com/repository/docker/khuedoan/node-kubernetes):

```sh
docker login -u khuedoan
docker build -t khuedoan/node-kubernetes .
docker push khuedoan/node-kubernetes
```

Deploy lên Google Kubernetes Engine:

```sh
kubectl apply -f kubernetes/
```

Restore database bằng script có sẵn:

```sh
cd mariadb
./restore-kubernetes.sh
```

### GitlabCI

Khi merge vào `master`:

- Apply những thay đổi trên Terraform nếu có
- Build các image liên quan (frontend, backend)
- Push các image đã build lên Docker Hub và gắn tag
- Deploy lên Kubernetes

## Database diagram

![dbdiagram](./images/dbdiagram.png)

## Trang web hữu ích

- Tạo signature <https://8gwifi.org/rsasignverifyfunctions.jsp>
- UTC timestamp <https://www.epochconverter.com/>
- Hex to base64 <https://base64.guru/converter/encode/hex>
- Beautify và minify json <https://codebeautify.org/jsonviewer>
- Hash, encode decode <https://emn178.github.io/online-tools/sha256.html>
- Hash online <https://quickhash.com/>
