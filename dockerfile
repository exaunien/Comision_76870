FROM node:20

WORKDIR /app

COPY package*.json ./
# Instalamos las librerías de nuevo para esta versión
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "src/app.js"]