FROM php:8.3-fpm-alpine

# Install system dependencies
# RUN apk add --no-cache git curl libpng libpng-dev libjpeg-turbo-dev libwebp-dev zlib-dev libxpm-dev gd-dev zip libzip-dev
RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    oniguruma-dev \
    libxml2-dev \
    zip \
    unzip \
    # Required for building PHP extensions
    autoconf \
    g++ \
    make

# Install PHP extensions
# RUN docker-php-ext-install pdo pdo_mysql gd zip exif pcntl
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd


COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# RUN curl -fsSL https://bun.sh/install | bash
# ENV PATH="/root/.bun/bin:${PATH}"

# Alternative Bun installation method
RUN case "$(uname -m)" in \
    aarch64) ARCH="aarch64" ;; \
    x86_64) ARCH="x64" ;; \
    *) echo "Unsupported architecture"; exit 1 ;; \
    esac && \
    wget -q https://github.com/oven-sh/bun/releases/latest/download/bun-linux-${ARCH}.zip && \
    unzip bun-linux-${ARCH}.zip && \
    mv bun-linux-${ARCH}/bun /usr/local/bin/bun && \
    rm -rf bun-linux-${ARCH}.zip bun-linux-${ARCH}

COPY . /var/www

COPY --chown=www-data:www-data . /var/www

WORKDIR /var/www

RUN bun run build
RUN php artisan key:generate

# RUN chown -R www-data:www-data /var/www/html \
#     && chmod -R 775 /var/www/html/storage \
#     && chmod -R 775 /var/www/html/bootstrap/cache

# EXPOSE 9000

# CMD ["php-fpm"]