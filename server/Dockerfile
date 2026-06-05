FROM node:20-alpine

WORKDIR /app

# No runtime dependencies — copy the source straight in.
COPY package.json ./
COPY index.js ./

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "index.js"]
