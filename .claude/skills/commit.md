---
name: commit
description: Conventional Commits 規約に沿ったコミットメッセージで git commit を作成する。コミット時に必ず使う。
---

# /commit — Conventional Commits でコミットを作成

このプロジェクトのコミットは [Conventional Commits 1.0.0](https://www.conventionalcommits.org/ja/v1.0.0/) に厳密に従う。

## 手順

1. 並列で以下を実行し現状を把握する:
   - `git status` (untracked ファイル含む。`-uall` は使わない)
   - `git diff` (unstaged)
   - `git diff --staged` (staged)
   - `git log --oneline -10` (既存コミットスタイルの確認)
2. 変更内容を要約し、適切な `type` と `scope` を決定する
3. コミットメッセージを下記フォーマットで作成
4. `git add` で関連ファイルのみをステージ (`-A` や `.` は避ける)
5. heredoc で `git commit -m` を実行
6. `git status` で結果確認

## フォーマット

```
<type>(<scope>): <subject>

<body (任意)>

<footer (任意)>
```

- `<type>`: 下記一覧から選ぶ
- `<scope>`: 影響範囲 (任意)。例: `card`, `host`, `room`, `api`, `ci`, `nix`, `deps`
- `<subject>`: 50文字程度、命令形、日本語可、末尾ピリオドなし、先頭は小文字 (日本語は気にしない)
- `<body>`: 空行を挟んで「なぜ」を中心に記述 (任意)
- `<footer>`: BREAKING CHANGE: ... / Closes #N / Refs #N など

## type 一覧

| type | 用途 |
|---|---|
| `feat` | 新機能 |
| `fix` | バグ修正 |
| `docs` | ドキュメントのみ |
| `style` | 動作に影響しないコードスタイル変更 (フォーマット等) |
| `refactor` | バグ修正でも機能追加でもないコード変更 |
| `perf` | パフォーマンス改善 |
| `test` | テストの追加・修正 |
| `build` | ビルドシステム / 依存関係の変更 |
| `ci` | CI 設定の変更 |
| `chore` | 上記に該当しない雑務 (Nix 環境構築、`.gitignore` 等) |
| `revert` | 以前のコミットの取り消し |

## scope 例 (本プロジェクト)

- `nix`: flake.nix, devShell 周り
- `card`: ビンゴカード関連
- `host`: ホスト画面
- `play`: プレイヤー画面
- `room`: ルーム作成/参加
- `api`: API ルート
- `realtime`: SSE/WebSocket
- `ui`: 共通 UI コンポーネント
- `deps`: 依存パッケージ
- `claude`: `.claude/` 配下の Claude Code 設定
- `gh`: `.github/` 配下

## 例

```
feat(card): ビンゴカード生成ロジックを追加

5x5 のカードを B/I/N/G/O 列ごとに重複なく抽選する。
シード可能にしてテストで決定的に検証できるようにした。

Closes #7
```

```
chore(nix): Node.js 26.1.0 を devShell に追加
```

```
fix(realtime): SSE 切断時に EventSource を再接続するよう修正

Closes #15
```

## 規則

- **`--amend` 禁止**: pre-commit hook が失敗しても新規コミットで対応する
- **`--no-verify` 禁止**: hook を無視しない。失敗したら原因を直す
- **`git add -A` / `git add .` 禁止**: ファイル名を明示する
- **明示的に依頼されない限り push しない**
- Co-Authored-By フッターを付ける:
  ```
  Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
  ```
- 関連 issue があれば必ず `Closes #N` か `Refs #N` で参照する

## heredoc テンプレ

```bash
git commit -m "$(cat <<'EOF'
<type>(<scope>): <subject>

<body>

Closes #N

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```
