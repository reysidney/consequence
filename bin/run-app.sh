#!/usr/bin/env bash

## PID FILE
#PID=/tmp/lms.pid
#PORT=8000

#[ -f $PID ] && \
#  ( echo "PID file exists.." && exit 5 )

# TODO: Change port on prod
#THIS_DIR=$((dirname $0))
THIS_DIR=`dirname $0`
. $THIS_DIR/../backend/venv/bin/activate

## change directory
cd $THIS_DIR/../backend/project/

gunicorn --workers 4 \
--timeout 60 \
--log-level=debug \
--bind 127.0.0.1:8082 uploader.wsgi
