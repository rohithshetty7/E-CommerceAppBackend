# E-CommerceAppBackend API Documentation

## Overview
Backend for e-commerce app with user, product, blog, category, brand, coupon, color, enquiry and cart/order features.

Base URL:
- `http://localhost:3001/api`

## Setup
1. `npm install`
2. Create `.env` in project root:
   - `MONGODB_URL=<your_mongo_connection_string>`
   - `JWT_SECRET=<your_jwt_secret>`
3. Start server:
   - `npm run server` (nodemon)
   - or `npm start`

## Middleware
- `cors`, `body-parser`, `cookie-parser`, `morgan`
- `authMiddleWare` for protected routes
- `isAdmin` for admin-only routes

## User Authentication Routes (`/user`)
- `POST /register`
- `POST /login`
- `POST /admin-login`
- `POST /forgot-password-token`
- `PUT /reset-password/:token`
- `GET /refresh`
- `GET /logout`

### Authenticated
- `PUT /password`
- `PUT /save-address`
- `GET /wishlist`
- `GET /cart`
- `POST /cart`
- `DELETE /delete`
- `POST /cart/applycoupon`
- `POST /cart/cash-order`
- `GET /get-orders`

### Admin-only
- `GET /:id` (get single user)
- `PUT /order/update-order/:id`
- `PUT /block-user/:id`
- `PUT /unblock-user/:id`

### General
- `GET /all-users`
- `DELETE /:id`
- `PUT /edit-user`

## Product Routes (`/product`)
- `POST /` (auth + admin)
- `GET /` (all)
- `GET /:id`
- `PUT /:id` (auth + admin)
- `DELETE /:id` (auth + admin)
- `PUT /wishlist` (auth)
- `PUT /rating` (auth)
- `PUT /upload` (auth + admin, multipart `images` max 10)
- `DELETE /delete-img/:id` (auth + admin)

## Blog Routes (`/blog`)
- `POST /` (auth + admin)
- `GET /` (all)
- `GET /:id`
- `PUT /:id` (auth + admin)
- `DELETE /:id` (auth + admin)
- `PUT /likes` (auth)
- `PUT /dislikes` (auth)
- `PUT /upload/:id` (auth + admin, multipart `images` max 10)

## Product Category Routes (`/category`)
- `POST /` (auth + admin)
- `GET /` (all)
- `GET /:id`
- `PUT /:id` (auth + admin)
- `DELETE /:id` (auth + admin)

## Blog Category Routes (`/blogcategory`)
- `POST /` (auth + admin)
- `GET /` (all)
- `GET /:id`
- `PUT /:id` (auth + admin)
- `DELETE /:id` (auth + admin)

## Brand Routes (`/brand`)
- `POST /` (auth + admin)
- `GET /` (all)
- `GET /:id`
- `PUT /:id` (auth + admin)
- `DELETE /:id` (auth + admin)

## Coupon Routes (`/coupon`)
- `POST /` (auth + admin)
- `GET /` (auth + admin)
- `GET /:id` (auth + admin)
- `PUT /:id` (auth + admin)
- `DELETE /:id` (auth + admin)

## Color Routes (`/color`)
- `POST /` (auth + admin)
- `GET /` (all)
- `GET /:id`
- `PUT /:id` (auth + admin)
- `DELETE /:id` (auth + admin)

## Enquiry Routes (`/enquiry`)
- `POST /` (auth + admin)
- `GET /` (all)
- `GET /:id`
- `PUT /:id` (auth + admin)
- `DELETE /:id` (auth + admin)

## Headers
- `Content-Type: application/json`
- `Authorization: Bearer <token>` for auth routes

## Notes
- Make sure `JWT_SECRET` matches backend config.
- `MONGODB_URL` must be valid and accessible.
- File upload uses multipart form-data via `multer`.
