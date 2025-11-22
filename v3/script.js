// script.js

// --- 定数・変数の定義 ---
const syou = [
  "50",
  "40",
  "27",
  "36",
  "34",
  "24",
  "21",
  "4",
  "31",
  "24",
  "22",
  "25",
  "29",
  "36",
  "10",
  "13",
  "10",
  "42",
  "150",
  "31",
  "12",
  "8",
  "66",
  "52",
  "5",
  "48",
  "12",
  "14",
  "3",
  "9",
  "1",
  "4",
  "7",
  "3",
  "3",
  "3",
  "2",
  "14",
  "4",
  "28",
  "16",
  "24",
  "21",
  "28",
  "16",
  "16",
  "13",
  "6",
  "6",
  "4",
  "4",
  "5",
  "3",
  "6",
  "4",
  "3",
  "1",
  "13",
  "5",
  "5",
  "3",
  "5",
  "1",
  "1",
  "1",
  "22",
];
const Abbre = [
  "創",
  "出エジ",
  "レビ",
  "民",
  "申",
  "ヨシュ",
  "士",
  "ルツ",
  "サム上",
  "サム下",
  "列王上",
  "列王下",
  "歴代上",
  "歴代下",
  "エズ",
  "ネヘ",
  "エス",
  "ヨブ",
  "詩",
  "箴",
  "伝",
  "雅",
  "イザ",
  "エレ",
  "哀",
  "エゼ",
  "ダニ",
  "ホセ",
  "ヨエ",
  "アモ",
  "オバ",
  "ヨナ",
  "ミカ",
  "ナホ",
  "ハバ",
  "ゼパ",
  "ハガ",
  "ゼカ",
  "マラ",
  "マタ",
  "マル",
  "ルカ",
  "ヨハ",
  "使徒",
  "ロマ",
  "Ⅰコリ",
  "Ⅱコリ",
  "ガラ",
  "エペ",
  "ピリ",
  "コロ",
  "Ⅰテサ",
  "Ⅱテサ",
  "Ⅰテモ",
  "Ⅱテモ",
  "テト",
  "ピレ",
  "ヘブ",
  "ヤコ",
  "Ⅰペテ",
  "Ⅱペテ",
  "Ⅰヨハ",
  "Ⅱヨハ",
  "Ⅲヨハ",
  "ユダ",
  "黙",
];
const names = [
  "01 創世記",
  "02 出エジプト記",
  "03 レビ記",
  "04 民数記",
  "05 申命記",
  "06 ヨシュア記",
  "07 士師記",
  "08 ルツ記",
  "09 サムエル記上",
  "10 サムエル記下",
  "11 列王記上",
  "12 列王記下",
  "13 歴代志上",
  "14 歴代志下",
  "15 エズラ記",
  "16 ネヘミヤ記",
  "17 エステル記",
  "18 ヨブ記",
  "19 詩篇",
  "20 箴言",
  "21 伝道の書",
  "22 雅歌",
  "23 イザヤ書",
  "24 エレミヤ書",
  "25 哀歌",
  "26 エゼキエル書",
  "27 ダニエル書",
  "28 ホセア書",
  "29 ヨエル書",
  "30 アモス書",
  "31 オバデア書",
  "32 ヨナ書",
  "33 ミカ書",
  "34 ナホム書",
  "35 ハバクク書",
  "36 ゼパニヤ書",
  "37 ハガイ書",
  "38 ゼカリヤ書",
  "39 マラキ書",
  "40 マタイによる福音書",
  "41 マルコによる福音書",
  "42 ルカによる福音書",
  "43 ヨハネによる福音書",
  "44 使徒行伝",
  "45 ローマ人への手紙",
  "46 コリント人への第一の手紙",
  "47 コリント人への第二の手紙",
  "48 ガラテヤ人への手紙",
  "49 エペソ人への手紙",
  "50 ピリピ人への手紙",
  "51 コロサイ人への手紙",
  "52 テサロニケ人への第一の手紙",
  "53 テサロニケ人への第二の手紙",
  "54 テモテへの第一の手紙",
  "55 テモテへの第二の手紙",
  "56 テトスへの手紙",
  "57 ピレモンへの手紙",
  "58 ヘブル人への手紙",
  "59 ヤコブの手紙",
  "60 ペテロの第一の手紙",
  "61 ペテロの第二の手紙",
  "62 ヨハネの第一の手紙",
  "63 ヨハネの第二の手紙",
  "64 ヨハネの第三の手紙",
  "65 ユダの手紙",
  "66 ヨハネの黙示録",
];

let letter_size = 1.7;
const delta = 0.02;

// データ格納用
let bible_data = []; // 検索機能用（全データ配列）
let chapterIndex = {}; // 表示機能用（高速検索インデックス）

