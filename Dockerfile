FROM php:8.2-fpm-alpine

# Install system dependencies
RUN apk add --no-cache git curl libpng libpng-dev libjpeg-turbo-dev libwebp-dev zlib-dev libxpm-dev gd-dev zip libzip-dev

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql gd zip exif pcntl


COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN curl -fsSL https://bun.sh/install | sh
ENV PATH="/root/.bun/bin:${PATH}"


COPY . /var/www

COPY --chown=www-data:www-data . /var/www

WORKDIR /var/www

RUN bun run build
RUN php artisan key:generate

# RUN chown -R www-data:www-data /var/www/html \
#     && chmod -R 775 /var/www/html/storage \
#     && chmod -R 775 /var/www/html/bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]