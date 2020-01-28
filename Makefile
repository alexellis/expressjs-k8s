APP?=kubert
PORT?=8000
PROJECT?=github.com/bmsandoval/kubert

RELEASE?=0.0.1
COMMIT?=$(shell git rev-parse --short HEAD)
BUILD_TIME?=$(shell date -u '+%Y-%m-%d_%H:%M:%S')

GOOS?=linux
GOARCH?=amd64

CONTAINER_IMAGE?=docker.io/bmsandoval/${APP}

clean:
		rm -f ${APP}

build: clean
	CGO_ENABLED=0 GOOS=${GOOS} GOARCH=${GOARCH} go build \
		-ldflags "-s -w -X ${PROJECT}/version.Release=${RELEASE} \
		-X ${PROJECT}/version.Commit=${COMMIT} -X ${PROJECT}/version.BuildTime=${BUILD_TIME}" \
		-o ${APP}

container: build
	docker build -t $(CONTAINER_IMAGE):$(RELEASE) .

run: container
	docker stop $(APP):$(RELEASE) || true && docker rm $(APP):$(RELEASE) || true
	docker run --name ${APP} -p ${PORT}:${PORT} --rm \
		-e "PORT=${PORT}" \
		$(APP):$(RELEASE)

push: container
	docker push $(CONTAINER_IMAGE):$(RELEASE)

minikube: push
	helm upgrade --install test-app ./chart/kubert

test:
		go test -v -race ./...

#.PHONY: charts
#all: charts
#
#charts:
#	cd chart && helm package kubert/
#	mv chart/*.tgz docs/
##	helm repo index docs --url https://alexellis.github.io/kubert/ --merge ./docs/index.yaml

