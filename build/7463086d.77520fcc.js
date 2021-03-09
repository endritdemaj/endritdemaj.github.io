(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{75:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return i})),n.d(t,"default",(function(){return b}));var a=n(2),r=n(6),l=(n(0),n(93)),o={id:"kubernetescheatsheet",title:"Kubernetes Cheatsheet",sidebar_label:"Kubernetes Cheatsheat"},c={unversionedId:"documentation/kubernetescheatsheet",id:"documentation/kubernetescheatsheet",isDocsHomePage:!1,title:"Kubernetes Cheatsheet",description:"Kubernetes",source:"@site/docs/documentation/kubernetescheatsheet.md",permalink:"/endritdemaj.github.io/docs/documentation/kubernetescheatsheet",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/documentation/kubernetescheatsheet.md",sidebar_label:"Kubernetes Cheatsheat",sidebar:"someSidebar",previous:{title:"Docker Cheatsheat",permalink:"/endritdemaj.github.io/docs/documentation/dockercheatsheet"},next:{title:"IBM Tivoli Storage Manager (TSM) Cheatsheat",permalink:"/endritdemaj.github.io/docs/documentation/tivolicheatsheet"}},i=[{value:"Scaling ReplicaSets",id:"scaling-replicasets",children:[]},{value:"Run, Create and Expose Generators",id:"run-create-and-expose-generators",children:[]},{value:"Imperative vs. Declarative",id:"imperative-vs-declarative",children:[]},{value:"kubectl apply",id:"kubectl-apply",children:[]},{value:"Kubernetes Configuration YAML",id:"kubernetes-configuration-yaml",children:[]},{value:"Hands on",id:"hands-on",children:[]},{value:"Labels and Annotations",id:"labels-and-annotations",children:[]}],p={rightToc:i};function b(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(l.b)("wrapper",Object(a.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(l.b)("h1",{id:"kubernetes"},"Kubernetes"),Object(l.b)("p",null,"Kubernetes: The whole orchestration system\nK8s or Kube for short\nkubectl: CLI to configure Kubernetes and manage apps\nNode: Single server in the Kubernetes cluster\nKubelet: Kubernetes agent running on nodes kubelet.service\nControl Plane: Set of containers that manage the cluster"),Object(l.b)("p",null,"Master and Workers"),Object(l.b)("p",null,"Master",Object(l.b)("br",{parentName:"p"}),"\n","Runs the following container"),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"etcd - distibuted store system key value to store configuration data"),Object(l.b)("li",{parentName:"ul"},"API  -  the way we talk to the cluster"),Object(l.b)("li",{parentName:"ul"},"Scheduler - to controle the containers and pods"),Object(l.b)("li",{parentName:"ul"},"Controller Manager - "),Object(l.b)("li",{parentName:"ul"},"CoreDNS")),Object(l.b)("p",null,"Nodes  "),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"kubelet Agent"),Object(l.b)("li",{parentName:"ul"},"Kube-proxy - to controll the networking")),Object(l.b)("p",null,"Pod: one or more containers running together on one Node",Object(l.b)("br",{parentName:"p"}),"\n","Basic unit of deployment. containers are always in pods",Object(l.b)("br",{parentName:"p"}),"\n","Controller: For creating/updating pods and other objects",Object(l.b)("br",{parentName:"p"}),"\n","Many types of Controllers inc. Deployment, ReplicaSet, statefulSet\nService: network endpoint to connect to a pod\nNamespace: Filtered group of objects in cluster"),Object(l.b)("p",null,Object(l.b)("inlineCode",{parentName:"p"},"kubectl version")," to check version for client and server"),Object(l.b)("p",null,"Two ways to deploy Pods (containers) : Via commands or via YAML"),Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{}),"# to start a pod\nkubectl run my-nginx --image nginx                      # create a single pod   # before 1.18 this would create a deployment\nkubectl create deployment nginx --image nginx           # create a deployment with a replicaset in it which got pods running\n\n# to see what we did there\nkubectl get pods\nkubectl get all                             #see all objects\n")),Object(l.b)("p",null,"Pods -> ReplicaSet -> Deployment"),Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{}),"kubectl delete deployment my-nginx\nkubectl delete pod my-nginx                     # to delete the pod i created\n")),Object(l.b)("h2",{id:"scaling-replicasets"},"Scaling ReplicaSets"),Object(l.b)("p",null,"Start a new deployment for Apache/pod"),Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{}),"#OLD kubectl run my-apache --image httpd\nkubectl create deployment my-apache --image httpd\n")),Object(l.b)("p",null,"Scale up to to replicas"),Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{}),"kubectl scale deployment.apps/my-apache --replicas 2\n#or\nkubectl scale deploy my-apache --replicas 3\n")),Object(l.b)("p",null,"This is how it looks after the last commands with the Pods/Replicas/deployments"),Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{}),"$kubectl get all\nNAME                             READY   STATUS    RESTARTS   AGE\npod/my-apache-65fd7bd7db-gn7qg   1/1     Running   0          2m23s\npod/my-apache-65fd7bd7db-nt98m   1/1     Running   0          3m41s\npod/my-apache-65fd7bd7db-snfp4   1/1     Running   0          54s\n\nNAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE\nservice/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   21m\n\nNAME                        READY   UP-TO-DATE   AVAILABLE   AGE\ndeployment.apps/my-apache   3/3     3            3           3m41s\n\nNAME                                   DESIRED   CURRENT   READY   AGE\nreplicaset.apps/my-apache-65fd7bd7db   3         3         3       3m41s\n")),Object(l.b)("p",null,"Check pods"),Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{}),"kubectl get pods                                    #get running pods\n    -w                                              #to watch\nkubectl logs deployment/my-apache                   # get the log of the deployment where only the log of one pod is showing\n        --follow, --tail 10                         # like linux, follow the logs or show only tail 10\nkubectl logs deployment/my-apache                       # see all logs for label -x`l \n        --all-containers=true                       # to see logs for all containers\n\nkubectl describe pod/my-apache-65fd7bd7db-gn7qg     # describe pod and see events\nkubectl logs <podname> -n <deployment-name> --timestamps -f\n")),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"Learning Services Types"),Object(l.b)("li",{parentName:"ul"},"Creating Services Types"),Object(l.b)("li",{parentName:"ul"},"Exposing Containers")),Object(l.b)("p",null,"A service is a stable address for pods. If we want to connect to pods, we need a service\nCoreDNS allows us to sesorlve services by name.\nkubectl expose                  #creates a service for existing pods"),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"ClusterIP (default) ",Object(l.b)("ul",{parentName:"li"},Object(l.b)("li",{parentName:"ul"},"Single, internal virtual IP allocated"),Object(l.b)("li",{parentName:"ul"},"only reachable from within cluster (nodes and pods)"),Object(l.b)("li",{parentName:"ul"},"pods can reach service on apps port number"))),Object(l.b)("li",{parentName:"ul"},"NodePort",Object(l.b)("ul",{parentName:"li"},Object(l.b)("li",{parentName:"ul"},"Designed for something outside the cluster"),Object(l.b)("li",{parentName:"ul"},"High port allocated on each node"),Object(l.b)("li",{parentName:"ul"},"Port is open on every nodes IP"))),Object(l.b)("li",{parentName:"ul"},"LoadBalancer",Object(l.b)("ul",{parentName:"li"},Object(l.b)("li",{parentName:"ul"},"Controls a LB endpoint external to the cluster"),Object(l.b)("li",{parentName:"ul"},"Only available when infra provider gives you a LB"),Object(l.b)("li",{parentName:"ul"},"creates NodePort+ClusterIP services, tells LB to send to NodePort"))),Object(l.b)("li",{parentName:"ul"},"ExternalName",Object(l.b)("ul",{parentName:"li"},Object(l.b)("li",{parentName:"ul"},"Stuff in our cluster need to talk outside the cluster"),Object(l.b)("li",{parentName:"ul"},"adds CNAME DNS record to CoreDNS only"),Object(l.b)("li",{parentName:"ul"},"Not used for Pods, but for giving pods a DNS name to use for something outside K8s")))),Object(l.b)("p",null,"Expose Deployment to port"),Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{}),"kubectl expose deployment/httpenv --port 8888           #exposing httpsenv to port 8888\nkubectl get service                                     # to list all running services\n#start a container temporary start with bash remove it after it\nkubectl run --generator run-pod/v1 tmp-shell --rm -it --image bretfisher/netshoot -- bash\n\n#Expose httpenv to the NodePort so the Service is reachable outside of the Cluster\nkubectl expose deployment/httpenv --port 8888 --name httpsenv-np --type NodePort # now we can curl localhost\nkubectl expose deployment/httpenv --port 8888 --name httpsenv-lb --type LoadBalancer\n")),Object(l.b)("p",null,"Kubernetes Services DNS"),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"Starting with 1.11, internal DNS is provided by CoreDNS"),Object(l.b)("li",{parentName:"ul"},"Like Swarm, this is DNS-Based Service Discovery"),Object(l.b)("li",{parentName:"ul"},"So Far we've been using hostnames to access Services\n",Object(l.b)("inlineCode",{parentName:"li"},"> curl <hostname>")),Object(l.b)("li",{parentName:"ul"},"Namespaces to section up inside clusters ",Object(l.b)("inlineCode",{parentName:"li"},"kubectl get namespaces"),"\nServices also have a FQDN\n",Object(l.b)("inlineCode",{parentName:"li"},"> curl <hostname>.<namespace>.svc.cluster.local"))),Object(l.b)("h2",{id:"run-create-and-expose-generators"},"Run, Create and Expose Generators"),Object(l.b)("p",null,'These commands use helper templates called "generators"\nEvery resource in Kubernetes has a specification or "spec"\nTry it out with',Object(l.b)("br",{parentName:"p"}),"\n",Object(l.b)("inlineCode",{parentName:"p"},"> kubectl create deployment sample --image nginx --dry-run -o yaml")),Object(l.b)("h2",{id:"imperative-vs-declarative"},"Imperative vs. Declarative"),Object(l.b)("p",null,"Learn the Imperative CLI for easy control of local and test setups\nMove to apply -f file.yml and apply -f directory\\\nStore yaml in git, git commit each change before you apply"),Object(l.b)("h2",{id:"kubectl-apply"},"kubectl apply"),Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{}),"#create/update resources in a file\nkubectl apply -f filename.yml\n#create/update a whole driectory of yaml\nkubectl apply -f myyaml/\n#create/update from  a URL\nkubectl apply -f https://bret.run/pod.yml\n")),Object(l.b)("h2",{id:"kubernetes-configuration-yaml"},"Kubernetes Configuration YAML"),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"Kubernetes configuration file (YAML or JSON)"),Object(l.b)("li",{parentName:"ul"},"Each file contains one or more manifests"),Object(l.b)("li",{parentName:"ul"},"Each manifest describes an API object (deployment, job, secret)"),Object(l.b)("li",{parentName:"ul"},"Each manifest needs four parts(root key:values in the file)"),Object(l.b)("li",{parentName:"ul"},"apiVersion:"),Object(l.b)("li",{parentName:"ul"},"kind:"),Object(l.b)("li",{parentName:"ul"},"metadata:"),Object(l.b)("li",{parentName:"ul"},"spec:")),Object(l.b)("p",null,"Example of a yml-file"),Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{}),"$cat app.yml \napiVersion: v1\nkind: Service\nmetadata:\n  name: app-nginx-service\nspec:\n  type: NodePort\n  ports:\n  - port: 80\n  selector:\n    app: app-nginx\n---\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: app-nginx-deployment\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: app-nginx\n  template:\n    metadata:\n      labels:\n        app: app-nginx\n    spec:\n      containers:\n      - name: nginx\n        image: nginx:1.17.3\n        ports:\n        - containerPort: 80\n")),Object(l.b)("p",null,"Building Your YAML spec",Object(l.b)("br",{parentName:"p"}),"\n","We can get  all the keys each kind supports",Object(l.b)("br",{parentName:"p"}),"\n",Object(l.b)("inlineCode",{parentName:"p"},"kubectl explain services --recursive"),Object(l.b)("br",{parentName:"p"}),"\n","List only the specs",Object(l.b)("br",{parentName:"p"}),"\n",Object(l.b)("inlineCode",{parentName:"p"},"kubectl explain services.spec")),Object(l.b)("h2",{id:"hands-on"},"Hands on"),Object(l.b)("p",null,"Start the Services from ./app.yml\n",Object(l.b)("inlineCode",{parentName:"p"},"kubectl apply -f app.yml"),"\ncheck if there are any changes and update the services",Object(l.b)("br",{parentName:"p"}),"\n",Object(l.b)("inlineCode",{parentName:"p"},"kubectl apply -f app.yml --server-dry-run"),"\nCompare the yaml with the stuff running in the Server\n",Object(l.b)("inlineCode",{parentName:"p"},"kubectl diff -f app.yml "),"  "),Object(l.b)("h2",{id:"labels-and-annotations"},"Labels and Annotations"),Object(l.b)("p",null,"Lables goes under ",Object(l.b)("inlineCode",{parentName:"p"},"metadata:")," in your YAML",Object(l.b)("br",{parentName:"p"}),"\n","Simple list of key:value for identifying your resource lateyer by selecting , grouping, or filtering for it",Object(l.b)("br",{parentName:"p"}),"\n","Comon examples include ",Object(l.b)("inlineCode",{parentName:"p"},"tier: frontend, app:api, env:prod, customer:acme.co")))}b.isMDXComponent=!0},93:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return m}));var a=n(0),r=n.n(a);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=r.a.createContext({}),b=function(e){var t=r.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},s=function(e){var t=b(e.components);return r.a.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,o=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),s=b(n),d=a,m=s["".concat(o,".").concat(d)]||s[d]||u[d]||l;return n?r.a.createElement(m,c(c({ref:t},p),{},{components:n})):r.a.createElement(m,c({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=d;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var p=2;p<l;p++)o[p]=n[p];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);