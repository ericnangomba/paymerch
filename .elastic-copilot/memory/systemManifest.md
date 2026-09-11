# System Manifest

## Project Overview
- Name: paymerch
- Description: CRCT-enabled project: paymerch
- Created: 2026-09-10T23:00:16.667Z

## Current Status
- Current Phase: Set-up/Maintenance
- Last Updated: 2026-09-11T06:22:10.031Z

## Project Structure

- 15 ts files
- 3 js files
- 73 tsx files


## Dependencies

## Project Directory Structure

- 📂 attached_assets/
  - 📂 generated_images/
    - 📄 247Support.jpg
    - 📄 API_integration_coding_9329f2b0.png
    - 📄 Easy Integration.jpg
    - 📄 Global Coverage.jpg
    - 📄 Merchant_dashboard_preview_f82fecf1.png
    - 📄 Payment_checkout_interface_a8d4ddae.png
    - 📄 Payout_success_screen_cdb36df6.png
    - 📄 Secure Infrastructure.webp
- 📂 client/
  - 📂 public/
    - 📄 _redirects
    - 📄 favicon.png
  - 📂 src/
    - 📂 components/
      - 📂 ui/
        ...
      - 📄 AdminGuard.tsx
      - 📄 app-sidebar.tsx
      - 📄 footer-company.tsx
      - 📄 header-auth.tsx
      - 📄 MerchantGuard.tsx
      - 📄 theme-provider.tsx
      - 📄 theme-toggle.tsx
    - 📂 debug/
      - 📄 envCheck.ts
    - 📂 hooks/
      - 📄 use-mobile.tsx
      - 📄 use-toast.ts
      - 📄 useAuthProfile.ts
    - 📂 lib/
      - 📄 firebase.ts
      - 📄 queryClient.ts
      - 📄 supabaseClient.ts
      - 📄 useAuth.tsx
      - 📄 utils.ts
    - 📂 pages/
      - 📄 admin-dashboard.tsx
      - 📄 admin.tsx
      - 📄 analytics.tsx
      - 📄 checkout.tsx
      - 📄 dashboard-layout.tsx
      - 📄 dashboard.tsx
      - 📄 home.tsx
      - 📄 merchant-dashboard.tsx
      - 📄 not-found.tsx
      - 📄 payment-links.tsx
      - 📄 payouts.tsx
      - 📄 SignIn.tsx
      - 📄 SignUp.tsx
      - 📄 supabaseClient.ts
      - 📄 transactions.tsx
      - 📄 Unauthorized.tsx
    - 📄 App.tsx
    - 📄 index.css
    - 📄 main.tsx
  - 📄 index.html
- 📂 public/
  - 📄 paymerch.png
- 📂 server/
  - 📄 index.ts
  - 📄 routes.ts
  - 📄 storage.ts
  - 📄 vite.ts
- 📄 drizzle.config.ts
- 📄 netlify.toml
- 📄 postcss.config.js
- 📄 tailwind.config.ts
- 📄 vite.config.ts


## TS Dependencies

### \vite.config.ts
Dependencies:
- vite
- @vitejs/plugin-react
- path

### \tailwind.config.ts
Dependencies:
- tailwindcss
- tailwindcss-animate
- @tailwindcss/typography

### \server\vite.ts
Dependencies:
- express
- fs
- path
- vite
- http
- ../vite.config
- nanoid

### \server\storage.ts
Dependencies:
- crypto

### \server\routes.ts
Dependencies:
- express
- http
- ./storage
- ./index
- zod

## JS Dependencies

### \postcss.config.js
No dependencies found

### \dist\index.js
Dependencies:
- dotenv/config
- express
- http
- crypto
- zod
- fs
- path
- vite
- @vitejs/plugin-react
- nanoid
- helmet

