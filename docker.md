### Docker

#### Build Image
> `-t` Name and optionally a tag in the ‘name:tag’ format
```
docker build -t <IMAGE> .
```

#### Run container
> The `-it` instructs Docker to allocate a pseudo-TTY connected to the container’s stdin; creating an interactive bash shell in the container. 

> `--rm` Automatically remove the container when it exits

> `--name` Assign name

> `-p` Publish a container’s port(s) to the host EXPOSED_PORT:INTERNAL_PORT

```
docker run -it --rm --name=<NAME> -p 8082:9000 <IMAGE>
```

#### Clear all containers
> `-f` Force the removal of a running container (uses SIGKILL)

> `-a` Show all containers (default shows just running)

> `-q` Only display numeric IDs
```
docker rm -f $(docker ps -a -q)
```


#### Clear all images
```
docker rmi -f $(docker images -a -q)
```

#### Clear all volumes
```
docker volume rm $(docker volume ls -q
```

#### Clear all networks
```
docker network rm $(docker network ls | tail -n+2 | awk '{if($2 !~ /bridge|none|host/){ print $1 }}')
```

#### Restarting container
```
docker restart <CONTAINER>
```
