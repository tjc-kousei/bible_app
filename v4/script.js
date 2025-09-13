// --- グローバル変数 ---
let bible_data = [];
let lastViewed = { book: "", chapter: "" };

// --- データ定義 ---
const bookChapters = {
  創: 50,
  出エジ: 40,
  レビ: 27,
  民: 36,
  申: 34,
  ヨシュ: 24,
  士: 21,
  ルツ: 4,
  サム上: 31,
  サム下: 24,
  列王上: 22,
  列王下: 25,
  歴代上: 29,
  歴代下: 36,
  エズ: 10,
  ネヘ: 13,
  エス: 10,
  ヨブ: 42,
  詩: 150,
  箴: 31,
  伝: 12,
  雅: 8,
  イザ: 66,
  エレ: 52,
  哀: 5,
  エゼ: 48,
  ダニ: 12,
  ホセ: 14,
  ヨエ: 3,
  アモ: 9,
  オバ: 1,
  ヨナ: 4,
  ミカ: 7,
  ナホ: 3,
  ハバ: 3,
  ゼパ: 3,
  ハガ: 2,
  ゼカ: 14,
  マラ: 4,
  マタ: 28,
  マル: 16,
  ルカ: 24,
  ヨハ: 21,
  使徒: 28,
  ロマ: 16,
  Ⅰコリ: 16,
  Ⅱコリ: 13,
  ガラ: 6,
  エペ: 6,
  ピリ: 4,
  コロ: 4,
  Ⅰテサ: 5,
  Ⅱテサ: 3,
  Ⅰテモ: 6,
  Ⅱテモ: 4,
  テト: 3,
  ピレ: 1,
  ヘブ: 13,
  ヤコ: 5,
  Ⅰペテ: 5,
  Ⅱペテ: 3,
  Ⅰヨハ: 5,
  Ⅱヨハ: 1,
  Ⅲヨハ: 1,
  ユダ: 1,
  黙: 22,
};
const bookList = Object.keys(bookChapters);

// --- 初期化処理 ---
document.addEventListener("DOMContentLoaded", () => {
  applyTheme();
  applyLangOrder(); // ★保存された言語順序を適用
  setupEventListeners();
  loadBibleData()
    .then(() => {
      console.log("聖書データの読み込みが完了しました。");
      document.getElementById("loader").style.display = "none";
      populateBooks();
    })
    .catch((err) => {
      document.getElementById("loader").innerText =
        "データの読み込みに失敗しました: " + err;
      console.error(err);
    });
});

function setupEventListeners() {
  document.getElementById("search-icon").addEventListener("click", () => {
    toggleMenu();
    setTimeout(() => document.getElementById("search-input").focus(), 300);
  });
  document
    .getElementById("prev-book")
    .addEventListener("click", navigateBookChapter.bind(null, -1, true));
  document
    .getElementById("next-book")
    .addEventListener("click", navigateBookChapter.bind(null, 1, true));
  document
    .getElementById("prev-chapter")
    .addEventListener("click", navigateBookChapter.bind(null, -1, false));
  document
    .getElementById("next-chapter")
    .addEventListener("click", navigateBookChapter.bind(null, 1, false));
}

// --- データ読み込み (変更なし) ---
async function loadBibleData() {
  const CSV_PATHS = { hira: "../Data(hira).csv", zh: "../chinese_compact.csv" };
  const hiraText = await fetchCSV(CSV_PATHS.hira);
  bible_data = csvTo2D(hiraText);
  const zhText = await fetchCSV(CSV_PATHS.zh);
  const zh2d = csvTo2D(zhText);
  for (let i = 1; i < bible_data.length; i++) {
    bible_data[i].push(zh2d[i]?.[0] ?? "");
  }
  return bible_data;
}
async function fetchCSV(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok)
    throw new Error(`Fetch失敗: ${url} (${res.status} ${res.statusText})`);
  return await res.text();
}
function csvTo2D(text) {
  return text
    .replace(/\uFEFF/g, "")
    .split(/\r?\n/)
    .filter((line) => line.trim() !== "")
    .map((line) => line.split(","));
}
function compactToRuby(str) {
  return !str
    ? ""
    : str.replace(
        /(.)\(([^()]+)\)/g,
        "<ruby>$1<rt class='pinyin'>$2</rt></ruby>"
      );
}

