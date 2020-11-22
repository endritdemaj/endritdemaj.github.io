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
    docker update                                       #updating a container without needing to kill it or restart, e.g RAM, Memory, CPU or so. Too much CPU to limit

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


## Docker Images

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

If you want to create an Image of a running container you do the following:

    docker commit <containerid>
    #Find in docker image ls the new image
    docker image tag <imageid> repo:tag
    docker image push repo:tag                      #to push the image to the repo

### Dockerfile

The instructions on how to build an Image are stored in a Dockerfile  

Package Manager like apt and yum are one of the reasons to build container `FROM Debian, Ubuntu, Fedora or CentOS`

    docker build -f some-dockerfile .                         #to build from a specific dockerfile instead of the default

When we build an Image, it pulls the debian:jessie image to the local Docker Host from docker hub. Then each line is going to be executed and cached layer by layer on the docker engine
Each Command in a Dockerfile is a new Image Layer

    FROM debian:jessie                                      #use always a minimum distribution
    ENV NGINX_VERSION 1.11.10-1~jessie                      #Enironment variables which are very important for containers since all the info is there
    RUN apt-key...                                          #runs command e.g unzipping, install something or so on.

It is usual that commands get brought together with `&&` because each command is a new layer to sace space and time

    RUN apt-get update \
        && apt-get install --no-install-recommends -y \
            ca-certificates

Loggin in Docker is managed by Docker itself we have to move the logging to stdout. Everything that we want to log has to be moved there

    RUN ln -sf /dev/stdout /var/log/nginx/access.log \
        && ln -sf /dev/stderr /var/log/nginx/error.log

Exporse a port on the docker virual network. The ports are not automatically exposed on the host. Thats why we need the `--p` in `docker run`

    EXPOSE 80 443

This command is launched every time we start a new container or when we restart a container

    CMD ["nginx", "-g", "deamon off;"]


The following command builds all dockerfiles in the current directory where `customnginx` is the image name

    docker image build -t customnginx .

The hash at the line cached the changes to that line so if nothing changes til that line docker doesnt rebuild it. It is very import that the things that
change the least are on the top of the file and at the button the stuff that changes most

    $docker image build -t customnginx .
    Sending build context to Docker daemon   16.9kB
    Step 1/7 : FROM debian:stretch-slim
    stretch-slim: Pulling from library/debian
    75cb2ebf3b3c: Pull complete 
    Digest: sha256:c4052b51588fc32fe0c25a984a34cad5dc5990b9c12744073a9c409a6d0737cf
    Status: Downloaded newer image for debian:stretch-slim
     ---> 8ff748cdd6b1
    Step 2/7 : ENV NGINX_VERSION 1.13.6-1~stretch
     ---> Running in 30c99b093c02
    Removing intermediate container 30c99b093c02
     ---> 03ecbd5ec3cc
    Step 3/7 : ENV NJS_VERSION   1.13.6.0.1.14-1~stretch
     ---> Running in df3282dfa152
    Removing intermediate container df3282dfa152
     ---> b4b4df428136
    Step 4/7 : RUN apt-get update 	&& apt-get install --no-install-recommends --no-install-suggests -y gnupg1 	&& 	
    .
    .
    .
     ---> Using cache
     ---> 713bcce48334
    Step 6/7 : EXPOSE 80 443
     ---> Using cache
     ---> 7270661a16d0
    Step 7/7 : CMD ["nginx", "-g", "daemon off;"]
     ---> Using cache
     ---> ef446a55347e
    Successfully built ef446a55347e
    Successfully tagged customnginx:latest
    $docker image ls
    REPOSITORY                                  TAG                 IMAGE ID            CREATED             SIZE
    customnginx                                 latest              ef446a55347e        2 minutes ago       108MB


Use `WORKDIR` to change directory. This is best pratice. See example below where we copy `index.html` to the docker image

    $ll
    total 16
    drwxr-xr-x  2 endrit root 4096 Aug 22 21:24 ./
    drwxr-xr-x 32 endrit root 4096 Aug 22 21:24 ../
    -rw-r--r--  1 endrit root  410 Aug 22 21:24 Dockerfile
    -rw-r--r--  1 endrit root  249 Aug 22 21:24 index.html
    $cat Dockerfile
    FROM nginx:latest
    WORKDIR /usr/share/nginx/html
    COPY index.html index.html

