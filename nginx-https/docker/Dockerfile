FROM nginx
# COPY code/build /usr/share/nginx/html
WORKDIR /config

COPY wind8866.top_cert_chain.pem /usr/local/nginx/cert/ssl.pem
COPY wind8866.top_key.key /usr/local/nginx/cert/ssl.pem
COPY default.conf /etc/nginx/conf.d/default.conf

