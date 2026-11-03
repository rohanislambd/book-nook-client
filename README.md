# 📚 BookNook — Online Community Library

[![Live Site](https://img.shields.io/badge/Live_Demo-BookNook-1a3a2a?style=for-the-badge&logo=vercel&logoColor=white)](https://book-nook-jade-eight.vercel.app/)
[![Server Repo](https://img.shields.io/badge/Backend_Repo-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/rohanislambd/book-nook-server)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**BookNook** is a modern, community-driven digital library and frictionless book circulation platform. It empowers readers to explore curated literary collections, contribute books from their personal shelves, borrow available volumes with real-time copy tracking, and return them seamlessly to foster a shared reading sanctuary.

---

## 🔗 Quick Links

- 🌐 **Live Website:** [https://book-nook-jade-eight.vercel.app/](https://book-nook-jade-eight.vercel.app/)
- ⚙️ **Backend Repository:** [https://github.com/rohanislambd/book-nook-server](https://github.com/rohanislambd/book-nook-server)

---

## 🎯 Project Highlights

- **Full End-to-End Type Safety:** Engineered with **TypeScript 5**, ensuring strict compile-time type verification, robust data models (`Book`, `BorrowRecord`, `User`), and reliable developer tooling.
- **Frictionless Circular Borrowing:** Real-time digital circulation system powered by atomic database operations (`$inc`) that guarantee fair access and prevent double-borrowing without library bureaucracy.
- **Next.js 16 Request Proxy & Route Protection:** Intelligent server proxy (`src/proxy.ts`) that intercepts unauthorized visits, preserves the intended destination in `callbackUrl`, presents informative toasts, and automatically returns the user to the requested page post-login.
- **Fluid Micro-Interactions & Motion:** Rich visual experience crafted with **Framer Motion**, including staggered scroll entrances, card lift on hover, interactive dialog modals, and smooth mobile navigation.
- **Dual Authentication Architecture:** Secure credential-based login (with regex password validation) alongside 1-click Google OAuth Single Sign-On powered by **Better Auth**.
- **Dynamic SEO & Social Sharing:** Automatic OpenGraph preview cards and route-specific metadata (`generateMetadata`) for every catalog volume.

---

## 🚀 Key Features

### 📖 1. Community Catalog & Smart Discovery
- **Comprehensive Library Shelves:** Browse the entire collection of community-contributed books with category badges, authors, and live availability counts.
- **Live Search & Category Filtering:** Instant client-side filtering across genres (*Fiction*, *Science*, *History*, *Kids*, *Others*) and search queries for titles and authors.
- **Availability Toggle:** Filter down to volumes currently on the shelf with active copies ready to borrow.

### 🔄 2. 1-Click Borrow & Return Circulation
- **Atomic Stock Management:** Borrowing a book decrements `availableCopies` in real time; returning a volume instantly restocks it for other community readers.
- **Borrowing Modal:** Visual confirmation displaying the book thumbnail, borrower identity, today's checkout date, and scheduled return date.
- **Anti-Duplication Rules:** Automatically prevents multiple active borrows of the same title by the same user.

### 👤 3. Reader Dashboard & Contribution Suite
- **My Added Books (`/my-book`):** Centralized hub to manage contributed titles. Edit volume information (title, category, description, copies) through pre-populated modals or safely delete titles with confirmation alerts.
- **My Borrows (`/my-borrows`):** Interactive overview of all checked-out books with borrow dates, return deadlines, and one-click instant returns.
- **Interactive Reader Profile Dialog:** Cloned profile card showcasing the reader's avatar, join role, total books contributed, and total active borrows.

### 🛡️ 4. Authentication & Route Protection
- **Better Auth Integration:** Email/Password registration with client validation and Google OAuth integration with custom callback URL routing.
- **Next.js 16 Proxy Middleware:** Protects `/add-book`, `/my-book`, `/my-borrows`, and `/books/:id`. Unauthenticated requests to book details display a warning toast and smoothly redirect to login.
- **Session-Aware Navigation:** Prevents authenticated users from accessing auth routes (`/login`, `/register`) by redirecting them straight to the catalog or dashboard.

### ✨ 5. UI/UX & Responsive Design
- **Editorial Typography:** Blends the warmth of serif headings (`Fraunces`) with the modern legibility of `Plus Jakarta Sans`.
- **Responsive Navigation:** Clean desktop layout that gracefully transitions to an animated sliding drawer on screens below `1024px` to eliminate layout overflow.
- **Custom 404 & Loading States:** Dedicated "Lost in the Stacks" 404 recovery page and non-blocking skeleton/spinner loading indicators.

---

## 🛠️ Technologies Used

### Frontend
| Technology | Description |
| :--- | :--- |
| **TypeScript 5** | Strict type safety, interface data models, and compile-time error prevention |
| **Next.js 16** | App Router, Server/Client components, and dynamic routing |
| **React 19** | Concurrent rendering and latest React features |
| **Tailwind CSS v4** | Modern utility-first CSS styling engine |
| **shadcn/ui** | Accessible UI primitives (Dialogs, Popovers, Badges, Buttons) |
| **Framer Motion** | Declarative page and component animations |
| **Better Auth** | Robust authentication client (Credentials & Google OAuth) |
| **Lucide React** | Clean, minimalist icon set |
| **React Hot Toast** | Lightweight toast notifications |
| **Swiper.js** | Touch-enabled hero banner carousel slider |

### Backend & Database
| Technology | Description |
| :--- | :--- |
| **Node.js & Express** | RESTful API server handling books, borrows, and user data |
| **MongoDB & MongoDB Atlas** | NoSQL document database storing catalog and circulation records |
| **Atomic Operations** | `$inc` operators ensuring safe concurrent borrow/return states |
| **JWT & Bearer Tokens** | Stateless token authentication between frontend and API |

---

## 📂 Project Structure

```text
book-nook/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx          # Member login with Google OAuth & callbackUrl
│   │   │   └── register/page.tsx       # Member registration
│   │   ├── add-book/                   # Add new volume form & metadata
│   │   ├── books/
│   │   │   ├── [id]/page.tsx           # Book details & dynamic metadata
│   │   │   └── page.tsx                # Catalog page with search & category filters
│   │   ├── my-book/                    # Contributor dashboard (edit / delete books)
│   │   ├── my-borrows/                 # Reader dashboard (active borrows & returns)
│   │   ├── globals.css                 # Global styling & Tailwind v4 theme variables
│   │   ├── layout.tsx                  # Root layout with providers & typography
│   │   ├── loading.tsx                 # Global loading spinner
│   │   ├── not-found.tsx               # Custom 404 "Lost in the Stacks" page
│   │   └── page.tsx                    # Homepage (Banner, Arrivals, Works, Reviews)
│   ├── components/
│   │   ├── books/                      # BookCard with hover lift & view transitions
│   │   ├── home/                       # Banner, NewArrivals, BorrowingWorks, TopCategories
│   │   ├── my borrow/                  # BorrowBookDialog modal
│   │   ├── my-book/                    # MyBookEditDialog & MyBookDeleteDialog
│   │   ├── profile/                    # ProfileDialog drawer
│   │   ├── shared/                     # Navbar, Footer, GoogleLoginToast
│   │   └── ui/                         # shadcn/ui components (button, dialog, popover...)
│   ├── context/
│   │   └── BookContext.tsx             # Global state for catalog and borrow metrics
│   ├── lib/
│   │   ├── auth.ts                     # Better Auth server configuration
│   │   ├── auth-client.ts              # Better Auth client configuration
│   │   └── utils.ts                    # Class variance authority & cn helper
│   ├── proxy.ts                        # Next.js 16 request proxy (route protection)
│   └── types/                          # TypeScript definitions (Book, User, Borrow)
├── public/                             # Static assets and placeholders
├── package.json
└── README.md
```

---

## ⚙️ Getting Started Locally

### Prerequisites
- **Node.js**: `v20.x` or higher
- **npm** / **pnpm** / **yarn**
- Running instance of the [BookNook Backend Server](https://github.com/rohanislambd/book-nook-server)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rohanislambd/book-nook.git
   cd book-nook
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   # Backend API Endpoint
   NEXT_PUBLIC_API_URL=http://localhost:8000

   # Better Auth Configuration
   BETTER_AUTH_SECRET=your_super_secret_key
   BETTER_AUTH_URL=http://localhost:3000

   # Optional Google OAuth Credentials
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🧪 Build & Production

To create an optimized production build:

```bash
npm run build
npm run start
```

---

## 🤝 Contributing

Contributions, feedback, and suggestions are warmly welcomed!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


---

<p align="center">
  Crafted with care for book lovers everywhere • <strong>BookNook Community Library</strong>
</p>
