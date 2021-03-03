---
id: kubernetescheatsheet
title: Kubernetes Cheatsheet
sidebar_label: Kubernetes Cheatsheat
---


# Kubernetes

Kubernetes: The whole orchestration system
K8s or Kube for short
kubectl: CLI to configure Kubernetes and manage apps
Node: Single server in the Kubernetes cluster
Kubelet: Kubernetes agent running on nodes kubelet.service
Control Plane: Set of containers that manage the cluster

Master and Workers

Master  
Runs the following container
* etcd - distibuted store system key value to store configuration data
* API  -  the way we talk to the cluster
* Scheduler - to controle the containers and pods
* Controller Manager - 
* CoreDNS

Nodes  
* kubelet Agent
* Kube-proxy - to controll the networking

Pod: one or more containers running together on one Node  
Basic unit of deployment. containers are always in pods  
Controller: For creating/updating pods and other objects  
Many types of Controllers inc. Deployment, ReplicaSet, statefulSet
Service: network endpoint to connect to a pod
Namespace: Filtered group of objects in cluster

`kubectl version` to check version for client and server

Two ways to deploy Pods (containers) : Via commands or via YAML

    # to start a pod
    kubectl run my-nginx --image nginx                      # create a single pod   # before 1.18 this would create a deployment
    kubectl create deployment nginx --image nginx           # create a deployment with a replicaset in it which got pods running

    # to see what we did there
    kubectl get pods
    kubectl get all                             #see all objects


Pods -> ReplicaSet -> Deployment

    kubectl delete deployment my-nginx
    kubectl delete pod my-nginx                     # to delete the pod i created


## Scaling ReplicaSets

Start a new deployment for Apache/pod

    #OLD kubectl run my-apache --image httpd
    kubectl create deployment my-apache --image httpd

Scale up to to replicas

    kubectl scale deployment.apps/my-apache --replicas 2
    #or
    kubectl scale deploy my-apache --replicas 3

This is how it looks after the last commands with the Pods/Replicas/deployments

    $kubectl get all
    NAME                             READY   STATUS    RESTARTS   AGE
    pod/my-apache-65fd7bd7db-gn7qg   1/1     Running   0          2m23s
    pod/my-apache-65fd7bd7db-nt98m   1/1     Running   0          3m41s
    pod/my-apache-65fd7bd7db-snfp4   1/1     Running   0          54s

    NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
    service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   21m

    NAME                        READY   UP-TO-DATE   AVAILABLE   AGE
    deployment.apps/my-apache   3/3     3            3           3m41s

    NAME                                   DESIRED   CURRENT   READY   AGE
    replicaset.apps/my-apache-65fd7bd7db   3         3         3       3m41s

Check pods

    kubectl get pods                                    #get running pods
        -w                                              #to watch
    kubectl logs deployment/my-apache                   # get the log of the deployment where only the log of one pod is showing
            --follow, --tail 10                         # like linux, follow the logs or show only tail 10
    kubectl logs deployment/my-apache                       # see all logs for label -x`l 
            --all-containers=true                       # to see logs for all containers

    kubectl describe pod/my-apache-65fd7bd7db-gn7qg     # describe pod and see events
    kubectl logs <podname> -n <deployment-name> --timestamps -f

* Learning Services Types
* Creating Services Types
* 
Exposing Containers

A service is a stable address for pods. If we want to connect to pods, we need a service
CoreDNS allows us to sesorlve services by name. 
    kubectl expose                  #creates a service for existing pods

* ClusterIP (default) 
    * Single, internal virtual IP allocated
    * only reachable from within cluster (nodes and pods)
    * pods can reach service on apps port number
* NodePort
    * Designed for something outside the cluster
    * High port allocated on each node
    * Port is open on every nodes IP
* LoadBalancer
    * Controls a LB endpoint external to the cluster
    * Only available when infra provider gives you a LB
    * creates NodePort+ClusterIP services, tells LB to send to NodePort
* ExternalName
    * Stuff in our cluster need to talk outside the cluster
    * adds CNAME DNS record to CoreDNS only
    * Not used for Pods, but for giving pods a DNS name to use for something outside K8s

Expose Deployment to port

    kubectl expose deployment/httpenv --port 8888           #exposing httpsenv to port 8888
    kubectl get service                                     # to list all running services
    #start a container temporary start with bash remove it after it
    kubectl run --generator run-pod/v1 tmp-shell --rm -it --image bretfisher/netshoot -- bash

    #Expose httpenv to the NodePort so the Service is reachable outside of the Cluster
    kubectl expose deployment/httpenv --port 8888 --name httpsenv-np --type NodePort # now we can curl localhost
    kubectl expose deployment/httpenv --port 8888 --name httpsenv-lb --type LoadBalancer


Kubernetes Services DNS
* Starting with 1.11, internal DNS is provided by CoreDNS
* Like Swarm, this is DNS-Based Service Discovery
* So Far we've been using hostnames to access Services
`> curl <hostname>`
* Namespaces to section up inside clusters `kubectl get namespaces` 
Services also have a FQDN
`> curl <hostname>.<namespace>.svc.cluster.local`

## Run, Create and Expose Generators

These commands use helper templates called "generators"
Every resource in Kubernetes has a specification or "spec"
Try it out with   
`> kubectl create deployment sample --image nginx --dry-run -o yaml`


## Imperative vs. Declarative

Learn the Imperative CLI for easy control of local and test setups
Move to apply -f file.yml and apply -f directory\
Store yaml in git, git commit each change before you apply

## kubectl apply 

    #create/update resources in a file
    kubectl apply -f filename.yml
    #create/update a whole driectory of yaml
    kubectl apply -f myyaml/
    #create/update from  a URL
    kubectl apply -f https://bret.run/pod.yml

## Kubernetes Configuration YAML

* Kubernetes configuration file (YAML or JSON)
* Each file contains one or more manifests
* Each manifest describes an API object (deployment, job, secret)
* Each manifest needs four parts(root key:values in the file)
*   apiVersion:
*   kind:
*   metadata:
*   spec:

Example of a yml-file

```
$cat app.yml 
apiVersion: v1
kind: Service
metadata:
  name: app-nginx-service
spec:
  type: NodePort
  ports:
  - port: 80
  selector:
    app: app-nginx
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: app-nginx
  template:
    metadata:
      labels:
        app: app-nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.17.3
        ports:
        - containerPort: 80
```  
Building Your YAML spec  
We can get  all the keys each kind supports  
`kubectl explain services --recursive`  
List only the specs  
`kubectl explain services.spec`


## Hands on
Start the Services from ./app.yml 
`kubectl apply -f app.yml` 
check if there are any changes and update the services  
`kubectl apply -f app.yml --server-dry-run` 
Compare the yaml with the stuff running in the Server
`kubectl diff -f app.yml `  

## Labels and Annotations
Lables goes under `metadata:` in your YAML  
Simple list of key:value for identifying your resource lateyer by selecting , grouping, or filtering for it  
Comon examples include `tier: frontend, app:api, env:prod, customer:acme.co`





