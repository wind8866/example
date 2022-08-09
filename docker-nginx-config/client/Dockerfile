FROM node:alpine as nodebuilder

WORKDIR /code

ADD my-app/package.json my-app/yarn.lock /code/
RUN yarn config set registry https://registry.npm.taobao.org && yarn

ADD my-app /code
RUN npm run build

FROM nginx:alpine
COPY --from=nodebuilder code/build /usr/share/nginx/html
COPY client/html /usr/share/nginx/html
COPY client/zip.conf /etc/nginx/conf.d/zip.conf
COPY client/index.conf /etc/nginx/conf.d/default.conf
