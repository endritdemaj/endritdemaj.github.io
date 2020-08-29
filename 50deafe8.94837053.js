(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{66:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return c})),t.d(n,"metadata",(function(){return i})),t.d(n,"rightToc",(function(){return l})),t.d(n,"default",(function(){return d}));var a=t(2),r=t(6),o=(t(0),t(89)),c={id:"dockercheatsheet",title:"Docker Cheatsheat",sidebar_label:"Docker Cheatsheat"},i={unversionedId:"documentation/dockercheatsheet",id:"documentation/dockercheatsheet",isDocsHomePage:!1,title:"Docker Cheatsheat",description:"You can write content using GitHub-flavored Markdown syntax.",source:"@site/docs/documentation/dockercheatsheet.md",permalink:"/endritdemaj.github.io/docs/documentation/dockercheatsheet",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/documentation/dockercheatsheet.md",sidebar_label:"Docker Cheatsheat",sidebar:"someSidebar",previous:{title:"Linux Cheatsheat",permalink:"/endritdemaj.github.io/docs/documentation/linuxcheatsheet"},next:{title:"IBM Tivoli Storage Manager (TSM) Cheatsheat",permalink:"/endritdemaj.github.io/docs/documentation/tivolicheatsheet"}},l=[{value:"Docker Editions",id:"docker-editions",children:[]},{value:"General",id:"general",children:[]},{value:"Intro",id:"intro",children:[]},{value:"General",id:"general-1",children:[]},{value:"Networking",id:"networking",children:[{value:"Docker Networks: DNS",id:"docker-networks-dns",children:[]}]},{value:"Docker Images",id:"docker-images",children:[{value:"Dockerfile",id:"dockerfile",children:[]}]},{value:"Container Lifetime &amp; Persistent Data",id:"container-lifetime--persistent-data",children:[{value:"Bind Mounting",id:"bind-mounting",children:[]}]},{value:"Docker Compose",id:"docker-compose",children:[{value:"docker-compose.yml",id:"docker-composeyml",children:[]}]},{value:"docker-compose CLI",id:"docker-compose-cli",children:[]},{value:"Docker Swarm",id:"docker-swarm",children:[{value:"Stacks",id:"stacks",children:[]}]},{value:"Docker Machine",id:"docker-machine",children:[]}],s={rightToc:l};function d(e){var n=e.components,t=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},s,t,{components:n,mdxType:"MDXLayout"}),Object(o.b)("p",null,"You can write content using ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.github.com/gfm/"}),"GitHub-flavored Markdown syntax"),"."),Object(o.b)("h2",{id:"docker-editions"},"Docker Editions"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},'Docker is no longer just a "Container runtime"'),Object(o.b)("li",{parentName:"ul"},"Dokcer moves fast, it mattes how you install it"),Object(o.b)("li",{parentName:"ul"},"Docker CE (Community Edtion)"),Object(o.b)("li",{parentName:"ul"},"Three major types of instlals: Direct, Mac/Win, Cloud"),Object(o.b)("li",{parentName:"ul"},"Linux(different per distro) (don't use default package)")),Object(o.b)("h2",{id:"general"},"General"),Object(o.b)("p",null,"Image is all the binaries of a container, scripts sources and so on\nA Container is a running instance of that image"),Object(o.b)("h2",{id:"intro"},"Intro"),Object(o.b)("p",null,"what is happening in 'docker container run' "),Object(o.b)("ol",null,Object(o.b)("li",{parentName:"ol"},"Looks for that image locally in image chache, doesnt find anything"),Object(o.b)("li",{parentName:"ol"},"then looks in remote image repository"),Object(o.b)("li",{parentName:"ol"},"downloads the latest version"),Object(o.b)("li",{parentName:"ol"},"creates new container absed on that images"),Object(o.b)("li",{parentName:"ol"},"gices it a virtual IP on a pricate network inside a container"),Object(o.b)("li",{parentName:"ol"},"opens up port 80 on host and forward to port 80 in contianer"),Object(o.b)("li",{parentName:"ol"},"starts container by using CMD in dockerfile")),Object(o.b)("h1",{id:"cheatsheet"},"Cheatsheet"),Object(o.b)("h2",{id:"general-1"},"General"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"docker version                                      #shows the version of docker client(CLI) and docker engine (systemd-deamon)\ndocker info                                         #general info expanded e.g running contianers etc.\ndocker <managemend command> <command>               #docker cointainer run\ndocke ps                                            #list all running container. -a list all containers\ndocker top <container id>                           #list processes inside a running container\nps aux                                              #show processer running inside a docker container too without hiding it\ndocker container inspect                            #details of the container\ndocker container stats                              #stats of all container\ndocker update                                       #updating a container without needing to kill it or restart, e.g RAM, Memory, CPU or so. Too much CPU to limit\n")),Object(o.b)("h2",{id:"networking"},"Networking"),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"<bridge(docker0)>")," is the default network that routes to the Host Network Interface",Object(o.b)("br",{parentName:"p"}),"\n",Object(o.b)("inlineCode",{parentName:"p"},"<host>")," it gains performance by skipping virutal networks but sacrifices security of container model. Basically it is direkt on the Host",Object(o.b)("br",{parentName:"p"}),"\n",Object(o.b)("inlineCode",{parentName:"p"},"<none>")," is not atached to anything"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"docker network ls                                   #List all docker networks\ndocker network inspect                              #inspect what we are doing\ndocker network create --driver                      #create a new network\ndocker network connect                              #atach a network to a container\ndocker network disconnect                           #detach a network from a container\n")),Object(o.b)("p",null,"Create a new Network using the default ",Object(o.b)("inlineCode",{parentName:"p"},"<bridge>")," driver. If we need another driver, we have to specify it with ",Object(o.b)("inlineCode",{parentName:"p"},"<--driver>")),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),'$docker network create my_app_net^C\n#list them\n$docker network ls\nNETWORK ID          NAME                DRIVER              SCOPE\n8d2dc7348d3d        bridge              bridge              local\n9afc2ba4f278        host                host                local\ncd18d7f432a3        my_app_net          bridge              local\na0c8590e5ace        none                null                local\n\n$docker network inspect my_app_net \n[\n    {\n        "Name": "my_app_net",\n        "Id": "cd18d7f432a34a979e9f4ae81b5c0be389cd65760fec4168f32c778ff05594ad",\n        "Created": "2020-08-23T19:59:17.646091944+02:00",\n        "Scope": "local",\n        "Driver": "bridge",\n        "EnableIPv6": false,\n        "IPAM": {\n            "Driver": "default",\n            "Options": {},\n            "Config": [\n                {\n                    "Subnet": "172.18.0.0/16",\n                    "Gateway": "172.18.0.1"\n                }\n            ]\n        },\n        "Internal": false,\n        "Attachable": false,\n        "Ingress": false,\n        "ConfigFrom": {\n            "Network": ""\n        },\n        "ConfigOnly": false,\n        "Containers": {},\n        "Options": {},\n        "Labels": {}\n    }\n]\n')),Object(o.b)("p",null,"To run  a container on a specific network we can do this:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"$docker container run -d --name new_nginx --network my_app_net nginx\n444869e57cfbd60d237d7c6e5ce792dfa78626d41546e6528c6c4b9460b05e53\n")),Object(o.b)("p",null,"If we inspect our network, we can see this: "),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),'$docker network inspect my_app_net \n[\n    {\n        "Name": "my_app_net",\n        "Id": "cd18d7f432a34a979e9f4ae81b5c0be389cd65760fec4168f32c778ff05594ad",\n        "Created": "2020-08-23T19:59:17.646091944+02:00",\n        "Scope": "local",\n        "Driver": "bridge",\n        "EnableIPv6": false,\n        "IPAM": {\n            "Driver": "default",\n            "Options": {},\n            "Config": [\n                {\n                    "Subnet": "172.18.0.0/16",\n                    "Gateway": "172.18.0.1"\n                }\n            ]\n        },\n        "Internal": false,\n        "Attachable": false,\n        "Ingress": false,\n        "ConfigFrom": {\n            "Network": ""\n        },\n        "ConfigOnly": false,\n        "Containers": {\n            "444869e57cfbd60d237d7c6e5ce792dfa78626d41546e6528c6c4b9460b05e53": {\n                "Name": "new_nginx",\n                "EndpointID": "e33e1489899ddfcfe36cbf06406561e3d2a17ad4a03a966d68ef9bd52192e47f",\n                "MacAddress": "02:42:ac:12:00:02",\n                "IPv4Address": "172.18.0.2/16",\n                "IPv6Address": ""\n            }\n        },__\n        "Options": {},\n        "Labels": {}\n    }\n]\n')),Object(o.b)("p",null,"If we want to connect an existing container to a network we have to run the following  "),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"docker network connect <containerid> <networkid>\n")),Object(o.b)("h3",{id:"docker-networks-dns"},"Docker Networks: DNS"),Object(o.b)("p",null,"In the world where containers changes from second  to second we cant rely on IPAddresses. Since its to dynamic\nThere is a build in solution for this and that is ",Object(o.b)("strong",{parentName:"p"},"DNS-Naming")),Object(o.b)("h4",{id:"tldl"},"TL;DL"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"docker container run -d --name my_container_name                                                    #run a container with a dns-name my_container_name\ndocker run -d --network-alias search --rm --name elastic_3 --network my_app_network elasticsearch:2 #run container in network my_app_network with the network alias 'search'\ndocker container run -d --name my_container_name \n")),Object(o.b)("p",null,"Since we cant have a container with a same name, docker brings up DNS-resolving with it. With the Option ",Object(o.b)("inlineCode",{parentName:"p"},"--net-alias")," or ",Object(o.b)("inlineCode",{parentName:"p"},"--network-alias"),Object(o.b)("br",{parentName:"p"}),"\n","The following commands will fire up two elasticsearch containers with the network-name ",Object(o.b)("inlineCode",{parentName:"p"},"search")," and different container names on the docker network ",Object(o.b)("inlineCode",{parentName:"p"},"my_app_network")),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"docker run -d --network-alias search --rm --name elastic_3 --network my_app_network elasticsearch:2\ndocker run -d --network-alias search --rm --name elastic_4 --network my_app_network elasticsearch:2\n")),Object(o.b)("p",null,"If we have a look and curl now the default elasticsearch port ",Object(o.b)("inlineCode",{parentName:"p"},"9200")," we can check that the DNS-Round-Robin works"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),'$docker container run --rm -ti --network my_app_network centos curl -s search:9200\n{\n  "name" : "Turner D. Century",\n  "cluster_name" : "elasticsearch",\n  "cluster_uuid" : "BsfpId_oSC6JBdP7EvdJiQ",\n  "version" : {\n    "number" : "2.4.6",\n    "build_hash" : "5376dca9f70f3abef96a77f4bb22720ace8240fd",\n    "build_timestamp" : "2017-07-18T12:17:44Z",\n    "build_snapshot" : false,\n    "lucene_version" : "5.5.4"\n  },\n  "tagline" : "You Know, for Search"\n}\n$docker container run --rm -ti --network my_app_network centos curl -s search:9200\n{\n  "name" : "Tyga",\n  "cluster_name" : "elasticsearch",\n  "cluster_uuid" : "PN5LN99vSySvyuNX1csktg",\n  "version" : {\n    "number" : "2.4.6",\n    "build_hash" : "5376dca9f70f3abef96a77f4bb22720ace8240fd",\n    "build_timestamp" : "2017-07-18T12:17:44Z",\n    "build_snapshot" : false,\n    "lucene_version" : "5.5.4"\n  },\n  "tagline" : "You Know, for Search"\n}\n')),Object(o.b)("h2",{id:"docker-images"},"Docker Images"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"App binaries and dependencies "),Object(o.b)("li",{parentName:"ul"},"Metadata about the image"),Object(o.b)("li",{parentName:"ul"},"Not a complete OS. No kernel, kernel modules (e.g. drivers)"),Object(o.b)("li",{parentName:"ul"},"App as apache")),Object(o.b)("h4",{id:"tltd"},"TL;TD;"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"docker pull nginx                           #Pull latest nginx image from default repository\ndocker history nginx:latest                 #check history of the latest nginx image\ndocker pull nginx:1.11.9                    #pull specific image of nginx\ndocker image inspect nginx                  #inspect the nginx image and check its metadata\n\ndocker image tag nginx endritdemaj/nginx    #give the nginx a new TAG\n")),Object(o.b)("p",null,"pull latest image of ",Object(o.b)("inlineCode",{parentName:"p"},"nginx")),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"$docker pull nginx\nUsing default tag: latest\nlatest: Pulling from library/nginx\nbf5952930446: Already exists \ncb9a6de05e5a: Pull complete \n9513ea0afb93: Pull complete \nb49ea07d2e93: Pull complete \na5e4a503d449: Pull complete \nDigest: sha256:b0ad43f7ee5edbc0effbc14645ae7055e21bc1973aee5150745632a24a752661\nStatus: Downloaded newer image for nginx:latest\ndocker.io/library/nginx:latest\n")),Object(o.b)("p",null,"pull another version of ",Object(o.b)("inlineCode",{parentName:"p"},"nginx:tag")),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"docker pull nginx:1.11.9\n")),Object(o.b)("p",null,"Check the layers of a container with ",Object(o.b)("inlineCode",{parentName:"p"},"docker image history")," or ",Object(o.b)("inlineCode",{parentName:"p"},"docker history"),"\nEvery image starts with a ",Object(o.b)("inlineCode",{parentName:"p"},"scratch")," (first layer) and every change on that image is another layer"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),'$docker history nginx:latest\nIMAGE               CREATED             CREATED BY                                      SIZE                COMMENT\n4bb46517cac3        10 days ago         /bin/sh -c #(nop)  CMD ["nginx" "-g" "daemon\u2026   0B                  \n<missing>           10 days ago         /bin/sh -c #(nop)  STOPSIGNAL SIGTERM           0B                  \n<missing>           10 days ago         /bin/sh -c #(nop)  EXPOSE 80                    0B                  \n<missing>           10 days ago         /bin/sh -c #(nop)  ENTRYPOINT ["/docker-entr\u2026   0B                  \n<missing>           10 days ago         /bin/sh -c #(nop) COPY file:0fd5fca330dcd6a7\u2026   1.04kB              \n<missing>           10 days ago         /bin/sh -c #(nop) COPY file:1d0a4127e78a26c1\u2026   1.96kB              \n<missing>           10 days ago         /bin/sh -c #(nop) COPY file:e7e183879c35719c\u2026   1.2kB               \n<missing>           10 days ago         /bin/sh -c set -x     && addgroup --system -\u2026   63.4MB              \n<missing>           10 days ago         /bin/sh -c #(nop)  ENV PKG_RELEASE=1~buster     0B                  \n<missing>           10 days ago         /bin/sh -c #(nop)  ENV NJS_VERSION=0.4.3        0B                  \n<missing>           10 days ago         /bin/sh -c #(nop)  ENV NGINX_VERSION=1.19.2     0B                  \n<missing>           2 weeks ago         /bin/sh -c #(nop)  LABEL maintainer=NGINX Do\u2026   0B                  \n<missing>           2 weeks ago         /bin/sh -c #(nop)  CMD ["bash"]                 0B                  \n<missing>           2 weeks ago         /bin/sh -c #(nop) ADD file:3af3091e7d2bb40bc\u2026   69.2MB  \n')),Object(o.b)("p",null,"Check an image and see its metadata with the following command to see e.g. which ports we have to open up on our host for the created container.\nCheck env. variables, or nginx version, author and so on."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"docker image inspect nginx\n")),Object(o.b)("p",null,"To give an image a new tag we hit. If we don't specify  a TAG it defaults to latest. Latest is a default TAG and not the latest image"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"docker image tag nginx endritdemaj/nginx\n")),Object(o.b)("p",null,"With the following command we push the new image to the default registry (docker hub)"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"docker image push endritdemaj/nginx\n")),Object(o.b)("p",null,"See example here: "),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"$docker image tag nginx endritdemaj/nginx\n$docker image ls\nREPOSITORY                                  TAG                 IMAGE ID            CREATED             SIZE\nendritdemaj/nginx                           latest              4bb46517cac3        10 days ago         133MB\nnginx                                       latest              4bb46517cac3        10 days ago         133MB\n\n$docker image push endritdemaj/nginx\nThe push refers to repository [docker.io/endritdemaj/nginx]\n550333325e31: Preparing \n22ea89b1a816: Preparing \na4d893caa5c9: Preparing \n0338db614b95: Preparing \nd0f104dc0a1f: Preparing \ndenied: requested access to the resource is denied\n")),Object(o.b)("p",null,"I can create new Tags as we want"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"$docker image tag endritdemaj/nginx:latest endritdemaj/nginx:testing\n$docker image ls\nREPOSITORY                                  TAG                 IMAGE ID            CREATED             SIZE\nnginx                                       latest              4bb46517cac3        10 days ago         133MB\nendritdemaj/nginx                           latest              4bb46517cac3        10 days ago         133MB\nendritdemaj/nginx                           testing             4bb46517cac3        10 days ago         133MB\n")),Object(o.b)("p",null,"If you want to create an Image of a running container you do the following:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"docker commit <containerid>\n#Find in docker image ls the new image\ndocker image tag <imageid> repo:tag\ndocker image push repo:tag                      #to push the image to the repo\n")),Object(o.b)("h3",{id:"dockerfile"},"Dockerfile"),Object(o.b)("p",null,"The instructions on how to build an Image are stored in a Dockerfile  "),Object(o.b)("p",null,"Package Manager like apt and yum are one of the reasons to build container ",Object(o.b)("inlineCode",{parentName:"p"},"FROM Debian, Ubuntu, Fedora or CentOS")),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"docker build -f some-dockerfile                         #to build from a specific dockerfile instead of the default\n")),Object(o.b)("p",null,"When we build an Image, it pulls the debian:jessie image to the local Docker Host from docker hub. Then each line is going to be executed and cached layer by layer on the docker engine\nEach Command in a Dockerfile is a new Image Layer"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"FROM debian:jessie                                      #use always a minimum distribution\nENV NGINX_VERSION 1.11.10-1~jessie                      #Enironment variables which are very important for containers since all the info is there\nRUN apt-key...                                          #runs command e.g unzipping, install something or so on.\n")),Object(o.b)("p",null,"It is usual that commands get brought together with ",Object(o.b)("inlineCode",{parentName:"p"},"&&")," because each command is a new layer to sace space and time"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"RUN apt-get update \\\n    && apt-get install --no-install-recommends -y \\\n        ca-certificates\n")),Object(o.b)("p",null,"Loggin in Docker is managed by Docker itself we have to move the logging to stdout. Everything that we want to log has to be moved there"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"RUN ln -sf /dev/stdout /var/log/nginx/access.log \\\n    && ln -sf /dev/stderr /var/log/nginx/error.log\n")),Object(o.b)("p",null,"Exporse a port on the docker virual network. The ports are not automatically exposed on the host. Thats why we need the ",Object(o.b)("inlineCode",{parentName:"p"},"--p")," in ",Object(o.b)("inlineCode",{parentName:"p"},"docker run")),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"EXPOSE 80 443\n")),Object(o.b)("p",null,"This command is launched every time we start a new container or when we restart a container"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),'CMD ["nginx", "-g", "deamon off;"]\n')),Object(o.b)("p",null,"The following command builds all dockerfiles in the current directory where ",Object(o.b)("inlineCode",{parentName:"p"},"customnginx")," is the image name"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"docker image build -t customnginx .\n")),Object(o.b)("p",null,"The hash at the line cached the changes to that line so if nothing changes til that line docker doesnt rebuild it. It is very import that the things that\nchange the least are on the top of the file and at the button the stuff that changes most"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),'$docker image build -t customnginx .\nSending build context to Docker daemon   16.9kB\nStep 1/7 : FROM debian:stretch-slim\nstretch-slim: Pulling from library/debian\n75cb2ebf3b3c: Pull complete \nDigest: sha256:c4052b51588fc32fe0c25a984a34cad5dc5990b9c12744073a9c409a6d0737cf\nStatus: Downloaded newer image for debian:stretch-slim\n ---\x3e 8ff748cdd6b1\nStep 2/7 : ENV NGINX_VERSION 1.13.6-1~stretch\n ---\x3e Running in 30c99b093c02\nRemoving intermediate container 30c99b093c02\n ---\x3e 03ecbd5ec3cc\nStep 3/7 : ENV NJS_VERSION   1.13.6.0.1.14-1~stretch\n ---\x3e Running in df3282dfa152\nRemoving intermediate container df3282dfa152\n ---\x3e b4b4df428136\nStep 4/7 : RUN apt-get update   && apt-get install --no-install-recommends --no-install-suggests -y gnupg1  &&  \n.\n.\n.\n ---\x3e Using cache\n ---\x3e 713bcce48334\nStep 6/7 : EXPOSE 80 443\n ---\x3e Using cache\n ---\x3e 7270661a16d0\nStep 7/7 : CMD ["nginx", "-g", "daemon off;"]\n ---\x3e Using cache\n ---\x3e ef446a55347e\nSuccessfully built ef446a55347e\nSuccessfully tagged customnginx:latest\n$docker image ls\nREPOSITORY                                  TAG                 IMAGE ID            CREATED             SIZE\ncustomnginx                                 latest              ef446a55347e        2 minutes ago       108MB\n')),Object(o.b)("p",null,"Use ",Object(o.b)("inlineCode",{parentName:"p"},"WORKDIR")," to change directory. This is best pratice. See example below where we copy ",Object(o.b)("inlineCode",{parentName:"p"},"index.html")," to the docker image"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"$ll\ntotal 16\ndrwxr-xr-x  2 endrit root 4096 Aug 22 21:24 ./\ndrwxr-xr-x 32 endrit root 4096 Aug 22 21:24 ../\n-rw-r--r--  1 endrit root  410 Aug 22 21:24 Dockerfile\n-rw-r--r--  1 endrit root  249 Aug 22 21:24 index.html\n$cat Dockerfile\nFROM nginx:latest\nWORKDIR /usr/share/nginx/html\nCOPY index.html index.html\n")),Object(o.b)("p",null,"we can use ",Object(o.b)("inlineCode",{parentName:"p"},"prune")," to clean up images, volumes, build cache and containers"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"docker image prune                  #to clean up just dangling images\ndocker system prune                 #will clean up everything\n\ndocker image prune -a               #will remove all images that are not used\ndocker system df                    #to see space usage\n")),Object(o.b)("h2",{id:"container-lifetime--persistent-data"},"Container Lifetime & Persistent Data"),Object(o.b)("p",null,"Volume in Dockerfile"),Object(o.b)("p",null,"Any file that is put in the Volume will outlive the contianer until we delete the volume. They needs to be manually deleted."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"VOLUME /var/lib/mysql                           #Creates a new named Volume on the host in 'dockerdir'/somehash/'_data and on the container under /var/lib/mysql\n\ndocker inspect <container>                      #under Volumes we can see the Volumes and under Mounts we can see the mapping from the Host(Source) to the Container(Destination)\n\ndocker container run -d mysql -v friendlyname:/var/lib/sql          #Creates a volume with a friendly name on the Host and on the Container\ndocker volumes ls                               #check mounted volumes and with inspect to check the mounts\n\ndocker volume create                            #create a new Docker Volume ahead of the Time\n")),Object(o.b)("h3",{id:"bind-mounting"},"Bind Mounting"),Object(o.b)("p",null,"Maps a host file or directory to a container file or directory. Two locations pointing to the same files.\nHas to be done in container run, cant be done in Dockerfile"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"... run -v /home/endrit/stuff:/path/container\n")),Object(o.b)("p",null,"For Example i start here a Postgres db"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"docker run -d --name pgdb962 -v pgdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=yourPW -d postgres:9.6.2\n")),Object(o.b)("h2",{id:"docker-compose"},"Docker Compose"),Object(o.b)("p",null,"Configure relationships between containers\nsave our docker container run settings in easy-to-read file\ncreate one-liner developer environment startups"),Object(o.b)("ol",null,Object(o.b)("li",{parentName:"ol"},"YAML-Formatted file that describes our solution options for :",Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},"container"),Object(o.b)("li",{parentName:"ul"},"networks"),Object(o.b)("li",{parentName:"ul"},"volumes"))),Object(o.b)("li",{parentName:"ol"},"A CLI tool ",Object(o.b)("inlineCode",{parentName:"li"},"docker-compose")," used for local dev/test automation with those YAML files")),Object(o.b)("h3",{id:"docker-composeyml"},"docker-compose.yml"),Object(o.b)("p",null,"Here is an example of a ",Object(o.b)("inlineCode",{parentName:"p"},"docker-compose.yml")),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"version: '2'\n\n# same as\n# docker run -p 80:80 -v $(pwd):/tmp nginx\n\nservices:\n    nginx:\n        image:nginx\n        volumes:\n            -.:tmp\n        ports:\n            - '80:80'\n")),Object(o.b)("h2",{id:"docker-compose-cli"},"docker-compose CLI"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"docker-compose up               # setup volumes/networks and start all containers\ndocker-compose down             # stop all containers and remove cont/vol/net\n\ndocker-compose ps               #shows running containers\ndocker-compose logs             #show logs of the containers \n")),Object(o.b)("p",null,'if all your project had a Dockerfile and docker-compose.yml then a "new developer onboardning" would be:\ngit clone github.com/some/software\ndocker-compose up'),Object(o.b)("p",null,"First docker-compose.yml\nIf we change the name than we have to give it with a parameter to the file\nThis code starts up a ",Object(o.b)("inlineCode",{parentName:"p"},"drupal")," container with a ",Object(o.b)("inlineCode",{parentName:"p"},"postgres")," database. Remember that the default host for postgress is ",Object(o.b)("inlineCode",{parentName:"p"},"localhos")," but outside of the container its the service name"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"version: '2'\nservices:\n  drupal:\n    image: drupal\n    ports:\n    - \"8080:80\"\n    volumes:\n    - drupal-profiles:/var/www/html/profiles\n    - drupal-sites:/var/www/html/sites \n    - drupal-themes:/var/www/html/themes \n    environment:\n        POSTGRES_PASSWORD: example\n    links:\n    - postgres2\n\n  postgres2:\n    image: postgres\n    environment:\n        POSTGRES_DB: drupal\n        POSTGRES_USER: user\n        POSTGRES_PASSWORD: example\n\nvolumes:\n    drupal-profiles:\n    drupal-sites:\n    drupal-themes:\n")),Object(o.b)("p",null,"Docker compose build. If we have this option in the Yaml it will build the image the first time it runs. If we want to force build the image, we hate to run\nGreat for complex build that have lots of vars or build args"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"docker-compose build\ndocker-compose up --build\n")),Object(o.b)("p",null,"In the below example we build a custom image if the image nginx-custom is not in the cache.\nIf the service need a database we would just hang that in"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"#docker-compose.yml\n    services:\n        proxy:\n            build:                                      #Tells that the image needs to be build\n                context: .                              #Build the Image in the current dir\n                dockerfile: nginx.Dockerfile            #Build the image using this Dockerfile\n            image: nginx-custom                         #name the image after the build nginx-custom\n            ports:\n                - '80:80'\n")),Object(o.b)("h2",{id:"docker-swarm"},"Docker Swarm"),Object(o.b)("p",null,"How do we automate container lifecycle?\nHow can we easily scale out/in/up/down?\nHow can we ensure our containers are re-created if they fail?\nHow can we replace containers without downtine (blue/green deploy)"),Object(o.b)("p",null,"Swarm Mode is a clustering solution built inside Docker"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"docker swarm init                       #to initialize swarm\nTo add a worker to this swarm, run the following command:\n\ndocker swarm join --token SWMTKN-1####################################################################3\n\nTo add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.\n")),Object(o.b)("p",null,"Service in a Swarm replaces ",Object(o.b)("inlineCode",{parentName:"p"},"docker run")),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"docker service <CMD>\ndocker service create alpine ping 8.8.8.8               # create a new service that runs alpine container that does a ping to google \ndocker service ls                                       # list all the services\ndocker service ps <ServiceName or ID>                   # list all the contianers inside a service\ndocker service update <ID> --replicas 3                 # Now we want to scale our service up\ndocker node update --role manager <ipofnode>\n\n$ docker service create --replicas 3 alpine ping 8.8.8.8\n$ docker service ps fervent_mendel \nID                  NAME                IMAGE               NODE                DESIRED STATE       CURRENT STATE            ERROR               PORTS\nxkafd3dyla7z        fervent_mendel.1    alpine:latest       node1               Running             Running 37 seconds ago                       \np89fx51fejae        fervent_mendel.2    alpine:latest       node2               Running             Running 37 seconds ago                       \ngyx2xbuobitz        fervent_mendel.3    alpine:latest       node3               Running             Running 37 seconds ago     \n")),Object(o.b)("p",null,"Network driver Overlay Multi-Host Networking. Its creating a swarm wide bridge network so that containers across hosts can communicate to each other\nJust choose ",Object(o.b)("inlineCode",{parentName:"p"},"--driver overlay")," when creating network"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"docker network create --driver overlay mydrupal\ndocker service create --name psql --network mydrupal -e POSTGRES_PASSWORD=example postgres      #create a postgress service on mydrupal network\n")),Object(o.b)("p",null,"Scaling out with Routing Mesh"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"#create an elasticsearch service with three containers\ndocker service create --name search --replicas 3 -p 9200:9200 elasticsearch:2\n")),Object(o.b)("p",null,"When we now do a curl on the localhost, the routing mesh forward with round robin our request to all thre nodes the service is running on."),Object(o.b)("p",null,"This is stateless load balancing. This LB is at OSI Layer 3 (TCP), not Layer 4 (DNS)\nBoth limitation can be overcome with: ",Object(o.b)("inlineCode",{parentName:"p"},"nginx or HAProxy LB proxy, or:")," Docker Enterprise Edition which comes with built in L4 web proxy."),Object(o.b)("p",null,"Create a Dogs VS Cats voting app ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/BretFisher/udemy-docker-mastery/tree/main/swarm-app-1#assignment-create-a-multi-service-multi-node-web-app"}),"klick")),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"docker network create --driver overlay backend\ndocker network create --driver overlay frontend\n\ndocker volume create db-data\n\ndocker service create --name vote -p 80:80 --network frontend --replicas 2 bretfisher/examplevotingapp_vote\ndocker service create --name redis --network frontend redis:3.2\ndocker service create --name worker --network frontend --network backend bretfisher/examplevotingapp_worker:java\ndocker sercice create --name db --network backend --mount type=volume,source=db-data,target=/var/lib/postgresql/data -e POSTGRES_HOST_AUTH_METHOD=trust postgres:9.5\ndocker service create --name result -p 5001:80 --network backend bretfisher/examplevotingapp_result\n")),Object(o.b)("h3",{id:"stacks"},"Stacks"),Object(o.b)("p",null,"Its like compose for swarm. With options to deploy or update something\nMany services, volumes overlay networks and so on everything in a YAML-File"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"docker stack deploy -c voting.yml voteapp                   #deploying a voteapp from the YAML-File\n")),Object(o.b)("p",null,"To update the our stack we need to make changes to the Yaml file and hit that command again with the same stack name"),Object(o.b)("h4",{id:"sectrets"},"Sectrets"),Object(o.b)("p",null,'Easiest "secure" solution for storing sercrets in Swarm\nWhat is a Secret?'),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Username and password"),Object(o.b)("li",{parentName:"ul"},"TLS Certificate and keys"),Object(o.b)("li",{parentName:"ul"},"SSH keys"),Object(o.b)("li",{parentName:"ul"},'Any data you would prefer not to be "on front page of news"\nSevrets are first stored in Swarm, then assigned to a Service(s)\nOnly Containers in assigned Service(s) can see them')),Object(o.b)("p",null,"Turorial"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),'echo "veryStrongPW" >> mypw.txt\ndocker secret create mypw mypw.txt\n#another option\necho "myDBPW" | docker secret create psql_pass -\ndocker service create --name psq --secret mypw -e POSTGRES_PASSWORD_FILE=/run/secrets/mypw postgres\ndocker service update --secret-rm                           #remove the secret\n')),Object(o.b)("p",null,"YAML-File "),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"   ...\n    POSTGRES_PASSWORD_FILE: run/secrets/psq-pw\n    secrets: \n    - psql-pw\nsecrets:\n    psql-pw:\n        external:true\n")),Object(o.b)("h2",{id:"docker-machine"},"Docker Machine"),Object(o.b)("p",null,"CLI tool to create new nodes using virtualboc"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"docker-machine create node1\ndocker-machine create node2\ndocker-machine create node3\n\n#access \ndocker-machine ssh <name>\ndocker-machine env node1\n")))}d.isMDXComponent=!0},89:function(e,n,t){"use strict";t.d(n,"a",(function(){return b})),t.d(n,"b",(function(){return u}));var a=t(0),r=t.n(a);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function c(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?c(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=r.a.createContext({}),d=function(e){var n=r.a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},b=function(e){var n=d(e.components);return r.a.createElement(s.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return r.a.createElement(r.a.Fragment,{},n)}},m=r.a.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),b=d(t),m=a,u=b["".concat(c,".").concat(m)]||b[m]||p[m]||o;return t?r.a.createElement(u,i(i({ref:n},s),{},{components:t})):r.a.createElement(u,i({ref:n},s))}));function u(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,c=new Array(o);c[0]=m;var i={};for(var l in n)hasOwnProperty.call(n,l)&&(i[l]=n[l]);i.originalType=e,i.mdxType="string"==typeof e?e:a,c[1]=i;for(var s=2;s<o;s++)c[s]=t[s];return r.a.createElement.apply(null,c)}return r.a.createElement.apply(null,t)}m.displayName="MDXCreateElement"}}]);