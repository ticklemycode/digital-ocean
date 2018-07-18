# Set alias on server for quick or hard to remember commands

```bash
#!/bin/bash
# .bash_aliases

## MONGODB ##

# Mongo status
alias mstatus='sudo systemctl status mongod'

# Mongo Stop
alias mstop='sudo systemctl stop mongod'

# Mongo Start
alias mstart='sudo systemctl start mongod'


## PM2 ##
alias plist='pm2 list'
alias pmon='pm2 monit'
alias plogs='pm2 logs'
alias pmon='pm2 monit'


## MISC ##

# Display server details and app details if app name provided
function details(){
  # Ubuntu info
  lsb_release -a

  echo "____________________"

  # PM2 app info
  if [ -z "$1" ]; then
   echo "[INFO] Provide PM2 app name as first argument for details on that app"
  else
    pm2 describe "$1"
  fi

}
```

