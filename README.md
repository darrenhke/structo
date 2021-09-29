# structo
Structo interview questions

Assuming that no auth is used.

## APIs (./api/controller)

###Part 1
####/api/token
⋅⋅* Get the JWT token. Username, password and secret has been hardcoded in ./config/index.js
####/api/about
⋅⋅* returns 200 "Hello world" if valid. Return 401 if no valid access token

Middleware
####/api/salt 
⋅⋅* Salt and hash password for hardcorded password found in ./config/index.js

###Part 2
####/api/token-exp
⋅⋅* Get both access and refresh token. Access token has shorter duration than refresh token
