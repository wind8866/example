# syntax=docker/dockerfile-upstream:master-labs
FROM node:alpine as nodebuilder

ENV APP_URL https://gitlab.com/liuzhen1010xyz/my-app-react/-/raw/main
WORKDIR /code

ADD $APP_URL/package.json $APP_URL/yarn.lock /code/
RUN yarn config set registry https://registry.npm.taobao.org && yarn

RUN wget https://gitlab.com/liuzhen1010xyz/my-app-react/-/archive/main/my-app-react-main.tar.gz
RUN tar -zxvf my-app-react-main.tar.gz --strip-components 1 -C .

RUN npm run build:oss


FROM nginx:alpine
COPY --from=nodebuilder code/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
