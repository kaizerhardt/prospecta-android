#!/usr/bin/env bash
set -euo pipefail
gradle --no-daemon assembleDebug
cp app/build/outputs/apk/debug/app-debug.apk Prospecta-debug.apk
echo "Built: Prospecta-debug.apk"
