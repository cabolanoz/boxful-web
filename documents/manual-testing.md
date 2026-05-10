# Manual Testing Checklist

Before committing changes, verify the following:

1. Visiting `/` redirects to `/login`.
2. Visiting `/orders` without a token redirects to `/login`.
3. Visiting `/history` without a token redirects to `/login`.
4. Registration opens a phone confirmation modal before submitting.
5. Successful registration stores the access token and redirects to `/orders`.
6. Successful login stores the access token and redirects to `/orders`.
7. The dashboard navbar displays the authenticated user's name.
8. The dashboard navbar displays the settlement summary.
9. The navbar dropdown allows the user to log out.
10. Logging out removes the access token and redirects to `/login`.
11. Creating an order requires at least one package.
12. Creating a standard order sends `paymentMode: STANDARD`.
13. Creating a PCE/COD order requires an expected collection amount.
14. Creating an order shows the success modal with the tracking code.
15. The history screen lists created orders in descending order from the API.
16. The history table shows status, payment mode, shipping cost, commission, revenue, and settlement.
17. Searching history with a month range sends `dateFrom` and `dateTo`.
18. Selecting rows and clicking "Descargar órdenes" downloads a CSV with only the selected rows.
19. The app builds successfully.

## Build Validation

Run:

```bash
npm run lint
npm run build
```

