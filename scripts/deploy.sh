#!/usr/bin/env bash
set -Eeuo pipefail
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd -- "$SCRIPT_DIR/.." && pwd)"
DEPLOY_BRANCH="${DEPLOY_BRANCH:-main}"
log() { printf '[jade-deploy] %s\n' "$1"; }
main() {
    cd "$PROJECT_DIR"
    log "Pulling latest code from GitHub"
    git fetch --all --prune
    git reset --hard "origin/${DEPLOY_BRANCH}"
    log "Stopping containers"
    docker compose down --remove-orphans || true
    log "Cleaning build cache"
    docker builder prune -f
    log "Rebuilding containers"
    docker compose build --pull --no-cache
    log "Starting containers"
    docker compose up -d --remove-orphans
    log "Waiting for containers to be healthy"
    sleep 15
    log "Running database migrations"
    docker exec -e DATABASE_URL="postgresql://jade_user:jade_secure_2026@db:5432/jade_db?schema=public" jade_backend npx prisma migrate deploy
    log "Copying static files for Nginx"
    rm -rf /root/jade-static /root/jade-public
    docker cp jade_frontend:/app/app/.next/static /root/jade-static
    docker cp jade_frontend:/app/app/public /root/jade-public
    chmod -R 755 /root/jade-static
    chmod -R 755 /root/jade-public
    chmod 755 /root
    systemctl reload nginx
    log "Deployment completed!"
    docker compose ps
}
main "$@"
