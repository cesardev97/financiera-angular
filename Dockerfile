#Versin del Node
FROM node:16.15.0

# Directorio de trabajo del API
WORKDIR /usr/src/app

COPY package.json ./

#Instala la paquetera de npm
RUN npm install && npm cache clean --force

# Copiar los archivos del proyecto al directorio de trabajo
COPY . .

RUN npm run build:ssr

#Ejecucin del API
CMD [ "npm", "run", "serve:ssr" ]
