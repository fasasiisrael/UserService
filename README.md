
# My NestJS Application

This application is built using NestJS and includes the following features:
- MySQL database integration
- RabbitMQ for asynchronous messaging
- Winston for logging
- Prometheus and Grafana for monitoring
- Additional security measures (rate limiting, input sanitization, secure configuration)
- CI/CD pipeline using Jenkins
- Deployment using Docker and Kubernetes
- API documentation with Swagger

## Installation

1. Clone the repository
```
https://github.com/fasasiisrael/UserService```

2. Navigate to the project directory
```
cd my-nestjs-app
```

3. Install dependencies
```
npm install
```

4. Create a `.env` file and add your environment variables

--->> run 
```
npm create tables
``` 
to create the database table

5. Build the project
```
npm run build
```

6. Start the application
```
npm run start
```

## Docker

Build and run the Docker containers
```
docker-compose up --build
```

## Kubernetes

Deploy to Kubernetes
```
kubectl apply -f docker/kubernetes/
```

## CI/CD

This project includes a Jenkins pipeline for CI/CD. Configure Jenkins with the provided Jenkinsfile.

## Monitoring

Prometheus and Grafana are configured for monitoring. Access Prometheus at `http://localhost:9090` and Grafana at `http://localhost:3001`.

## Swagger

API documentation is available at `http://localhost:3000/api`.

## License

[MIT](LICENSE)
  