// --- UI操作 ---
function populateBooks() {
  const bookSelect = document.getElementById("book-select");
  bookList.forEach((abbr) => {
    const option = document.createElement("option");
    option.value = abbr;
    option.textContent = abbr;
    bookSelect.appendChild(option);
  });
  updateChapters();
}
function toggleMenu() {
  document.getElementById("sidebar").classList.toggle("open");
  document.getElementById("overlay").classList.toggle("open");
}
function updateChapters() {
  const bookSelect = document.getElementById("book-select");
  const chapterSelect = document.getElementById("chapter-select");
  const selectedBook = bookSelect.value;
  chapterSelect.innerHTML = "";
  const totalChapters = bookChapters[selectedBook] || 0;
  for (let i = 1; i <= totalChapters; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i + "章";
    chapterSelect.appendChild(option);
  }
  displayChapter();
}

function displayChapter(book = null, chapter = null) {
  if (document.getElementById("sidebar").classList.contains("open"))
    toggleMenu();
  document.getElementById("search-results").innerHTML = "";
  const contentDiv = document.getElementById("bible-content");
  contentDiv.innerHTML = "";
  const bookSelect = document.getElementById("book-select");
  const chapterSelect = document.getElementById("chapter-select");
  const targetBook = book || bookSelect.value;
  const targetChapter = chapter || chapterSelect.value;
  if (book && chapter) {
    if (bookSelect.value !== targetBook) {
      bookSelect.value = targetBook;
      updateChapters();
    }
    chapterSelect.value = targetChapter;
  }
  lastViewed = { book: targetBook, chapter: parseInt(targetChapter) };
  updateHeader(targetBook, targetChapter);
  updateNavButtons();

  const showJpRuby = document.getElementById("ruby-jp-toggle").checked;
  const showChRuby = document.getElementById("ruby-ch-toggle").checked;
  const isLangOrderSwapped =
    document.getElementById("lang-order-toggle").checked;
  let contentHTML = "";

  for (let i = 1; i < bible_data.length; i++) {
    const row = bible_data[i];
    const verseRef = row[3];
    if (verseRef && verseRef.startsWith(targetBook + targetChapter + ":")) {
      const verseNum = verseRef.split(":")[1];
      const jpDiv = `<div class="jp">${showJpRuby ? row[5] : row[4]}</div>`;
      const chDiv = `<div class="ch">${
        showChRuby ? compactToRuby(row[6]) : row[2]
      }</div>`;

      const verseLangs = isLangOrderSwapped ? chDiv + jpDiv : jpDiv + chDiv;

      // ★節番号を上に、言語表示をverse-contentで囲む構造に変更
      contentHTML += `
              <div class="verse-container">
                  <div class="verse-ref">${verseNum}</div>
                  <div class="verse-content">
                      ${verseLangs}
                  </div>
              </div>`;
    }
  }
  contentDiv.innerHTML = contentHTML;
  window.scrollTo(0, 0);
  changeFontSize(document.getElementById("fontSizeSlider").value);
}

// --- ナビゲーションロジック (変更なし) ---
function navigateBookChapter(direction, isBook) {
  let { book, chapter } = lastViewed;
  if (isBook) {
    const newBookIndex = bookList.indexOf(book) + direction;
    if (newBookIndex >= 0 && newBookIndex < bookList.length)
      displayChapter(bookList[newBookIndex], 1);
  } else {
    const newChapter = chapter + direction;
    if (newChapter > 0 && newChapter <= bookChapters[book])
      displayChapter(book, newChapter);
    else if (newChapter <= 0) {
      const newBookIndex = bookList.indexOf(book) - 1;
      if (newBookIndex >= 0) {
        const prevBook = bookList[newBookIndex];
        displayChapter(prevBook, bookChapters[prevBook]);
      }
    } else {
      const newBookIndex = bookList.indexOf(book) + 1;
      if (newBookIndex < bookList.length)
        displayChapter(bookList[newBookIndex], 1);
    }
  }
}
function updateNavButtons() {
  const { book, chapter } = lastViewed;
  const currentBookIndex = bookList.indexOf(book);
  document.getElementById("prev-book").disabled = currentBookIndex === 0;
  document.getElementById("next-book").disabled =
    currentBookIndex === bookList.length - 1;
  document.getElementById("prev-chapter").disabled =
    currentBookIndex === 0 && chapter === 1;
  document.getElementById("next-chapter").disabled =
    currentBookIndex === bookList.length - 1 && chapter === bookChapters[book];
}

