FROM php:8.2-fpm-alpine

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev

# Install system dependencies
RUN apk add --no-cache git curl libpng libpng-dev libjpeg-turbo-dev libwebp-dev zlib-dev libxpm-dev gd-dev zip libzip-dev

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql gd zip exif pcntl

WORKDIR /var/www


COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"

COPY . /var/www

COPY --chown=www-data:www-data . /var/www

# Configure PHP for production
# RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini" && \
#     sed -i 's/memory_limit = 128M/memory_limit = 256M/' "$PHP_INI_DIR/php.ini"

# COPY . .
# COPY .env .env

# COPY composer.* ./
# COPY package.json bun.lockb ./
# RUN composer install --no-interaction --no-dev --optimize-autoloader
# RUN bun install

# COPY . .

RUN bun run build
RUN php artisan key:generate

# RUN chown -R www-data:www-data /var/www/html \
#     && chmod -R 775 /var/www/html/storage \
#     && chmod -R 775 /var/www/html/bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]