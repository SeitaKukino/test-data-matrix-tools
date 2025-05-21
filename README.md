# テストデータ行列ツール

テストデータの行列（マトリックス）を最小化するためのWebアプリケーションです。

## 機能

- Excelからコピーしたテストデータを貼り付けて表示
- 空白や「-」をワイルドカードとして扱い、同じパターンの行を統合
- 元の表と最小化済みの表を同時に表示し、行の対応関係を確認可能

## 開発環境での実行

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

## Dockerでの実行

Dockerを使用してアプリケーションを実行する場合：

```bash
# アプリケーションのビルドと起動
docker-compose up -d

# アプリケーションの停止
docker-compose down
```

アプリケーションは http://localhost:8080 でアクセス可能です。

## 技術スタック

- React
- TypeScript
- Material-UI
- Vite
- Docker
- Nginx
