<div align="center">

# EChat

**Your AI-Powered Chat Assistant**

A modern, real-time AI chat application built with React 19 and powered by Google's Gemini AI. Converse naturally with an intelligent assistant through a sleek, responsive interface with secure user authentication.

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=flat-square&logo=clerk&logoColor=white)](https://clerk.com/)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-Flash-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)

[Live Demo](#) &bull; [Report Bug](https://github.com/mabdullah356/EChat/issues) &bull; [Request Feature](https://github.com/mabdullah356/EChat/issues)

</div>

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Scripts](#scripts)
- [API Integration](#api-integration)
- [Authentication](#authentication)
- [Routing](#routing)
- [Styling](#styling)
- [Component Breakdown](#component-breakdown)
- [State Management](#state-management)
- [Build & Deployment](#build--deployment)
- [Code Quality](#code-quality)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

---

## About

**EChat** is a full-stack AI chat interface that enables users to have natural language conversations with Google's Gemini AI model. The application features a clean, minimalist design with real-time typing indicators, message history, and Clerk-powered authentication for a personalized user experience.

### Why EChat?

- **Instant AI Responses** -- Powered by Google Gemini Flash for fast, intelligent replies
- **Secure Authentication** -- Clerk integration with modal-based sign-in/sign-up
- **Personalized Experience** -- Authenticated users see their own avatar in conversations
- **Responsive Design** -- Seamless experience across desktop, tablet, and mobile
- **Modern Stack** -- Built with the latest React 19, Vite 8, and Tailwind CSS 4

---

## Features

| Feature | Description |
|---|---|
| **AI Chat Interface** | Real-time conversation with Google Gemini AI (gemini-flash-latest model) |
| **User Authentication** | Clerk-powered sign-in/sign-up with modal UI and user profile management |
| **Personalized Avatars** | Authenticated users display their Clerk profile picture in messages |
| **Typing Indicator** | Animated bouncing dots that show when AI is generating a response |
| **Message Bubbles** | Distinct styled bubbles for user (black) and AI (gray) messages |
| **Auto-Scroll** | Chat automatically scrolls to the latest message |
| **Keyboard Shortcuts** | Enter to send, Shift+Enter for new lines |
| **Auto-Resizing Input** | Text input field grows dynamically with content |
| **Responsive Layout** | Fully responsive from mobile to large desktop screens |
| **Error Handling** | Graceful error messages for API failures and missing configuration |
| **Persistent Header** | Sticky navigation bar with logo, login/signup controls |
| **Landing Page** | Clean hero page with call-to-action to start chatting |

---

## Demo

<div align="center">

### Landing Page
The home page presents a clean, centered layout with the EChat branding and a prominent "Start Chatting" button.

### Chat Interface
The chat page features a full-height conversation view with distinct user and AI message bubbles, an animated typing indicator, and a fixed input bar at the bottom.

### Authentication
Clerk provides modal-based sign-in and sign-up flows. Authenticated users see their profile avatar in the header and within chat messages.

</div>

---

## Tech Stack

### Core

| Technology | Version | Purpose |
|---|---|---|
| **React** | `^19.2.4` | UI component library |
| **React DOM** | `^19.2.4` | DOM rendering engine |
| **Vite** | `^8.0.1` | Build tool and development server |

### Routing

| Technology | Version | Purpose |
|---|---|---|
| **react-router-dom** | `^7.14.0` | Client-side routing and navigation |

### Authentication

| Technology | Version | Purpose |
|---|---|---|
| **@clerk/react** | `^6.1.4` | User authentication, session management, and profile UI |

### HTTP & API

| Technology | Version | Purpose |
|---|---|---|
| **axios** | `^1.14.0` | HTTP client for Gemini API requests |

### UI & Icons

| Technology | Version | Purpose |
|---|---|---|
| **react-icons** | `^5.6.0` | Icon library (IoSend, BsChatSquareDotsFill) |

### Styling

| Technology | Version | Purpose |
|---|---|---|
| **Tailwind CSS** | `^4.2.2` | Utility-first CSS framework |
| **@tailwindcss/vite** | `^4.2.2` | Tailwind CSS Vite plugin integration |
| **PostCSS** | `^8.5.8` | CSS transformation and processing |
| **Autoprefixer** | `^10.4.27` | Automatic vendor prefix insertion |

### Code Quality

| Technology | Version | Purpose |
|---|---|---|
| **ESLint** | `^9.39.4` | JavaScript/JSX linting |
| **@eslint/js** | `^9.39.4` | ESLint core JavaScript rules |
| **eslint-plugin-react-hooks** | `^7.0.1` | React hooks linting rules |
| **eslint-plugin-react-refresh** | `^0.5.2` | React Fast Refresh linting |

---

## Architecture

### Application Flow

```
index.html
  └─ main.jsx
       └─ React.StrictMode
            └─ ClerkProvider (authentication context)
                 └─ App.jsx
                      └─ BrowserRouter
                           ├─ Header (persistent sticky navigation)
                           └─ Routes
                                ├─ "/" ──────> Home (landing page)
                                └─ "/chat" ──> Chat (AI conversation)
```

### Data Flow

```
User Input ──> InputBar ──> handleSend()
                                │
                                ├─> Append user message to state
                                ├─> Set loading = true
                                ├─> POST to Gemini API (full message history)
                                │       │
                                │       ├─> Success: Append AI response to state
                                │       └─> Error: Append error message to state
                                │
                                └─> Set loading = false
                                        │
                                        └─> Auto-scroll to bottom
```

### Key Architectural Decisions

| Decision | Rationale |
|---|---|
| **No backend** | Direct client-side API calls for simplicity and rapid prototyping |
| **Local state only** | Messages stored in React state; no persistence layer needed for current scope |
| **Co-located components** | Related sub-components (MessageBubble, TypingIndicator, InputBar) live in Chat.jsx for cohesion |
| **Tailwind CSS v4** | Modern `@import "tailwindcss"` syntax with Vite plugin for optimal build performance |
| **Clerk modals** | Non-redirect auth flow keeps users in-app during sign-in/sign-up |

---

## Project Structure

```
EChat/
├── public/
│   ├── favicon.svg                  # Custom purple lightning bolt favicon
│   └── icons.svg                    # SVG sprite sheet (social icons)
├── src/
│   ├── assets/
│   │   ├── AiBotTestImg.jpg         # AI bot avatar image
│   │   └── userTestImg.jpg          # Default user avatar (fallback)
│   ├── components/
│   │   ├── Header.jsx               # Sticky nav bar with auth controls
│   │   └── pages/
│   │       ├── Chat.jsx             # Main chat interface (173 lines)
│   │       │   ├── MessageBubble    # Individual message rendering
│   │   │   ├── TypingIndicator      # Animated loading dots
│   │   │   └── InputBar             # Auto-resize message input
│   │       └── Home.jsx             # Landing page
│   ├── App.jsx                      # Root component with routing
│   ├── main.jsx                     # Entry point with ClerkProvider
│   └── index.css                    # Global styles (Tailwind import)
├── .env                             # Environment variables (gitignored)
├── .gitignore
├── eslint.config.js                 # ESLint flat config
├── index.html                       # Vite HTML entry point
├── package.json
├── package-lock.json
├── tailwind.config.js               # Tailwind CSS configuration
└── vite.config.js                   # Vite build configuration
```

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** -- Version 18.0 or higher (recommended: 20+)
- **npm** -- Version 9.0 or higher (comes with Node.js)
- **Git** -- For cloning the repository

You will also need accounts for:

- [**Google AI Studio**](https://aistudio.google.com/apikey) -- To obtain a Gemini API key
- [**Clerk**](https://clerk.com/) -- To obtain a Clerk publishable key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/mabdullah356/EChat.git
   cd EChat
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the project root (see [Environment Variables](#environment-variables)).

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173`

### Environment Variables

Create a `.env` file in the project root directory:

```env
# Google Gemini API Key
# Get yours at: https://aistudio.google.com/apikey
VITE_GEMINI_API=your_gemini_api_key_here

# Clerk Publishable Key
# Get yours at: https://dashboard.clerk.com/ -> API Keys
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

| Variable | Required | Description |
|---|---|---|
| `VITE_GEMINI_API` | Yes | Google Gemini API key for AI chat completions |
| `VITE_CLERK_PUBLISHABLE_KEY` | Yes | Clerk publishable key for authentication |

> **Security Note:** The `.env` file is included in `.gitignore` and will not be committed to version control. Never expose your API keys in client-side code committed to public repositories.

### Running the App

| Command | Description |
|---|---|
| `npm run dev` | Start development server with Hot Module Replacement (HMR) |
| `npm run build` | Create optimized production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check for code quality issues |

---

## Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `vite` | Launches the Vite development server with HMR on `localhost:5173` |
| `build` | `vite build` | Generates an optimized production build in the `dist/` directory |
| `lint` | `eslint .` | Runs ESLint across all JS/JSX files to enforce code quality |
| `preview` | `vite preview` | Serves the production build locally for preview/testing |

---

## API Integration

### Google Gemini AI

EChat uses the **Google Generative Language API** with the `gemini-flash-latest` model for AI chat completions.

| Property | Value |
|---|---|
| **Endpoint** | `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent` |
| **Method** | `POST` |
| **Auth** | API key as URL query parameter (`?key=`) |
| **HTTP Client** | Axios |
| **Model** | `gemini-flash-latest` |

#### Request Format

```json
{
  "contents": [
    {
      "role": "user",
      "parts": [{ "text": "Hello, how are you?" }]
    },
    {
      "role": "model",
      "parts": [{ "text": "I'm doing well, thank you!" }]
    },
    {
      "role": "user",
      "parts": [{ "text": "Tell me about React." }]
    }
  ]
}
```

#### Response Parsing

```javascript
response.data.candidates[0].content.parts[0].text
```

#### Error Handling

- **Missing API key:** Displays "API key is not configured."
- **Network/API errors:** Displays "Sorry, an error occurred while communicating with the AI. Please verify your API key and connection."

---

## Authentication

EChat uses **Clerk** for user authentication, providing a seamless sign-in/sign-up experience.

### Integration Points

| Location | Integration |
|---|---|
| `main.jsx` | `ClerkProvider` wraps the entire application with auth context |
| `Header.jsx` | `SignInButton`, `SignUpButton`, `UserButton`, and `Show` for conditional UI |
| `Chat.jsx` | `useUser()` hook for accessing the authenticated user's profile image |

### Authentication Flow

1. **Unauthenticated users** see "Login" and "Sign up" buttons in the header
2. **Sign-in/Sign-up** opens a modal (non-redirect) for seamless UX
3. **Authenticated users** see their Clerk profile avatar in the header via `<UserButton>`
4. **Chat messages** display the user's Clerk profile picture instead of the default avatar
5. **Sign-out** redirects to the home page (`afterSignOutUrl="/"`)

### Auth State Components

| Component | Description |
|---|---|
| `<Show when="signed-out">` | Renders login/signup buttons for unauthenticated users |
| `<Show when="signed-in">` | Renders the user profile button for authenticated users |
| `<UserButton>` | Clerk's pre-built user profile management dropdown |
| `<SignInButton mode="modal">` | Modal-based sign-in trigger |
| `<SignUpButton mode="modal">` | Modal-based sign-up trigger |

> **Note:** All routes are currently accessible without authentication. Auth is used for UI personalization (user avatars) rather than route protection.

---

## Routing

EChat uses **react-router-dom v7** for client-side routing.

| Route | Component | Description |
|---|---|---|
| `/` | `Home` | Landing page with branding and CTA |
| `/chat` | `Chat` | Main AI chat interface |

### Route Configuration

```jsx
<BrowserRouter>
  <Header />        {/* Persistent across all routes */}
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/chat" element={<Chat />} />
  </Routes>
</BrowserRouter>
```

### Navigation

- **Header Logo** -- Clicking the logo/name navigates to `/`
- **"Start Chatting" button** -- On the home page, navigates to `/chat`
- **Post-sign-out** -- Redirects to `/` via Clerk's `afterSignOutUrl`

---

## Styling

### Tailwind CSS v4

EChat uses **Tailwind CSS v4** with the modern Vite plugin integration.

| Aspect | Details |
|---|---|
| **Framework** | Tailwind CSS v4.2 |
| **Integration** | `@tailwindcss/vite` plugin (no PostCSS config needed) |
| **Syntax** | Modern `@import "tailwindcss"` (v4) |
| **Configuration** | `tailwind.config.js` with default theme |

### Design System

| Element | Style |
|---|---|
| **Primary Color** | Black (`bg-black`, `text-black`) |
| **Secondary Color** | Gray scale (`gray-50` through `gray-200`) |
| **Background** | White (`bg-white`) |
| **Border Radius** | Rounded corners (`rounded-2xl`, `rounded-xl`, `rounded-full`) |
| **Typography** | Default Tailwind font stack, bold headings |
| **Shadows** | Subtle shadows on interactive elements |

### Responsive Breakpoints

| Breakpoint | Prefix | Usage |
|---|---|---|
| Mobile (default) | -- | Base styles, `px-4` padding |
| Medium | `md:` | `md:px-10` chat padding |
| Large | `lg:` | `lg:px-20` chat padding |

### Animations

| Animation | Element | Effect |
|---|---|---|
| `animate-bounce` | Typing indicator dots | Bouncing dots with staggered delays |
| `transition-colors` | Buttons, input | Smooth color transitions on hover/focus |
| `active:scale-95` | Sign-up button | Press-down scale effect |
| `focus-within:border-black` | Input container | Border color change on focus |

---

## Component Breakdown

### `main.jsx` -- Application Entry Point

- Renders the React 19 app into `#root`
- Wraps with `React.StrictMode` for development checks
- Provides `ClerkProvider` with the publishable key for authentication context

### `App.jsx` -- Root Component

- Sets up `BrowserRouter` for client-side routing
- Renders persistent `Header` above all routes
- Defines `/` (Home) and `/chat` (Chat) routes

### `Header.jsx` -- Navigation Bar

- Sticky header (`sticky top-0 z-50`) with bottom border
- Left: Clickable logo + "EChat" branding
- Right: Conditional auth UI (Login/SignUp when signed out, UserButton when signed in)
- Uses Clerk's `<Show>` component for conditional rendering

### `Home.jsx` -- Landing Page

- Full-screen centered layout
- Displays AI bot avatar as hero image
- "EChat" heading with subtitle
- "Start Chatting" CTA button navigating to `/chat`

### `Chat.jsx` -- Chat Interface (173 lines)

Contains 4 sub-components:

#### `MessageBubble`
- Renders individual chat messages with role-based styling
- User messages: right-aligned, black background, white text
- AI messages: left-aligned, gray background, black text
- Displays authenticated user's Clerk avatar or default fallback

#### `TypingIndicator`
- Animated three-dot bouncing indicator
- Staggered animation delays for wave effect
- Shown during AI response generation

#### `InputBar`
- Fixed at bottom of viewport
- Auto-resizing textarea (max 32 lines)
- Send button with `IoSend` icon
- Keyboard: Enter sends, Shift+Enter adds new line
- Disabled during loading or when empty

#### `Chat` (default export)
- Manages `messages`, `input`, and `isLoading` state
- `handleSend()` -- Sends messages to Gemini API with full conversation history
- Auto-scrolls to bottom on new messages
- Empty state: "Ready to chat! Send a message to get started."

---

## State Management

EChat uses **React local state** (no external state management library).

| State | Type | Location | Purpose |
|---|---|---|---|
| `messages` | `Array<{role, parts}>` | `Chat` component | Stores conversation history |
| `input` | `string` | `Chat` component | Current input field value |
| `isLoading` | `boolean` | `Chat` component | Loading state during API calls |

### Message Format

```javascript
{
  role: "user" | "model",
  parts: [{ text: "message content" }]
}
```

> **Note:** Messages are stored in-memory and are lost on page refresh. There is no conversation persistence layer.

---

## Build & Deployment

### Production Build

```bash
npm run build
```

This generates an optimized build in the `dist/` directory:

```
dist/
├── assets/
│   ├── index-[hash].js        # Minified JavaScript bundle
│   ├── index-[hash].css       # Optimized CSS
│   └── AiBotTestImg-[hash].jpg
├── favicon.svg
├── icons.svg
└── index.html
```

### Build Optimization

- **Tree-shaking** -- Unused code is eliminated
- **Code splitting** -- Automatic chunk splitting by Vite
- **Asset hashing** -- Cache-busting filenames for long-term caching
- **CSS optimization** -- Tailwind purges unused styles
- **Minification** -- JavaScript and CSS are minified

### Deployment

EChat can be deployed to any static hosting platform:

| Platform | Configuration |
|---|---|
| **Vercel** | Zero-config -- auto-detects Vite |
| **Netlify** | Build command: `npm run build`, Publish dir: `dist` |
| **GitHub Pages** | Set `base` in `vite.config.js` if deploying to a subpath |
| **Cloudflare Pages** | Build command: `npm run build`, Output dir: `dist` |
| **AWS S3 + CloudFront** | Upload `dist/` contents to S3 bucket |

### Pre-Deployment Checklist

- [ ] Set environment variables on the hosting platform
- [ ] Ensure `VITE_GEMINI_API` is a valid Gemini API key
- [ ] Ensure `VITE_CLERK_PUBLISHABLE_KEY` is a valid Clerk key
- [ ] Configure Clerk's allowed origins for your deployment domain
- [ ] Run `npm run lint` to verify code quality
- [ ] Run `npm run build` to verify the build succeeds
- [ ] Test the deployed build locally with `npm run preview`

---

## Code Quality

### ESLint Configuration

EChat uses **ESLint v9** with the flat config format.

| Config | Description |
|---|---|
| `@eslint/js` recommended | Core JavaScript best practices |
| `react-hooks` recommended | React hooks rules (exhaustive-deps, rules-of-hooks) |
| `react-refresh` Vite | Ensures components are compatible with Fast Refresh |

### Custom Rules

```javascript
'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }]
```

This allows unused variables starting with uppercase letters (typically React component imports) without triggering warnings.

### Linting

```bash
npm run lint
```

Run this command before committing to ensure code quality standards are met.

---

## Browser Support

| Browser | Supported |
|---|---|
| Chrome | Yes (latest) |
| Firefox | Yes (latest) |
| Safari | Yes (latest) |
| Edge | Yes (latest) |
| Mobile Chrome | Yes |
| Mobile Safari | Yes |

> EChat targets modern browsers that support ES2020+ features and CSS Grid/Flexbox.

---

## Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make** your changes
4. **Lint** your code
   ```bash
   npm run lint
   ```
5. **Commit** with a descriptive message
   ```bash
   git commit -m "feat: add your feature description"
   ```
6. **Push** to your fork
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open** a Pull Request

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Description |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `style:` | Code style changes (formatting, no logic change) |
| `refactor:` | Code refactoring (no feature change) |
| `docs:` | Documentation changes |
| `chore:` | Build process or auxiliary tool changes |

---

## License

This project is not currently licensed. Please contact the author for usage permissions.

---

## Contact

**Muhammad Abdullah**

- GitHub: [@mabdullah356](https://github.com/mabdullah356)
- Repository: [EChat](https://github.com/mabdullah356/EChat)

---

## Acknowledgements

- [React](https://react.dev/) -- UI library
- [Vite](https://vite.dev/) -- Build tool
- [Tailwind CSS](https://tailwindcss.com/) -- CSS framework
- [Clerk](https://clerk.com/) -- Authentication
- [Google Gemini AI](https://ai.google.dev/) -- AI model API
- [React Icons](https://react-icons.github.io/react-icons/) -- Icon library
- [Axios](https://axios-http.com/) -- HTTP client

---

<div align="center">

**Built with modern web technologies for a seamless AI chat experience.**

</div>
