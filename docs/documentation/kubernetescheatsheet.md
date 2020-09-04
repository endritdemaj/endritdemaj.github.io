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