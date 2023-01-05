# THIS REPO
CREATE A BRANCH FOR:
    - Server
    - Client - Costumer
    - Client - Employee
    - Database

## Frontend

### Setup

`sudo apt update`
`sudo apt install npm`
`npm install`

You may need: `npm config set strict-ssl false`

#### Unexpected ERROR message on npm start (Possible fix)
You may need to manually delete the node_modules generated files and run
`npm install`

If error persist, redo the last step and after running `npm install`, do `npm i -S @react-google-maps/api`.

#### Unexpected token on npm start (Possible fix)

`curl https://raw.githubusercontent.com/creationix/nvm/v0.30.2/install.sh | bash`

`nvm install 18.0.0`

Try again

### Run

`npm start`
