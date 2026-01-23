FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
# Instalamos las librerías de nuevo para esta versión
RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]