# 0) Pre requirements
nodejs version 10.14.2
$ npm i -g parcel-bundler@1.7.0


# 1) Setup
create .env file with project environment variables
$ npm install
$ cd client
Scan Viewer component  - run $ npm login 
login with given details and then
$ npm install


# 2) DB
CREATE DB
$ npm run create-db
or
sudo -u postgres createdb nfc_development

DROP DB
$ sudo -u postgres dropdb nfc_development


# 3) Migration
Create Migration
$ npm run migrate create user_table

DB Migrate
$ npm run migrate up
$ npm run migrate down


# 4) Running App
from client $ npm run dev
from root   $ npm run dev


# 5) Open
http://localhost:3000


#Structure
The client is compiled into the server, while uploading to heroku the server use build:deploy script from the client - the script installs the node modules and build the client into dist folder then all the unused resources are deleted from client and only dist folder is left.
  
# HEROKU 
Add to 'DATABASE_URL' env in the end of the string '?ssl=true' 

