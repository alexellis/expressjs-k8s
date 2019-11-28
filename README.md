# Express.js Docker example

Example to show how to build a microservice with Node.js and Express.js with instructions for: Kubernetes with YAML, [OpenFaaS](https://github.com/openfaas/faas), Docker and running locally with `node`

## Clone the repository

```
git clone https://github.com/alexellis/expressjs-docker \
&& cd expressjs-docker
```

## Endpoints

* `/` - serves a HTML page
* `/links` - serves a JSON response of links
* `/health` - serves a health endpoint giving 200 OK

## Try it with Kubernetes

You can first try running the example with Kubernetes, then try it with OpenFaaS to compare the experience. OpenFaaS also adds optional templates and an API to remove boilerplate coding: "look ma', (almost) no YAML!"

```sh
kubectl apply -f ./yaml
kubectl port-forward deploy/expressjs 8080:8080 &

curl 127.0.0.1:8080
```

Conservative resource limits / requests values have been set in the YAML files:

```yaml
        resources:
          limits:
            cpu: 10m
            memory: 128Mi
          requests:
            cpu: 10m
            memory: 128Mi
```

Clean up:

```sh
kubectl delete -f ./yaml
```

See also: [/yaml](./yaml) - (optional) - YAML files to deploy to Kubernetes directly

## Run it with [OpenFaaS](https://github.com/openfaas/faas)

Watch [my latest video on OpenFaaS with the PLONK Stack](https://skillsmatter.com/skillscasts/14268-serverless-2-0-get-started-with-the-plonk-stack?utm_medium=social&utm_source=twitter&utm_campaign=bafdbc&utm_content=skillscast), which is made up of Prometheus, Linkerd (optional), OpenFaaS, NATS, and Kubernetes.

If you don't already have OpenFaaS, then:

* [Install faas-cli](https://docs.openfaas.com/cli/install/)
* [Install OpenFaaS](https://docs.openfaas.com/deployment/)

Deploy:

```sh
faas-cli deploy
```

Access using the gateway's URL found via `faas-cli describe service`

Edit/rebuild:

Edit `image: alexellis2` and replace with your own Docker Hub username in `stack.yml`, then run:

```sh
faas-cli up
```

Cleaning up:

```
faas-cli rm
```

See also: [stack.yml](./stack.yml) - (optional) - OpenFaaS deployment file

### OpenFaaS Templates

With OpenFaaS Templates you don't need to bother with managing Dockerfiles and TCP-port bindings, unless you like that sort of thing, then you can do that too just like we did in this example.

* [Microservice for Node.js with express visible](https://github.com/openfaas-incubator/node10-express-service/)
* [Function for Node.js with express hidden](https://github.com/openfaas-incubator/node10-express-service/)
* [Legacy Node template without express](https://github.com/openfaas/templates/tree/master/template/node)

Try one of the templates above:

```
faas-cli template store list

faas-cli template store pull node10-express

faas-cli new --lang node10-express express-fn
```

Then edit `express-fn/hander.js` and `express-fn.yml`, before then running:

```
faas-cli up -f express-fn.yml
```

What is different?

* No Kubernetes YAML files to manage
* No Dockerfile to worry about
* No index.js, no port-bindings, no Prometheus metrics to add, and no auto-scaling rules. OpenFaaS automates all of this and more.

## Run it with docker

```sh
docker run --name expressjs -p 8081:8080 -ti alexellis2/service:0.3.2
```

Access via http://localhost:8081

Clean up:

```
docker rm -f expressjs
```

## Run it without Docker, locally

* [Install Node.js](https://nodejs.org/en/)

```sh
npm install

http_port=3000 node index.js
```

Access via http://localhost:3000

Clean up by hitting Control + C.

## Install via Helm 3

First install [Helm 3](https://helm.sh).

```
helm repo add expressjs-k8s https://alexellis.github.io/expressjs-k8s/

helm repo update

helm install expressjs-k8s-tester expressjs-k8s/expressjs-k8s
```

## The parts

* [Dockerfile](./Dockerfile)

* [index.js](./index.js) - the entry-point for Express.js

* [stack.yml](./stack.yml) - (optional) - OpenFaaS deployment file

* [/yaml](./yaml) - (optional) - YAML files to deploy to Kubernetes directly

Other links:

* [Express.js docs](https://expressjs.com)

* [OpenFaaS docs](https://www.openfaas.com/)

## Contributing via GitHub

Before contributing code, please see the [CONTRIBUTING guide](https://github.com/alexellis/inlets/blob/master/CONTRIBUTING.md). This repo uses the same guide as [inlets.dev](https://inlets.dev/).

Both Issues and PRs have their own templates. Please fill out the whole template.

All commits must be signed-off as part of the [Developer Certificate of Origin (DCO)](https://developercertificate.org)
