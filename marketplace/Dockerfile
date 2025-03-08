FROM node:22.14-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm i

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS production
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]

FROM base AS development
WORKDIR /app
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
CMD ["npm", "run", "dev"]