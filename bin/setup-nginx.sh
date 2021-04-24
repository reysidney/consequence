#!/usr/bin/env bash

sudo rm /etc/nginx/sites-enabled/default
sudo rm /etc/nginx/sites-available/default
sudo rm /etc/nginx/sites-available/app.conf
sudo rm /etc/nginx/sites-enabled/app.conf
sudo cp /var/www/html/boilerplate/conf/nginx.conf /etc/nginx/sites-available/app.conf
sudo ln -s /etc/nginx/sites-available/app.conf /etc/nginx/sites-enabled/app.conf
sudo /etc/init.d/nginx restart