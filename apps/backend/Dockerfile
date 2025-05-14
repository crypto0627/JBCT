FROM node:20

WORKDIR /app

COPY ./pnpm-workspace.yaml ./
COPY package.json ./         
COPY pnpm-lock.yaml ./  

RUN npm install -g pnpm
RUN pnpm install

COPY ./apps/backend /app/apps/backend

WORKDIR /app/apps/backend
RUN pnpm install

RUN pnpm build

EXPOSE 3001
CMD ["pnpm", "dev"]