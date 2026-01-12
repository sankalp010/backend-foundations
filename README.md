# Backend Foundations Day 01

## Overview

Minimal http server implemented using node core 'http' modules (without express)

## Behavior

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

## Behavior

- `GET /` -> `200 OK` with plain text `OK`
- `GET /health` -> `200 OK` with plain text `HEALTHY`
- Any other routes, `404 NOT FOUND` with plain text `Not Found`

## Requirements

- Node.js v18 or higher

## Run Locally

```bash
node index.js
```
