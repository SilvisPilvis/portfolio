# Use the official Bun image as the base image
FROM --platform=$TARGETPLATFORM oven/bun:latest

# Set ARGs for build-time variables
# ARG BUILD_DATE
# ARG VERSION
# ARG COMMIT_SHA
ARG DOMAIN_NAME

# Add metadata labels
LABEL maintainer="Silvestrs Lignickis <silvestrsl47@gmail.com>" \
      version="${VERSION}" \
      description="Laravel application with Inertia/Svelte frontend using Bun" \
      # org.opencontainers.image.created="${BUILD_DATE}" \
      # org.opencontainers.image.version="${VERSION}" \
      # org.opencontainers.image.revision="${COMMIT_SHA}" \
      org.opencontainers.image.source="https://github.com/SilvisPilvis/portfolio"

# Add Traefik labels
LABEL traefik.docker.network="passbolt_default" \
      traefik.enable="true" \
      traefik.http.routers.portfolio-http.entrypoints="web" \
      traefik.http.routers.portfolio-http.rule="Host(`${DOMAIN_NAME}`)" \
      traefik.http.routers.portfolio-https.entrypoints="websecure" \
      traefik.http.routers.portfolio-https.tls="true" \
      traefik.http.routers.portfolio-router.tls.certresolver="letsencrypt" \
      traefik.http.services.portfolio-router.loadbalancer.server.port="8000"


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

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY . .

#Update composer dependencies
RUN composer update

# Install PHP dependencies
RUN composer install --no-interaction --no-plugins --no-scripts

# Install Bun dependencies
RUN bun install

# Build Svelte app
RUN bun run build

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage

# Expose port 8000
EXPOSE 8000

# Start the application using JSON array format
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
