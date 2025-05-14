# 前端構建階段
FROM node:20 AS frontend-builder

WORKDIR /app

# 複製 workspace 根目錄下的依賴管理文件
COPY ./pnpm-workspace.yaml ./
COPY ./package.json ./
COPY ./pnpm-lock.yaml ./

# 安裝全局 pnpm
RUN npm install -g pnpm

# 安裝工作區所有依賴
RUN pnpm install

# 複製前端應用原始碼
COPY ./apps/frontend /app/apps/frontend

# 切換到前端工作目錄，確保前端依賴正確
WORKDIR /app/apps/frontend
RUN pnpm install

# 執行前端構建
RUN pnpm run build

EXPOSE 3000
CMD ["pnpm", "dev"]
