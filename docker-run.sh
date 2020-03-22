#!/bin/bash

docker container run -it --name todo-app3 -u tarmtsuyoshi -v /home/tarmtsuyoshi/git/udemy/angular-and-spring-boot-todo-app:/home/tarmtsuyoshi/angular-and-spring-boot-todo-app -p 4200:4200 -p 9876:9876 -p 8080:8080 todo-app /bin/bash
