FROM node:20-alpine as builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV NODE_ENV=${NODE_ENV}
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_CDN_URL=${VITE_CDN_URL}

RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]