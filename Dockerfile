#Stage 1
FROM node as builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY nginx-custom.conf .
RUN npm install
COPY . .
RUN npm run build

#Stage 2
FROM nginx
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
# EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]