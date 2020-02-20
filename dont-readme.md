# Nothing for you to see here

- `docker run -p 4000:4000 -v $(pwd):/app --rm -it sometag mix do deps.get, deps.compile`

- `docker run -p 4000:4000 -v $(pwd):/app --rm -it sometag /bin/bash -c 'cd assets && npm install'`

- `sudo chown $USER . -R`

- `docker run -p 4000:4000 -v $(pwd):/app --user=$UID --rm -it sometag mix phx.server`