# Boxful Web

Frontend application for the Boxful Full Stack Engineer technical test.

Published app:

```txt
https://boxful-web.vercel.app/
```

This project is built with Next.js, React, TypeScript, Ant Design, and Tailwind CSS. It connects to the Boxful API for registration, login, protected dashboard routes, order creation, order history, settlement fields, and CSV export.

## Tech Stack

- Node.js 24.15.0
- npm 11 or newer
- Next.js
- React
- TypeScript
- Ant Design
- Tailwind CSS
- ESLint

## Requirements

- Node.js 24.15.0
- npm 11 or newer

The project includes `.nvmrc` and `.node-version`.

```bash
node -v
npm -v
```

Expected Node.js version:

```txt
v24.15.0
```

## Environment Variables

Create a local environment file from the example:

```bash
cp .env.local.example .env.local
```

Local development value:

```env
NEXT_PUBLIC_API_BASE_URL="http://localhost:3000/api"
```

Production uses the deployed API URL configured in Vercel.

Because this variable starts with `NEXT_PUBLIC_`, it is exposed to the browser. Do not place private secrets in public frontend environment variables.

## Related Backend API

The local frontend expects the Boxful API at:

```txt
http://localhost:3000/api
```

The backend repository should be run separately.

Required endpoints:

```txt
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/orders
GET  /api/orders
```

Order history sends optional date filters:

```txt
GET /api/orders?dateFrom=2026-01-01&dateTo=2026-07-31
```

## Installation

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The app runs locally at:

```txt
http://localhost:3001
```

The frontend uses port `3001` so it can run alongside the backend API on port `3000`.

## Available Routes

```txt
/          -> redirects to /login
/login     -> login
/register  -> user registration
/orders    -> protected order creation
/history   -> protected order history
```

## Available Scripts

```bash
npm run dev
```

Runs the app in development mode on port `3001`.

```bash
npm run build
```

Builds the production application.

```bash
npm run start
```

Starts the production build on port `3001`.

```bash
npm run lint
```

Runs ESLint.

## Development Workflow

1. Start the backend API.

```bash
cd ../boxful-api
npm run start:dev
```

2. Start the frontend app.

```bash
cd ../boxful-web
npm run dev
```

3. Open:

```txt
http://localhost:3001
```

4. Register or log in.

5. Verify:

```txt
/orders
/history
```

## Documentation

Detailed notes were split out of the main README:

- [Architecture Notes](documents/architecture.md)
- [Project Structure](documents/project-structure.md)
- [Manual Testing Checklist](documents/manual-testing.md)

## Notes

The current authentication approach stores the JWT access token in `localStorage` to keep the technical test implementation simple and easy to review.

For a production application, the authentication strategy should be revisited. A stronger approach would likely include HttpOnly cookies, refresh tokens, token rotation, server-side session validation, and CSRF protection depending on the final architecture.

