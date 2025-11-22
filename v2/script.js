/* ▼▼▼ お知らせ機能設定 ▼▼▼ */
const announcementConfig = {
  // このお知らせを有効にするか (true: 表示する, false: 表示しない)
  enabled: true,
  // このお知らせのユニークID (内容を変更したら、このIDも変更してください)
  id: "version-update-20250915",
  // お知らせのタイトル
  title: "✨ アプリ更新のお知らせ",
  // お知らせの本文 (HTMLタグが使えます)
  message:
    "新しいバージョンを公開しました。<br>データ読み込みの高速化と操作性の向上を行いました<br>中国語と日本語のルビ切り替えを独立させました<br>リンクはこちら→<a href='https://tjc-kousei.github.io/bible_app/v4/'>https://tjc-kousei.github.io/bible_app/v4/</a><br>また、こちらのバージョンから中国語拼音を削除しました。<br>更新：2025/09/15",
};
/* ▲▲▲ お知らせ機能設定 ▲▲▲ */

const letter = document.querySelector(".letter");
const chapter = document.querySelector(".chapter");
const section = document.querySelector(".section");
const html = document.getElementsByTagName("html");
const main = document.getElementsByTagName("main");
const sec = document.getElementsByTagName("section");
let letter_size = 1.0;

// パスは必要に応じて調整 (中国語CSVのパスを削除)
const CSV_PATHS = {
  hira: "../Data(hira).csv",
};

let bible_data = []; // 最終2次元配列

// 入口：ページ読み込み後に実行
document.addEventListener("DOMContentLoaded", () => {
  // Service Worker登録の追加
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./service-worker.js") // パスは適切に修正
        .then((registration) => {
          console.log("Service Worker registered: ", registration);
        })
        .catch((error) => {
          console.log("Service Worker registration failed: ", error);
        });
    });
  }
  loadBibleData()
    .then((data) => {
      console.log("読み込み完了");
    })
    .catch((err) => {
      console.error(err);
    });
});

// 中国語CSVの読み込みとマージ処理を削除し簡素化
async function loadBibleData() {
  const hiraText = await fetchCSV(CSV_PATHS.hira);
  bible_data = csvTo2D(hiraText);
  return bible_data;
}

async function fetchCSV(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok)
    throw new Error(`Fetch失敗: ${url} (${res.status} ${res.statusText})`);
  return await res.text();
}

// 超シンプルCSV→2D
function csvTo2D(text) {
  return text
    .replace(/\uFEFF/g, "") // BOM除去
    .split(/\r?\n/) // 改行
    .filter((line) => line.trim() !== "") // 空行除去
    .map((line) => line.split(",")); // カンマ分割
}

function load() {
  const section = document.querySelector(".section");
  const chapter = document.querySelector(".chapter");
  const letter = document.querySelector(".letter");
  section.innerHTML = "";
  chapter.innerHTML = "";
  letter.innerHTML = "";
  names.forEach((value, index) => {
    let button = document.createElement("button");
    button.innerHTML = value;
    button.onclick = (e) => {
      parent = e.target.parentElement.childNodes;
      parent.forEach((value, index) => {
        value.style.backgroundColor = "";
      });
      e.target.style.backgroundColor = "red";
      if (chapter.hasChildNodes) {
        while (chapter.firstChild) chapter.innerHTML = "";
      }
      if (section.hasChildNodes) {
        while (section.firstChild) section.innerHTML = "";
      }
      for (let i = 1; i <= syou[index]; i++) {
        const syou_button = document.createElement("button");
        syou_button.innerHTML = i;
        syou_button.id = `chapter${i}`;
        syou_button.value = i;
        syou_button.onclick = (e) => {
          parent = e.target.parentElement.childNodes;
          parent.forEach((value, index) => {
            value.style.backgroundColor = "";
          });
          e.target.style.backgroundColor = "red";
          if (section.hasChildNodes) {
            while (section.firstChild) section.innerHTML = "";
          }
          const pattern = Abbre[index] + i + ":";
          memo_pattern = pattern;
          let contents = "";
          let setu = "";
          for (let n = 1, j = 1; n <= 31103; n++) {
            if (bible_data[n][3].includes(pattern)) {
              contents += `<div id="wrapper">`;
              contents += `<div id="${j}" style="color:white;">${j}</div>`;

              let jpContent;
              if (check_ruby.checked) {
                jpContent = bible_data[n][5].replaceAll(
                  "<rt>",
                  "<rt class='furigana'>"
                );
              } else {
                jpContent = bible_data[n][4];
              }
              const chContent = bible_data[n][2];

              contents += `<div id="jp${j}" class="jp">${jpContent}</div>`;
              contents += `<div id="ch${j}" class="ch">${chContent}</div>`;

              contents += `</div>`;
              setu = j;
              j++;
            }
          }
          document.getElementById("output").innerHTML = contents;
          for (let j = 1; j <= setu; j++) {
            const setu_button = document.createElement("button");
            setu_button.id = `section${j}`;
            setu_button.innerHTML = j;
            setu_button.addEventListener("click", (e) => {
              parent = e.target.parentElement.childNodes;
              parent.forEach((value, index) => {
                if (index == 0) return;
                value.style.backgroundColor = "";
              });
              e.target.style.backgroundColor = "red";
              location.href = `#${j}`;
              window.scrollBy(0, -50);
              document.querySelector(".Toggle").click();
            });
            section.appendChild(setu_button);
          }
          window.location.href = "#section1";
          document.title = names[index].slice(3) + e.target.innerHTML + "章";
          document.getElementById("syou").innerHTML =
            "&nbsp;" + e.target.innerHTML + "章";
        };
        chapter.appendChild(syou_button);
      }
      window.location.href = "#chapter1";
      document.getElementById("Abbre").innerHTML = "";
      document.getElementById("syou").innerHTML = "";
      document.getElementById("Abbre").innerHTML = e.target.innerHTML.slice(3);
    };
    letter.appendChild(button);
  });
}

