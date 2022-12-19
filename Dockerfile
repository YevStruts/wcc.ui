#Stage 1
FROM node as builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

#Stage 2
FROM nginx
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
CMD ["nginx", "-g", "daemon off;"]