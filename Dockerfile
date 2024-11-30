# Dockerfile
FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Get Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash

# Set working directory
WORKDIR /var/www/html

# Copy existing application directory
COPY . .

# Install dependencies
RUN composer install --optimize-autoloader --no-dev
RUN bun install && bun run build

# Copy existing application directory permissions
RUN chown -R www-data:www-data /var/www/html

# Configure PHP-FPM to listen on port 80
RUN sed -i 's/listen = 127.0.0.1:9000/listen = 0.0.0.0:80/' /usr/local/etc/php-fpm.d/www.conf

# Expose port 80
EXPOSE 80

# Start PHP-FPM
CMD ["php-fpm"]