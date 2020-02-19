# ./Dockerfile

# Extend from the official Elixir image
FROM bitwalker/alpine-elixir:1.9.4

# Create app directory and copy the Elixir projects into it
RUN mkdir /app
#COPY . /app
WORKDIR /app

RUN \
    apk update && \
    apk upgrade --update musl && \
    apk --no-cache --update add \
        make \
        g++ \
        wget \
        curl \
        nodejs \
        nodejs-npm \
	inotify-tools \
        bash && \
	npm install npm -g --no-progress && \
	update-ca-certificates --fresh && \
	rm -rf /var/cache/apk/*



# Install hex package manager
# By using --force, we don’t need to type “Y” to confirm the installation
RUN mix do local.hex --force, local.rebar --force


RUN mix archive.install hex phx_new 1.4.13 --force

# Compile the project
#RUN mix do compile
