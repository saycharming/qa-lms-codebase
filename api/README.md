# PINTOP Qa - Laravel 13 API

This is a **Laravel/PHP backend**, not an Express project. Keep the frontend/Flutter tooling separate.

Requirements: PHP 8.3+, Composer and PHP extensions required by Laravel (including PDO and mbstring). The ZIP contains **source code, not the Composer vendor directory**.

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve --host=0.0.0.0 --port=8000
```

Run tests with `php artisan test`. Try `curl http://127.0.0.1:8000/api/health`. The React/Vite apps run separately with `npm install && npm run dev`; the Flutter app runs with `flutter pub get && flutter run`. Never commit `.env` or use the classroom API for real payments.

**Important:** Composer dependencies have to be installed on the destination machine; they are not bundled. The static code has been PHP-lint checked; full integration tests require Composer and the PHP extensions.
