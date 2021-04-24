#!/usr/bin/env bash

sudo apt-get update

#Install POSTGRES 9.6 and POSTGIS 2.3
sudo add-apt-repository "deb http://apt.postgresql.org/pub/repos/apt/ xenial-pgdg main"
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt update
sudo apt-get -y install postgresql-9.6 postgresql-contrib-9.6
sudo apt-get -y install postgis postgresql-9.6-postgis-2.3

#Install other packages
sudo apt-get -y install python3-venv python3-pip python-dev libpq-dev nginx
sudo apt -y install python3-pip

#Install nodeJS 
sudo apt-get -y install curl
cd ~
curl -sL https://deb.nodesource.com/setup_9.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install nodejs
sudo apt-get -y install npm
sudo apt-get -y install build-essential
sudo apt-get update
sudo -H pip install --upgrade pip

#Install gdal
sudo add-apt-repository -y ppa:ubuntugis/ppa
sudo apt update  
sudo apt install gdal-bin python-gdal python3-gdal libgdal-dev

