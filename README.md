# splatoon3-weapon-selector
Splatoon3のブキを自動で指定できるDiscord用のBot

## 動作確認環境
- Node.js v18.17.1
- npm v9.6.7

## 起動方法
1. `.env.template`のファイル名を`.env`に変更し、DiscordのBotの`TOKEN`と`CLIENT_ID`を記述
2. `npm install`を実行
3. `node index.js`を実行

※Botに必要な権限を適宜付与してください。

## コマンド
- `random` : ランダムでブキを指定。
- `search` : 指定した条件でブキを指定。オプションに`シューター`や`スプラッシュボム`、`ナイスダマ`など条件を指定することで、その条件に合うブキからランダムで指定できる。
- `player` : 参加するプレイヤーを入力するオプション。Player1のみ必須。Player2~8は任意。

## その他
- `weapons3.json`にブキの情報を記述しているので、除外したいブキがある場合は書き換えてください。
- このソフトウェアはMITライセンスで公開されています。詳しくは[LICENSE](https://github.com/raptech-jp/splatoon3-weapon-selector/blob/main/LICENSE)を参照してください。使用に際し、MITライセンス以外の一切に関しては制限いたしません。
- このソフトウェアは非公式です。任天堂株式会社とは一切関係ありません。
- このソフトウェアは日本語のみサポートしています。(This software supports only Japanese.)
- このソフトウェアを使用したことによるいかなる損害も、当方は一切責任を負いません。

## searchコマンドオプション表 (Chill Season)
|オプション|種類|
|---|---|
|`シューター`|ブキ|
|`チャージャー`|ブキ|
|`スロッシャー`|ブキ|
|`スピナー`|ブキ|
|`マニューバー`|ブキ|
|`ブラスター`|ブキ|
|`ローラー`|ブキ|
|`フデ`|ブキ|
|`シェルター`|ブキ|
|`ストリンガー`|ブキ|
|`ワイパー`|ブキ|
|`スプラッシュボム`|サブウェポン|
|`キューバンボム`|サブウェポン|
|`クイックボム`|サブウェポン|
|`ポイズンミスト`|サブウェポン|
|`ポイントセンサー`|サブウェポン|
|`トーピード`|サブウェポン|
|`スプリンクラー`|サブウェポン|
|`スプラッシュシールド`|サブウェポン|
|`ロボットボム`|サブウェポン|
|`トラップ`|サブウェポン|
|`タンサンボム`|サブウェポン|
|`ラインマーカー`|サブウェポン|
|`カーリングボム`|サブウェポン|
|`ジャンプビーコン`|サブウェポン|
|`グレートバリア`|スペシャルウェポン|
|`サメライド`|スペシャルウェポン|
|`ウルトラショット`|スペシャルウェポン|
|`メガホンレーザー5.1ch`|スペシャルウェポン|
|`エナジースタンド`|スペシャルウェポン|
|`カニタンク`|スペシャルウェポン|
|`キューインキ`|スペシャルウェポン|
|`ウルトラハンコ`|スペシャルウェポン|
|`ショクワンダー`|スペシャルウェポン|
|`ホップソナー`|スペシャルウェポン|
|`トリプルトルネード`|スペシャルウェポン|
|`マルチミサイル`|スペシャルウェポン|
|`ジェットパック`|スペシャルウェポン|
|`アメフラシ`|スペシャルウェポン|
|`ナイスダマ`|スペシャルウェポン|
|`テイオウイカ`|スペシャルウェポン|
|`デコイチラシ`|スペシャルウェポン|
|`スミナガシート`|スペシャルウェポン|
|`ウルトラチャクチ`|スペシャルウェポン|