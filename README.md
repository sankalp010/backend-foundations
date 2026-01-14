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

- Routing Table Object with `key` -> `METHOD PATH` and `value` -> `handler callback function`
- `GET /` -> `200 OK` with plain text `OK`
- `GET /health` -> `200 OK` with plain text `HEALTHY`
- Any other routes with `GET` -> `404 NOT FOUND` with body `Not Found`
- Any other method, `405 METHOD NOT ALLOWED` with body `Method Not Allowed`

## Run Locally

```bash
npm start
```
