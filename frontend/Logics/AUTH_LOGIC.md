# GameVault — Auth Logic Reference

> Open this file months later to understand what frontend auth logic needs replacing with FastAPI.

---

## 1. Current Mock Authentication Flow

```
User opens the Login modal from a gated in-app action, or visits `/login` directly → form calls `authService.login()` → hardcoded demo-account check → localStorage save → React state update.
```

- **Demo account:** `demo@gamevault.local` / `GameVault@123` (hardcoded in `authService.ts`)
- **Signup users:** Created entirely in frontend, stored only in localStorage
- **No real password validation** beyond frontend form checks
- **Session persists** via localStorage until explicit logout

---

## 2. Where Auth State Is Stored

| Layer | Location | Key/Path |
|-------|----------|----------|
| React state | `AuthContext` (`src/contexts/AuthContext.tsx`) | Auth state plus Login-modal visibility/return path in memory |
| Persistence | `localStorage` | Key: `gamevault_auth_session` |
| Service layer | `authService.ts` | Functions: `saveSession`, `loadSession`, `clearSession` |

**localStorage shape:**
```json
{
  "authenticated": true,
  "user": { "id", "firstName", "lastName", "email", "dob", "createdAt" }
}
```

---

## 3. How Logged-In vs Logged-Out UI Is Determined

Every component that needs auth-aware behavior calls:

```tsx
const { authenticated, user } = useAuth()
```

- `authenticated` is a boolean — used for all conditional rendering
- `user` contains the current user object (or `null`)
- Auth state auto-restores from localStorage on app mount (`AuthProvider` useEffect)

**Pattern:** `{authenticated ? <FullUI /> : <LockedOverlay />}` or `{!authenticated && <LoginRedirect />}`

---

## 4. Route Access Rules

| Route | Public? | Unauthenticated Behavior |
|-------|---------|--------------------------|
| `/login` | ✅ Yes | Shows login form |
| `/signup` | ✅ Yes | Shows signup form |
| `/home` | ✅ Yes | Full home page (ActivityFeed + ProgressOverview hidden) |
| `/games/:gameId` | ✅ Yes | Full game details |
| `/games/:gameId/missions/:missionId` | ✅ Yes | Full mission details |
| `/community` | ✅ Yes | Full community browsing |
| `/library` | ⚠️ Partial | Shows locked overlay + skeleton structure |
| `/profile` | ❌ No | Redirects to `/login` (PrivateRoute) |

---

## 5. Auth-Gated Features (Require Login)

### Actions that open login when unauthenticated:
- **Continue Playing** → LockedOverlay on ContinuePlaying section
- **Add to Library** button → Navigates to `/login`
- **Like/Dislike reviews** → `authRequired={true}` + `onAuthRequired={handleLogin}` on ReviewCard
- **Reply to reviews** → Same pattern as like/dislike
- **Library navigation** (Header/Sidebar/MobileNav) → Redirects to `/login`
- **Profile navigation** → Redirects to `/login`

### Sections hidden when unauthenticated:
- ActivityFeed (Recent Activity on Home)
- ProgressOverview (Your Progress on Home)

---

## 6. Which Actions Open Login/Signup Modal

| Trigger | Action |
|---------|--------|
| Click "Login to Continue" (ContinuePlaying overlay) | Opens Login modal |
| Click "Create Account" (any overlay) | Navigate to `/signup` |
| Visit Library while unauthenticated | Route stays available and shows a locked skeleton |
| Visit Profile while unauthenticated | `PrivateRoute` redirects to `/login` |
| Click Like/Dislike/Reply on ReviewCard (`authRequired`) | Calls `onAuthRequired` callback → opens Login modal |
| Click "Add to Library" button (unauthenticated) | Opens Login modal |

`LoginModal` is used for gated actions that begin inside the application. The Login/Signup pages remain available as direct full-page routes (`/login`, `/signup`).

---

## 7. Where Mock User/Account Logic Lives

| File | Purpose |
|------|---------|
| `src/services/authService.ts` | **Single source of truth** — login, signup, session management, validation |
| `src/contexts/AuthContext.tsx` | React Context Provider — wraps app, exposes `login`, `logout`, `authenticated`, `user` |
| `src/hooks/useAuth.ts` | Re-exports `useAuth` from context (thin wrapper) |
| `src/types/auth.ts` | TypeScript interfaces: `User`, `AuthState`, `LoginFormData`, `SignupFormData` |

