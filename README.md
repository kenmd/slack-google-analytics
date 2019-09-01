# Slack Google Analytics by GAS (Google Apps Script)

* Send page views etc from Google Analytics Reporting API v4 to Slack
* using GAS (Google Apps Script) & clasp & TypeScript


## Setup Node.js, TypeScript compiler and Clasp

* [README_DEV_TOOLS](README_DEV_TOOLS.md)


## Development

* Sample commands to set up new Google Apps Script project

```bash
clasp create --type standalone --title "Slack-Google-Analytics" --rootDir ./dist
clasp pull

# the default file Code.js should be renamed as .ts and ready to start coding.
mv dist/Code.js dist/Code.ts
```

* or you may set up new Google Apps Script project from console screen.
* make sure `.clasp.json` should have something like `.clasp_sample.json`.
* Development cycle is like this.

```bash
# after edit .ts, just clasp push then it will be compiled as .gs automatically.
# (you don't need other commands to convert it to .gs)
clasp push
clasp status
```


## Run

* `clasp open`
* Resources > Advanced Google services..., turn ON `Analytics Reporting`
* View > Show project manifest, make sure sync to local `appsscript.json`
* File > Project properties > Script properties, add `GA_VIEW_ID` `SLACK_WEBHOOK_URL`
* make sure you select right function name then click Run icon


## Reference

* 【初心者向け】GASを使ってSlackへ自動通知
  - https://qiita.com/chihiro/items/c7b11abc78f5d806c3a8
* GASでGoogle Analyticsのデータを取得する
  - https://qiita.com/mimizq/items/fdda4b944a9608a2b0a1
* claspでGoogle Apps Scriptを開発する際のappsscript.jsonのベターな設定方法
  - https://ngmt83.hatenablog.com/entry/2019/01/25/090000
