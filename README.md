# webby_lab_test
Simple project written with NodeJS and React. 
To run project you should install npm packages in both server and client dir.
```sh
$  npm i
```
Then edit .env file (environment variables) in server dir.
```
PORT = port for server
DATABASE_URI = your database uri
PAGINATION_LIMIT = pagination limit for mogoose-paginate
```
Then run this in server dir to start server
```sh
$ npm run dev
```
Specify uri for axios in client/src/utils/axios.js. Example:

```javascript
import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:2323/api'
});
```

Run this command to start client:
```sh
$ npm start
```

To make client reachable from server run this command from client dir:
```sh
$ npm run build
$ cp -r ./build ../server/src/build
```
Be sure you have build dir in server dir.


