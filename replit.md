# PayMerch - Global Payment Platform

## Overview
PayMerch is a comprehensive digital payment platform for merchants, similar to Flutterwave or PayChangu. It provides an easy-to-use interface for accepting payments globally, managing transactions, generating payment links, tracking analytics, and requesting payouts.

## Current State
**Phase**: MVP Development - Frontend Complete  
**Last Updated**: 2025-11-07

The application features a professional fintech design with:
- Beautiful landing page with hero section, features, pricing, and how-it-works sections
- Complete merchant dashboard with sidebar navigation
- Transaction management with search and filtering
- Payment link generation and sharing
- Real-time analytics with charts (revenue trends, payment methods, geographic distribution)
- Payout management system
- Customer checkout page with multiple payment method support
- Full dark mode support with theme toggle
- Mobile-responsive design throughout

## Recent Changes
- **2025-11-07**: Initial MVP frontend implementation
  - Created complete data schema for merchants, transactions, payment links, and payouts
  - Built all React components and pages with exceptional visual quality
  - Implemented professional fintech UI with trust indicators and security badges
  - Added theme provider for dark/light mode switching
  - Integrated Recharts for analytics visualization
  - Created responsive landing page with generated hero images
  - Set up sidebar navigation using Shadcn UI components

## Project Architecture

### Frontend Structure
- **Landing Page** (`/`): Marketing site with hero, features, pricing, how it works, and CTA sections
- **Dashboard** (`/dashboard`): Merchant overview with key metrics and recent activity
- **Transactions** (`/dashboard/transactions`): Complete transaction history with search/filter
- **Payment Links** (`/dashboard/payment-links`): Create and manage shareable payment links
- **Analytics** (`/dashboard/analytics`): Charts showing revenue trends, payment methods, geographic data
- **Payouts** (`/dashboard/payouts`): Request and track withdrawals to bank accounts
- **Checkout** (`/checkout/:linkId`): Customer-facing payment page with multiple payment methods

### Data Models
- **Merchants**: Business accounts with balance, revenue, and transaction counts
- **Transactions**: Payment records with customer info, amounts, status, and payment methods
- **Payment Links**: Shareable URLs for accepting payments
- **Payouts**: Withdrawal requests from merchant balance to bank accounts

### Tech Stack
- **Frontend**: React + TypeScript + Tailwind CSS + Shadcn UI
- **Routing**: Wouter
- **Forms**: React Hook Form + Zod validation
- **Data Fetching**: TanStack Query
- **Charts**: Recharts
- **Icons**: Lucide React + React Icons
- **Backend**: Express.js (to be implemented)
- **Storage**: In-memory (MemStorage) for MVP

## Design System
- **Primary Color**: Blue (`hsl(221 83% 53%)`) - Trust and professionalism
- **Fonts**: Inter (sans), JetBrains Mono (mono)
- **Components**: Shadcn UI with custom theming
- **Spacing**: Consistent 4/6/8/12/16 unit scale
- **Interactions**: Hover elevations, smooth transitions

## User Preferences
- Professional fintech aesthetic with trust-building elements
- Clean, modern design inspired by Stripe and Flutterwave
- Multi-currency support (USD, EUR, GBP, NGN, KES, GHS, ZAR)
- Multiple payment methods (card, mobile money, bank transfer)

## Next Steps
1. Implement backend API endpoints for all features
2. Set up in-memory storage with complete CRUD operations
3. Connect frontend to backend with proper data fetching
4. Add error handling and loading states throughout
5. Test all user journeys end-to-end
