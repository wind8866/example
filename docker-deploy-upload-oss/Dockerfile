FROM node:alpine as nodebuilder

ARG ACCESS_KEY_ID
ARG ACCESS_KEY_SECRET
ARG ENDPOINT
ENV APP_URL https://gitlab.com/liuzhen1010xyz/my-app-react/-/raw/main
ENV PUBLIC_URL https://wind8866-storage.oss-cn-hongkong.aliyuncs.com
WORKDIR /code

RUN wget http://gosspublic.alicdn.com/ossutil/1.7.7/ossutil64 -O /usr/local/bin/ossutil \
  && chmod 755 /usr/local/bin/ossutil \
  && ossutil config -i $ACCESS_KEY_ID -k $ACCESS_KEY_SECRET -e $ENDPOINT

ADD $APP_URL/package.json $APP_URL/yarn.lock /code/
RUN yarn config set registry https://registry.npm.taobao.org && yarn

# ADD https://api.github.com/repos/wind8866/hello-react/git/ref/heads/main
ADD https://gitlab.com/api/v4/projects/38437627/repository/branches/main /tmp/devalidateCache
RUN wget https://gitlab.com/liuzhen1010xyz/my-app-react/-/archive/main/my-app-react-main.tar.gz
RUN tar -zxvf my-app-react-main.tar.gz --strip-components 1 -C .

RUN npm run upload:oss


FROM nginx:alpine
COPY --from=nodebuilder code/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
