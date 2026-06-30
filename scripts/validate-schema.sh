#!/bin/bash
# scripts/validate-schema.sh
# Usage: ./validate-schema.sh https://battrehy.se/kliniker/stockholm/example-clinic/

URL=$1
RESULT=$(curl -s "https://searchconsole.googleapis.com/v1/urlTestingTools/mobileFriendlyTest:run" \
  -H "Content-Type: application/json" \
  -d "{\"url\": \"$URL\"}")
echo $RESULT