// --- 初期化・データ読み込み (非同期 & インデックス化) ---
const initData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    const text = await response.text();
    const lines = text.split("\n");

    // データのリセット
    bible_data = [];
    chapterIndex = {};

    // 1行目からループ（0行目はヘッダー想定で無視するか、オリジナルに合わせて処理）
    // オリジナルのロジックに合わせて index 1 からデータを格納
    for (let i = 1; i < lines.length; ++i) {
      const row = lines[i].split(",");
      if (row.length < 5) continue; // 空行などの不正データスキップ

      // 1. 検索機能用に配列へ保存
      bible_data[i] = row;

      // 2. 表示機能用にインデックス化 [書簡略称+章] -> [節データの配列]
      // row[3] は "創1:1" のような形式
      const refParts = row[3].split(":");
      if (refParts.length > 0) {
        const key = refParts[0]; // "創1" をキーにする
        if (!chapterIndex[key]) chapterIndex[key] = [];

        chapterIndex[key].push({
          id: row[3], // "創1:1"
          ch: row[2], // 中国語
          jp: row[4], // 日本語
        });
      }
    }
    console.log("Bible data loaded successfully.");
    setupEventListeners(); // データ読み込み完了後にイベント設定
  } catch (error) {
    console.error("Data load failed:", error);
    document.getElementById("result").innerHTML =
      "データの読み込みに失敗しました。";
  }
};

// --- フォントサイズ調整 ---
const setStrSize = () => {
  if (letter_size > 2.5) letter_size = 2.5;
  if (letter_size < 1.0) letter_size = 1.0;

  const setSize = (selector, offset = 0) => {
    document.querySelectorAll(selector).forEach((ele) => {
      ele.style.fontSize = letter_size + offset + "rem";
    });
  };

  setSize(".jp");
  setSize(".ch");
  setSize(".specific", -0.1);
};

// --- メイン表示ロジック (高速化版) ---
function setupEventListeners() {
  // 入力欄の監視
  document.querySelectorAll(".bible_input").forEach((ele) => {
    ele.onfocus = function () {
      this.select();
    };
    ele.oninput = () => {
      const result = document.getElementById("result");
      const log = document.getElementById("transmode_log");
      const numInput = document.getElementById("abbre");
      const syouInput = document.getElementById("syou");

      const bookNum = parseInt(numInput.value);
      const chapNum = syouInput.value;

      // 入力が有効かつデータが存在する場合
      if (bookNum && chapNum && bookNum >= 1 && bookNum <= Abbre.length) {
        const bookAbbr = Abbre[bookNum - 1];
        const key = bookAbbr + chapNum; // 検索キー作成 (例: "創1")

        if (chapterIndex[key]) {
          // インデックスから直接データを取得してHTML生成
          let html = "";
          chapterIndex[key].forEach((verse, idx) => {
            const j = idx + 1;
            const numColor = j % 2 !== 0 ? "skyblue" : "yellowgreen";

            html += `<div class="wrapper">`;
            html += `<div class="specific" style="color:${numColor};">${j}</div>`;
            html += `<div class="jp">${verse.jp}</div>`;
            html += `<div class="ch">${verse.ch}</div>`;
            html += `</div>`;
          });

          result.innerHTML = html;
          if (log)
            log.innerHTML =
              names[bookNum - 1].substring(3) + " " + chapNum + "章";
          setStrSize();
        } else {
          result.innerHTML =
            "<div style='text-align:center; margin-top:2em; color:#888;'>該当なし</div>";
        }
      } else {
        result.innerHTML = "";
      }
    };
  });
}

