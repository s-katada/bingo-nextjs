---
name: pr
description: プロジェクトの PR テンプレート (.github/PULL_REQUEST_TEMPLATE.md) に沿った Pull Request を gh CLI で作成する。PR 作成時に必ず使う。
---

# /pr — Pull Request を作成

このプロジェクトでは PR のタイトルと本文を統一フォーマットに揃える。

## 手順

1. ブランチの状態を並列で把握する:
   - `git status` (`-uall` は使わない)
   - `git diff` (unstaged)
   - `git diff main...HEAD` (base からの差分全体)
   - 現在のブランチがリモートを追跡しているか、最新か
   - `git log main..HEAD --oneline` (このブランチのコミット一覧)
2. 全コミットを踏まえて以下を決める:
   - PR タイトル (Conventional Commits 形式・70文字以内)
   - 本文 (テンプレートに従う)
3. 必要なら新規ブランチ作成 → `git push -u origin <branch>`
4. `gh pr create` を heredoc で実行
5. 完成した PR URL をユーザーに返す

## ブランチ命名規則

`<type>/<short-description>` 形式 (Conventional Commits の type に揃える):

- `feat/bingo-card-ui`
- `fix/sse-reconnect`
- `docs/readme-setup`
- `chore/nix-node-26`
- `refactor/card-types`

`main` への直接コミットは禁止。

## タイトル

Conventional Commits 形式に従う (`/commit` スキルと同じルール):

```
<type>(<scope>): <subject>
```

例:
- `feat(card): ビンゴカード生成ロジックを追加`
- `chore(nix): Node.js 26 を devShell に追加`
- `docs: README にセットアップ手順を追加`

70 文字以内。詳細は本文へ。

## 本文 (テンプレート)

`.github/PULL_REQUEST_TEMPLATE.md` のセクションを埋める:

```markdown
## 概要

<何を / なぜ — 1〜3文>

## 関連 Issue

Closes #<N>

## 変更内容

- <主要な変更>
- <…>

## 動作確認

- [x] `pnpm tsc --noEmit` で型エラーなし
- [x] `pnpm lint` 通過
- [x] `pnpm test` 通過
- [ ] `pnpm dev` でローカル動作確認

## メモ

<補足。不要なら削除>

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

## heredoc テンプレ

```bash
gh pr create --title "<type>(<scope>): <subject>" --body "$(cat <<'EOF'
## 概要

...

## 関連 Issue

Closes #N

## 変更内容

- ...

## 動作確認

- [x] `pnpm tsc --noEmit` で型エラーなし
- [x] `pnpm lint` 通過

## メモ

(必要なら)

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

## 規則

- main への force push は絶対禁止
- 明示的に依頼されない限り `--draft` で作る必要はないが、WIP のときは `--draft` を付ける
- 大きな PR は分割を提案する (目安: 500 行以上の diff)
- レビュアー指定 (`--reviewer`) は必要なときだけ
- PR 作成後は URL を返してユーザーが確認できるようにする
