#!/usr/bin/env bash

# ───────────────────────────────
# VARIABLES
# ───────────────────────────────
ROOT_DIR="$(git rev-parse --show-toplevel)"
DB_SOURCES="Prisma"
CONTAINER_DB_NAME="catarchy-postgres"
DB_NAME="mydb"
DB_USER="johndoe"
DB_PASS="randompassword"

usage() {
  echo "============================================="
  echo "Usage: $0 <arg1>"
  echo "arg1: [migrate_local]"
  echo "============================================="
  echo "Example: $0 migrate_local"
  echo "============================================="
  echo "Received: $0 $1"
  echo "============================================="
}

validateEnvironment() {
  case $1 in
    "migrate_local") ;;
    *) usage; exit 1 ;;
  esac
}

migrate_local() {
  local cPWD=$PWD
  local DB_URL="postgres://${DB_USER}:${DB_PASS}@localhost:5432/${DB_NAME}"

  echo "▶ Starting PostgreSQL with Docker…"
  docker_err=$(docker run -p 5432:5432 --name ${CONTAINER_DB_NAME} \
    -e POSTGRES_DB=${DB_NAME} \
    -e POSTGRES_USER=${DB_USER} \
    -e POSTGRES_PASSWORD=${DB_PASS} \
    -d postgres:15 2>&1 > /dev/null)

  if [ -n "$docker_err" ]; then
    if [[ "$docker_err" =~ "already in use" ]]; then
      echo "$docker_err"
      exit 1
    else
      echo "▶ Re-using existing container ${CONTAINER_DB_NAME}"
    fi
  fi

  echo "⏳ Waiting for PostgreSQL to accept connections…"
  sleep 15   # 일반적으로 10–15초면 충분
}

# ───── main ─────
main() {
  [ -z "$1" ] && usage && exit 1
  validateEnvironment "$1"

  case "$1" in
    "migrate_local") migrate_local ;;
    *) usage ;;
  esac
}

main "$@"
