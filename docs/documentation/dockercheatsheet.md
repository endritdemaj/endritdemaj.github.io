---
id: dockercheatsheet
title: Docker Cheatsheat
sidebar_label: Docker Cheatsheat
---

You can write content using [GitHub-flavored Markdown syntax](https://github.github.com/gfm/).


## Docker Editions
* Docker is no longer just a "Container runtime"
* Dokcer moves fast, it mattes how you install it
* Docker CE (Community Edtion)
* Three major types of instlals: Direct, Mac/Win, Cloud
* Linux(different per distro) (don't use default package)

## General
Image is all the binaries of a container, scripts sources and so on
A Container is a running instance of that image

## Intro
what is happening in 'docker container run' 
1. Looks for that image locally in image chache, doesnt find anything
2. then looks in remote image repository
3. downloads the latest version
4. creates new container absed on that images
5. gices it a virtual IP on a pricate network inside a container
6. opens up port 80 on host and forward to port 80 in contianer
7. starts container by using CMD in dockerfile


	
	


# Cheatsheet

## General

    docker version										#shows the version of docker client(CLI) and docker engine (systemd-deamon)
    docker info											#general info expanded e.g running contianers etc.
    docker <managemend command> <command>				#docker cointainer run
    docke ps 											#list all running container. -a list all containers
    docker top <container id> 							#list processes inside a running container
    ps aux 											    #show processer running inside a docker container too without hiding it
    docker container inspect							#details of the container
    docker container stats								#stats of all container

## Networking
`<bridge(docker0)>` is the default network that routes to the Host Network Interface  
`<host>` it gains performance by skipping virutal networks but sacrifices security of container model. Basically it is direkt on the Host  
`<none>` is not atached to anything

    docker network ls									#List all docker networks
    docker network inspect								#inspect what we are doing
    docker network create --driver						#create a new network
    docker network connect		                        #atach a network to a container
    docker network disconnect		                    #detach a network from a container

Create a new Network using the default `<bridge>` driver. If we need another driver, we have to specify it with `<--driver>`
    
    $docker network create my_app_net^C
    #list them
    $docker network ls
    NETWORK ID          NAME                DRIVER              SCOPE
    8d2dc7348d3d        bridge              bridge              local
    9afc2ba4f278        host                host                local
    cd18d7f432a3        my_app_net          bridge              local
    a0c8590e5ace        none                null                local
    
    $docker network inspect my_app_net 
    [
        {
            "Name": "my_app_net",
            "Id": "cd18d7f432a34a979e9f4ae81b5c0be389cd65760fec4168f32c778ff05594ad",
            "Created": "2020-08-23T19:59:17.646091944+02:00",
            "Scope": "local",
            "Driver": "bridge",
            "EnableIPv6": false,
            "IPAM": {
                "Driver": "default",
                "Options": {},
                "Config": [
                    {
                        "Subnet": "172.18.0.0/16",
                        "Gateway": "172.18.0.1"
                    }
                ]
            },
            "Internal": false,
            "Attachable": false,
            "Ingress": false,
            "ConfigFrom": {
                "Network": ""
            },
            "ConfigOnly": false,
            "Containers": {},
            "Options": {},
            "Labels": {}
        }
    ]

To run  a container on a specific network we can do this:

    $docker container run -d --name new_nginx --network my_app_net nginx
    444869e57cfbd60d237d7c6e5ce792dfa78626d41546e6528c6c4b9460b05e53
    
If we inspect our network, we can see this: 
    
    $docker network inspect my_app_net 
    [
        {
            "Name": "my_app_net",
            "Id": "cd18d7f432a34a979e9f4ae81b5c0be389cd65760fec4168f32c778ff05594ad",
            "Created": "2020-08-23T19:59:17.646091944+02:00",
            "Scope": "local",
            "Driver": "bridge",
            "EnableIPv6": false,
            "IPAM": {
                "Driver": "default",
                "Options": {},
                "Config": [
                    {
                        "Subnet": "172.18.0.0/16",
                        "Gateway": "172.18.0.1"
                    }
                ]
            },
            "Internal": false,
            "Attachable": false,
            "Ingress": false,
            "ConfigFrom": {
                "Network": ""
            },
            "ConfigOnly": false,
            "Containers": {
                "444869e57cfbd60d237d7c6e5ce792dfa78626d41546e6528c6c4b9460b05e53": {
                    "Name": "new_nginx",
                    "EndpointID": "e33e1489899ddfcfe36cbf06406561e3d2a17ad4a03a966d68ef9bd52192e47f",
                    "MacAddress": "02:42:ac:12:00:02",
                    "IPv4Address": "172.18.0.2/16",
                    "IPv6Address": ""
                }
            },__
            "Options": {},
            "Labels": {}
        }
    ]

If we want to connect an existing container to a network we have to run the following  
    
    docker network connect <containerid> <networkid>

### Docker Networks: DNS

In the world where containers changes from second  to second we cant rely on IPAddresses. Since its to dynamic
There is a build in solution for this and that is __DNS-Naming__

#### TL;DL

    docker container run -d --name my_container_name                                                    #run a container with a dns-name my_container_name
    docker run -d --network-alias search --rm --name elastic_3 --network my_app_network elasticsearch:2 #run container in network my_app_network with the network alias 'search'
    docker container run -d --name my_container_name 
    
Since we cant have a container with a same name, docker brings up DNS-resolving with it. With the Option `--net-alias` or `--network-alias`  
The following commands will fire up two elasticsearch containers with the network-name `search` and different container names on the docker network `my_app_network`

    docker run -d --network-alias search --rm --name elastic_3 --network my_app_network elasticsearch:2
    docker run -d --network-alias search --rm --name elastic_4 --network my_app_network elasticsearch:2

If we have a look and curl now the default elasticsearch port `9200` we can check that the DNS-Round-Robin works

    $docker container run --rm -ti --network my_app_network centos curl -s search:9200
    {
      "name" : "Turner D. Century",
      "cluster_name" : "elasticsearch",
      "cluster_uuid" : "BsfpId_oSC6JBdP7EvdJiQ",
      "version" : {
        "number" : "2.4.6",
        "build_hash" : "5376dca9f70f3abef96a77f4bb22720ace8240fd",
        "build_timestamp" : "2017-07-18T12:17:44Z",
        "build_snapshot" : false,
        "lucene_version" : "5.5.4"
      },
      "tagline" : "You Know, for Search"
    }
    $docker container run --rm -ti --network my_app_network centos curl -s search:9200
    {
      "name" : "Tyga",
      "cluster_name" : "elasticsearch",
      "cluster_uuid" : "PN5LN99vSySvyuNX1csktg",
      "version" : {
        "number" : "2.4.6",
        "build_hash" : "5376dca9f70f3abef96a77f4bb22720ace8240fd",
        "build_timestamp" : "2017-07-18T12:17:44Z",
        "build_snapshot" : false,
        "lucene_version" : "5.5.4"
      },
      "tagline" : "You Know, for Search"
    }


### Docker Images

- App binaries and dependencies 
- Metadata about the image
- Not a complete OS. No kernel, kernel modules (e.g. drivers)
- App as apache

#### TL;TD;

    docker pull nginx                           #Pull latest nginx image from default repository
    docker history nginx:latest                 #check history of the latest nginx image
    docker pull nginx:1.11.9                    #pull specific image of nginx
    docker image inspect nginx                  #inspect the nginx image and check its metadata

    docker image tag nginx endritdemaj/nginx    #give the nginx a new TAG

pull latest image of `nginx`

    $docker pull nginx
    Using default tag: latest
    latest: Pulling from library/nginx
    bf5952930446: Already exists 
    cb9a6de05e5a: Pull complete 
    9513ea0afb93: Pull complete 
    b49ea07d2e93: Pull complete 
    a5e4a503d449: Pull complete 
    Digest: sha256:b0ad43f7ee5edbc0effbc14645ae7055e21bc1973aee5150745632a24a752661
    Status: Downloaded newer image for nginx:latest
    docker.io/library/nginx:latest

pull another version of `nginx:tag`

    docker pull nginx:1.11.9

Check the layers of a container with `docker image history` or `docker history`
Every image starts with a `scratch` (first layer) and every change on that image is another layer

    $docker history nginx:latest
    IMAGE               CREATED             CREATED BY                                      SIZE                COMMENT
    4bb46517cac3        10 days ago         /bin/sh -c #(nop)  CMD ["nginx" "-g" "daemon…   0B                  
    <missing>           10 days ago         /bin/sh -c #(nop)  STOPSIGNAL SIGTERM           0B                  
    <missing>           10 days ago         /bin/sh -c #(nop)  EXPOSE 80                    0B                  
    <missing>           10 days ago         /bin/sh -c #(nop)  ENTRYPOINT ["/docker-entr…   0B                  
    <missing>           10 days ago         /bin/sh -c #(nop) COPY file:0fd5fca330dcd6a7…   1.04kB              
    <missing>           10 days ago         /bin/sh -c #(nop) COPY file:1d0a4127e78a26c1…   1.96kB              
    <missing>           10 days ago         /bin/sh -c #(nop) COPY file:e7e183879c35719c…   1.2kB               
    <missing>           10 days ago         /bin/sh -c set -x     && addgroup --system -…   63.4MB              
    <missing>           10 days ago         /bin/sh -c #(nop)  ENV PKG_RELEASE=1~buster     0B                  
    <missing>           10 days ago         /bin/sh -c #(nop)  ENV NJS_VERSION=0.4.3        0B                  
    <missing>           10 days ago         /bin/sh -c #(nop)  ENV NGINX_VERSION=1.19.2     0B                  
    <missing>           2 weeks ago         /bin/sh -c #(nop)  LABEL maintainer=NGINX Do…   0B                  
    <missing>           2 weeks ago         /bin/sh -c #(nop)  CMD ["bash"]                 0B                  
    <missing>           2 weeks ago         /bin/sh -c #(nop) ADD file:3af3091e7d2bb40bc…   69.2MB  

Check an image and see its metadata with the following command to see e.g. which ports we have to open up on our host for the created container.
Check env. variables, or nginx version, author and so on.

    docker image inspect nginx

To give an image a new tag we hit. If we don't specify  a TAG it defaults to latest. Latest is a default TAG and not the latest image

    docker image tag nginx endritdemaj/nginx

With the following command we push the new image to the default registry (docker hub)

    docker image push endritdemaj/nginx

See example here: 

    $docker image tag nginx endritdemaj/nginx
    $docker image ls
    REPOSITORY                                  TAG                 IMAGE ID            CREATED             SIZE
    endritdemaj/nginx                           latest              4bb46517cac3        10 days ago         133MB
    nginx                                       latest              4bb46517cac3        10 days ago         133MB
    
    $docker image push endritdemaj/nginx
    The push refers to repository [docker.io/endritdemaj/nginx]
    550333325e31: Preparing 
    22ea89b1a816: Preparing 
    a4d893caa5c9: Preparing 
    0338db614b95: Preparing 
    d0f104dc0a1f: Preparing 
    denied: requested access to the resource is denied


I can create new Tags as we want

    $docker image tag endritdemaj/nginx:latest endritdemaj/nginx:testing
    $docker image ls
    REPOSITORY                                  TAG                 IMAGE ID            CREATED             SIZE
    nginx                                       latest              4bb46517cac3        10 days ago         133MB
    endritdemaj/nginx                           latest              4bb46517cac3        10 days ago         133MB
    endritdemaj/nginx                           testing             4bb46517cac3        10 days ago         133MB
