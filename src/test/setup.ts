import '@testing-library/jest-dom/vitest';

// jsdom doesn't implement window.scrollTo — the app calls it on navigation
// (see ShopContext's navigateTo/createOrder). Stub it so tests don't spam
// "Not implemented" warnings for a call that's a no-op in the test DOM anyway.
window.scrollTo = (() => {}) as typeof window.scrollTo;
