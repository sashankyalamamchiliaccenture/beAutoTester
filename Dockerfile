FROM node:18-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./api ./api
COPY ./lib ./lib
COPY ./tests ./tests
CMD ["npm", "test"]