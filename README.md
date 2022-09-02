<div align="center">
  <a target="_blank" target="https://beatport-releases.vercel.app/auth/login?">
    <img alt="Beat Releases Cover" title="Beat Releases App" src="https://beatport-releases.vercel.app/images/banner.png" />
  </a>
</div>

<br>
<div align="center">
  
  ![Build](https://github.com/MatiasMonasterio/beatport-releases/actions/workflows/server-pipeline.yml/badge.svg)
  ![Build](https://github.com/MatiasMonasterio/beatport-releases/actions/workflows/client-pipeline.yml/badge.svg)
  
</div>


## Live Demo
You can access a [demo](https://beatport-releases.vercel.app/auth/login?email=beatreleases@demo.com&password=12345678) and test the application

## Get Started
### Prerequisites
You need to be using:

- Git - [Download & Install Git](https://git-scm.com/downloads)
- Node - [Download & Install Node](https://nodejs.org/es/download/)
- Node Version Manager - [Dowload & Install NVM](https://github.com/nvm-sh/nvm)
- Docker Compose - [Dowload & Install Docker](https://docs.docker.com/compose/)

### Environment Variables
This project works with three `.env` files on client, server and root. You can copy `.env.example` and use the default environment settings

### Docker Compose
This project is ready to work with docker-compose to initalize the needed stack during development process.
To start working, run the following commands

```bash
docker-compose build
docker-compose up
```

### Run locally
You need Node v16.15.0 and npm v8.5.5 Set versions with nvm
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

### Generate / Restore data
For development you can generate and restore data to work. This process removes all the values ​​from the database and generates the initial ones

```
curl http://localhost:3000/seed 
```

After generating the data, you will be redirected to login with the default login credentials.

## Contributing

Contributions, issues and feature requests are welcome!
<br />
Feel free to check [issues page](https://github.com/MatiasMonasterio/beatport-releases/issues).

## License
The MIT License (MIT)