document.querySelector(".Toggle").addEventListener("click", (e) => {
  document.querySelector(".Toggle").classList.toggle("active");
  document.querySelector(".letter").classList.toggle("closed");
  document.querySelector(".chapter").classList.toggle("closed");
  document.querySelector(".section").classList.toggle("closed");
});
document.querySelector(".Toggle2").addEventListener("click", (e) => {
  document.querySelector(".Toggle2").classList.toggle("active2");
  document.getElementById("check_ruby_label").classList.toggle("closed2");
  document.getElementById("searchbox").classList.toggle("closed2");
  document.getElementById("change_font-size").classList.toggle("closed2");
});

const check_ruby = document.getElementById("check_ruby");
check_ruby.addEventListener("click", (e) => {
  let contents = "";
  let setu = "";
  for (let n = 1, j = 1; n <= 31103; n++) {
    if (bible_data[n][3].includes(memo_pattern)) {
      contents += `<div id="wrapper">`;
      contents += `<div id="${j}" style="color:white;">${j}</div>`;

      let jpContent;
      if (check_ruby.checked) {
        jpContent = bible_data[n][5].replaceAll(
          "<rt>",
          "<rt class='furigana'>"
        );
      } else {
        jpContent = bible_data[n][4];
      }
      const chContent = bible_data[n][2];

      contents += `<div id="jp${j}" class="jp">${jpContent}</div>`;
      contents += `<div id="ch${j}" class="ch">${chContent}</div>`;

      contents += `</div>`;
      setu = j;
      j++;
    }
  }
  document.getElementById("output").innerHTML = contents;
});

const target = document.querySelector(".Toggle");
const observer = new MutationObserver((record) => {
  if (target.className.includes("active")) {
    try {
      ban(main[0]);
      hoge(letter);
      hoge(chapter);
      hoge(section);
    } catch (e) {
      console.log("error: " + e);
    }
  } else {
    try {
      ban(letter);
      ban(chapter);
      ban(section);
      hoge(main[0]);
    } catch (e) {
      console.log("error: " + e);
    }
  }
});
observer.observe(target, {
  attributes: true,
  attributeFilter: ["class"],
});

document.addEventListener("keydown", (event) => {
  if (event.key == "Escape") {
    if (document.querySelector(".modal").classList.contains("undisplay"));
    document.querySelector(".Toggle").click();
  }
  if (event.key == "+" || event.key == ";") {
    letter_size += 0.06;
    document.getElementById("change_font-size").value = letter_size;
    letterchange();
  }
  if (event.key == "-" || event.key == "=") {
    letter_size -= 0.06;
    document.getElementById("change_font-size").value = letter_size;
    letterchange();
  }
  if (
    !document.querySelector(".modal").classList.contains("undisplay") &&
    event.key == "Enter"
  ) {
    search();
  }
  if (
    (document.querySelector(".modal").classList.contains("undisplay") &&
      event.ctrlKey === true &&
      event.key == "s") ||
    event.key == "S"
  ) {
    document.getElementById("searchbox").click();
  }
  return false;
});

function handle(event) {
  event.preventDefault();
}
function ban(elm) {
  try {
    elm.addEventListener("touchmove", handle, { passive: false });
    elm.addEventListener("mousewheel", handle, { passive: false });
  } catch (e) {
    console.log(e);
  }
}
function hoge(elm) {
  try {
    elm.removeEventListener("touchmove", handle, { passive: false });
    elm.removeEventListener("mousewheel", handle, { passive: false });
  } catch (e) {
    console.log(e);
  }
  "mousewheel", handle, { passive: false };
}

function letterchange() {
  if (letter_size > 2.5) letter_size = 2.5;
  document.getElementById("output").style.fontSize = letter_size + "rem";
}

