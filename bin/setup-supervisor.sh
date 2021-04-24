#!/usr/bin/env bash
sudo /var/www/html/boilerplate/backend/venv/bin/supervisord -c /var/www/html/boilerplate/conf/supervisord.conf 
sudo /var/www/html/boilerplate/backend/venv/bin/supervisorctl -c /var/www/html/boilerplate/conf/supervisord.conf update
sudo /var/www/html/boilerplate/backend/venv/bin/supervisorctl -c /var/www/html/boilerplate/conf/supervisord.conf reread