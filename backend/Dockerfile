FROM php:8.1-alpine

ARG user
ARG uid

COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/
COPY --from=composer:2.7 /usr/bin/composer /usr/local/bin/composer

RUN install-php-extensions mbstring exif pcntl sockets bcmath zip pdo_mysql
#RUN apk add --update curl openssl git nano su-exec

WORKDIR /var/www

COPY . .

RUN addgroup -g $uid $user \
  && adduser -u $uid -D -G $user $user

RUN chown -R $user:www-data /var/www
USER $user

ENV COMPOSER_HOME=/var/www/.composer_cache
RUN composer install --no-dev
RUN composer dump-autoload

#USER root
ENTRYPOINT php artisan serve --host=0.0.0.0

EXPOSE 8000