we can use `prune` to clean up images, volumes, build cache and containers

    docker image prune                  #to clean up just dangling images
    docker system prune                 #will clean up everything

    docker image prune -a               #will remove all images that are not used
    docker system df                    #to see space usage

## Container Lifetime & Persistent Data

Volume in Dockerfile

Any file that is put in the Volume will outlive the contianer until we delete the volume. They needs to be manually deleted.
    
    VOLUME /var/lib/mysql                           #Creates a new named Volume on the host in 'dockerdir'/somehash/'_data and on the container under /var/lib/mysql

    docker inspect <container>                      #under Volumes we can see the Volumes and under Mounts we can see the mapping from the Host(Source) to the Container(Destination)

    docker container run -d mysql -v friendlyname:/var/lib/sql          #Creates a volume with a friendly name on the Host and on the Container
    docker volumes ls                               #check mounted volumes and with inspect to check the mounts

    docker volume create                            #create a new Docker Volume ahead of the Time

### Bind Mounting

Maps a host file or directory to a container file or directory. Two locations pointing to the same files.
Has to be done in container run, cant be done in Dockerfile

    ... run -v /home/endrit/stuff:/path/container

For Example i start here a Postgres db

    docker run -d --name pgdb962 -v pgdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=yourPW -d postgres:9.6.2


## Docker Compose

Configure relationships between containers
save our docker container run settings in easy-to-read file
create one-liner developer environment startups
1. YAML-Formatted file that describes our solution options for :
    * container
    * networks
    * volumes
2. A CLI tool `docker-compose` used for local dev/test automation with those YAML files

### docker-compose.yml

Here is an example of a `docker-compose.yml`

    version: '2'

    # same as
    # docker run -p 80:80 -v $(pwd):/tmp nginx

    services:
        nginx:
            image:nginx
            volumes:
                -.:tmp
            ports:
                - '80:80'

## docker-compose CLI

    docker-compose up               # setup volumes/networks and start all containers
    docker-compose down             # stop all containers and remove cont/vol/net

    docker-compose ps               #shows running containers
    docker-compose logs             #show logs of the containers 

    
if all your project had a Dockerfile and docker-compose.yml then a "new developer onboardning" would be:
    git clone github.com/some/software
    docker-compose up

First docker-compose.yml
If we change the name than we have to give it with a parameter to the file
This code starts up a `drupal` container with a `postgres` database. Remember that the default host for postgress is `localhos` but outside of the container its the service name

    version: '2'
    services:
      drupal:
        image: drupal
        ports:
        - "8080:80"
        volumes:
        - drupal-profiles:/var/www/html/profiles
        - drupal-sites:/var/www/html/sites 
        - drupal-themes:/var/www/html/themes 
        environment:
            POSTGRES_PASSWORD: example
        links:
        - postgres2
    
      postgres2:
        image: postgres
        environment:
            POSTGRES_DB: drupal
            POSTGRES_USER: user
            POSTGRES_PASSWORD: example

    volumes:
        drupal-profiles:
        drupal-sites:
        drupal-themes:

Docker compose build. If we have this option in the Yaml it will build the image the first time it runs. If we want to force build the image, we hate to run 
Great for complex build that have lots of vars or build args

    docker-compose build
    docker-compose up --build

In the below example we build a custom image if the image nginx-custom is not in the cache. 
If the service need a database we would just hang that in
    
    #docker-compose.yml
        services:
            proxy:
                build:                                      #Tells that the image needs to be build
                    context: .                              #Build the Image in the current dir
                    dockerfile: nginx.Dockerfile            #Build the image using this Dockerfile
                image: nginx-custom                         #name the image after the build nginx-custom
                ports:
                    - '80:80'


## Docker Swarm

How do we automate container lifecycle?
How can we easily scale out/in/up/down?
How can we ensure our containers are re-created if they fail?
How can we replace containers without downtine (blue/green deploy)

