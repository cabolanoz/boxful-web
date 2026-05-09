# Boxful Web

Frontend application for the Boxful Full Stack Engineer technical test.

This project is built with Next.js, React, TypeScript, Ant Design, and Tailwind CSS. It connects to the Boxful API for user registration, login, authenticated session validation, and protected dashboard routes.

## Tech Stack

- Node.js 24.15.0
- npm 11 or newer
- Next.js
- React
- TypeScript
- Ant Design
- Tailwind CSS
- ESLint
- Prettier

## Requirements

Before running the project, make sure you have installed:

- Node.js 24.15.0
- npm 11 or newer

The project includes `.nvmrc` and `.node-version` files to make the Node.js version explicit.

```bash
node -v
npm -v
```

Expected Node.js version:

```bash
v24.15.0
```

## Related Backend API

This frontend expects the Boxful API to be running locally at:

```txt
http://localhost:3000/api
```

The backend should expose at least the following endpoints:

```txt
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

Before testing registration, login, orders, or history, make sure the backend API is running.

## Environment Variables

Create a local environment file from the example:

```bash
cp .env.local.example .env.local
```

The local development value should be:

```env
NEXT_PUBLIC_API_BASE_URL="http://localhost:3000/api"
```

Because this variable starts with `NEXT_PUBLIC_`, it is exposed to the browser by Next.js. Do not place private secrets in public frontend environment variables.

## Installation

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application should be available at:

```txt
http://localhost:3001
```

The frontend uses port `3001` so it can run alongside the backend API on port `3000`.

## Available Routes

### `/`

Root route. It redirects users to `/login`.

### `/login`

Login screen. It sends credentials to the backend API and stores the returned access token.

### `/register`

Registration screen. It collects user information and asks the user to confirm the phone number before submitting the registration request.

### `/orders`

Protected order creation screen. A valid authenticated session is required.

### `/history`

Protected order history screen. A valid authenticated session is required.

## Authentication Flow

The frontend authenticates against the backend API using JWT Bearer tokens.

The current implementation stores the access token in `localStorage` for simplicity during the technical test.

After login or registration:

1. The frontend receives an access token from the API.
2. The token is stored in `localStorage`.
3. The user is redirected to `/orders`.

Protected routes validate the current session by calling:

```txt
GET /api/auth/me
```

If the token is missing or invalid, the user is redirected to `/login`.

## Logout Flow

The dashboard navbar exposes a dropdown with a logout action.

Logout currently works client-side by removing the stored token:

```txt
localStorage.removeItem("boxful_access_token")
```

No backend logout endpoint is required for the current stateless JWT implementation.

A backend logout endpoint would become useful if the project later adds refresh tokens, HttpOnly cookies, session persistence, or token revocation.

## UI Architecture

The UI follows the provided Figma screens using:

- Ant Design for form controls, inputs, selects, date pickers, buttons, modals, dropdowns, and messages.
- Tailwind CSS for layout, spacing, sizing, responsive behavior, and utility styling.
- Ant Design `ConfigProvider` for shared theme tokens.

The project intentionally avoids inline `style` props where possible and prefers Tailwind utility classes.

## Ant Design Theme

The Ant Design theme is centralized in:

```txt
src/lib/theme/antd-theme.ts
```

The app-level providers are configured in:

```txt
src/app/providers.tsx
```

The root layout wraps the application with:

```txt
AntdRegistry
ConfigProvider
Ant Design App provider
```

This keeps Ant Design styling and context available across the application.

## Project Structure

```txt
src/
  app/
    page.tsx
    layout.tsx
    providers.tsx

    login/
      page.tsx

    register/
      page.tsx

    (dashboard)/
      layout.tsx
      orders/
        page.tsx
      history/
        page.tsx

  components/
    dashboard/
      dashboard-layout.tsx
      dashboard-navbar.tsx
      dashboard-sidebar.tsx

    guards/
      protected-route.tsx

    layout/
      auth-wrapper.tsx

  features/
    auth/
      api/
        auth.api.ts

      components/
        login/
          login-form.tsx
          login-form-fields.tsx
          login-form-header.tsx

        register/
          register-form.tsx
          register-form-options.ts
          register-form.types.ts
          register-form.mapper.ts
          personal-information-section.tsx
          contact-information-section.tsx
          password-section.tsx
          phone-confirmation-modal.tsx

      hooks/
        use-login-form.ts
        use-register-form.ts

      types/
        auth.types.ts

  lib/
    api/
      http-client.ts

    auth/
      token-storage.ts

    theme/
      antd-theme.ts

    utils/
      normalize-email.ts
      routes.ts
```

## Important Files

### `src/app/page.tsx`

Redirects the root route to `/login`.

### `src/app/layout.tsx`

Defines the root HTML structure and wraps the app with shared providers.

### `src/app/providers.tsx`

Client-side provider wrapper for Ant Design configuration.

### `src/components/layout/auth-wrapper.tsx`

Shared layout for the login and registration screens.

### `src/components/guards/protected-route.tsx`

Client-side route guard for protected pages. It checks for an access token and validates the session with the backend.

### `src/components/dashboard/dashboard-layout.tsx`

Dashboard shell that combines the sidebar, navbar, and protected page content.

### `src/components/dashboard/dashboard-sidebar.tsx`

Sidebar navigation for order creation and order history.

### `src/components/dashboard/dashboard-navbar.tsx`

Top navbar that displays the authenticated user and exposes a logout dropdown.

### `src/lib/api/http-client.ts`

Small fetch wrapper used to communicate with the backend API.

### `src/lib/auth/token-storage.ts`

Utility functions for reading, storing, and removing the JWT access token.

### `src/lib/utils/normalize-email.ts`

Small utility for email normalization before sending authentication requests.

### `src/features/auth/api/auth.api.ts`

Authentication API functions:

```txt
registerUser()
loginUser()
getCurrentUser()
```

### `src/features/auth/hooks/use-login-form.ts`

Encapsulates login form behavior, API call, success handling, error handling, token storage, and navigation.

### `src/features/auth/hooks/use-register-form.ts`

Encapsulates register form behavior, phone confirmation modal state, API call, token storage, and navigation.

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

Recommended local workflow:

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

3. Open the frontend in the browser.

```txt
http://localhost:3001
```

4. Register or log in.

5. Verify the protected dashboard pages:

```txt
/orders
/history
```

## Manual Testing Checklist

Before committing changes, verify the following:

1. Visiting `/` redirects to `/login`.
2. Visiting `/orders` without a token redirects to `/login`.
3. Visiting `/history` without a token redirects to `/login`.
4. Registration opens a phone confirmation modal before submitting.
5. Successful registration stores the access token and redirects to `/orders`.
6. Successful login stores the access token and redirects to `/orders`.
7. The dashboard navbar displays the authenticated user's name.
8. The navbar dropdown allows the user to log out.
9. Logging out removes the access token and redirects to `/login`.
10. The app builds successfully.

## Build Validation

Run:

```bash
npm run lint
npm run build
```

## Notes

The current authentication approach stores the JWT access token in `localStorage` to keep the technical test implementation simple and easy to review.

For a production application, the authentication strategy should be revisited. A stronger approach would likely include HttpOnly cookies, refresh tokens, token rotation, server-side session validation, and CSRF protection depending on the final architecture.
