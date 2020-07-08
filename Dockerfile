FROM node:lts-slim
WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY src/ ./src
RUN yarn install
ENTRYPOINT [ "yarn", "start" ]