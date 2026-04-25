FROM node:20-alpine AS build
WORKDIR /app
COPY package.json ./
COPY yarn.lock* package-lock.json* ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
RUN <<EOF cat > /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;
    gzip on;

    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
