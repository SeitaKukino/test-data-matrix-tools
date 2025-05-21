# ビルドステージ
FROM node:20-alpine as build

WORKDIR /app

# 依存関係のインストール
COPY package*.json ./
RUN npm ci

# ソースコードのコピーとビルド
COPY . .
RUN npm run build

# 本番環境ステージ
FROM nginx:alpine

# nginxの設定
COPY nginx.conf /etc/nginx/conf.d/default.conf

# ビルド成果物のコピー
COPY --from=build /app/dist /usr/share/nginx/html

# ポート80を公開
EXPOSE 80

# nginxをフォアグラウンドで実行
CMD ["nginx", "-g", "daemon off;"] 