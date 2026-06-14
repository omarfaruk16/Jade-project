FROM node:20-alpine

WORKDIR /app

# Install openssl for prisma compatibility
RUN apk add --no-cache openssl

# Install dependencies first (cached layer)
COPY package*.json ./
RUN npm ci --only=production

# Generate Prisma client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy source
COPY . .

# Ensure uploads directory exists with correct permissions
RUN mkdir -p /app/uploads && chmod 755 /app/uploads

EXPOSE 5001

# Run migrations + seed (idempotent) then start server
CMD ["sh", "-c", "npx prisma migrate deploy && node seed.js && node index.js"]