---

## 8. What to Replace When Connecting FastAPI

### Must replace:
1. **`authService.ts`** — Replace hardcoded demo account with API calls (`POST /auth/login`, `POST /auth/signup`)
2. **Session persistence** — Replace localStorage with JWT token storage (httpOnly cookie or secure storage)
3. **`AuthContext.tsx`** — Replace mock login/logout with API-based auth flow, add token refresh logic
4. **`loadSession()` on mount** — Replace with API call to verify/refresh token

### Should preserve:
1. **`useAuth()` hook interface** — Keep the same return shape (`{ authenticated, user, login, logout }`) so UI components don't break
2. **Route structure** — Public vs protected route split should remain the same
3. **`authRequired` prop pattern on ReviewCard** — This abstraction works regardless of auth backend
4. **LockedOverlay component** — Reusable for any auth-gated section

### Should add:
1. **Request interceptor** — Attach JWT to API requests (axios/fetch wrapper)
2. **401/403 handling** — Redirect to login on unauthorized responses
3. **Token refresh logic** — Silent token renewal before expiry
4. **Logout API call** — Invalidate server-side session/token

---

## 9. Important Assumptions for Backend Implementation

| Assumption | Reason |
|------------|--------|
| User object shape must match `User` interface | Used across all pages (Profile, Header, Sidebar) |
| Session key is `gamevault_auth_session` in localStorage | Current persistence mechanism |
| Routes `/login` and `/signup` must remain available | Existing auth entry points — don't remove |
| Public routes (`/home`, `/games/*`, `/community`) must work without auth token | Browsing is public by design |
| `authRequired` prop on ReviewCard expects a callback, not just boolean | Parent component decides what happens on auth click |
| PrivateRoute redirects to `/login` with `state.from` | Used for post-login redirect preservation |

---

## Quick Reference: Files to Modify for Backend Swap

```
src/services/authService.ts    ← Replace all mock logic with API calls
src/contexts/AuthContext.tsx   ← Replace login/logout with token-based auth
src/hooks/useAuth.ts           ← May need updating if AuthContext shape changes
src/main.tsx                   ← Add axios/fetch interceptor for JWT (Phase 10)
```

**Files that should NOT change:**
- `src/components/ui/LockedOverlay.tsx` — Reusable, backend-agnostic
- `src/components/reviews/ReviewCard.tsx` — Uses `authRequired` abstraction
- All page components — They only consume `useAuth()`, don't implement auth logic

## Controlled Frontend Audit — Checkpoint (2026-09-19)

**Status: identified, not yet fixed.** Logged-out overlays need to be made true overlays over non-sensitive skeletons; `/library` must not render personal mock data beneath its locked state. The current app sends gated in-app actions to `/login`, but the current product requirement is a Login modal for those actions while keeping direct `/login` and `/signup` pages. Public game, mission, and community browsing remains the intended access model; profile remains a redirecting private route.

### Group 1 result (2026-09-19)

**Completed.** The public game, mission, and community routes now compile cleanly. The reported Community `Link` issue is not present in the current source: the component imports `Link` from React Router.

### Group 2 result (2026-09-19)

**Completed.** `LockedOverlay` is now absolutely positioned over its containing skeleton rather than taking space in the layout. Home preserves the underlying Continue Playing and Your Library structures; Recent Activity and Progress Overview remain hidden when logged out. Library does not fetch or render personal mock data when logged out and displays only a locked skeleton. In-app login gates (overlays, Add to Library, and review reactions) open `LoginModal`; direct auth routes remain available. Community remains readable without a page-level overlay, while its interactive review controls open the modal. `/profile` continues to redirect unauthenticated users to `/login`.

## Final Auth Checkpoint (2026-09-19)

**Current mock behavior:** auth state and modal state live in `AuthContext`; session persistence remains `localStorage` through `authService.ts`. Public browsing is `/home`, game details, mission details, and `/community`. `/library` is a locked skeleton for logged-out users, and `/profile` redirects to `/login`. Login modal gates actions originating inside the app; `/login` and `/signup` remain direct-page flows. FastAPI integration must replace only the mock service/session internals while preserving this public/private route and action boundary.

The collapsible sidebar is visual/navigation state only; it has no authentication implications.
