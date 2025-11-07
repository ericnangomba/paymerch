# Design Guidelines: Digital Payment Platform

## Design Approach

**Selected System**: Material Design + Stripe-inspired fintech patterns
**Justification**: This is a utility-focused, information-dense fintech application where trust, clarity, and data visualization are paramount. The design must balance professional credibility with modern aesthetics.

**Key Design Principles**:
- Trust through clarity and consistency
- Data-first visualization with intuitive dashboards
- Professional fintech aesthetic that conveys security
- Efficient workflows for merchant operations

---

## Core Design Elements

### Typography

**Primary Font**: Inter (Google Fonts) - modern, highly legible for financial data
**Secondary Font**: JetBrains Mono (for transaction IDs, account numbers, currency values)

**Hierarchy**:
- Hero Headlines: text-5xl to text-6xl, font-bold
- Section Headers: text-3xl to text-4xl, font-semibold
- Dashboard Metrics: text-2xl to text-3xl, font-bold (numerical data)
- Card Titles: text-xl, font-semibold
- Body Text: text-base, font-normal
- Transaction Details: text-sm, font-medium
- Metadata/Timestamps: text-xs to text-sm, font-normal, reduced opacity

---

### Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16
- Component internal spacing: p-4, p-6
- Section spacing: py-12, py-16, py-20
- Card gaps: gap-6, gap-8
- Dashboard grid gaps: gap-4

**Container Strategy**:
- Dashboard content: max-w-7xl mx-auto px-6
- Marketing sections: max-w-6xl mx-auto
- Forms: max-w-2xl

---

## Component Library

### Navigation
**Merchant Dashboard Nav**: Fixed sidebar (w-64) with icon + label navigation items, collapsible on mobile to top bar with hamburger menu. Include: Dashboard, Transactions, Payments, Analytics, Settings, Profile sections.

**Marketing Site Header**: Transparent on hero, becomes solid on scroll. Include logo, navigation links (Products, Pricing, Developers, Company), "Sign In" and "Get Started" CTAs.

### Dashboard Components

**Metric Cards**: 
- Grid layout (grid-cols-1 md:grid-cols-2 lg:grid-cols-4)
- Each card displays: Icon, Label, Large numerical value, Percentage change indicator with up/down arrow
- Cards include: Total Revenue, Transactions, Success Rate, Active Merchants

**Transaction Table**:
- Full-width responsive table with columns: Transaction ID, Customer, Amount, Payment Method, Status, Date/Time
- Status badges with distinct visual states (completed/green, pending/yellow, failed/red)
- Pagination controls at bottom
- Search and filter controls above table

**Charts Section**:
- Revenue chart: Line graph showing payment volume over time
- Payment methods breakdown: Donut chart
- Geographic distribution: World map with transaction hotspots
- Use Chart.js or similar library via CDN

**Quick Actions Panel**:
- Prominent "Generate Payment Link" button
- "Request Payout" button
- "View API Documentation" link

### Payment Forms

**Checkout Page**:
- Two-column layout (lg): Payment form on left, order summary card on right
- Single column on mobile
- Payment method tabs: Card, Mobile Money, Bank Transfer
- Form fields: Card number, Expiry, CVV, Name, Email
- Trust indicators: SSL badge, supported payment logos, "Secured by [Platform Name]"

**Payment Link Generator**:
- Simple form: Amount, Description, Customer Email (optional)
- Generated link display with copy button
- QR code generation for mobile payments

### Marketing/Landing Pages

**Hero Section** (h-screen):
- Two-column layout: Left side with headline, subheadline, CTA buttons (primary "Get Started", secondary "View Demo")
- Right side: Hero image showing dashboard preview or payment interface mockup
- Trust indicators below: "Trusted by 10,000+ merchants" with logos of sample companies

**Features Section** (py-20):
- Three-column grid (grid-cols-1 md:grid-cols-3)
- Each feature: Icon (Heroicons), bold title, 2-3 line description
- Features include: Multiple Payment Methods, Real-time Analytics, Secure Infrastructure, Global Coverage, Easy Integration, 24/7 Support

**Pricing Section**:
- Three pricing tiers in card layout (grid-cols-1 md:grid-cols-3)
- Highlight middle tier as "Most Popular"
- Each tier: Plan name, price (large, bold), feature list with checkmarks, CTA button

**How It Works Section**:
- Four-step process with numbered icons
- Two-column alternating layout (image left/right alternating per step)
- Steps: Sign Up → Integrate → Accept Payments → Get Paid

**Testimonials**:
- Two-column grid of testimonial cards
- Each card: Quote, customer name, company, photo placeholder

**CTA Section** (py-24):
- Centered content with headline "Ready to start accepting payments?"
- Large primary CTA button
- Secondary text: "No setup fees. Cancel anytime."

**Footer**:
- Four-column layout: Product links, Company links, Resources, Contact info
- Newsletter signup form
- Payment method logos (Visa, Mastercard, etc.)
- Social media icons
- Copyright and legal links

---

### Buttons & Controls

**Primary Actions**: Solid buttons with medium border radius (rounded-lg), px-6 py-3
**Secondary Actions**: Outline buttons, same sizing
**Destructive Actions**: Red-toned buttons for critical operations

---

### Icons

**Library**: Heroicons (via CDN)
**Usage**: Navigation icons, feature icons, status indicators, payment method icons

---

## Images

**Hero Image**: Dashboard preview showing the merchant interface with transaction data, charts, and metrics. Modern, clean screenshot with realistic but sanitized data. Place on right side of hero section.

**Feature Section Images**: Optional small illustrations or icons representing each feature (can use icon library instead).

**How It Works Images**: Four images showing: 1) Signup form, 2) Code snippet/API integration, 3) Payment checkout interface, 4) Bank account/payout screen. Place alternating left/right in the How It Works section.

**Trust Badges**: Payment provider logos (Visa, Mastercard, PayPal, etc.) in footer and checkout page.