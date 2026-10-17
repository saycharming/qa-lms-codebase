# Manual test cases — ShopDesk

Status defaults to **Not run** until a student executes the case. Record Actual, Evidence and final Status during class. All cases assume a running API and app, unless specified.

| ID | Risk | Steps / test data | Expected | Technique | Status |
|---|---|---|---|---|---|
| TC-AUTH-001 | R-02 | Register unique `ada1@example.test` / `Password123!` | HTTP 201, user and token, no password hash | EP | Not run |
| TC-AUTH-002 | R-02 | Repeat registration with same email | HTTP 409 `email_taken` | EP | Not run |
| TC-AUTH-003 | R-06 | Register with 7-character password | HTTP 400 `validation_error` | BVA | Not run |
| TC-AUTH-004 | R-02 | Log in with known valid account | HTTP 200, JWT | EP | Not run |
| TC-AUTH-005 | R-02 | Wrong password | HTTP 401 | Negative | Not run |
| TC-PROD-001 | R-04 | GET `/api/products` after seed | 10 items, each integer `price_kobo` | EP | Not run |
| TC-PROD-002 | R-04 | GET `/api/products?search=desk` | 2 matching catalogue entries | EP | Not run |
| TC-PROD-003 | R-04 | Search unmatched nonsense | 200 with `data:[]` | EP | Not run |
| TC-PROD-004 | R-04 | GET `/api/products/9999` | 404, `not_found` | Negative | Not run |
| TC-CART-001 | R-01 | Add one hub | Cart shows `₦25,000.00` | EP | Not run |
| TC-CART-002 | R-01 | On detail screen change quantity to 2 | Total is 5,000,000 kobo | BVA | Not run |
| TC-CART-003 | R-05 | Remove last cart line | Empty cart shown | EP | Not run |
| TC-ORDER-001 | R-01 | Logged-in customer places order | HTTP 201, server total, cart clears | EP | Not run |
| TC-ORDER-002 | R-03 | POST order without token | HTTP 401, no order | Negative | Not run |
| TC-ORDER-003 | R-07 | Request quantity above stock | HTTP 409, stock unchanged | BVA | Not run |
| TC-ORDER-004 | R-02 | Customer A fetches customer B order ID | HTTP 403 | Negative | Not run |

**Handbook caveat:** The sample Week 1 manual catalogue includes shipping/99-quantity and stricter password constraints that do not exist in the earlier supplied storefront/API. Those should be flagged as requirement gaps or demonstrated only through `web/src/lib` practice functions, rather than marked as passing end-to-end features.
