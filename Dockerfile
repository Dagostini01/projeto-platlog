# ---- build (Vite) ----
FROM node:20-alpine AS build
WORKDIR /app

# Instala dependências
COPY package*.json ./
# use npm ci se tiver package-lock.json; senão npm i
RUN if [ -f package-lock.json ]; then npm ci; else npm i; fi

# Copia o restante e builda
COPY . .
# Vite gera /dist
RUN npm run build

# ---- serve (nginx) ----
FROM nginx:1.27-alpine

# copia o build estático pro nginx
COPY --from=build /app/dist /usr/share/nginx/html

# SPA fallback para React Router (v7)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
# healthcheck simples
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://127.0.0.1/ || exit 1

# nginx já inicia como CMD
