# Quality Assurance Engineering - Updated Codebase Guide (October 2026)

**Backend runtime: Laravel 13 / PHP 8.3+.** The applicable server application is located at `codebase/api/`. Install its Composer dependencies, copy `.env.example` to `.env`, generate the app key, migrate and seed the database, and start the API on port **8000**.

```bash
cd api
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve --port=8000
php artisan test
```

The **React / JavaScript frontends** and **Flutter mobile client** remain in their original languages. They use the new Laravel API. For mobile Android emulators the base URL is `http://10.0.2.2:8000`; for a physical phone use your computer's LAN IP.

The teaching code is for local education, not live banking, live payments, or production deployment. Never upload real customer information.

## Test strategy after the Laravel conversion

Start `api/` with Composer and `php artisan serve --port=8000`; seed its database with `php artisan migrate --seed`. Run React with `cd web && npm install && npm run dev`. To run tests use `cd qa && npm install && npm test` for JS unit/component tests, `RUN_LARAVEL_INTEGRATION=1 npm run test:api` for HTTP integration tests while Laravel is running, and `npx playwright install chromium && npm run test:e2e` for browser journeys. Test fixtures include **10 sample products** to match existing Playwright expectations.