// --- 設定関連 ---
function refreshDisplay() {
  if (lastViewed.book && lastViewed.chapter)
    displayChapter(lastViewed.book, lastViewed.chapter);
}
function updateHeader(book, chapter) {
  document.title = `${book} ${chapter}章`;
  document.getElementById("Abbre").textContent = book;
  document.getElementById("syou").textContent = `${chapter}章`;
}
function toggleTheme() {
  const newTheme =
    document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
  document.body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}
function applyTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.setAttribute("data-theme", savedTheme);
  document.getElementById("theme-toggle").checked = savedTheme === "dark";
}
function changeFontSize(size) {
  document.getElementById("main-content").style.fontSize = size + "px";
}

// ★言語順序の切り替えと保存
function toggleLangOrder() {
  const isSwapped = document.getElementById("lang-order-toggle").checked;
  localStorage.setItem("langOrderSwapped", isSwapped);
  refreshDisplay();
}
function applyLangOrder() {
  const isSwapped = localStorage.getItem("langOrderSwapped") === "true";
  document.getElementById("lang-order-toggle").checked = isSwapped;
}

// --- 検索 ---
function searchBible() {
  const query = document.getElementById("search-input").value.trim();
  if (!query) return;
  if (document.getElementById("sidebar").classList.contains("open"))
    toggleMenu();
  const keywords = query.split(/\s+/).filter((k) => k);
  if (keywords.length === 0) return;
  document.getElementById("bible-content").innerHTML = "";
  const resultsDiv = document.getElementById("search-results");
  resultsDiv.innerHTML = `<div class="loader">検索中...</div>`;
  setTimeout(() => {
    let results = [];
    for (let i = 1; i < bible_data.length; i++) {
      const row = bible_data[i];
      const jpText = row[4];
      const chText = row[2];
      if (keywords.every((kw) => jpText.includes(kw) || chText.includes(kw)))
        results.push(row);
    }
    updateHeader(`「${query}」`, `${results.length}件の検索結果`);
    const isLangOrderSwapped =
      document.getElementById("lang-order-toggle").checked;
    let resultsHTML = "";
    if (results.length > 0) {
      results.forEach((row) => {
        const verseRef = row[3];
        const jpDiv = `<div class="jp">${highlightKeywords(
          row[4],
          keywords
        )}</div>`;
        const chDiv = `<div class="ch">${highlightKeywords(
          row[2],
          keywords
        )}</div>`;
        const match = verseRef.match(/^([^\d]+)(\d+):/);
        if (match) {
          const book = match[1];
          const chapter = match[2];
          const result_content = isLangOrderSwapped
            ? chDiv + jpDiv
            : jpDiv + chDiv;
          // ★検索結果も同様に、節参照(verse-ref)を上に、言語表示をverse-contentで囲む構造に変更
          resultsHTML += `
                      <div class="search-result-item" onclick="displayChapter('${book}', '${chapter}')">
                          <div class="verse-ref">${verseRef}</div>
                          <div class="verse-content">
                              ${result_content}
                          </div>
                      </div>`;
        }
      });
    } else {
      resultsHTML = "<p>見つかりませんでした。</p>";
    }
    resultsDiv.innerHTML = resultsHTML;
    changeFontSize(document.getElementById("fontSizeSlider").value);
  }, 10);
}
function highlightKeywords(text, keywords) {
  let highlightedText = text;
  keywords.forEach((kw) => {
    const regex = new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    highlightedText = highlightedText.replace(
      regex,
      `<span class="highlight">$&</span>`
    );
  });
  return highlightedText;
}
