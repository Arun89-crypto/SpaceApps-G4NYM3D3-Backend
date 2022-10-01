# DataScienceHack2022-Backend

It is a sample REST API format with ACCESS_TOKENS & REFRESH_TOKENS providing us with Asymmetric Authentication.

Generate your RSA Keys from here:
https://travistidwell.com/jsencrypt/demo/

Documentation in PDF provided above

### To run the api

```shell
# To install the packages
npm i
# To run the server
yarn dev
```

### ENV file syntax

```env
NODE_ENV=development
PORT=3000
HOST=localhost
CORS_URL=*
DB_NAME="DataScienceHack2022-DB"
DB_URI="mongodb://127.0.0.1:27017"
ACCESS_TOKEN_PRIVATE_KEY="----RSA_256_ACCESS_TOKEN_PRIVATE_KEY----"
ACCESS_TOKEN_PUBLIC_KEY="----RSA_256_ACCESS_TOKEN_PUBLIC_KEY"
REFRESH_TOKEN_PRIVATE_KEY="----RSA_256_REFRESH_TOKEN_PRIVATE_KEY"
REFRESH_TOKEN_PUBLIC_KEY="----RSA_256_REFRESH_TOKEN_PUBLIC_KEY"
SUPPRESS_NO_CONFIG_WARNING=True
```

### Branch Format

```
|-----------Branch Format-----------|
|-----------------------------------|
| name-initial/feature/modification |
|-----------------------------------|

name-initial
------------

Arun Jangra = aj
Abhay Lal = al

feature
-------

Eg : Navbar, Footer etc.

modification
------------

Eg : fix, feature, update


Branch Example : aj/navbar/feat
```
