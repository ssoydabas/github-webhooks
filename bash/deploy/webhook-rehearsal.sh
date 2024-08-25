#!/bin/bash

REPO_PATH="$HOME/apps/personal/webhook-rehearsal"
BRANCH="main"

cd "$REPO_PATH" || exit

git fetch origin "$BRANCH"

git reset --hard origin/"$BRANCH"

docker-compose down

docker-compose up --build -d

echo "Repository updated and Docker containers restarted successfully."