Swarm Mode is a clustering solution built inside Docker

    docker swarm init                       #to initialize swarm
    To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1####################################################################3

    To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.

Service in a Swarm replaces `docker run`

    docker service <CMD>
    docker service create alpine ping 8.8.8.8               # create a new service that runs alpine container that does a ping to google 
    docker service ls                                       # list all the services
    docker service ps <ServiceName or ID>                   # list all the contianers inside a service
    docker service update <ID> --replicas 3                 # Now we want to scale our service up
    docker node update --role manager <ipofnode>

    $ docker service create --replicas 3 alpine ping 8.8.8.8
    $ docker service ps fervent_mendel 
    ID                  NAME                IMAGE               NODE                DESIRED STATE       CURRENT STATE            ERROR               PORTS
    xkafd3dyla7z        fervent_mendel.1    alpine:latest       node1               Running             Running 37 seconds ago                       
    p89fx51fejae        fervent_mendel.2    alpine:latest       node2               Running             Running 37 seconds ago                       
    gyx2xbuobitz        fervent_mendel.3    alpine:latest       node3               Running             Running 37 seconds ago     

Network driver Overlay Multi-Host Networking. Its creating a swarm wide bridge network so that containers across hosts can communicate to each other
Just choose `--driver overlay` when creating network

    docker network create --driver overlay mydrupal
    docker service create --name psql --network mydrupal -e POSTGRES_PASSWORD=example postgres      #create a postgress service on mydrupal network

Scaling out with Routing Mesh

    #create an elasticsearch service with three containers
    docker service create --name search --replicas 3 -p 9200:9200 elasticsearch:2

When we now do a curl on the localhost, the routing mesh forward with round robin our request to all thre nodes the service is running on.

This is stateless load balancing. This LB is at OSI Layer 3 (TCP), not Layer 4 (DNS)
Both limitation can be overcome with: `nginx or HAProxy LB proxy, or:` Docker Enterprise Edition which comes with built in L4 web proxy.

