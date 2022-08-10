# as 用于多阶段构建是设置当前镜像的名称
FROM node:alpine as nodebuilder

# 会在系统根目录新建 code 文件夹
# 设置了 WORKDIR，后面所有的 RUN、CMD都是基于此目录的
WORKDIR /code

# 本文件中的COPY和ADD均可替代
COPY my-app/package.json my-app/yarn.lock /code/
RUN yarn config set registry https://registry.npm.taobao.org && yarn

COPY my-app /code
RUN npm run build

FROM nginx:alpine
COPY --from=nodebuilder code/build /usr/share/nginx/html/dist
COPY client/html /usr/share/nginx/html
COPY client/zip.conf /etc/nginx/conf.d/zip.conf
COPY client/index.conf /etc/nginx/conf.d/default.conf
