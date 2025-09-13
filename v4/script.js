// --- グローバル変数 ---
let bible_data = [];
let lastViewed = { book: "", chapter: "" };
let history = [];
let bookmarks = [];

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

const bookFullNames = {
  創: "創世記",
  出エジ: "出エジプト記",
  レビ: "レビ記",
  民: "民数記",
  申: "申命記",
  ヨシュ: "ヨシュア記",
  士: "士師記",
  ルツ: "ルツ記",
  サム上: "サムエル記上",
  サム下: "サムエル記下",
  列王上: "列王記上",
  列王下: "列王記下",
  歴代上: "歴代志上",
  歴代下: "歴代志下",
  エズ: "エズラ記",
  ネヘ: "ネヘミヤ記",
  エス: "エステル記",
  ヨブ: "ヨブ記",
  詩: "詩篇",
  箴: "箴言",
  伝: "伝道の書",
  雅: "雅歌",
  イザ: "イザヤ書",
  エレ: "エレミヤ書",
  哀: "哀歌",
  エゼ: "エゼキエル書",
  ダニ: "ダニエル書",
  ホセ: "ホセア書",
  ヨエ: "ヨエル書",
  アモ: "アモス書",
  オバ: "オバデア書",
  ヨナ: "ヨナ書",
  ミカ: "ミカ書",
  ナホ: "ナホム書",
  ハバ: "ハバクク書",
  ゼパ: "ゼパニヤ書",
  ハガ: "ハガイ書",
  ゼカ: "ゼカリヤ書",
  マラ: "マラキ書",
  マタ: "マタイによる福音書",
  マル: "マルコによる福音書",
  ルカ: "ルカによる福音書",
  ヨハ: "ヨハネによる福音書",
  使徒: "使徒行伝",
  ロマ: "ローマ人への手紙",
  Ⅰコリ: "コリント人への第一の手紙",
  Ⅱコリ: "コリント人への第二の手紙",
  ガラ: "ガラテヤ人への手紙",
  エペ: "エペソ人への手紙",
  ピリ: "ピリピ人への手紙",
  コロ: "コロサイ人への手紙",
  Ⅰテサ: "テサロニケ人への第一の手紙",
  Ⅱテサ: "テサロニケ人への第二の手紙",
  Ⅰテモ: "テモテへの第一の手紙",
  Ⅱテモ: "テモテへの第二の手紙",
  テト: "テトスへの手紙",
  ピレ: "ピレモンへの手紙",
  ヘブ: "ヘブル人への手紙",
  ヤコ: "ヤコブの手紙",
  Ⅰペテ: "ペテロの第一の手紙",
  Ⅱペテ: "ペテロの第二の手紙",
  Ⅰヨハ: "ヨハネの第一の手紙",
  Ⅱヨハ: "ヨハネの第二の手紙",
  Ⅲヨハ: "ヨハネの第三の手紙",
  ユダ: "ユダの手紙",
  黙: "ヨハネの黙示録",
};

// --- 初期化処理 ---
document.addEventListener("DOMContentLoaded", () => {
  loadUserData();
  applyTheme();
  applyLangOrder();
  setupEventListeners();
  loadBibleData()
    .then(() => {
      document.getElementById("loader").style.display = "none";
      populateBooks();
    })
    .catch((err) => {
      document.getElementById("loader").innerText =
        "データの読み込みに失敗しました: " + err;
    });
});

function setupEventListeners() {
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

// --- サイドバー制御 ---
function toggleLeftMenu() {
  const leftSidebar = document.getElementById("left-sidebar");
  leftSidebar.classList.toggle("open");
  document.getElementById("left-overlay").classList.toggle("open");
  if (leftSidebar.classList.contains("open")) {
    document.getElementById("right-sidebar").classList.remove("open");
    document.getElementById("right-overlay").classList.remove("open");
    renderHistory();
    renderBookmarks();
  }
}

function toggleRightMenu() {
  const rightSidebar = document.getElementById("right-sidebar");
  rightSidebar.classList.toggle("open");
  document.getElementById("right-overlay").classList.toggle("open");
  if (rightSidebar.classList.contains("open")) {
    document.getElementById("left-sidebar").classList.remove("open");
    document.getElementById("left-overlay").classList.remove("open");
  }
}

function isSidebarOpen() {
  return (
    document.getElementById("left-sidebar").classList.contains("open") ||
    document.getElementById("right-sidebar").classList.contains("open")
  );
}

// --- データ読み込み ---
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
    option.textContent = bookFullNames[abbr];
    bookSelect.appendChild(option);
  });
  const lastHistory = history[0];
  if (lastHistory) {
    displayChapter(lastHistory.book, lastHistory.chapter);
  } else {
    updateChapters();
  }
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
  if (isSidebarOpen()) {
    if (document.getElementById("left-sidebar").classList.contains("open"))
      toggleLeftMenu();
    if (document.getElementById("right-sidebar").classList.contains("open"))
      toggleRightMenu();
  }
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
  addHistory(targetBook, parseInt(targetChapter));

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
      const isBookmarked = bookmarks.includes(verseRef);
      const bookmarkIcon = `<i class="bookmark-icon" onclick="toggleBookmark('${verseRef}')">${
        isBookmarked ? "★" : "☆"
      }</i>`;
      contentHTML += `<div class="verse-container"><div class="verse-ref">${verseNum}${bookmarkIcon}</div><div class="verse-content">${verseLangs}</div></div>`;
    }
  }
  contentDiv.innerHTML = contentHTML;
  window.scrollTo(0, 0);
  changeFontSize(document.getElementById("fontSizeSlider").value);
}

