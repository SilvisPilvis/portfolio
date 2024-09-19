# Use the official Bun image as the base image
FROM oven/bun:latest

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
RUN apt-get update && apt-get install -y php8.1 \
    php8.1-cli \
    php8.1-common \
    php8.1-curl \
    php8.1-mbstring \
    php8.1-mysql \
    php8.1-xml \
    php8.1-zip \
    php8.1-bcmath \
    php8.1-fpm

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY . .

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
