
FROM node:18-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
RUN npm install --silent

# RUN npm install

COPY . ./

# RUN npm run build

EXPOSE 80

CMD ["npm", "start"]
