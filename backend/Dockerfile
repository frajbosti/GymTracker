# Slika za backend. Gradi se v jobu deploy iz artefakta "backend-dist":
# aplikacija je že prevedena (dist), tukaj se samo zapakira skupaj z odvisnostmi.
FROM node:22-slim

# Prisma za povezavo z bazo potrebuje knjižnico OpenSSL.
RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Datoteke z odvisnostmi (točne različice iz package-lock.json).
COPY package.json package-lock.json ./
COPY frontend/package.json frontend/
COPY backend/package.json backend/
COPY backend/prisma backend/prisma

# Namestimo samo odvisnosti backenda.
RUN npm ci --workspace backend

# Prevedena aplikacija iz joba build.
COPY backend/dist backend/dist

WORKDIR /app/backend
RUN npx prisma generate

ENV NODE_ENV=production

# Ob zagonu: najprej posodobi bazo (migracije), nato zaženi strežnik.
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
