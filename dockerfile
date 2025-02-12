# Etapa de construcción
FROM node:22-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa final: Nginx para servir los archivos estáticos
FROM nginx:stable-alpine
# Copia el build de React en la carpeta por defecto de Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Copia la configuración personalizada de Nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]