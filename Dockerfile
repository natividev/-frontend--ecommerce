FROM node:24-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN npm ci

FROM node:24-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build   # ahora Tailwind y lightningcss sí están

FROM node:24-alpine

WORKDIR /app
ENV NODE_ENV=production
EXPOSE 3000

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

RUN npm prune --omit=dev

CMD ["npm", "start"]