Create a Dogs VS Cats voting app [klick](https://github.com/BretFisher/udemy-docker-mastery/tree/main/swarm-app-1#assignment-create-a-multi-service-multi-node-web-app)

    docker network create --driver overlay backend
    docker network create --driver overlay frontend

    docker volume create db-data

    docker service create --name vote -p 80:80 --network frontend --replicas 2 bretfisher/examplevotingapp_vote
    docker service create --name redis --network frontend redis:3.2
    docker service create --name worker --network frontend --network backend bretfisher/examplevotingapp_worker:java
    docker sercice create --name db --network backend --mount type=volume,source=db-data,target=/var/lib/postgresql/data -e POSTGRES_HOST_AUTH_METHOD=trust postgres:9.5
    docker service create --name result -p 5001:80 --network backend bretfisher/examplevotingapp_result

### Stacks 
Its like compose for swarm. With options to deploy or update something
Many services, volumes overlay networks and so on everything in a YAML-File

    docker stack deploy -c voting.yml voteapp                   #deploying a voteapp from the YAML-File

To update the our stack we need to make changes to the Yaml file and hit that command again with the same stack name

#### Sectrets

Easiest "secure" solution for storing sercrets in Swarm
What is a Secret?
* Username and password
* TLS Certificate and keys
* SSH keys
* Any data you would prefer not to be "on front page of news"
Sevrets are first stored in Swarm, then assigned to a Service(s)
Only Containers in assigned Service(s) can see them

Turorial

    echo "veryStrongPW" >> mypw.txt
    docker secret create mypw mypw.txt
    #another option
    echo "myDBPW" | docker secret create psql_pass -
    docker service create --name psq --secret mypw -e POSTGRES_PASSWORD_FILE=/run/secrets/mypw postgres
    docker service update --secret-rm                           #remove the secret

YAML-File 

       ...
        POSTGRES_PASSWORD_FILE: run/secrets/psq-pw
        secrets: 
        - psql-pw
    secrets:
        psql-pw:
            external:true
        psql-user:
            file:./psql_user.txt

In Compose it works the same but without the decryption

## Docker Machine

CLI tool to create new nodes using virtualboc

    docker-machine create node1
    docker-machine create node2
    docker-machine create node3

    #access 
    docker-machine ssh <name>
    docker-machine env node1

## Full App Lifecycle

    docker-compose up                               # automatically reads docker-compose.yml and overrides with docker-compose.override.yml
    docker stack deploy                             # will automatically get the docker-compose.prod.yml
    docker-compose -f a.yml -f b.yml conifg         # merge the to yml files

### Service Updates

Updates 

    docker service scale web=4

    docker service update --image myapp:1.2.1 <servicename>                 # to update an image of a service
    docker service update --env-add NODE_ENV=production --publish-rm 8080   #add an environment variable and remove the port
    docker service scale web=8 api=6                                        #scale multiple services 
    docker stack deploy -c file.yml <stackname>                             # to update a stack

Example:

    #create nginx service
    $docker service create -p 8088:80 --name web nginx:1.13.7
    $docker service ls
     ID                  NAME                MODE                REPLICAS            IMAGE               PORTS
     fa0hj7brl3l3        web                 replicated          1/1                 nginx:1.13.7        *:8088->80/tcp
    
    #scale up the service
    $docker service scale web=5
    $docker service ls
     ID                  NAME                MODE                REPLICAS            IMAGE               PORTS
     fa0hj7brl3l3        web                 replicated          5/5                 nginx:1.13.7        *:8088->80/tcp

    #do a Rolling update now by changing the image of nginx
    docker service update --image nginx:1.13.6 web

    #change the port from 8088 to 9090
    # here we first have to remove the old one and add the new one to it
    docker service update --publish-rm 8088 --publish-add 9090:80 web

    # Force updates to pick leas used nodes. To schedule nodes 
    docker service update --force web

### Docker healthchecks

    docker container ls
    docker container inspect            #Last 5 healthchecks

    docker run \
        --health-cmd='curl -f localhost:9200/_cluster/health || false' \
        --health-intercal=5s \
        --health-retries-3 \
        --health-timeout=2s \
        --health-start-period=15s \
        elasticsearch:2

    #or in a dockerfile
        --inetrval=DURATION(default:30)
        --timeout=DURATION(default:30s)
        --start-period=DURATION(default:0s)(17.09)
        --retries=N (default 3)
    

## Running Docker Registry
A private image registry for your network
Parkt of docker/distibutions GitHub repo
At its core: a web API and storage system, written in Go
Is a https Server running at Port 5000
Re-Tag an existing image and push it our new Registry
"Secure by Default": Docker wont talk to registry without HTTPS
    Except, localhost
For remote self-signed TLS, enable "insecure-registry" in engine

    #run the Registry
    docker container run -d -p 5000:5000 --name registry registry
    
    #Pull image from Hub
    docker pull hello-world
    
    #Tag the image with our new local Registry
    docker tag hello-world 127.0.0.1:5000/hello-world
    
    #Push the image to the local Registry
    docker push 127.0.0.1:5000/hello-world

Now the image is in our Registry on the localhost and we can remove it from local machine and pull it again if needed with `docker image rm` and `docker image pull 127.0.0.1:5000/hello-world`

Things to we need to know:  
`Use Volume to store Registry Data.`  
Re-create a Registry that runs on port 5000 on local host, with a volume mountet to $pwd for the registry data

    docker container run -d -p 5000:5000 --name registry -v $(pwd)/registry-data:/var/lib/registry registry

### Enabling SSL and HTTPS for the Secure Local Registry

    mkdir certs
    openssl req -newkey rsa:4096 -nodes -sha256 -keyout certs/domain.key -x509 -days 365 -out certs/domain.crt

    mkdir /etc/docker/certs.d
    mkdir /etc/docker/certs.d/127.0.0.1:5000 
    cp $(pwd)/certs/domain.crt /etc/docker/certs.d/127.0.0.1:5000/ca.crt

    #Kill the Docker Deamon
    pkill dockerd
    dockerd > /dev/null 2>&1 &

For the secure registry, we need to run a container which has the SSL certificate and key files available, which we’ll do with an additional volume mount (so we have one volume for registry data, and one for certs). We also need to specify the location of the certificate files, which we’ll do with environment variables:
* `--restart unless-stopped` - restart the container when it exits, unless it has been explicitly stopped. When the host restarts, Docker will start the registry container, so it’s always available.
* `-v $pwd\certs:c:\certs` - mount the local certs folder into the container, so the registry server can access the certificate and key files;
* `-e REGISTRY_HTTP_TLS_CERTIFICATE` - specify the location of the SSL certificate file;
* `-e REGISTRY_HTTP_TLS_KEY` - specify the location of the SSL key file.
    
    mkdir registry-data
    docker run -d -p 5000:5000 --name registry \
        --restart unless-stopped \
        -v $(pwd)/registry-data:/var/lib/registry -v $(pwd)/certs:/certs \
        -e REGISTRY_HTTP_TLS_CERTIFICATE=/certs/domain.crt \
        -e REGISTRY_HTTP_TLS_KEY=/certs/domain.key \
        registry

#### Accessing the Secure Registry

    docker pull hello-world
    docker tag hello-world 127.0.0.1:5000/hello-world
    docker push 127.0.0.1:5000/hello-world
    docker pull 127.0.0.1:5000/hello-world

#### Enable Basic Authentication for the Secure Registry

The registry server and the Docker client support basic authentication over HTTPS. The server uses a file with a collection of usernames and encrypted passwords. The file uses Apache’s htpasswd.

Create the password file with an entry for user “moby” with password “gordon”;
The options are:
* `–entrypoint` Overwrite the default ENTRYPOINT of the image
* `-B` Use bcrypt encryption (required)
* `-b` run in batch mode
* `-n` display results
* Looks like the new registry image doesnt have htpasswd in it. So we need to find a new one

    mkdir auth
    #docker run --entrypoint htpasswd registry:latest -Bbn moby gordon > auth/htpasswd
    docker run --entrypoint htpasswd registry:2.6.2 -Bbn moby gordon > auth/htpasswd

Now we have the user and hashed PW in the auth/htpasswd file. Now we run the new Registry
* `-e REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd` - specify the location of the htpasswd file.
    docker kill registry
    docker rm registry
    docker run -d -p 5000:5000 --name registry \
      --restart unless-stopped \
      -v $(pwd)/registry-data:/var/lib/registry \
      -v $(pwd)/certs:/certs \
      -v $(pwd)/auth:/auth \
      -e REGISTRY_HTTP_TLS_CERTIFICATE=/certs/domain.crt \
      -e REGISTRY_HTTP_TLS_KEY=/certs/domain.key \
      -e REGISTRY_AUTH=htpasswd \
      -e "REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm" \
      -e "REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd" \
      registry

Now we need to login to our Registry and we can start pushing and pulling

    $docker login 127.0.0.1:5000
    Username: moby
    Password:
    $docker pull 127.0.0.1:5000/hello-world
    Using default tag: latest
    latest: Pulling from hello-world
    Digest: sha256:90659bf80b44ce6be8234e6ff90a1ac34acbeb826903b02cfa0da11c82cbc042
    Status: Image is up to date for 127.0.0.1:5000/hello-world:latest
    127.0.0.1:5000/hello-world:latest

### Using Registry with Swarm

The image has to be reachable from every node. We cant create an image on node1 and except it to work on node to without pushing it to the Registry.
ProTip: Use a hosted SaaS registry if possible

    docker service create --name registry --publish 5000:5000 registry
    docker pull hello-world
    docker tag hello-world:latest 127.0.0.1:5000/hello-world
    docker push 127.0.0.1:5000/hello-world
    docker pull nginx
    docker tag nginx:latest 127.0.0.1:5000/nginx
    docker push 127.0.0.1:5000/nginx

# Kubernetes 

## Warning
Remove any image 

    for image in $(docker image ls --format '{{.ID}}'); do docker image rm -f $image; done

Remove any container 

    for id in $(docker ps -a --format '{{.ID}}');do docker rm -f $id;done









