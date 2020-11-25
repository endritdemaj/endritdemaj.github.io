---
id: systemdcheatsheet
title: Systemd Cheatsheat
sidebar_label: Systemd Cheatsheat
---

# systemd

Systemd is a Linux initialization system and service manager that includes features like on-demand starting of daemons, mount and automount point maintenance, snapshot support, and processes tracking using Linux control groups.

To get started you can create your own Service with the following command

    vim /etc/systemd/system/example.service

In that file you paste the following basic configuration
    [Unit]
    Description=your description here
    After=network.target

    [Service]
    ExecStart=/opt/bla/blub/script
    Type=simple
    TimeoutStartSec=0

    [Install]
    WantedBy=multi-user.target

To Enable the Service so that it runs automatically when the system is booted, type the following

    systemctl enable example.service

    #to start it 
    systemctl start example.service


With the following command we can list systemctl Units

    systemctl list-units

There we can find Units and example start our unit after fstab

    After=network.target vpn-launch.service mnt-wibble.mount


test
