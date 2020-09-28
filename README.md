# Astronomy Picture of the Day App

This is an app to explore the beautiful pictures, videos and apps that Nasa curates and shares with professionally written explanations of what you are seeing.  The data is scraped from the [APOD API](https://api.nasa.gov/planetary/apod) but hosted in my own database and thumnail creator.

## Tools
- [Next.js](https://nextjs.org/) React framework powers the server-side incremental static generation to allow for fast load time while still consuming dynamic data sources.
- [Apollo + GraphQL](https://www.apollographql.com/) handles the API layer of the app.  This isolates the client app from the back-end data formats and data sources.
- [MySql](https://www.mysql.com/) is on the back end, daily updates scraped from APOD are stored there for flexible, fast, industry standard data sourcing.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.