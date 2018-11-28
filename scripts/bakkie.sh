#!/usr/bin/env bash

set -u
set -e
set -x

echo Building $1

echo Build distribution of this branch
export NODE_ENV=development

npm --production=false \
	--unsafe-perm \
	--verbose \
	--registry=https://repo.datapunt.amsterdam.nl/repository/npm-group/ \
	install 
npm run build

echo Publish distribution in web-dir
OUTDIR=/var/www/html/atlas/builds/$1/dcatd_admin
if [ ! -d ${OUTDIR} ];
	then mkdir -p ${OUTDIR};
fi
cp -r build/* ${OUTDIR}

echo Done
