---
id: linuxcheatsheet
title: Linux Cheatsheat
sidebar_label: Linux Cheatsheat
---

    pwd                                                             #print working directory   
    history                                                         #show last run commands
    history_persistant                                              #show persistant history with timestamp
    <cmd> &                                                         #run <cmd> in background or hit ctrl+Z
    nohup <cmd>                                                     #<cmd> runs even after user logges out
    watch <cmd>                                                     #tracks output of <cmd> and refreshs every 2 seconds
    <cmd> || <cmd2>                                                 #run <cmd2> when <cmd> has an error
    <cmd> && <cmd2>                                                 #run <cmd2> only when <cmd> was sucessfull
    echo $?                                                         #check return value of last run cmd, echo $hallo->hallo
    alisa dir="ls"                                                  #create an alias vor 'ls'. Put that in ~/.bashrc for it to be permanent
    echo $PATH                                                      #dir where cmds are looked for
    PATH="$PATH:/opt/newFolder                                      #extend $PATH with new folder
    cat file                                                        #catalog file, show in bash
    /etc/bashrc                                                     #global .bashrc file
    man <cmd>                                                       #man page for <cmd>
    /etc or etc                                                     #begining with / is always the absolute path
    ls                                                              #list dir
        Options>                    
            -l                                                      #long list
            -a                                                      #list all with hidden
            -h                                                      #human readable
            -S                                                      #sort by Size
            -t                                                      #sort by date
            -r                                                      #reverse sorting
    mkdir -p                                                        #create dir and parent dir even if the exists
    find . -iname "test*.txt"                                       #search for files in current dir(.) that got the name "test" and end with ".txt" ignore case sensitiv(-i)
    find . -amin 5                                                  #search for files that got touched in the last 5 mins. +5 files older than 5 mins
    find . -mmin 5                                                  #that got modified
    find /path/to/dataset -printf '%s %p\n' | sort -nr | head -50   #list 50 files in that dir ordered by size
    STDOUT STDERR                                                   #standart output and std error      
    script1.sh > /tmp/output                                        #write output of script1.sh to the file /tmp/output and override the old content. >> to append
    script1.sh 2> /tmp/output                                       #write only the errors in it
    cat datei | script2.sh                                          #wirte output in file
    less/more                                                       # like cat but with formating and scrolling
    tail -f                                                         #shows the last lines of a file and follows changes
    stat file                                                       #list information for file
    screen ls                                                       #like watch
    /bin                                                            #all executabels
    lsof                                                            #-u or -p user und process, who is using the files
    lsblk                                                           #volume info
   
    Color of cmd                                                    #export PS1="\e[0;32m[\u@\h \W]\$ \e[m "  1 fuer gruen, 2 fuer rot, 3 fuer gelb
    :%s/oldString/newString                                         #find and repleace oldstring with new string in vim. Delimeter can be changed from / to #
    apt-get update --allow-unauthenticated                          #
                or --allow-insecure-repositories   ----             #to allow insicure repos
    apt-cache madison gcc                                           #show all versions in repo
    yum downgrade httpd-2.2.3-22.el5                                #downgrade package
    yum --showduplicates list httpd | expand                        #show all versions in repo
    sudo apt list --installed | grep -i cuda                        #list all installed from cuda
    yum list installed | grep nvidia                                #list all installed from nvidia on rhel
    lsof -i -P -n                                                   #check the listening ports
    tmux                                                            #tool to monitor- split console in windows
        Options:
            ctrl-b + %                                              #split vertically
            ctrl-b + "                                              #split horizontally
            ctrl-b and arrows                                       #to move in windows
    tar -xvzf z                                                     #unzip file
    tar -zcf folder.tar.gz folder                                   #zip folder          
    /var/log/*-server-update/latest.log                             #see *-server-update errors
    echo user:pass | /usr/sbin/chpasswd                             #change PW of user or with passwd
    cat /etc/sudoers                                                #list sudoers
    chmod 777 datei +R                                              #change permissions Owner Group World
        Options:
            0                                                       #No Permissions
            1                                                       #execute
            2                                                       #write
            3                                                       #execute + write
            4                                                       #read
            5                                                       #read and execute
            6                                                       #read + write
            7                                                       #read + write + execute
    chgrp +R grp datei                                              #change group
    chown                                                           #change owner e.g > chown endrit file
    lshw | cpu                                                      #number of CPU's
    free -g                                                         #check RAM
    fdisk -l | grep Disk                                            #check Hard drives
    lsblk                                                           #check hard drives
    puppet agent -t --no-noop                                       #run puppet
    du -s /var/log/* | sort -n | tail -n 50                         #list files in /var/log ordered by size 
    swapoff -a && swapon -a                                         #umount and mount swap at runtime
    lsof -nP +L1 grep /tmp/ oder lsof -nP +L1 grep deleted          #check if files are deleted and who is using them (deleted)
    tree .                                                          # print tree of the current directory
    yum versionlock <package-name>                                  
    getent passwd <UID>                                             #to get Userid from uid
    chattr +i <filename>					    #Make a file unchangeable umutable <chattr -i> to take that back

### How to mount a new Drive /dev/sdb

    #Create new physical device
    pvcreate /dev/sdb

    #Create new Volume Group vg_daten1
    vgcreate vg_daten1 /dev/sdb

    #check the new volumes
    pvdisplay

    #create new Logical Volume Grpup with 100% from vg_datenq
    lvcreate -n /dev/mapper/vg_daten1-lv_opt_data -l100%VG vg_daten1

    #format the new drive
    mkfs.ext4 /dev/vg_daten1/lv_opt_data

    #create mountpoint
    mkdir /opt/data

    #mount new drive
    mount /dev/vg_daten1/lv_opt_data /opt/data

### Generate SSL Certificates and get them signed 
	1. generate private key
	$openssl req -x509 -nodes -days 730 -newkey rsa:2048 -keyout <private-ssl-key>.pem

	2. generate CSR with that private key
	#dont forget the Wildcards if using subdomains
	$openssl req -new -key <private-ssl-key>.pem -sha256 -nodes  -out <csr-ssl>.csr

	3. request signed CSR
		Go to ASK your IT department
	
	4. You will get a signed CRS-Certificate
		You will get a signed CSR-Certifiace something like <csr-ssl>.cer

	Check if the md5sums is correct. Need to be equal
	
	#for private KEY
	openssl rsa -noout -modulus -in <private-ssl-key>.pem | openssl md5
	(stdin)= f57a3b98b080f6d34c6e3546badffb14

	#for CSR-File
	openssl req -noout -modulus -in <csr-ssl>.csr | openssl md5
	(stdin)= f57a3b98b080f6d34c6e3546badffb14

	#for Signed Cert
	openssl x509 -noout -modulus -in <csr-ssl>.cer | openssl md5
	(stdin)= f57a3b98b080f6d34c6e3546badffb14
	
	# for webpage
	echo | openssl s_client -servername <NAME> -connect <HOST:PORT> 2>/dev/null | openssl x509 -noout -dates
	
	#check date for ssl-cls cert
	openssl x509 -enddate -noout -in <csr-ssl>.cer
	openssl x509 -dates -noout -in <csr-ssl>.cer
 ### GREP 
 
 	grep <term> <file>                                              #search for term in file
	grep -i                                                         #ignore case
	sudo grep -r <pattern> path                                     #search for pattern in files
	grep -rnw '/path' -e 'pattern'                                  #    
	cat testfile | grep --color=always -z 'hello'                   #mark the word hello und show all lines with grep
	grep -ir string *						#search recursively for "string" in all files in current path