// --- 検索機能 (既存ロジック維持) ---
function search(option, text) {
  document.getElementById("log").innerHTML = "";
  if (bible_data.length === 0) return; // データ未ロード時は中断

  if (option == 1) {
    let contents = "";
    let keywords = text.split(/\s/);

    if (text.replace(/[\s\t\n]/g, "") != "") {
      if (keywords.length == 1) {
        const pattern = text;
        let hitCount = 0;
        // データがあるインデックスだけループ
        for (let n = 1; n < bible_data.length; n++) {
          if (!bible_data[n]) continue;
          if (
            bible_data[n][2].includes(pattern) ||
            bible_data[n][4].includes(pattern)
          ) {
            contents += `<div class="wrapper">`;
            contents += `<div class="specific" style="color:white; border:dotted 1px white; display:inline-block">${bible_data[n][3]}</div>`;
            contents += `<div class="jp">${bible_data[n][4].replace(
              text,
              `<mark>${text}</mark>`
            )}</div>`;
            contents += `<div class="ch">${bible_data[n][2].replace(
              text,
              `<mark>${text}</mark>`
            )}</div>`;
            contents += `</div>`;
            hitCount++;
          }
        }
        document.getElementById(
          "log"
        ).innerHTML = `<mark style="background:aqua">${hitCount}</mark>件見つかりました`;
      } else {
        let hitCount = 0;
        for (let n = 1; n < bible_data.length; n++) {
          if (!bible_data[n]) continue;
          let check_flag = true;
          let chinese = bible_data[n][2];
          let japanese = bible_data[n][4];
          for (let i = 0; i < keywords.length; i++) {
            if (
              chinese.includes(keywords[i]) ||
              japanese.includes(keywords[i])
            ) {
              japanese = japanese.replace(
                new RegExp(keywords[i], "g"),
                `<mark>${keywords[i]}</mark>`
              );
              chinese = chinese.replace(
                new RegExp(keywords[i], "g"),
                `<mark>${keywords[i]}</mark>`
              );
            } else {
              check_flag = false;
              break;
            }
          }
          if (check_flag) {
            contents += `<div class="wrapper">`;
            contents += `<div class="specific" style="color:white; border:dotted 1px white; display:inline-block">${bible_data[n][3]}</div>`;
            contents += `<div class="jp">${japanese}</div>`;
            contents += `<div class="ch">${chinese}</div>`;
            contents += `</div>`;
            hitCount++;
          }
        }
        document.getElementById(
          "log"
        ).innerHTML = `<mark style="background:aqua">${hitCount}</mark>件`;
      }
    }
    document.getElementById("search_result").innerHTML = contents;
  }
  if (option == 2) {
    // 節範囲表示 (ロジック維持)
    let value = text.replace(/[～〜~\s]/g, ",").split(",");
    let keyword = value[0];
    let contents = "";

    if (value.length == "2") {
      let range = keyword.split(":")[0] + ":" + value[1];
      let start = -1,
        end = -1;
      if (keyword.replace(/[\s\t\n]/g, "") != "") {
        for (let n = 1; n < bible_data.length; n++) {
          if (!bible_data[n]) continue;
          // 完全一致で検索
          if ([1, 2, 3, 4].some((i) => bible_data[n][i] === keyword)) start = n;
          if ([1, 2, 3, 4].some((i) => bible_data[n][i] === range)) end = n;
        }
        let japanese = "",
          chinese = "";
        if (start !== -1 && end !== -1 && start <= end) {
          for (let n = start; n <= end; n++) {
            japanese += bible_data[n][4];
            chinese += bible_data[n][2];
          }
          contents += `<div class="wrapper">`;
          contents += `<div class="specific" style="color:white; border:dotted 1px white; display:inline-block">${value[0]}~${value[1]}</div>`;
          contents += `<div class="jp" id="range_ja" style="border-bottom: 5px solid red; color: skyblue;">${japanese}</div>`;
          contents += `<div class="ch" style="color: yellowgreen;">${chinese}</div></div>`;
        }
      }
    } else {
      if (keyword.replace(/[\s\t\n]/g, "") != "") {
        for (let n = 1; n < bible_data.length; n++) {
          if (!bible_data[n]) continue;
          if ([1, 2, 3, 4].some((i) => bible_data[n][i] === keyword)) {
            contents += `<div class="wrapper">`;
            contents += `<div class="specific" style="color:white; border:dotted 1px white; display:inline-block">${bible_data[n][3]}</div>`;
            contents += `<div class="jp" id="range_ja" style="border-bottom: 5px solid red; color: skyblue;">${bible_data[
              n
            ][4].replace(keyword, `<mark>${keyword}</mark>`)}</div>`;
            contents += `<div class="ch" style="color: yellowgreen;">${bible_data[
              n
            ][2].replace(keyword, `<mark>${keyword}</mark>`)}</div></div>`;
          }
        }
      }
    }
    document.getElementById("search_result").innerHTML = contents;

    const rangeEl = document.getElementById("range_ja");
    if (rangeEl) {
      let selectrange = document.createRange();
      selectrange.selectNodeContents(rangeEl);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(selectrange);
    }
  }
  setStrSize();
}

// --- UI操作関連 ---
function key_s() {
  const modal = document.getElementById("search_modal");
  modal.style.display = "block";
  document.querySelector("#search_text").focus();
  document.querySelector("#search_text").select();
  document.getElementsByName("option")[0].checked = true;
}

function key_r() {
  const modal = document.getElementById("search_modal");
  modal.style.display = "block";
  document.querySelector("#search_text").focus();
  document.querySelector("#search_text").select();
  document.getElementsByName("option")[1].checked = true;
}

function enter() {
  const text = document.getElementById("search_text").value;
  const option = document.getElementsByName("option");
  if (option[0].checked) search(1, text);
  if (option[1].checked) search(2, text);
  document.getElementById("search_text").blur();
  document.title = "【" + text + "】の検索結果";
}

// --- ショートカットキー設定 ---
document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    if (document.getElementById("search_modal").style.display == "block") {
      document.getElementById("search_modal").style.display = "none";
    } else {
      const num = document.getElementById("abbre");
      const syouInput = document.getElementById("syou");
      if (document.activeElement == num) num.blur();
      else if (document.activeElement == syouInput) syouInput.blur();
      else if (
        document.activeElement != num &&
        document.activeElement != syouInput
      )
        num.focus();
    }
    document.title = "聖書閲覧アプリ V3";
  }
  if (e.key == "+" || e.key == ";") {
    letter_size += delta;
    setStrSize();
  }
  if (e.key == "-" || e.key == "=") {
    letter_size -= delta;
    setStrSize();
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code == "BracketLeft") {
    key_s();
    document.title = "検索機能";
  }
  if (e.code == "BracketRight") {
    key_r();
    document.title = "節範囲表示";
  }
});

// アプリケーション開始
initData("../Data(hira).csv");
