Digital Ocean Server Setup & Node.js Deployment
by Brad Traversy


In this post I will include the steps, commands and code that we used in the Node.js Deployment video. This is not only deployment but also preparing our server with SSH keys and some security precautions such as disabling password and root login.

Sign Up
You need to create a Digital Ocean account. Please use my affiliate link below and get $10 (2 months) free credit

Sign Up With This Link

Add your PayPal/CC account info. You will not be charged until you buy a package
Choose your OS – I would suggest Ubuntu unless you have another preference
Choose a size/package. We use the $5 per month in the video
 Setup your SSH keys below
SSH Key Setup
Download Putty and PuttyGen from here

Open PuttyGen and click “Generate”
Copy the public key in the window


Save the public key as publickey.txt (or whatever you want)
Save the private key as privatekey.ppk (or whatever you want)
Go back to the Digital Ocean page and paste in the key and name it
Continue to create your droplet

Connect via Putty
Once your droplet is setup, open up Putty.exe

Type in your server/droplet IP address in Host name
Click on the Connection->Data tab and add “root” in the Auto-login username field
Click on the SSH->Auth tab and browse for your private key .ppk file
Go back to the Session tab, name it and click “Save”
Click Open to connect
You should now be able to connect with the root user using your SSH keys

Create New User
Now you want to create a new user. We will use the username “myuser” for this tutorial

adduser myuser

Add the user to the sudo group

usermod -aG sudo myuser

Check to make sure they were added

id myuser

Login as that user

sudo su - myuser

Authorize Key For New User
Create a .ssh directory

mkdir ~/.ssh

chmod 700 ~/.ssh

Enter the authorized_keys file

nano ~/.ssh/authorized_keys

Paste in your key in this format with NO LINEBREAKS

ssh-rsa AAAAB3NzaC1yc2EAAAABJQAAAQEAn+XWIQCPgauEZFR4YNxqdqM94DqpuLQlHcyFd27/mYXSGaWZE9xROHHv4VrSYOdD4gPGVD
zL1XWt+c81jBC++YntcxNbljYQP0gkV1+KwiS4+2UuocRBVlQfkSHROr92PmNpRPMGuyeC9luLSNakUrDpIIFFVt52gZhM9pOR
k7WEBoDn8cWz65hpN9ZOMmfRfRwDfFDjJ0XDVubB9/XfKGVlRgN6x6GIj0Wab3n7z/Gw7ifOFxrXKT7GRP/KMl0HPXZHSlNt9M
EMa8B5FT29Kte4KjjMdyS9nJqTj5UeUXvNQPM8iYczS/lJxV7lSSkwfO+8BrBz9L/N+B3Vm9maSQ==

Exit and save (ctrl-x then ctrl-y then Enter)

Now change the permissions of the file

chmod 600 ~/.ssh/authorized_keys

Restart the ssh service

sudo service ssh restart

Close the putty window and re-enter then try connecting with the new username and the ssh key

Disable Root & Password Login
Once logged in as the new user, edit the sshd_config file

sudo nano /etc/ssh/sshd_config
ctrl + w to search

Change to the following
PermitRootLogin no
PasswordAuthentication no

Exit the file and save (ctrl-x then ctrl-y then Enter)

Reload sshd with this command

sudo systemctl reload sshd

You can test out the password and root login now if you want to make sure it does not let you in

Install Node.js On The Server
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install nodejs

Now node should be installed. To check use
node -v

Install Git On The Server
sudo apt-get install git

Create SSH Key For Github
Now you need to create your SSH key got Github

ssh-keygen -t rsa -C "your_email@example.com"

It will get saved to home/myuser/.ssh/id_rsa.pub

Copy that key in that file. I would suggest using WinSCP to download he file and copy the key. Download WinSCP here

Once you copy the key, sign into Github and goto “Settings->SSH and GPG Keys” and add and name the new key

Clone The Node.js App From Github And Test
git clone git@github.com:heroku/node-js-sample.git
cd node-js-sample
npm install
npm start

Now go to your browser and put http://YOURSERVERIP:5000 and you should see your apps Hello World page

Stop the app with ctrl + c

Install PM2
Install PM2 so you can run the app as a process

sudo npm install pm2 -g
pm2 start index.js

Your app should now be running as a process

Add A Domain Name
Go to your domain registrar and add the following nameservers for the domain..

ns1.digitalocean.com
ns2.digitalocean.com
ns3.digitalocean.com

It may take a few hours for the DNS to kick in

Now go to your Digital Ocean panel and go to “Networking->Domains” and add the domain there

Create An A Record
Put @ in the hostname and then your droplet IP in the “Will Direct To” field

Create a CNAME
Put www in host name and @ in the “In Alias Of” field

Your domain should now be setup. Go to http://yourdomain.com:5000. It may take a bit to propogate the DNS

Change to port 80
Stop the app with

pm2 stop index.js

Open up your apps index.js file and change port 5000 to port 80

Install the libcap2-bin package

sudo apt-get install libcap2-bin

Run this command

sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\``

Start your app up again

pm2 start index.js

Now visit http://yourdomain.com

You should see your app up and running.