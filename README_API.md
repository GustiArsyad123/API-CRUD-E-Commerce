# E-commerce CRUD API (Node.js + MySQL)

Project sederhana: API CRUD untuk entitas utama e-commerce (products, categories, users, orders) menggunakan Express + Sequelize + MySQL.

Quick start

1. Salin file `.env.example` menjadi `.env` dan isi variabel untuk koneksi MySQL.

2. Install dependencies:

```bash
npm install
```

3. Buat database MySQL (sesuaikan `DB_NAME` di `.env`):

```sql
CREATE DATABASE ecommerce_db CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```

4. Jalankan server (development):

```bash
npm run dev
```

Server akan melakukan `sequelize.sync()` otomatis dan membuat tabel sesuai model.

API endpoints (prefiks `/api`):

- `GET /api/products` - daftar produk
- `POST /api/products` - buat produk
- `GET /api/products/:id` - detail produk
- `PUT /api/products/:id` - update
- `DELETE /api/products/:id` - hapus

- `GET /api/categories` - daftar kategori
- `POST /api/categories` - buat kategori

- `GET /api/users` - daftar user
- `POST /api/users` - buat user

- `POST /api/orders` - buat order (payload: `{ userId, items: [{productId, quantity}] }`)
- `GET /api/orders` - daftar order

Contoh `curl` membuat produk:

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Produk A","description":"Desc","price":10000,"stock":10}'
```

Catatan

- Untuk produksi gunakan migration dan sebaiknya jangan gunakan `sync({ force: true })`.
- Password disimpan plain-text pada contoh ini — untuk implementasi asli silakan tambahkan hashing (bcrypt) dan autentikasi.

Note:
npm run dev

> ecommerce-api@1.0.0 dev
> nodemon src/server.js

[nodemon] 3.1.11
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node src/server.js`
Failed to start server: AccessDeniedError [SequelizeAccessDeniedError]: Access denied for user 'arsyad'@'localhost' (using password: YES)

sudo mysql << 'EOF'
heredoc> DROP USER IF EXISTS 'arsyad'@'localhost';
heredoc> CREATE USER 'arsyad'@'localhost' IDENTIFIED BY 'Ecommerce@2024';
heredoc> GRANT ALL PRIVILEGES ON ecommerce_db.* TO 'arsyad'@'localhost';
heredoc> FLUSH PRIVILEGES;