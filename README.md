# Express.js Docker example

Example to show how to build a microservice with Node.js and Express.js with instructions for: [OpenFaaS](https://github.com/openfaas/faas), Docker and Kubernetes

> Created for k33g (Philippe Charrière) from GitLab

## Run it with [OpenFaaS](https://github.com/openfaas/faas) and PLONK

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

## Try it with Kubernetes

```sh
kubectl apply -f ./yaml
kubectl port-forward deploy/expressjs 8080:8080 &

curl 127.0.0.1:8080
```

## The parts

* [Dockerfile](./Dockerfile)

* [index.js](./index.js)

* [Express.js docs](https://expressjs.com)

* [OpenFaaS docs](https://www.openfaas.com/)

## Templates

With OpenFaaS Templates you don't need to bother with managing Dockerfiles and TCP-port bindings, unless you like that sort of thing, then you can do that too just like we did in this example.

* [Microservice for Node.js with express visible](https://github.com/openfaas-incubator/node10-express-service/)
* [Function for Node.js with express hidden](https://github.com/openfaas-incubator/node10-express-service/)
* [Legacy Node template without express](https://github.com/openfaas/templates/tree/master/template/node)

Try one of the templates above with `faas-cli template store ls/pull`.


