# AuthReady-Backend

A secure Express.js backend starter with authentication using [@baijanstack/express-auth](https://www.npmjs.com/package/@baijanstack/express-auth).
It uses **Mongoose** for MongoDB and supports **email/password login**, **OTP verification**, and **Google OAuth 2.0**.
This project removes auth boilerplate and gives you a scalable API foundation.

---

## Features

- **Email/Password Auth:** Sign up, login, logout, password reset, forgot password, and email verification with OTP.
- **JWT Tokens:** Access and refresh tokens with configurable expiration times.
- **Google OAuth 2.0:** Optional social login.
- **Mongoose Integration:** Store users in MongoDB.
- **Protected Routes:** `validateAccessToken` middleware secures endpoints.
- **Environment Config:** Use `.env` file for settings.
- **TypeScript Support:** Fully typed for better development experience.

---

## Prerequisites

- Node.js v18+
- MongoDB (local or cloud e.g. Atlas)
- npm or yarn

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/bibek-bhusal03/AuthReady-Backend.git
   cd AuthReady-Backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root (based on `env.ts`) and add:

   ```env
   # Server
   PORT=3000
    # MongoDB

    DATABASE_URL=mongodb://localhost:27017/authcore

    # JWT / Tokens

    TOKEN_SECRET=your-super-secret-jwt-key
    SALT_ROUNDS=10
    ACCESS_TOKEN_AGE=60 # Access token age in seconds
    REFRESH_TOKEN_AGE=240000 # Refresh token age in seconds

    # OTP

    OTP_AGE=30 # OTP age in seconds
    OTP_SECRET=your-otp-secret

    # Google OAuth (optional)

    GOOGLE_CLIENT_ID=your-google-client-id
    GOOGLE_CLIENT_SECRET=your-google-client-secret
    GOOGLE_SUCCESS_REDIRECT_URI=http://localhost:3000/v1/auth/google/success
    GOOGLE_FAILURE_REDIRECT_URI=http://localhost:3000/v1/auth/google/failure
   ```

4. **Set up MongoDB:**
   Make sure MongoDB is running or update `DATABASE_URL` for a remote instance.
   `models/db.ts` and `models/user.ts` handle DB connection and schema.

## Usage

Start the development server:

```bash
npm run dev
```

Server runs at `http://localhost:3000` (or your configured PORT).

Auth routes are under `/v1/auth` (configurable in `config.ts`). Test with Postman or similar tools.

---

## 🔑 Generated Auth Routes

### POST `/v1/auth/signup`

Request:

```json
{ "email": "user@example.com", "password": "securepass", "name": "User Name" }
```

Hashes password and sends verification email.

---

### POST `/v1/auth/send-otp`

Request:

```json
{ "email": "user@example.com" }
```

---

### POST `/v1/auth/verify-email`

Request:

```json
{ "email": "user@example.com", "otp": "123456" }
```

---

### POST `/v1/auth/login`

Request:

```json
{ "email": "user@example.com", "password": "securepass" }
```

Response includes accessToken, refreshToken, and user.

---

### POST `/v1/auth/logout`

---

### POST `/v1/auth/refresh`

Returns new access/refresh tokens.

---

### GET `/v1/auth/me`

Returns current user details and token data.

---

### POST `/v1/auth/reset`

Request:

```json
{ "oldPassword": "oldpass", "newPassword": "newpass" }
```

---

### POST `/v1/auth/forgot-password`

Request:

```json
{ "email": "user@example.com", "otp": "123456", "newPassword": "newpass" }
```

---

### Google OAuth Routes

- GET `/v1/auth/google` – Start Google login.
- GET `/v1/auth/google/callback` – Handles callback, sets tokens, and redirects.

---

## Protected Routes

Use `validateAccessToken` middleware from `auth/index.ts`:

```js
import { validateAccessToken } from "../auth";

app.get("/protected", validateAccessToken, (req, res) => {
  res.json({ message: "Protected data", user: req.user });
});
```

Send tokens via headers (`x-access-token`, `x-refresh-token`) or cookies (no “Bearer” prefix).

---

## 📁 Project Structure

```
authcore-backend/
├── node_modules/
├── src/
│ ├── auth/
│ │ ├── google-email.ts
│ │ ├── handlers.ts
│ │ ├── index.ts
│ │ ├── notifier.ts
│ │ ├── template.ts
│ │ └── config.ts
│ ├── models/
│ │ ├── db.ts
│ │ └── user.ts
│ ├── repositories/
│ │ ├── userRepo.ts
│ │ └── main.ts
│ └── env.ts
├── .env
├── .gitignore
├── config.ts
├── package-lock.json
├── package.json
└── README.md
```

---

## Configuration

- Edit `src/config.ts` for auth settings (e.g. `BASE_PATH`, `TOKEN_SECRET`).
- `src/env.ts` loads environment variables.
- `src/models/db.ts` sets up Mongoose.

---

## Scripts

- `npm start` – Run in Development

---

## Troubleshooting

- **MongoDB Error:** Check `DATABASE_URL` and MongoDB status.
- **Invalid Tokens:** Make sure `TOKEN_SECRET` matches.

* **OAuth Issues:** Check Google credentials and redirect URIs.

---

## Contributing

Fork, create a branch, and submit a PR. Add tests and update docs.

---

## License

MIT

For more on the auth library, see the [official docs](https://www.npmjs.com/package/@baijanstack/express-auth).
If you need help extending this boilerplate, open an issue!

---
