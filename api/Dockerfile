FROM php:8.4-cli-alpine
RUN apk add --no-cache git unzip sqlite-dev oniguruma-dev libzip-dev \
    && docker-php-ext-install pdo_sqlite mbstring
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
WORKDIR /app
COPY composer.json ./
RUN composer install --no-dev --no-interaction --no-progress --prefer-dist --no-scripts
COPY . .
RUN composer dump-autoload --no-interaction --optimize \
    && mkdir -p database storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs \
    && touch database/database.sqlite
EXPOSE 8000
CMD ["sh", "-c", "test -f .env || cp .env.example .env; php artisan key:generate --force; php artisan migrate --force; exec php artisan serve --host=0.0.0.0 --port=8000"]
