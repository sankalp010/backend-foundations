# Backend Foundations Day 01

## Overview

Minimal http server implemented using node core 'http' modules (without express)

## Behaviour

- `GET /` -> `200 OK` with plain text response `OK`
- Any other route, method `404 NOT FOUND` with empty body.

## Requirements

- Node.js v18 or higher

## Run Locally

```bash
node index.js
```

# Backend Foundations Day 02

## Overview

Http Server was implemented with routes using node core 'http' modules

## Behaviour

- `GET /` -> `200 OK` with plain text `OK`
- `GET /health` -> `200 OK` with plain text `HEALTHY`
- Any other routes, `404 NOT FOUND` with plain text `Not Found`

## Requirements

- Node.js v18 or higher

## Run Locally

```bash
node index.js
```

# Backend Foundations Day 03

## Overview

Http server was implemented with routes using node core 'http' modules via `url-parsing`

## Behaviour

- `GET /` -> `200 OK` with plain text `OK`
- `GET /health` -> `200 OK` with plain text `HEALTHY`
- Any other routes with `GET` -> `404 NOT FOUND` with plain text `Not Found`
- Any other method, `405 METHOD NOT ALLOWED` with plain text `Method Not Allowed`

## Requirements

Node.js v18 or higher

## Run Locally

```bash
node index.js
```

# Backend Foundations Day 04

## Overview

Implemented a http server using Node core 'http' module by creating a routing table object.

## Behaviour

- Routing Table Object with `key` -> `METHOD PATH` and `value` -> `callback function with 2 arguments req and res`
- Status Handler Function
- `GET /` -> `200 OK` with plain text `OK`
- `GET /health` -> `200 OK` with plain text `HEALTHY`
- Any other routes with `GET` -> `404 NOT FOUND` with body `Not Found`
- Any other method, `405 METHOD NOT ALLOWED` with body `Method Not Allowed`

## Run Locally

```bash
npm start
```

# Backend Foundations Day 05

## Overview

Http server using Node core 'http' modules without Express by implementing middleware system.

## Behaviour

- `loggerMiddleware` -> logs `METHOD PATHNAME` in `log.txt`
- `methodeMiddleware` -> allows `GET` returns `405 METHOD NOT ALLOWED` with body `Method Not Allowed` for others.
- `routerMiddleware` -> handles `GET`, wrt `routingTable` and `404 NOT FOUND` for other `GET` paths
- `routingTable` handles routes for `GET`
- `GET /` -> `200 OK` with plain text `OK`
- `GET /health` -> `200 OK` with plain text `HEALTHY`
- Reusable helper function `send` to set `status` and `content-type`

## Middleware Workflow

- initiated by `runMiddleware(req, res, middlewares)`
- `routerMiddleware` is the terminal middleware

## Run Locally

```bash
npm start
```

# Backend Foundations Day 06

## Overview

Implemented a request body parser middleware in a http server using node core 'http' module.

## Behaviour

- `GET /health` -> `200 OK` with body `HEALTHY`
- `POST /echo` -> `200 OK` returns parsed JSON body as plain text
- `POST /echo` with `invalid JSON` -> `400 BAD REQUEST` with body `Bad Request`
- `POST /echo` with `wrong content-type` -> `415 UNSUPPORTED MEDIA TYPE` with body `Unsupported Media Type`

## Test `POST /echo`

```bash
curl -X POST -H "content-type:application/json" -d '{"a":"alphabet", "b":2}
```

## Run Locally

```bash
npm start
```
