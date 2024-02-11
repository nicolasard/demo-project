#!/bin/bash
# Script to tag the repo

echo Tagging next version $NEXT_TAG

git config --global user.email "<>"
git config --global user.name "Bender bot"
  
git tag -a $NEXT_TAG -m "Automatic tag to $NEXT_TAG"

git push origin --tags
