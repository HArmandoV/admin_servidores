# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.define "web" do |web|
    config.vm.box = "ubuntu/bionic64"
    web.vm.network "private_network", ip: "192.168.33.10"
    web.vm.network "forwarded_port", guest: 80, host: 80
    web.vm.provision "shell", inline: <<-SHELL
      echo "webserver" > /etc/hostname
      hostname -b webserver
      echo "192.168.33.20          clockserver" >> /etc/hosts
      mkdir Client
      cd Client
      sudo apt-get install git
      git clone https://github.com/HArmandoV/ServerNClientClock.git
      sudo apt-get install -y apache2
      cd /var/www/html
      sudo rm index.html
      sudo cp -a ~/Client/ServerNClientClock/requester.js /var/www/html
      sudo cp -a ~/Client/ServerNClientClock/index.ejs /var/www/html
      sudo cp -a ~/Client/ServerNClientClock/style.css /var/www/html
    SHELL
  end
  config.vm.define "clock" do |clock|
    config.vm.box = "ubuntu/bionic64"
    clock.vm.network "private_network", ip: "192.168.33.20"
    clock.vm.network "forwarded_port", guest: 3000, host: 3000
    clock.vm.provision "shell", inline: <<-SHELL
      echo "clockserver" > /etc/hostname
      hostname -b clockserver
      echo "192.168.33.10          webserver" >> /etc/hosts
      curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
      sudo apt-get install -y nodejs
      mkdir Server
      cd Server
      sudo apt-get install git
      git clone https://github.com/HArmandoV/ServerNClientClock.git
      cd ServerNClientClock
      node index.js &
    SHELL
  end
end