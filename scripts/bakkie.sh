#!/usr/bin/env bash

set -u
set -e
set -x

echo Building $1

echo Build distribution of this branch
export NODE_ENV=test

npm run build

echo Publish distribution in web-dir
OUTDIR=/var/www/html/atlas/builds/$1/dcatd_admin
if [ ! -d ${OUTDIR} ];
	then mkdir -p ${OUTDIR};
fi
cp -r dist/* ${OUTDIR}

echo Done
