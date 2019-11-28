.PHONY: charts
all: charts

charts:
	cd chart && helm package expressjs-k8s/
	mv chart/*.tgz docs/
	helm repo index docs --url https://alexellis.github.io/expressjs-k8s/ --merge ./docs/index.yaml
