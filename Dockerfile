# FROM php:8.3-fpm
# Use the official Bun image as the base image
FROM --platform=$TARGETPLATFORM oven/bun:latest

WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    lsb-release \
    ca-certificates \
    apt-transport-https \
    software-properties-common

# Add PHP repository and install PHP 8.1
RUN curl -sSL https://packages.sury.org/php/README.txt | bash -x
RUN apt-get update && apt-get install -y php8.2 \
    php8.2-cli \
    php8.2-common \
    php8.2-curl \
    php8.2-mbstring \
    php8.2-mysql \
    php8.2-xml \
    php8.2-zip \
    php8.2-bcmath \
    php8.2-fpm

# LABEL traefik.docker.network=passbolt_default
#     traefik.enable="true" \
#     traefik.http.routers.portfolio-http.entrypoints="web" \
#     traefik.http.routers.portfolio-http.rule="Host(`portfolio.vinetaerentraute.id.lv`)" \
#     traefik.http.routers.portfolio-https.entrypoints="websecure" \
#     traefik.http.routers.portfolio-https.rule="Host(`portfolio.vinetaerentraute.id.lv`)" \
#     traefik.http.routers.portfolio-https.tls="true" \
#     traefik.http.routers.portfolio-router.tls.certresolver="letsencrypt" \
#     traefik.http.services.portfolio.loadbalancer.server.port="8100"

# Install PHP extensions
# RUN docker-php-ext-install pdo pdo_mysql gd zip exif pcntl
# RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# RUN curl -fsSL https://bun.sh/install | bash
# ENV PATH="/root/.bun/bin:${PATH}"

# Alternative Bun installation method
# RUN case "$(uname -m)" in \
#     aarch64) ARCH="aarch64" ;; \
#     x86_64) ARCH="x64" ;; \
#     *) echo "Unsupported architecture"; exit 1 ;; \
#     esac && \
#     wget -q https://github.com/oven-sh/bun/releases/latest/download/bun-linux-${ARCH}.zip && \
#     unzip bun-linux-${ARCH}.zip && \
#     mv bun-linux-${ARCH}/bun /usr/local/bin/bun && \
#     rm -rf bun-linux-${ARCH}.zip bun-linux-${ARCH}

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

EXPOSE 8000
CMD ["php", "artisan", "serve"]

# EXPOSE 9000

# CMD ["php-fpm"]