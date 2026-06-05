# Pinned PocketBase. Bump PB_VERSION to upgrade.
FROM alpine:3.20

ARG PB_VERSION=0.39.1
# TARGETARCH is provided automatically by BuildKit (amd64 / arm64).
ARG TARGETARCH=amd64

RUN apk add --no-cache ca-certificates unzip wget

RUN wget -q "https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_${TARGETARCH}.zip" -O /tmp/pb.zip \
    && unzip /tmp/pb.zip -d /pb \
    && rm /tmp/pb.zip

# Migrations are baked into the image and auto-applied to the persisted
# pb_data volume on startup.
COPY pb_migrations /pb/pb_migrations

EXPOSE 8090

CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8090", "--dir=/pb/pb_data", "--migrationsDir=/pb/pb_migrations"]
