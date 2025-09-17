FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build NestJS
RUN npm run build

# Génère le client Prisma pour Linux
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]
