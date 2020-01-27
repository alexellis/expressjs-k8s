.PHONY: charts
all: charts

charts:
	cd chart && helm package kubert/
	mv chart/*.tgz docs/
#	helm repo index docs --url https://alexellis.github.io/kubert/ --merge ./docs/index.yaml
