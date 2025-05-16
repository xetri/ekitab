FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV NODE_ENV=${NODE_ENV:-production}
ENV PORT=${PORT:-8000}
ENV DATABASE_URL=${DATABASE_URL}
ENV JWT_SECRET_KEY=${JWT_SECRET_KEY}

RUN npm run build

EXPOSE $PORT

CMD ["npm", "start"]
