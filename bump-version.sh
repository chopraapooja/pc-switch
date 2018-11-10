#!/bin/bash

if  [ "$1" = "" ] ; then
    echo "Please supply a new version."
    exit
fi

yarn version --no-git-tag-version --new-version=$1 &&
yarn build &&
git add dist &&
git commit -am "Publish version $1" &&
git tag $1 &&
git push git@gitlab.cee.redhat.com:redhataccess/rhc-images-app.git master &&
git push git@gitlab.cee.redhat.com:redhataccess/rhc-images-app.git --tags
