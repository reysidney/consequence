#!/usr/bin/env bash

THIS_DIR=`dirname $0`
. $THIS_DIR/../backend/venv/bin/activate

cd $THIS_DIR/../backend/project/

gunicorn --workers 4 \
--timeout 60 \
--log-level=debug \
--bind 127.0.0.1:8081 boilerplate.wsgi
