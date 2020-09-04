## Endpoints

* `/` - serves a HTML page
* `/links` - serves a JSON response of links
* `/health` - serves a health endpoint giving 200 OK

## Commands For Non Production Setup

```sh
printf $(kubectl get secret --namespace default jenkins -o jsonpath="{.data.jenkins-admin-password}" | base64 --decode);echo
```

```sh
export POD_NAME=$(kubectl get pods --namespace default -l "app.kubernetes.io/component=jenkins-master" -l "app.kubernetes.io/instance=jenkins" -o jsonpath="{.items[0].metadata.name}")
kubectl --namespace default port-forward $POD_NAME 9090:8080
```

```sh
kubectl create clusterrolebinding jenkins-cluster-admin --clusterrole=cluster-admin --serviceaccount=system:serviceaccount:default:jenkins
```

```sh
kubectl create secret docker-registry regcred --docker-server=<REGISTRY> --docker-username=<USERNAME> --docker-password=<PASSWORD> --docker-email=<EMAIL>
```

```sh
gcloud container clusters resize helm-microservices-cluster --num-nodes=1 --zone=us-central1-c
```