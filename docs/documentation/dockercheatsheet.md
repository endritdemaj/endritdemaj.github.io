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
bridge(docker0) is the default network that routes to the Host Network Interface

    docker network ls									#List all docker networks
    docker network inspect								#inspect what we are doing
    docker network create --driver						#create a new network
    docker network connect		                        #atach a network to a container
    docker network disconnect		                    #detach a network from a container


