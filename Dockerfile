FROM node:16 as builder
WORKDIR /ws

# install dependencies without caching source code
ADD ./yarn.lock ./package.json ./
RUN npm install

# add source code
ADD . ./
RUN npm run build

FROM nginx:alpine
COPY --from=builder /ws/build/ /usr/share/nginx/html/
EXPOSE 80