### \dist\public\assets\index-BcjqqHGW.js
Dependencies:
- ws
- );var n=e.read();if(!n)throw new Error(

## TSX Dependencies

### \client\src\App.tsx
Dependencies:
- wouter
- ./lib/queryClient
- @tanstack/react-query
- @/components/ui/toaster
- @/components/ui/tooltip
- @/components/theme-provider
- @/pages/home
- @/pages/checkout
- @/pages/SignIn
- @/pages/SignUp
- @/pages/not-found
- @/pages/admin-dashboard
- @/pages/merchant-dashboard
- @/components/AdminGuard
- @/components/MerchantGuard
- @/pages/Unauthorized

### \client\src\pages\merchant-dashboard.tsx
Dependencies:
- react
- @/lib/useAuth
- @/components/ui/button
- @/components/ui/sidebar
- @/components/app-sidebar

### \client\src\pages\home.tsx
Dependencies:
- wouter
- @/components/ui/button
- @/components/ui/card
- @/components/ui/badge
- react-icons/si
- @assets/generated_images/Merchant_dashboard_preview_f82fecf1.png
- @assets/generated_images/Payment_checkout_interface_a8d4ddae.png
- @assets/generated_images/API_integration_coding_9329f2b0.png
- @assets/generated_images/Payout_success_screen_cdb36df6.png
- @assets/generated_images/Secure Infrastructure.webp
- @assets/generated_images/Global Coverage.jpg
- @assets/generated_images/Easy Integration.jpg
- @assets/generated_images/247Support.jpg
- @/lib/useAuth
- @/components/header-auth
- @/components/footer-company

### \client\src\pages\dashboard.tsx
Dependencies:
- react
- @tanstack/react-query
- @/components/ui/card
- @/components/ui/badge
- @/components/ui/button
- lucide-react
- wouter
- @/lib/useAuth

### \client\src\pages\dashboard-layout.tsx
Dependencies:
- @/components/ui/sidebar
- @/components/app-sidebar
- @/lib/useAuth
- @/pages/admin-dashboard
- @/pages/merchant-dashboard



## Project Directory Structure

- 📂 attached_assets/
  - 📂 generated_images/
    - 📄 247Support.jpg
    - 📄 API_integration_coding_9329f2b0.png
    - 📄 Easy Integration.jpg
    - 📄 Global Coverage.jpg
    - 📄 Merchant_dashboard_preview_f82fecf1.png
    - 📄 Payment_checkout_interface_a8d4ddae.png
    - 📄 Payout_success_screen_cdb36df6.png
    - 📄 Secure Infrastructure.webp
- 📂 client/
  - 📂 public/
    - 📄 _redirects
    - 📄 favicon.png
  - 📂 src/
    - 📂 components/
      - 📂 ui/
        ...
      - 📄 AdminGuard.tsx
      - 📄 app-sidebar.tsx
      - 📄 footer-company.tsx
      - 📄 header-auth.tsx
      - 📄 MerchantGuard.tsx
      - 📄 theme-provider.tsx
      - 📄 theme-toggle.tsx
    - 📂 debug/
      - 📄 envCheck.ts
    - 📂 hooks/
      - 📄 use-mobile.tsx
      - 📄 use-toast.ts
      - 📄 useAuthProfile.ts
    - 📂 lib/
      - 📄 firebase.ts
      - 📄 queryClient.ts
      - 📄 supabaseClient.ts
      - 📄 useAuth.tsx
      - 📄 utils.ts
    - 📂 pages/
      - 📄 admin-dashboard.tsx
      - 📄 admin.tsx
      - 📄 analytics.tsx
      - 📄 checkout.tsx
      - 📄 dashboard-layout.tsx
      - 📄 dashboard.tsx
      - 📄 home.tsx
      - 📄 merchant-dashboard.tsx
      - 📄 not-found.tsx
      - 📄 payment-links.tsx
      - 📄 payouts.tsx
      - 📄 SignIn.tsx
      - 📄 SignUp.tsx
      - 📄 supabaseClient.ts
      - 📄 transactions.tsx
      - 📄 Unauthorized.tsx
    - 📄 App.tsx
    - 📄 index.css
    - 📄 main.tsx
  - 📄 index.html
- 📂 server/
  - 📄 index.ts
  - 📄 routes.ts
  - 📄 storage.ts
  - 📄 vite.ts
- 📄 drizzle.config.ts
- 📄 netlify.toml
- 📄 postcss.config.js
- 📄 tailwind.config.ts
- 📄 vite.config.ts


## TS Dependencies

### \vite.config.ts
Dependencies:
- vite
- @vitejs/plugin-react
- path

### \tailwind.config.ts
Dependencies:
- tailwindcss
- tailwindcss-animate
- @tailwindcss/typography

### \server\vite.ts
Dependencies:
- express
- fs
- path
- vite
- http
- ../vite.config
- nanoid

### \server\storage.ts
Dependencies:
- crypto

### \server\routes.ts
Dependencies:
- express
- http
- ./storage
- ./index
- zod

## JS Dependencies

### \postcss.config.js
No dependencies found

## TSX Dependencies

### \client\src\pages\Unauthorized.tsx
Dependencies:
- react
- wouter
- @/components/ui/button

### \client\src\pages\transactions.tsx
Dependencies:
- @tanstack/react-query
- react
- @/components/ui/card
- @/components/ui/badge
- @/components/ui/button
- @/components/ui/input
- @/components/ui/select
- @/components/ui/table
- lucide-react
- date-fns

### \client\src\pages\SignUp.tsx
Dependencies:
- react
- wouter
- @/components/ui/button
- @/components/ui/input
- @/components/ui/label
- @/components/ui/card
- @/lib/supabaseClient

### \client\src\pages\SignIn.tsx
Dependencies:
- react
- wouter
- @/components/ui/button
- @/components/ui/input
- @/components/ui/label
- @/components/ui/card
- @/lib/supabaseClient

### \client\src\pages\payouts.tsx
Dependencies:
- @tanstack/react-query
- react
- @/components/ui/card
- @/components/ui/badge
- @/components/ui/button
- @/components/ui/input
- @/components/ui/dialog
- @/components/ui/form
- @/components/ui/table
- lucide-react
- @/hooks/use-toast
- react-hook-form
- @hookform/resolvers/zod
- @/lib/queryClient
- zod
- date-fns



## Key Components
- TBD

## Integration Points
- TBD

## Technical Considerations
- TBD

## Implementation Notes
- TBD
