## Jiffy API 

API for [Jiffy](https://github.com/urlDev/mern-jiffy)

### Scripts
- **npm run dev** starts dev with nodemon. A config folder with dev.env is needed, similar values with .env.example,
- **npm run test** or **npm t** runs tests in watch mode,
- **npm run start** runs server.

### Environment Variables
- **PORT**: Port to run the server, default is 3000 if not provided.
- **MONGODB_URL**: MongoDB connection URL. For production, it is the connection string via application and for local, it is the string to connect to MongoDB Compass
- **JWT_SECRET**: Unique string to hash the password. More information about that can be found in JWT Docs.
- **API_URL**: API URL in production.

### Hosting

- API is hosted freely on [fly.io](https://fly.io/). For portfolio and hobby projects, their service is free and docs are explanatory. I highly recommend!
