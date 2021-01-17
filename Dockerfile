FROM node:15.4.0-alpine
WORKDIR /app
COPY ./ /app
RUN npm install
CMD npm run start:dev
