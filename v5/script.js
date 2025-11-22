// --- グローバル変数と状態管理 ---
const jpBibleMap = new Map();
const chBibleMap = new Map();
let bookNameLookup = {};
const appState = {
  lastViewed: { book: "", chapter: "" },
  history: [],
  bookmarks: [],
  searchDebounceTimer: null,
};
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
  applyAllSettings();
  setupEventListeners();
  loadBibleData()
    .then(() => {
      document.getElementById("loader").style.display = "none";
      createBookNameLookup();
      populateBooks(); // ★修正ポイント
      renderHistory();
      renderBookmarks();
    })
    .catch((err) => {
      document.getElementById(
        "loader"
      ).innerHTML = `<p>データの読み込みに失敗しました: ${err}</p>`;
    });
});

function setupEventListeners() {
  document.getElementById("book-select").addEventListener("change", () => {
    updateChapters();
    displayChapter(); // 書巻変更時は章リストを更新してから内容を表示
  });
  document
    .getElementById("chapter-select")
    .addEventListener("change", () => displayChapter());
  document
    .getElementById("prev-book")
    .addEventListener("click", () => navigateBookChapter(-1, true));
  document
    .getElementById("next-book")
    .addEventListener("click", () => navigateBookChapter(1, true));
  document
    .getElementById("prev-chapter")
    .addEventListener("click", () => navigateBookChapter(-1, false));
  document
    .getElementById("next-chapter")
    .addEventListener("click", () => navigateBookChapter(1, false));
  document.getElementById("search-input").addEventListener("input", (e) => {
    clearTimeout(appState.searchDebounceTimer);
    appState.searchDebounceTimer = setTimeout(
      () => searchBible(e.target.value),
      300
    );
  });
  document.getElementById("goto-button").addEventListener("click", handleGoTo);
  document.getElementById("goto-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleGoTo();
  });
  document
    .getElementById("theme-toggle")
    .addEventListener("change", toggleTheme);
  document.getElementById("ruby-jp-toggle").addEventListener("change", (e) => {
    saveSetting("rubyJp", e.target.checked);
    refreshDisplay();
  });
  document.getElementById("ruby-ch-toggle").addEventListener("change", (e) => {
    saveSetting("rubyCh", e.target.checked);
    refreshDisplay();
  });
  document
    .getElementById("fontSizeSlider")
    .addEventListener("input", (e) => changeFontSize(e.target.value));
  document
    .getElementById("fontSizeSlider")
    .addEventListener("change", (e) => saveSetting("fontSize", e.target.value));
  document.addEventListener("keydown", handleShortcuts);
  document
    .getElementById("panel-toggle-btn")
    .addEventListener("click", toggleLeftPanel);
}

// --- データ読み込み & ヘルパー関数 ---
async function loadBibleData() {
  const [jpText, chText] = await Promise.all([
    fetchCSV("../Data(hira).csv"),
    fetchCSV("../chinese_compact.csv"),
  ]);
  const jpRows = csvTo2D(jpText);
  const chRows = csvTo2D(chText);
  for (let i = 0; i < jpRows.length; i++) {
    const jpRow = jpRows[i];
    const chRow = chRows[i];
    const ref = jpRow[3];
    if (ref) {
      jpBibleMap.set(ref, { text: jpRow[4], ruby: jpRow[5] });
      if (chRow && chRow[0]) {
        chBibleMap.set(ref, { text: chRow[0] });
      }
    }
  }
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
function stripPinyin(compactText) {
  return !compactText ? "" : compactText.replace(/\([^)]+\)/g, "");
}

// --- UI操作 ---
// ★★ 起動ロジックを修正 ★★
function populateBooks() {
  const bookSelect = document.getElementById("book-select");
  const chapterSelect = document.getElementById("chapter-select");
  bookList.forEach((abbr) => {
    const option = document.createElement("option");
    option.value = abbr;
    option.textContent = bookFullNames[abbr];
    bookSelect.appendChild(option);
  });

  const lastHistory = appState.history[0];
  if (lastHistory) {
    bookSelect.value = lastHistory.book;
    updateChapters();
    chapterSelect.value = lastHistory.chapter;
    displayChapter();
  } else {
    updateChapters();
    displayChapter();
  }
}

// ★★ updateChaptersからdisplayChapterの呼び出しを削除 ★★
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
}

