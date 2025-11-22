# Bible App

聖書アプリケーションのプロジェクトです。

## バージョン更新履歴と利用方法 (v2 - v5)

### v2: [機能名を入れる]

- **概要**: [ここに v2 で追加した主な機能の説明]
- **使い方**:
  ```bash
  # 実行コマンドや使い方の例
  python app_v2.py
  ```

### v3: [機能名を入れる]

- **概要**: [ここに v3 の説明]
- **変更点**: UI の改善など
  ```bash
  # 実行コマンド
  python app_v3.py
  ```

### v4: [機能名を入れる]

- **概要**: [ここに v4 の説明]
  ```bash
  python app_v4.py
  ```

### v5: [最新版の機能]

- **概要**: [現在の最新機能の説明]
- **今後の予定**:
  ```bash
  python app_v5.py
  ```

---

## 開発環境・Git 設定メモ（重要）

このリポジトリは、Global 設定とは別のサブアカウント（`tjc-kousei`）で運用しています。
Push できない、認証エラーが出るなどのトラブル時は以下の設定を確認してください。

### 1. アカウント名義の設定

このリポジトリ（フォルダ）内でのみ有効なユーザー名を設定します。

```bash
git config --local user.name "tjc-kousei"
git config --local user.email "（登録したメールアドレス）"
```

### 2. 認証とリモート URL 設定

パスワード（トークン）入力を省略し、ユーザー名を明示した URL を使用します。

```bash
# ユーザー名入りのURLをセット
git remote set-url origin https://tjc-kousei@github.com/tjc-kousei/bible_app.git

# 認証情報をPCに保存する（次回から入力不要にする）
git config --local credential.helper store
```

### 3. 通信エラー対策（RPC failed / HTTP 400）

大きなファイルを Push する際や、通信が切断される場合に設定します。

```bash
# バッファサイズを500MBに拡張
git config --local http.postBuffer 524288000

# HTTPバージョンを1.1に固定（安定化）
git config --local http.version HTTP/1.1
```

### 4. 強制 Push が必要な場合

リモートとローカルの整合性が取れない場合（初期設定時など）に使用。

```bash
git push -f origin main
```
