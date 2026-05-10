# Project Structure

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

    orders/
      api/
        orders.api.ts

      components/
        create-order/
          create-order-form.tsx
          create-order-form.types.ts
          order-information-step.tsx
          order-packages-step.tsx
          order-success-modal.tsx

        orders-history-view.tsx

      hooks/
        use-create-order-form.ts
        use-settlement-summary.ts

      services/
        settlement-summary.service.ts

      types/
        order.types.ts

      utils/
        download-orders-csv.ts
        format-currency.ts
        map-create-order-form-to-payload.ts

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

Top navbar that displays the authenticated user, exposes logout, and shows the settlement summary.

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

### `src/features/orders/api/orders.api.ts`

Order API functions:

```txt
createOrder()
getOrders()
```

`getOrders()` accepts optional date filters and serializes them as query parameters.

### `src/features/orders/hooks/use-create-order-form.ts`

Encapsulates order form behavior, first-step validation, order submission, success handling, and error handling.

### `src/features/orders/components/create-order/order-packages-step.tsx`

Collects package dimensions, weight, and content before submitting the order.

### `src/features/orders/components/orders-history-view.tsx`

Displays order history, date filtering, selected-row state, financial columns, and CSV download action.

### `src/features/orders/utils/download-orders-csv.ts`

Generates and downloads a CSV file for the selected orders already loaded in the browser.

