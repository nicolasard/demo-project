#!/bin/bash
# Script to get the next version based on git tags


echo "Script to get last git version"

git fetch --unshallow
git fetch --tags

MAJOR=0
echo "Major version: $MAJOR"
#LAST_VERSION=$(git describe --match "v$MAJOR.[0-9]*" --abbrev=0 HEAD)
# Note: the || : is to make the command always exit 0 in the exit code
LAST_VERSION=$(git describe --match "v$MAJOR.[0-9]*" --abbrev=0 --tags || :)
if [ -z "${LAST_VERSION}" ]; then
    echo "No minor version tag found for the current major version, creating the first minor..."
    LAST_VERSION=v${MAJOR}.0
fi
echo "Last version: $LAST_VERSION"
LAST_MINOR_VERSION=$(echo $LAST_VERSION |sed "s|v${MAJOR}.\([0-9\.]*\).*|\1|")
NEXT_MINOR_VERSION=$(($LAST_MINOR_VERSION+1))
NEXT_TAG="v${MAJOR}.${NEXT_MINOR_VERSION}"
echo "Next version: $NEXT_TAG"

echo "NEXT_TAG=${NEXT_TAG}" >> $GITHUB_ENV

echo "Use the env. env.NEXT_TAG variable to get the last version tag."
