# RentNest 🏠

বিশেষ দ্রষ্টব্য: এ প্রজেক্ট রেন্ডার এ ডিপ্লয় করার কারণে যখন এটি আপনি টেস্ট করতে যাবেন তখন একটু সময় নিয়ে টেস্ট করবেন কারণ ব্লেন্ডারের এপিআই হিট হতে একটু সময় নেয় । Admin Credential নিচে দেওয়া আছে শুধু TENANT এন্ড LANDLORD একাউন্ট ক্রিয়েট করে খুব সহজেই এপিআই এগুলো চেক করতে পারবেন |

## 🚀 Live API

https://rent-nest-backend-bl08.onrender.com

---

## 📌 Features

### Authentication

- User Registration (Tenant & Landlord)
- Login with JWT Authentication
- Get Current User
- Case-insensitive Email Login

### Tenant

- Browse Properties
- Search & Filter Properties
- Submit Rental Request
- View Rental History
- Make Payment with Stripe
- View Payment History
- Leave Review after Completed Rental

### Landlord

- Create Property
- Update Property
- Delete Property
- View Rental Requests
- Approve/Reject Requests
- Complete Rental

### Admin

- Manage Users
- Ban/Unban Users
- Manage Categories
- View All Properties
- View All Rentals

---

## 🛠 Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Stripe Checkout
- Stripe Webhook
- Render

## 🔐 Roles

- Tenant
- Landlord
- Admin

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint            |
| ------ | ------------------- |
| POST   | /api/users/register |
| POST   | /api/auth/login     |
| GET    | /api/auth/me        |

---

### Categories

| Method | Endpoint            |
| ------ | ------------------- |
| GET    | /api/categories     |
| POST   | /api/categories     |
| PATCH  | /api/categories/:id |
| DELETE | /api/categories/:id |

### Properties

| Method | Endpoint                     |
| ------ | ---------------------------- |
| GET    | /api/properties              |
| GET    | /api/properties/:id          |
| POST   | /api/landlord/properties     |
| PUT    | /api/landlord/properties/:id |
| DELETE | /api/landlord/properties/:id |

### Rental Requests

| Method | Endpoint                            |
| ------ | ----------------------------------- |
| POST   | /api/rentals                        |
| GET    | /api/rentals                        |
| GET    | /api/rentals/:id                    |
| GET    | /api/landlord/requests              |
| PATCH  | /api/landlord/requests/:id          |
| PATCH  | /api/landlord/requests/:id/complete |

### Payments

| Method | Endpoint             |
| ------ | -------------------- |
| POST   | /api/payments/create |
| GET    | /api/payments        |
| GET    | /api/payments/:id    |

Example:

```text
GET /api/payments/ac57bc0d-35c0-4c64-a2e4-ff667416c78e
```

---

### Reviews

| Method | Endpoint     |
| ------ | ------------ |
| POST   | /api/reviews |

---

### Admin

| Method | Endpoint              |
| ------ | --------------------- |
| GET    | /api/admin/users      |
| PATCH  | /api/admin/users/:id  |
| GET    | /api/admin/properties |
| GET    | /api/admin/rentals    |

---

## 💳 Payment Flow

```
PENDING

↓

APPROVED

↓

Stripe Checkout

↓

Stripe Webhook

↓

Payment COMPLETED

↓

Rental ACTIVE

↓

Landlord COMPLETE

↓

Tenant REVIEW
```

## 👨‍💼 Admin Credentials

```text
Email: abc@gmail.com
Password: 123456
```

---

## API Documentation

The complete Postman Collection is included in this repository.

File:
Rent Nest.postman_collection.json

## 🎥 Demo Video

> Add your demo video link here.

---

## 👨‍💻 Author

Md Kawsar Ali