function displayChapter(book = null, chapter = null, verse = null) {
  document.getElementById("search-results").innerHTML = "";
  document.getElementById("search-input").value = "";
  const displayArea = document.getElementById("bible-display-area");
  displayArea.style.display = "grid";
  displayArea.innerHTML = "";
  const bookSelect = document.getElementById("book-select");
  const chapterSelect = document.getElementById("chapter-select");

  // 引数がない場合はプルダウンから値を取得
  const targetBook = book || bookSelect.value;
  const targetChapter = chapter || chapterSelect.value || 1; // 章が空の場合のフォールバック

  // プルダウンの表示を実態に合わせる
  if (bookSelect.value !== targetBook) {
    bookSelect.value = targetBook;
    updateChapters(); // 他の書巻に飛んだ時に章リストを更新
  }
  chapterSelect.value = targetChapter;

  appState.lastViewed = { book: targetBook, chapter: parseInt(targetChapter) };
  updateHeader(targetBook, targetChapter);
  updateNavButtons();
  addHistory(targetBook, parseInt(targetChapter));
  renderHistory();

  const showJpRuby = document.getElementById("ruby-jp-toggle").checked;
  const showChRuby = document.getElementById("ruby-ch-toggle").checked;
  const versePrefix = `${targetBook}${targetChapter}:`;
  let contentHTML = "";

  for (const [verseRef, jpData] of jpBibleMap.entries()) {
    if (verseRef.startsWith(versePrefix)) {
      const verseNum = verseRef.split(":")[1];
      const chData = chBibleMap.get(verseRef);
      const isBookmarked = appState.bookmarks.includes(verseRef);
      const bookmarkIcon = `<i class="bookmark-icon" onclick="toggleBookmark('${verseRef}')">${
        isBookmarked ? "★" : "☆"
      }</i>`;
      const copyIcon = `<span class="copy-icon" title="この節をコピー" onclick="copyVerseToClipboard('${verseRef}')">📋</span>`;
      const verseHeaderJP = `<div class="verse-header"><div class="verse-ref" id="v-${verseRef.replace(
        /:/g,
        "-"
      )}">${verseNum}</div>${bookmarkIcon}</div>`;
      const verseHeaderCH = `<div class="verse-header"><div class="verse-ref">${verseNum}</div></div>`;
      const jpText = `<div class="verse-text">${
        showJpRuby ? jpData.ruby : jpData.text
      }</div>`;
      let chTextContent = "（対応する訳がありません）";
      if (chData && chData.text) {
        chTextContent = showChRuby
          ? compactToRuby(chData.text)
          : stripPinyin(chData.text);
      }
      const chText = `<div class="verse-text">${chTextContent}</div>`;
      contentHTML += `<div class="verse-container">${verseHeaderJP}${jpText}${copyIcon}</div><div class="verse-container">${verseHeaderCH}${chText}</div>`;
    }
  }
  displayArea.innerHTML = contentHTML;

  if (verse) {
    setTimeout(() => {
      const verseId = `v-${targetBook}-${targetChapter}-${verse}`;
      const verseElement = document.getElementById(verseId);
      if (verseElement) {
        verseElement.scrollIntoView({ behavior: "smooth", block: "center" });
        const container = verseElement.closest(".verse-container");
        if (container) {
          container.style.backgroundColor = "var(--highlight-bg)";
          setTimeout(() => {
            container.style.backgroundColor = "";
          }, 2000);
        }
      }
    }, 100);
  } else {
    document.getElementById("main-content").scrollTop = 0;
  }
}
function refreshDisplay() {
  const mainContent = document.getElementById("main-content");
  const currentScroll = mainContent.scrollTop;
  const { book, chapter } = appState.lastViewed;
  if (book && chapter) {
    displayChapter(book, chapter);
    mainContent.scrollTop = currentScroll;
  }
}
function navigateBookChapter(direction, isBook) {
  let { book, chapter } = appState.lastViewed;
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
  const { book, chapter } = appState.lastViewed;
  const currentBookIndex = bookList.indexOf(book);
  document.getElementById("prev-book").disabled = currentBookIndex === 0;
  document.getElementById("next-book").disabled =
    currentBookIndex === bookList.length - 1;
  document.getElementById("prev-chapter").disabled =
    currentBookIndex === 0 && chapter === 1;
  document.getElementById("next-chapter").disabled =
    currentBookIndex === bookList.length - 1 && chapter === bookChapters[book];
}
function addHistory(book, chapter) {
  const history = appState.history;
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
  const bookmarks = appState.bookmarks;
  const index = bookmarks.indexOf(verseRef);
  if (index > -1) {
    bookmarks.splice(index, 1);
  } else {
    bookmarks.unshift(verseRef);
    bookmarks.sort();
  }
  localStorage.setItem("bibleBookmarks", JSON.stringify(bookmarks));
  refreshDisplay();
  renderBookmarks();
}
function renderHistory() {
  const list = document.getElementById("history-list");
  if (appState.history.length === 0) {
    list.innerHTML = `<li class="empty-message">履歴はありません</li>`;
    return;
  }
  list.innerHTML = appState.history
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
  if (appState.bookmarks.length === 0) {
    list.innerHTML = `<li class="empty-message">ブックマークはありません</li>`;
    return;
  }
  list.innerHTML = appState.bookmarks
    .map((ref) => {
      const match = ref.match(/^([^\d]+)(\d+:\d+)/);
      const bookAbbr = match[1];
      const chapterAndVerse = match[2];
      const chapter = parseInt(chapterAndVerse.split(":")[0]);
      return `<li onclick="displayChapter('${bookAbbr}', ${chapter}, '${
        chapterAndVerse.split(":")[1]
      }')">${bookFullNames[bookAbbr]} ${chapterAndVerse}</li>`;
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
function updateHeader(book, chapter) {
  const fullName = bookFullNames[book] || book;
  const title = `${fullName} ${chapter}章`;
  document.title = title;
  document.getElementById("main-header-title").textContent = title;
}
function toggleTheme() {
  const newTheme =
    document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
  document.body.setAttribute("data-theme", newTheme);
  saveSetting("theme", newTheme);
}
function changeFontSize(size) {
  document.getElementById("main-content").style.fontSize = size + "px";
}
function loadUserData() {
  appState.history = JSON.parse(localStorage.getItem("bibleHistory")) || [];
  appState.bookmarks = JSON.parse(localStorage.getItem("bibleBookmarks")) || [];
}
function applyAllSettings() {
  const theme = localStorage.getItem("theme") || "light";
  document.body.setAttribute("data-theme", theme);
  document.getElementById("theme-toggle").checked = theme === "dark";
  const fontSize = localStorage.getItem("fontSize") || "16";
  document.getElementById("fontSizeSlider").value = fontSize;
  changeFontSize(fontSize);
  const rubyJp = localStorage.getItem("rubyJp") !== "false";
  document.getElementById("ruby-jp-toggle").checked = rubyJp;
  const rubyCh = localStorage.getItem("rubyCh") !== "false";
  document.getElementById("ruby-ch-toggle").checked = rubyCh;
  const isPanelCollapsed = localStorage.getItem("panelCollapsed") === "true";
  if (isPanelCollapsed) {
    document.querySelector(".container").classList.add("left-panel-collapsed");
  }
}
function saveSetting(key, value) {
  localStorage.setItem(key, value);
}
function toggleLeftPanel() {
  const container = document.querySelector(".container");
  container.classList.toggle("left-panel-collapsed");
  const isCollapsed = container.classList.contains("left-panel-collapsed");
  saveSetting("panelCollapsed", isCollapsed);
}
function searchBible(query) {
  if (!query || query.trim() === "") {
    if (document.getElementById("search-results").innerHTML !== "")
      refreshDisplay();
    return;
  }
  const keywords = query
    .trim()
    .split(/\s+/)
    .filter((k) => k);
  if (keywords.length === 0) return;
  document.getElementById("bible-display-area").style.display = "none";
  const resultsDiv = document.getElementById("search-results");
  resultsDiv.innerHTML = `<div class="loader"><div class="spinner"></div><p>検索中...</p></div>`;
  setTimeout(() => {
    let results = [];
    for (const [verseRef, jpData] of jpBibleMap.entries()) {
      const chData = chBibleMap.get(verseRef);
      const jpText = jpData.text;
      const chText = chData ? stripPinyin(chData.text) : "";
      if (keywords.every((kw) => jpText.includes(kw) || chText.includes(kw))) {
        results.push({ verseRef, jpText, chText });
      }
    }
    updateHeader(`「${query}」`, `${results.length}件の検索結果`);
    let resultsHTML = "";
    if (results.length > 0) {
      results.forEach((res) => {
        const jpDiv = `<div class="jp">${highlightKeywords(
          res.jpText,
          keywords
        )}</div>`;
        const chDiv = `<div class="ch">${highlightKeywords(
          res.chText,
          keywords
        )}</div>`;
        const [book, chapter, verse] = res.verseRef
          .match(/^([^\d]+)(\d+):(\d+)/)
          .slice(1);
        const fullVerseRef = res.verseRef.replace(book, bookFullNames[book]);
        resultsHTML += `<div class="search-result-item" onclick="displayChapter('${book}', '${chapter}', '${verse}')"> <div class="verse-ref">${fullVerseRef}</div><div class="verse-content">${jpDiv}${chDiv}</div></div>`;
      });
    } else {
      resultsHTML = "<p>見つかりませんでした。</p>";
    }
    resultsDiv.innerHTML = resultsHTML;
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
function createBookNameLookup() {
  for (const abbr in bookFullNames) {
    bookNameLookup[abbr] = abbr;
    bookNameLookup[bookFullNames[abbr]] = abbr;
    const shortName = bookFullNames[abbr].replace(
      /による福音書|人への手紙|の第一の手紙|の第二の手紙|記上|記下|志上|志下|行伝|の黙示録|記|書|篇|歌/,
      ""
    );
    bookNameLookup[shortName] = abbr;
  }
}
function handleGoTo() {
  const input = document.getElementById("goto-input").value.trim();
  if (!input) return;
  const match = input.match(/^(.+?)\s*(\d+)(?::(\d+))?$/);
  if (!match) {
    alert("形式が正しくありません。\n例: 創世記 1:1, ヨハ 3:16");
    return;
  }
  const [, bookName, chapter, verse] = match;
  const bookAbbr = bookNameLookup[bookName];
  if (
    !bookAbbr ||
    !bookChapters[bookAbbr] ||
    chapter > bookChapters[bookAbbr]
  ) {
    alert("指定された書巻または章が見つかりません。");
    return;
  }
  displayChapter(bookAbbr, chapter, verse);
  document.getElementById("goto-input").value = "";
}
function copyVerseToClipboard(verseRef) {
  const jpData = jpBibleMap.get(verseRef);
  const chData = chBibleMap.get(verseRef);
  if (jpData) {
    const chPlainText = chData ? stripPinyin(chData.text) : "";
    const textToCopy = `${bookFullNames[verseRef.match(/^([^\d]+)/)[1]]} ${
      verseRef.match(/\d+:\d+$/)[0]
    }\n日: ${jpData.text}\n中: ${chPlainText}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert("コピーしました:\n" + textToCopy);
      })
      .catch((err) => {
        console.error("コピーに失敗しました", err);
        alert("コピーに失敗しました。");
      });
  }
}
function handleShortcuts(e) {
  if (e.key !== "Escape") {
    if (["search-input", "goto-input"].includes(e.target.id)) return;
    if (e.ctrlKey || e.metaKey || e.key.startsWith("Arrow")) {
      e.preventDefault();
    }

    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case "g":
          document.getElementById("goto-input").focus();
          break;
        case "f":
          document.getElementById("search-input").focus();
          break;
        case "d":
          document.getElementById("theme-toggle").click();
          break;
        case "j":
          document.getElementById("ruby-jp-toggle").click();
          break;
        case "c":
          document.getElementById("ruby-ch-toggle").click();
          break;
        case "arrowleft":
          document.getElementById("prev-book").click();
          break;
        case "arrowright":
          document.getElementById("next-book").click();
          break;
      }
    } else {
      switch (e.key) {
        case "ArrowLeft":
          document.getElementById("prev-chapter").click();
          break;
        case "ArrowRight":
          document.getElementById("next-chapter").click();
          break;
      }
    }
  } else {
    e.preventDefault();
    const searchInput = document.getElementById("search-input");
    const gotoInput = document.getElementById("goto-input");
    const container = document.querySelector(".container");

    if (
      document.activeElement === searchInput ||
      document.activeElement === gotoInput
    ) {
      document.activeElement.blur();
    } else if (searchInput.value) {
      searchInput.value = "";
      refreshDisplay();
    } else if (!container.classList.contains("left-panel-collapsed")) {
      toggleLeftPanel();
    }
  }
}
