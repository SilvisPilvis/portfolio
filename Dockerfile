FROM php:8.3-fpm-alpine

WORKDIR /var/www/html

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
    nginx \
    # Required for building PHP extensions
    autoconf \
    g++ \
    make

LABEL traefik.docker.network="passbolt_default" \
    traefik.enable="true" \
    traefik.http.routers.portfolio-http.entrypoints="web" \
    traefik.http.routers.portfolio-http.rule="Host(`portfolio.vinetaerentraute.id.lv`)" \
    traefik.http.routers.portfolio-https.entrypoints="websecure" \
    traefik.http.routers.portfolio-https.rule="Host(`portfolio.vinetaerentraute.id.lv`)" \
    traefik.http.routers.portfolio-https.tls="true" \
    traefik.http.routers.portfolio-router.tls.certresolver="letsencrypt" \
    traefik.http.services.portfolio.loadbalancer.server.port="8100"

# Install PHP extensions
# RUN docker-php-ext-install pdo pdo_mysql gd zip exif pcntl
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Get latest Composer
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

# Remove default server definition
# RUN rm -rf /var/www/html

# Copy existing application directory contents
COPY . .
# COPY docker/app.conf /etc/nginx/conf.d/app.conf

# Copy existing application directory permissions
# COPY --chown=www-data:www-data . /var/www

# COPY package.json bun.lockb ./

RUN composer install
RUN composer update
RUN bun install
RUN bun run build
# RUN php artisan key:generate

# RUN chown -R www-data:www-data /var/www/html \
#     && chmod -R 775 /var/www/html/storage \
#     && chmod -R 775 /var/www/html/bootstrap/cache

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage

# Change current user to www
# USER www-data

EXPOSE 8100
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8100"]

# EXPOSE 9000

# CMD ["php-fpm"]