// --- ナビゲーションロジック ---
function navigateBookChapter(direction, isBook) {
  let { book, chapter } = lastViewed;
  if (isBook) {
    const newBookIndex = bookList.indexOf(book) + direction;
    if (newBookIndex >= 0 && newBookIndex < bookList.length) {
      displayChapter(bookList[newBookIndex], 1);
    }
  } else {
    const newChapter = chapter + direction;
    if (newChapter > 0 && newChapter <= bookChapters[book]) {
      displayChapter(book, newChapter);
    } else if (newChapter <= 0) {
      const newBookIndex = bookList.indexOf(book) - 1;
      if (newBookIndex >= 0) {
        const prevBook = bookList[newBookIndex];
        displayChapter(prevBook, bookChapters[prevBook]);
      }
    } else {
      const newBookIndex = bookList.indexOf(book) + 1;
      if (newBookIndex < bookList.length) {
        displayChapter(bookList[newBookIndex], 1);
      }
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

// --- 履歴＆ブックマーク機能 ---
function loadUserData() {
  history = JSON.parse(localStorage.getItem("bibleHistory")) || [];
  bookmarks = JSON.parse(localStorage.getItem("bibleBookmarks")) || [];
}

function addHistory(book, chapter) {
  const existingIndex = history.findIndex(
    (item) => item.book === book && item.chapter === chapter
  );
  if (existingIndex > -1) {
    history.splice(existingIndex, 1);
  }
  history.unshift({ book, chapter });
  if (history.length > 20) {
    history.pop();
  }
  localStorage.setItem("bibleHistory", JSON.stringify(history));
}

function toggleBookmark(verseRef) {
  const index = bookmarks.indexOf(verseRef);
  if (index > -1) {
    bookmarks.splice(index, 1);
  } else {
    bookmarks.unshift(verseRef);
    bookmarks.sort();
  }
  localStorage.setItem("bibleBookmarks", JSON.stringify(bookmarks));
  refreshDisplay();
}

function renderHistory() {
  const list = document.getElementById("history-list");
  if (history.length === 0) {
    list.innerHTML = `<li class="empty-message">履歴はありません</li>`;
    return;
  }
  list.innerHTML = history
    .map(
      (item) =>
        `<li onclick="displayChapter('${item.book}', ${item.chapter})">${
          bookFullNames[item.book]
        } ${item.chapter}章</li>`
    )
    .join("");
}

function renderBookmarks() {
  const list = document.getElementById("bookmarks-list");
  if (bookmarks.length === 0) {
    list.innerHTML = `<li class="empty-message">ブックマークはありません</li>`;
    return;
  }
  list.innerHTML = bookmarks
    .map((ref) => {
      const match = ref.match(/^([^\d]+)(\d+:\d+)/);
      const bookAbbr = match[1];
      const chapterAndVerse = match[2];
      const chapter = parseInt(chapterAndVerse.split(":")[0]);
      return `<li onclick="displayChapter('${bookAbbr}', ${chapter})">${bookFullNames[bookAbbr]} ${chapterAndVerse}</li>`;
    })
    .join("");
}

function showTab(tabName) {
  document
    .querySelectorAll(".tab-content")
    .forEach((el) => el.classList.remove("active"));
  document
    .querySelectorAll(".tab-button")
    .forEach((el) => el.classList.remove("active"));
  document.getElementById(`${tabName}-content`).classList.add("active");
  document
    .querySelector(`.tab-button[onclick="showTab('${tabName}')"]`)
    .classList.add("active");
}

// --- 設定関連 ---
function refreshDisplay() {
  if (lastViewed.book && lastViewed.chapter) {
    displayChapter(lastViewed.book, lastViewed.chapter);
  }
}

function updateHeader(book, chapter) {
  const fullName = bookFullNames[book] || book;
  document.title = `${fullName} ${chapter}章`;
  document.getElementById("Abbre").textContent = fullName;
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

function toggleLangOrder() {
  const isSwapped = document.getElementById("lang-order-toggle").checked;
  localStorage.setItem("langOrderSwapped", isSwapped);
  refreshDisplay();
}

function applyLangOrder() {
  const isSwapped = localStorage.getItem("langOrderSwapped") === "true";
  document.getElementById("lang-order-toggle").checked = isSwapped;
}

function changeFontSize(size) {
  document.getElementById("main-content").style.fontSize = size + "px";
}

// --- 検索 ---
function searchBible() {
  if (document.getElementById("left-sidebar").classList.contains("open"))
    toggleLeftMenu();
  const query = document.getElementById("search-input").value.trim();
  if (!query) return;
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
      if (keywords.every((kw) => jpText.includes(kw) || chText.includes(kw))) {
        results.push(row);
      }
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
          const fullVerseRef = verseRef.replace(book, bookFullNames[book]);
          resultsHTML += `<div class="search-result-item" onclick="displayChapter('${book}', '${chapter}')"><div class="verse-ref">${fullVerseRef}</div><div class="verse-content">${result_content}</div></div>`;
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
