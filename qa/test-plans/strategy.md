# ShopDesk Test Strategy

**Purpose:** Decide whether ShopDesk is safe to release, using repeatable evidence.

## In scope
Authentication, products and search, cart, orders, stock and exact kobo totals, error responses, browser journeys.

## Not implemented / out of scope
Real payment processing, vouchers/discounts in live API, free shipping in live checkout, product creation/deletion, pagination, load testing and mobile-native apps. Week 2 `web/src/lib` helpers are isolated learning exercises, not storefront capabilities.

## Risk register (likelihood 1–5 × impact 1–5)
| Risk | L | I | Score | Coverage |
|---|---:|---:|---:|---|
| R-01 Wrong total |4|5|20| Unit, API, integration, E2E |
| R-02 Authentication bypass |3|5|15| API negatives, browser guards |
| R-03 Order without session |3|5|15| API 401 and redirect |
| R-04 Search wrong results |4|2|8| API query, E2E |
| R-05 Cart totals wrong after edits |3|4|12| Component and E2E |
| R-06 Misleading validation |3|2|6| Unit, API |
| R-07 Stock sold twice |3|5|15| Integration transaction tests |
| R-08 Small-screen layout broken |3|2|6| Mobile viewport Playwright |

## Gate criteria
All critical journeys pass; no open critical/high unresolved defects; test results documented with reproducible evidence; coverage target **80% line/statements/functions; 70% branches** after the full course suite is written. The starter suite deliberately does **not** enforce that 80% threshold yet.

## Test levels
Unit: Vitest. Component: Testing Library. API: Supertest. Integration: in-memory SQLite + Supertest. Browser: Playwright. CI: GitHub Actions.

## Environment & data
Local ports 4000 and 5173, Node 20. Each API test opens a fresh in-memory SQLite database. Browser tests register fresh customers. Never manually alter the real database to make a test green.

## Entry and exit
Entry: app boots, requirements known, test data available. Exit: critical scenarios pass across required browsers, relevant risks covered, severe defects addressed or release explicitly blocked, reproducible evidence archived.
