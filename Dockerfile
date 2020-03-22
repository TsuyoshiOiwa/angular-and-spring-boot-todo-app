FROM adoptopenjdk:13.0.2_8-jdk-hotspot-bionic

RUN ["/bin/bash", "-c", "apt update && apt install -y \
  sudo \
  nodejs \
  npm \
  yarn; \
  locale-gen ja_JP.UTF-8; \
  /usr/sbin/update-locale LANG=ja_JP.UTF-8;"]

RUN apt update && apt install -y wget; \
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add - ; \
    echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list; \
    apt update && apt install -y xvfb firefox google-chrome-stable;

RUN ["/bin/bash", "-c", "apt update && npm install n -g; \
  n 8.12.0; \
  apt purge -y nodejs npm;"]

RUN npm install -g @angular/cli@7.0.3

ENV USER tarmtsuyoshi
ENV UID 1000
ENV GID 1000
ENV PASS ${USER}
ENV HOME /home/${USER}
ENV SHELL /bin/bash

RUN ["/bin/bash", "-c", "useradd -m -u ${UID} ${USER}; \
  gpasswd -a ${USER} sudo; \
  echo ${USER}:${PASS} | chpasswd;"]

USER ${USER}
RUN ["/bin/bash", "-c", "echo ${PASS} | chsh -s ${SHELL};"]

WORKDIR /home/tarmtsuyoshi/angular-and-spring-boot-todo-app
