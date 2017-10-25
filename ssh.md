## Generating a new SSH key and adding it to the ssh-agent 
>`-t rsa` Specifies the type of key you are creating, in this instance is an RSA key
>`-C email@email.com` This puts a comment at the end of your public key so its easier to see which key is yours

```bash
> ssh-keygen -t rsa -C "email@email.com"
> Enter file in which to save the key (/Users/USERNAME/.ssh/KEY_NAME):
> Enter passphrase (empty for no passphrase):
```

### ssh-add
> The ssh-add command prompts the user for a private key password and adds it to the list maintained by ssh-agent. Once you add a password to ssh-agent, you will not be prompted for it when using SSH or scp to connect to hosts with your public key.
```bash
> ssh-add ~/.ssh/KEY_NAME #without the .pub
```
---

## Adding to the ssh config file  
Open `~/.ssh/config` to create new ssh config entries.

```bash
Host server-name
    HostName sub.server-name.com
    User username
    IdentitiesOnly yes
    IdentityFile ~/.ssh/id_rsa
```

---

#### now you can ssh into `server-name` with new config entry
```bash
> ssh server-name
```

> The alternative is to use ssh command that includes this info. `ssh -i ~/.ssh/some.pem username@sub.server-name.com`
> `-i` option should point to `identity_file`.

---
### to use multiple accounts on github
```bash
Host github.com-NAME
    HostName github.com
    User USERNAME
    IdentityFile ~/.ssh/KEY_NAME.pub
```

#### update get remote url
```bash
> git remote get-url origin
git@github.com-<NAME>/digital-ocean.git

> git remote set-url origin git@github.com-<NAME>:<REPO>/digital-ocean.git
git@github.com-<NAME>:<REPO>/digital-ocean.git
```