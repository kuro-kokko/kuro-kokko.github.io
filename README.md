# Learning PORTAL (DEMO)

https://kuro-kokko.github.io/

- 推奨解像度は 1920\*1080 です

---

### 概要

- 「小規模な学習関連システム向けサービスの Web ページ＋アカウント登録フォーム」をテーマに設定し作成
  - 「e ラーニング、豊富な教材、学習タスク管理」を行うシステムを仮定し、それらのカラーテーマやイメージを作成しデザインに組み込んだ
  - Web ページは背景に css アニメーションの背景画像+グラデーションヘッダーにしそれ以外はシンプルなレイアウトにした
- フォームは改修、拡張を容易にするため一部オブジェクトをコンポーネント化
  - バリデーションエリアや必須ラベルもコンポーネントのため、仕様変更に対する変更が容易
  
#### 良かった点

- テキストボックスのコンポーネント化により、バリデーション変更や項目追加等の拡張を行いやすいフォームを実装出来た
- スマホ向けレスポンシブ対応済（フォームのみ）

#### 悪かった点

- DB 連携や動的コンテンツ要素（ダークモードなど）も入れたかったが時間が足りなかった
- バリデーションの実装が完全ではない
  - 入力値の安全性の観点で都道府県はプルダウンにし、API 返却値の `prefcode` に応じて表示させるべきだった
- アニメーションcssでパス指定している箇所について、github pagesにデプロイ時にprefixが必要になるが解決出来なかった
  - 元々```202303_kadai```にデプロイする予定だったが諦めてユーザーページにデプロイした

### 開発後記

- 当初は jQuery で作成しており、ほぼ完成後に Next.js へ移行したためテンプレートの置き換え、特に form 関連の処理やコンポーネント化する作業に時間が掛かった
  - 項目追加やバリデーションの修正等が容易になったため、結果的には移行して良かったと感じている
  - ドキュメントの読み込みに十分な時間が充てられなかったため、今後の制作時はより時間に余裕をもった状態で取り組みたい
- 無料のツール(API、ライブラリ、フリーソフト)のお陰で個人で様々な機能やデザインを持ったWeb サイト・システムを作れるため、様々な試行錯誤が出来て楽しかった
  - 反面、制作者が特定の分野に明るくない場合制作物が古臭い・不格好になってしまうので幅広い分野の情報収集を欠かさないようにしたい
- 開発ツールではないが、今回 GPT-3.5 を試験的に利用したところ実装作業で詰まることがほぼ無くなったので有難かった
  - それでも移行作業は大変でした。。
  - GitHub CopilotやAmazon CodeWhispererも使ってみたい

---

### 開発環境等

#### フレームワーク・ライブラリ・API

- Next.js
- React Hook Form
  https://react-hook-form.com/
- 郵便番号検索 API
  http://zipcloud.ibsnet.co.jp/doc/api
- Bootstrap5
- GoogleFonts
  https://fonts.google.com/icons

#### ツール等

- Visual Studio Code
- GPT-3.5
  - Next.js 移行時のコーディング補佐をさせた
- Blender
  - 3D モデリングソフト。背景画像、ロゴ、favicon を作成



---

## Form 仕様書(簡易版)

### 項目一覧

\*必須以外のバリデーションは現在未実装

| no  | 名称                   | 種類             | 必須 | 桁数\* | 備考                       |
| --- | ---------------------- | ---------------- | ---- | ------ | -------------------------- |
| 1   | 氏名(姓)               | テキストボックス | 〇   | 30     | -                          |
| 2   | 氏名(名)               | テキストボックス | 〇   | 30     | -                          |
| 3   | メールアドレス         | テキストボックス | 〇   | 255    | -                          |
| 4   | メールアドレス(確認)   | テキストボックス | 〇   | 255    | -                          |
| 5   | 電話番号               | テキストボックス | 〇   | 30     | -                          |
| 6   | 郵便番号               | テキストボックス | 〇   | 7      | 半角数字のみ\*             |
| 7   | 郵便番号から住所を検索 | ボタン           | -    | -      |
| 8   | 住所(都道府県)         | テキストボックス | 〇   | 10     | 郵便番号検索の自動入力対応 |
| 9   | 住所(市区町村)         | テキストボックス | 〇   | 255    | 郵便番号検索の自動入力対応 |
| 10  | 住所(丁目・番地・号)   | テキストボックス | 〇   | 255    |
| 11  | 住所(マンション名等)   | テキストボックス | -    | 255    |
| 12  | 利用規約に同意する     | チェックボックス | 〇   | -      |
| 13  | 登録する               | ボタン           | -    | -      |
| 14  | 入力内容をクリア       | ボタン           | -    | -      |
| 15  | TOP へ戻る             | ボタン           | -    | -      |

### 処理詳細

| no  | 項目名                 | イベント | 処理内容                                                                                                                                                                                                                                                    |
| --- | ---------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | 郵便番号から住所を検索 | 押下時   | 1.「郵便番号」に値が入力されている場合、「郵便番号」を引数とし郵便番号検索 API を実行する。<br> 2. API の戻り値が null の場合、処理を終了する。<br> 3. API の戻り値が null ではない場合、戻り値を「住所(都道府県)」「住所(市区町村)」に設定する。           |
| 2   | 登録                   | 押下時   | 1. 1 ～ 15 のバリデーションチェックを行う。<br> 2. チェック NG の場合、フォームの各項目下部にバリデーションエラーを表示して処理を終了する。 <br>3. チェック OK の場合、「登録完了」メッセージを表示する。 <br>4. メッセージを閉じた後、TOP 画面に遷移する。 |
| 3   | 入力内容をクリアする   | 押下時   | 1. 「入力内容は保存されません。よろしいですか？」のメッセージを表示する。<br> 2. 「いいえ」が押下された場合、メッセージを非表示にし処理を終了する。<br> 3. 「はい」が押下された場合、1 ～ 15 に初期値を設定する。                                           |
| 4   | TOP へ戻る             | 押下時   | 1. 「入力内容は保存されません。よろしいですか？」のメッセージを表示する。<br> 2. 「いいえ」が押下された場合、メッセージを非表示にし処理を終了する。<br> 3. 「はい」が押下された場合、TOP 画面に遷移する。                                                   |
