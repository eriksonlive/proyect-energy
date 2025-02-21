# Etapa de construcción
FROM node:22-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Definir argumentos para variables de entorno
ARG VITE_API_MAP_KEY
ARG VITE_AUTH_DOMAIN
ARG VITE_AUTH_KEY

# Crear variables de entorno con los valores de los argumentos
ENV VITE_API_MAP_KEY=$VITE_API_MAP_KEY
ENV VITE_AUTH_DOMAIN=$VITE_AUTH_DOMAIN
ENV VITE_AUTH_KEY=$VITE_AUTH_KEY
RUN npm run build

# Etapa final: Nginx para servir los archivos estáticos
FROM nginx:stable-alpine
# Copia el build de React en la carpeta por defecto de Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Copia la configuración personalizada de Nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]