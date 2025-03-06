FROM node:lts-alpine3.18 AS base
WORKDIR /app
COPY package*.json ./

FROM base AS builder
RUN npm install
COPY . .
RUN npm run build

FROM base AS production
ENV NODE_ENV=production
RUN npm i --omit=dev
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/main.js"]

FROM base AS development
ENV NODE_ENV=development
RUN npm install
COPY . .
CMD ["npm", "run", "start:dev"]