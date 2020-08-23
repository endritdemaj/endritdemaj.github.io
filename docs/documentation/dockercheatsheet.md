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

    docker container run -d --name my_container_name 
    
