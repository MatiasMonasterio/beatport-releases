<div align="center">
  <a target="_blank" target="https://beatport-releases.vercel.app/auth/login?">
    <img alt="Beat Releases Cover" title="Beat Releases App" src="https://user-images.githubusercontent.com/56691632/179067761-9a3be155-17b6-4ae2-b3dd-1d51aa5f1548.png" />
  </a>
</div>

## Get Started
### Prerequisites
You need to be using:

- Git - [Download & Install Git](https://git-scm.com/downloads)
- Node - [Download & Install Node](https://nodejs.org/es/download/)
- Node Version Manager - [Dowload & Install NVM](https://github.com/nvm-sh/nvm)
- Docker Compose - [Dowload & Install Docker](https://docs.docker.com/compose/)

### Docker Compose
This project is ready to work with docker-compose to initalize the needed stack during development process.
To start working, run the following commands:

```bash
docker-compose build
docker-compose up
```

#### Working docker compose environment

```bash
## Access to PgAdmin
curl http://localhost:8080 

## Access to Redis Commander
curl http://localhost:8081 
```

### Environment Variables
Create an `.env` file in the root project from `client` workspace and provide the following values:

```bash
VITE_API_URL="http://localhost:3001"
```

Create an `.env` file in the root project from `server` workspace and provide the following values:

```bash
PORT=3001
CLIENT_URL="http://localhost:3000"
REDIS_URL="redis://127.0.0.1:6379"
DATABASE_URL="postgresql://develop:develop@127.0.0.1:5432/develop"
JWT_SECRET="somevalue"
```

### Run locally
You need Node v16.15.0 and npm v8.5.5 Set versions manua with nvm:
```bash
nvm use
```

Install the required libraries and packages dependencies
```bash
npm install
```

Run the project
```bash
## client
npm run dev:clinet

## server
npm run dev:server
```

### Generate/restore data
For development you can generate and restore data to work. This process removes all the values ​​from the database and generates the initial ones.

```
curl http://localhost:3000/seed 
```

After running the credentials to access are email `beat-releases@demo.com` and password `develop123`

## Contributing

Contributions, issues and feature requests are welcome!
<br />
Feel free to check [issues page](https://github.com/MatiasMonasterio/beatport-releases/issues).

## License
The MIT License (MIT)
