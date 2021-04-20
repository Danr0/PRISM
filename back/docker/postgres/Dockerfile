FROM postgres:13.1-alpine

COPY docker-entrypoint-init.d/001-init-user-db.sh /docker-entrypoint-initdb.d/001-init-user-db.sh
RUN chmod +x /docker-entrypoint-initdb.d/001-init-user-db.sh
