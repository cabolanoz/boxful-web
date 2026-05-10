# Architecture Notes

This document keeps the implementation details out of the main README.

## UI Architecture

The UI follows the provided Figma screens using:

- Ant Design for form controls, inputs, selects, date pickers, buttons, modals, dropdowns, tables, tags, and messages.
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
localStorage.removeItem("__boxful_access_token")
```

No backend logout endpoint is required for the current stateless JWT implementation.

A backend logout endpoint would become useful if the project later adds refresh tokens, HttpOnly cookies, session persistence, or token revocation.

## Orders Flow

Order creation is handled with a feature module under:

```txt
src/features/orders
```

The main pieces are:

- `create-order-form.tsx`: coordinates the two-step order form.
- `order-information-step.tsx`: collects pickup, recipient, and payment mode data.
- `order-packages-step.tsx`: collects package dimensions, weight, and content.
- `use-create-order-form.ts`: owns validation, submit state, API call, and success modal state.
- `map-create-order-form-to-payload.ts`: maps UI form values to the backend `CreateOrderPayload`.

The package data sent to the API uses the backend field names directly:

```ts
{
  lengthCm: number;
  heightCm: number;
  widthCm: number;
  weightPounds: number;
  content: string;
}
```

The create order form also supports `paymentMode` and `expectedCollectionAmount` for PCE/COD orders.

## Order History

The history page displays orders returned by the API in descending creation order. The backend owns the ordering.

The date filter is intentionally simple:

- The UI lets the user select a range of months.
- The frontend sends `dateFrom` as the first day of the first selected month.
- The frontend sends `dateTo` as the last day of the last selected month.

CSV export is generated locally from the data already loaded in the table. Since this implementation does not include pagination and the visible dataset is already in memory, a separate export endpoint is not required for the current scope.

Only selected rows are exported. The CSV helper lives in:

```txt
src/features/orders/utils/download-orders-csv.ts
```

If the product later needs large exports, background jobs, audit logging, or exports with fields not loaded in the UI, CSV generation should move to the backend.

## Settlement Summary

The dashboard navbar shows a "Monto a liquidar" summary.

The current frontend implementation computes this from the loaded authenticated user's orders through:

```txt
src/features/orders/services/settlement-summary.service.ts
```

If the backend later exposes a dedicated summary endpoint, the UI can keep using the same hook and only replace the service internals.