function searchbox() {
  if (document.querySelector(".Toggle").classList.contains("active"))
    document.querySelector(".Toggle").click();
  const modal = document.querySelector(".modal");
  modal.classList.toggle("undisplay");
  document.getElementById("keyword").focus();
  modal.onclick = (e) => {
    if (e.target == modal) modal.classList.toggle("undisplay");
  };
}

function search() {
  if (document.querySelector(".Toggle").classList.contains("active"))
    document.querySelector(".Toggle").click();
  let keyword = document.getElementById("keyword").value;
  let contents = "";
  let keywords = keyword.split("　");
  if (keywords.length == 1) keywords = keyword.split(" ");

  if (keywords.length == 1) {
    const pattern = keyword;
    document.title = "【" + pattern + "】の検索結果";
    let setu = "";
    if (keyword.replace(/[\s\t\n]/g, "") != "") {
      document.getElementById("Abbre").innerHTML = "";
      document.getElementById("syou").innerHTML = "";
      for (let n = 1, j = 1; n <= 31103; n++) {
        if (
          bible_data[n][2].includes(pattern) ||
          bible_data[n][4].includes(pattern)
        ) {
          contents += `<div id="wrapper">`;
          contents += `<div id="${j}" style="color:white; border:dotted 1px white; display:inline-block">${bible_data[n][3]}</div>`;
          contents += `<div id="jp${j}" class="jp">${bible_data[n][4].replace(
            keyword,
            `<mark>${keyword}</mark>`
          )}</div>`;
          contents += `<div id="ch${j}" class="ch">${bible_data[n][2].replace(
            keyword,
            `<mark>${keyword}</mark>`
          )}</div>`;
          contents += `</div>`;
          setu = j;
          j++;
          document.getElementById(
            "Abbre"
          ).innerHTML = `<mark>${keyword}</mark>の検索結果　`;
          document.getElementById(
            "syou"
          ).innerHTML = `<mark style="background:aqua">${setu}</mark>件見つかりました`;
        }
      }
      load();
    }
  } else {
    const pattern = keywords;
    let hit = "";
    document.title = "【" + pattern + "】の検索結果";
    document.getElementById("Abbre").innerHTML = "";
    document.getElementById("syou").innerHTML = "";
    for (let n = 1, j = 1; n <= 31103; n++) {
      let check_flag = true;
      let chinese = bible_data[n][2];
      let japanese = bible_data[n][4];
      for (let i = 0; i < pattern.length; i++) {
        if (chinese.includes(pattern[i]) || japanese.includes(pattern[i])) {
          japanese = japanese.replace(
            new RegExp(pattern[i], "g"),
            `<mark>${pattern[i]}</mark>`
          );
          chinese = chinese.replace(
            new RegExp(pattern[i], "g"),
            `<mark>${pattern[i]}</mark>`
          );
        } else {
          check_flag = false;
          break;
        }
      }

      if (check_flag) {
        contents += `<div id="wrapper">`;
        contents += `<div style="color:white; border:dotted 1px white; display:inline-block">${bible_data[n][3]}</div>`;
        contents += `<div class="jp">${japanese}</div>`;
        contents += `<div class="ch">${chinese}</div>`;
        contents += `</div>`;
        hit = j;
        j++;
      }
    }

    document.getElementById("Abbre").innerHTML = `【<mark>${pattern}</mark>】 `;
    document.getElementById(
      "syou"
    ).innerHTML = `<mark style="background:aqua">${hit}</mark>件`;

    load();
  }
  document.getElementById("output").innerHTML = contents;
  modal = document.querySelector(".modal");
  modal.classList.toggle("undisplay");
}

let syou = [
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
let Abbre = [
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
let names = [
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

load();
document.querySelector(".Toggle2").click();

/* ▼▼▼ お知らせモーダルの実行処理 ▼▼▼ */
function setupAnnouncement() {
  if (!announcementConfig.enabled) return;

  const modal = document.getElementById("announcement-modal");
  const titleEl = document.getElementById("announcement-title");
  const messageEl = document.getElementById("announcement-message");
  const closeBtn = document.getElementById("announcement-close-btn");
  const dontShowAgainCheckbox = document.getElementById(
    "announcement-dont-show-again"
  );

  const dismissedId = localStorage.getItem("dismissedAnnouncementId");

  if (dismissedId === announcementConfig.id) {
    return;
  }

  titleEl.innerHTML = announcementConfig.title;
  messageEl.innerHTML = announcementConfig.message;

  modal.classList.remove("hidden");

  const closeModal = () => {
    modal.classList.add("hidden");
    // チェックボックスがチェックされている場合のみ、localStorageに保存
    if (dontShowAgainCheckbox.checked) {
      localStorage.setItem("dismissedAnnouncementId", announcementConfig.id);
    }
  };

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

document.addEventListener("DOMContentLoaded", setupAnnouncement);
/* ▲▲▲ お知らせモーダルの実行処理 ▲▲▲ */
