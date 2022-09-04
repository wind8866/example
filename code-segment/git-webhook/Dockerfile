# 配合 git-webhook 一起使用
# docker build -t git-webhook .
# docker run -it -p 80:80 git-webhook sh

FROM node:alpine

WORKDIR /code
COPY service.js /code/

CMD node service.js
