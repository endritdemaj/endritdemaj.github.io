---
id: tivolicheatsheet
title: IBM Tivoli Storage Manager (TSM) Cheatsheat
sidebar_label: IBM Tivoli Storage Manager
---

Acess TSM
Keep in mind that in some cases running dsmc
    
    dsmc
    #help 
    Protected> help

Keep in mind that in some cases running dsmc as root doesnt work
or 

Querying your scheduled backup slot

    Protect> q sched

Querying what files are included/excluded for backup

    Protect> q inclexcl

Querying what partitions have been backed up

    Protect> q fi

Querying what files have been backed up
    Protect> q ba /home/ians/projects/*

With subdir 

    Protect> q ba /home/ians/projects/* -subdir=yes

By default only the current versions of files are listed. In order to query both current active and previous inactive versions of files, add the -inactive option to the query:

    Protect> q ba /home/ians/projects/* -subdir=yes -inactive
    

Backing up local disks
    Protect> incr /  /usr  /usr/local  /home   

Backing up selected files

    Protect> incr /home/ians/projects/hsm*/* -su=yes 

 Restoring selected files

    Protect> rest /home/ians/myfile.txt /home/ians/restore/ Protect> rest /home/ians/myfile.txt /home/ians/restore/myoldfile.txt

Restoring multiple files and directories

    Protect> rest /home/ians/projects/hsm41test/*  /home/ians/projects/restore/ -su=yes

Restoring entire partitions

    Protect> rest /home/*  /tmp/restore/ -su=yes

Restoring old and/or deleted files

    Protect> rest /home/ians/projects/*  /tmp/restore/ -su=yes  -inactive -pick

Restoring your data to another machine
    
    #start dsmc
    dsmc -virtualnodename=DEAD.MACHINE  
    Protect> rest /home/* /scratch/     -su=yes