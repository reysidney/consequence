
##This is for development used. Steps written are for Ubuntu 16.04

### Note: Steps with '--' can be SKIPPED if already executed.

### --Create a WWW folder in /var. This is where we will place our sites and pull from repository
```
sudo su
mkdir -p /var/www/html/
cd /var/www/html
```

### --Install git if not yet installed
```
sudo apt-get update
sudo apt-get -y install git
```

### -- Pull code from repo and create necessary folders
```
git clone https://github.com/reysidney/django_reactjs_boilerplate.git
mkdir -p /var/www/html/boilerplate/logs/nginx/
```	

### Install the Basic packages for the server
```
cd /var/www/html/boilerplate
./bin/setup.sh
```

### Activate virtual environment and install the dependencies
```
cd /var/www/html/boilerplate/backend/
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
```

# SETUP DB
## Create the database and execute the queries below
    sudo -u postgres psql postgres
        CREATE USER admin WITH PASSWORD '@dm1n_p@55';
        CREATE DATABASE appdb WITH ENCODING = 'UTF8';
        ALTER ROLE admin SUPERUSER;
        GRANT ALL PRIVILEGES ON DATABASE appdb TO admin;
        GRANT ALL PRIVILEGES ON ALL TABLES in schema public TO admin;
        \q

## SETUP FRONTEND

### Install npm packages
```
cd /var/www/html/boilerplate/frontend
npm install
```

### Setup nginx file
```
cd /var/www/html/boilerplate
./bin/setup-nginx.sh
```

### Build frontend(Use this for QA or Prod server)
```
cd /var/www/html/boilerplate/frontend
npm run build
```

### Build frontend(Use this for localhost development)
```
cd /var/www/html/boilerplate/frontend
npm start
```

### Change Allowed Hosts in settings.py for your local/vm ip.
```
sudo nano /var/www/html/boilerplate/backend/project/boilerplate/settings.py
```

### Run Supervisor
```
cd /var/www/html/boilerplate/
./bin/setup-supervisor.sh
sudo supervisorctl -c conf/supervisord.conf start all
```	

### When server is restarted, SUPERVISOR needs to start. We can do this by adding this line to crontab
```
crontab -e
```
### Add this line
```
@reboot /var/www/html/boilerplate/bin/setup-supervisor.sh
```

##You should now be able to access boilerplate project on your localhost or in the server using the IP.


