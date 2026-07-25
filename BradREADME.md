# Brad's Store

A responsive portfolio storefront built with React and backed by a small
Express/MongoDB API. The current tune-up focuses on a clear shopping journey,
thoughtful visual design, accessible controls, and safer server defaults.

## Highlights

- Editorial, responsive storefront with category filters, search, and sorting
- A single catalog request instead of one request per product card
- Persistent shopping bag with quantity controls and shipping calculations
- Complete demo checkout and order-confirmation flow
- Lightweight browser-only demo accounts (no passwords are stored)
- Loading, empty, and error states
- Express API with hashed passwords, environment-based JWT signing, safer CORS,
  product CRUD, and normalized cart handling
- React component tests and production build support

## Run the storefront

```sh
cd client
npm install
npm start
```

The storefront uses Vite and [Fake Store API](https://fakestoreapi.com) by default. Copy
`client/.env.example` to `client/.env` to point it at another compatible product
API.

## Run the API

```sh
cp .env.example .env
npm install
npm start
```

Set a private `DATABASE_URL` and a long random `JWT_SECRET` in `.env`. Environment
files are intentionally excluded from Git.

## Verify

```sh
cd client
npm test
npm run build
```

The checkout is intentionally a portfolio demo. It does not request, transmit,
or store payment information.
