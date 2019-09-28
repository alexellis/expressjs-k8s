# Express.js Docker example

Example for k33g (Philippe Charrière) from GitLab on how to deploy a microservice to OpenFaaS.

## Run it with OpenFaaS and PLONK

[PLONK](https://skillsmatter.com/skillscasts/14268-serverless-2-0-get-started-with-the-plonk-stack?utm_medium=social&utm_source=twitter&utm_campaign=bafdbc&utm_content=skillscast) = Prometheus Linkerd (optional) OpenFaaS NATS and Kubernetes

```
faas-cli deploy
```

Access via URL on `faas-cli describe service`

## Run it with docker

```
docker run --name expressjs -p 8080:8080 -ti alexellis2/service:0.3.0
```

Access from localhost:8080

## The parts

* [Dockerfile](./Dockerfile)

* [index.js](./index.js)

* [Express.js docs](https://expressjs.com)

* [OpenFaaS docs](https://www.openfaas.com/)

