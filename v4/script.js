// --- グローバル変数 ---
let bible_data = [];
let lastViewed = { book: "", chapter: "" };
let history = [];
let bookmarks = [];

// 検索結果を保持するための変数
let lastSearchResults = [];
let lastSearchQuery = "";

// --- IndexedDB 設定 ---
const DB_NAME = "BibleAppDB";
const DB_VERSION = 1;
const DB_STORE_NAME = "bible_store";

// --- お知らせのバージョンID (更新があるとIDを変える) ---
const LATEST_ANNOUNCEMENT_ID = "announce-2026-01-12-learning-feature";

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

const bookFullNamesJp = {
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

// 中国語（簡体字）の書巻名マッピング
const bookFullNamesCh = {
  創: "创世记",
  出エジ: "出埃及记",
  レビ: "利未记",
  民: "民数记",
  申: "申命记",
  ヨシュ: "约书亚记",
  士: "士师记",
  ルツ: "路特记",
  サム上: "撒母耳记上",
  サム下: "撒母耳记下",
  列王上: "列王纪上",
  列王下: "列王纪下",
  歴代上: "历代志上",
  歴代下: "历代志下",
  エズ: "以斯拉记",
  ネヘ: "尼希米记",
  エス: "以斯帖记",
  ヨブ: "约伯记",
  詩: "诗篇",
  箴: "箴言",
  伝: "传道书",
  雅: "雅歌",
  イザ: "以赛亚书",
  エレ: "耶利米书",
  哀: "耶利米哀歌",
  エゼ: "以西结书",
  ダニ: "但以理书",
  ホセ: "何西阿书",
  ヨエ: "约珥书",
  アモ: "阿摩司书",
  オバ: "俄巴底亚书",
  ヨナ: "约拿书",
  ミカ: "弥迦书",
  ナホ: "那鸿书",
  ハバ: "哈巴谷书",
  ゼパ: "西番雅书",
  ハガ: "哈該书",
  ゼカ: "撒迦利亚书",
  マラ: "玛拉基书",
  マタ: "马太福音",
  マル: "马可福音",
  ルカ: "路加福音",
  ヨハ: "约翰福音",
  使徒: "使徒行传",
  ロマ: "罗马书",
  Ⅰコリ: "哥林多前书",
  Ⅱコリ: "哥林多后书",
  ガラ: "加拉太书",
  エペ: "以弗所书",
  ピリ: "腓立比书",
  コロ: "歌罗西书",
  Ⅰテサ: "帖撒罗尼迦前书",
  Ⅱテサ: "帖撒罗尼迦后书",
  Ⅰテモ: "提摩太前书",
  Ⅱテモ: "提摩太后书",
  テト: "提多书",
  ピレ: "腓利门书",
  ヘブ: "希伯来书",
  ヤコ: "雅各书",
  Ⅰペテ: "彼得前书",
  Ⅱペテ: "彼得后书",
  Ⅰヨハ: "约翰一书",
  Ⅱヨハ: "约翰二书",
  Ⅲヨハ: "约翰三书",
  ユダ: "犹大书",
  黙: "启示录",
};

// --- 初期化処理 ---
document.addEventListener("DOMContentLoaded", () => {
  loadUserData();
  loadSettings();
  applyTheme();

  setupEventListeners();
  handleAnnouncements();

  initDB().then(async (db) => {
    try {
      const storedData = await getFromDB(db, "bible_full_data");
      if (storedData) {
        bible_data = storedData.parsed;
        document.getElementById("loader").style.display = "none";
        populateBooks();
        if (navigator.onLine) checkForUpdates(db, storedData);
      } else {
        await fetchAndSaveData(db);
      }
    } catch (err) {
      console.error(err);
      document.getElementById("loader").innerText =
        "データの読み込みに失敗しました: " + err;
    }
  });
});

// --- IndexedDB Helper Functions ---
function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = (e) => reject("DB Open Error: " + e.target.error);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(DB_STORE_NAME)) {
        db.createObjectStore(DB_STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = (e) => resolve(e.target.result);
  });
}

function getFromDB(db, id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([DB_STORE_NAME], "readonly");
    const store = transaction.objectStore(DB_STORE_NAME);
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function saveToDB(db, item) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([DB_STORE_NAME], "readwrite");
    const store = transaction.objectStore(DB_STORE_NAME);
    const request = store.put(item);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// --- データ取得・同期ロジック ---
async function fetchAndSaveData(db) {
  const CSV_PATHS = { hira: "../Data(hira).csv", zh: "../chinese_compact.csv" };
  const [hiraText, zhText] = await Promise.all([
    fetchCSV(CSV_PATHS.hira),
    fetchCSV(CSV_PATHS.zh),
  ]);
  const parsedData = processData(hiraText, zhText);
  const dataRecord = {
    id: "bible_full_data",
    hiraRaw: hiraText,
    zhRaw: zhText,
    parsed: parsedData,
    updatedAt: new Date().toISOString(),
  };
  await saveToDB(db, dataRecord);
  bible_data = parsedData;
  document.getElementById("loader").style.display = "none";
  populateBooks();
}

async function checkForUpdates(db, storedData) {
  const CSV_PATHS = { hira: "../Data(hira).csv", zh: "../chinese_compact.csv" };
  try {
    const [newHiraText, newZhText] = await Promise.all([
      fetchCSV(CSV_PATHS.hira),
      fetchCSV(CSV_PATHS.zh),
    ]);
    if (newHiraText !== storedData.hiraRaw || newZhText !== storedData.zhRaw) {
      const newParsedData = processData(newHiraText, newZhText);
      const newDataRecord = {
        id: "bible_full_data",
        hiraRaw: newHiraText,
        zhRaw: newZhText,
        parsed: newParsedData,
        updatedAt: new Date().toISOString(),
      };
      await saveToDB(db, newDataRecord);
      bible_data = newParsedData;
      refreshDisplay();
      const loader = document.getElementById("loader");
      loader.innerText = "データを最新に更新しました";
      loader.style.display = "block";
      setTimeout(() => (loader.style.display = "none"), 2000);
    }
  } catch (err) {
    console.log("Update check failed:", err);
  }
}

function processData(hiraText, zhText) {
  let data = csvTo2D(hiraText);
  const zh2d = csvTo2D(zhText);
  for (let i = 1; i < data.length; i++) {
    data[i].push(zh2d[i]?.[0] ?? "");
  }
  return data;
}

// --- 基本機能関数 ---
async function fetchCSV(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Fetch失敗: ${url}`);
  return await res.text();
}

function csvTo2D(text) {
  return text
    .replace(/\uFEFF/g, "")
    .split(/\r?\n/)
    .filter((l) => l.trim() !== "")
    .map((l) => l.split(","));
}

function compactToRuby(str) {
  return !str
    ? ""
    : str.replace(
        /(.)\(([^()]+)\)/g,
        "<ruby>$1<rt class='pinyin'>$2</rt></ruby>"
      );
}

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
  document.getElementById("book-select").addEventListener("change", () => {
    updateChapters();
    displayChapter(false);
  });
  document
    .getElementById("chapter-select")
    .addEventListener("change", () => displayChapter(false));

  const reportModal = document.getElementById("report-modal");
  document
    .getElementById("report-modal-open-btn")
    .addEventListener("click", () => {
      reportModal.classList.add("open");
      if (isSidebarOpen()) toggleRightMenu();
    });
  document
    .getElementById("report-modal-close-btn")
    .addEventListener("click", () => reportModal.classList.remove("open"));
  reportModal.addEventListener("click", (e) => {
    if (e.target === reportModal) reportModal.classList.remove("open");
  });

  // お知らせ関連
  const announceModal = document.getElementById("announce-modal");
  const closeFunc = () => announceModal.classList.remove("open");
  const closePermFunc = () => {
    localStorage.setItem("seenAnnouncementId", LATEST_ANNOUNCEMENT_ID);
    announceModal.classList.remove("open");
  };
  document
    .getElementById("announce-modal-close-btn")
    .addEventListener("click", closeFunc);
  document
    .getElementById("announce-close-temp-btn")
    .addEventListener("click", closeFunc);
  document
    .getElementById("announce-close-perm-btn")
    .addEventListener("click", closePermFunc);

  // 検索モーダルEnterキー対応
  document
    .getElementById("modal-search-input")
    .addEventListener("keypress", (e) => {
      if (e.key === "Enter") searchBible(true);
    });
}

function handleAnnouncements() {
  if (localStorage.getItem("seenAnnouncementId") !== LATEST_ANNOUNCEMENT_ID) {
    document.getElementById("announce-modal").classList.add("open");
  }
}

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

function populateBooks() {
  const bookSelect = document.getElementById("book-select");
  const chapterSelect = document.getElementById("chapter-select");
  const displayMode = document.getElementById("display-mode-select").value;
  const useChineseNames =
    displayMode === "ch-only" || displayMode === "both-ch";
  const nameMap = useChineseNames ? bookFullNamesCh : bookFullNamesJp;

  const currentBookVal = bookSelect.value;
  bookSelect.innerHTML = "";
  bookList.forEach((abbr) => {
    const option = document.createElement("option");
    option.value = abbr;
    option.textContent = nameMap[abbr];
    bookSelect.appendChild(option);
  });

  if (currentBookVal && bookList.includes(currentBookVal)) {
    bookSelect.value = currentBookVal;
  } else if (history[0]) {
    bookSelect.value = history[0].book;
  }

  updateChapters();

  const targetChapter = currentBookVal
    ? chapterSelect.value || 1
    : history[0]
    ? history[0].chapter
    : 1;
  if (chapterSelect.value === "") chapterSelect.value = targetChapter;
  displayChapter(false, bookSelect.value, targetChapter);
}

function updateChapters() {
  const bookSelect = document.getElementById("book-select");
  const chapterSelect = document.getElementById("chapter-select");
  const selectedBook = bookSelect.value;
  const currentChapter = chapterSelect.value
    ? parseInt(chapterSelect.value)
    : 1;
  chapterSelect.innerHTML = "";
  const totalChapters = bookChapters[selectedBook] || 0;
  for (let i = 1; i <= totalChapters; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i + "章";
    chapterSelect.appendChild(option);
  }
  if (currentChapter <= totalChapters) chapterSelect.value = currentChapter;
}

function displayChapter(
  closeSidebar = true,
  book = null,
  chapter = null,
  targetVerse = null
) {
  if (closeSidebar && isSidebarOpen()) {
    if (document.getElementById("left-sidebar").classList.contains("open"))
      toggleLeftMenu();
    if (document.getElementById("right-sidebar").classList.contains("open"))
      toggleRightMenu();
  }

  const contentDiv = document.getElementById("bible-content");
  contentDiv.innerHTML = "";
  const bookSelect = document.getElementById("book-select");
  const chapterSelect = document.getElementById("chapter-select");

  const targetBook = book || bookSelect.value;
  const targetChapter = chapter || chapterSelect.value || 1;

  if (bookSelect.value !== targetBook) {
    bookSelect.value = targetBook;
    updateChapters();
  }
  chapterSelect.value = targetChapter;
  lastViewed = { book: targetBook, chapter: parseInt(targetChapter) };

  const displayMode = document.getElementById("display-mode-select").value;
  const useChineseNames =
    displayMode === "ch-only" || displayMode === "both-ch";
  const bookName = useChineseNames
    ? bookFullNamesCh[targetBook]
    : bookFullNamesJp[targetBook];
  document.title = `${bookName} ${targetChapter}章`;

  updateNavButtons();
  addHistory(targetBook, parseInt(targetChapter));

  const showJpRuby = document.getElementById("ruby-jp-toggle").checked;
  const showChRuby = document.getElementById("ruby-ch-toggle").checked;

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

      let verseLangs = "";
      switch (displayMode) {
        case "jp-only":
          verseLangs = jpDiv;
          break;
        case "ch-only":
          verseLangs = chDiv;
          break;
        case "both-ch":
          verseLangs = chDiv + jpDiv;
          break;
        default:
          verseLangs = jpDiv + chDiv;
          break;
      }

      const isBookmarked = bookmarks.includes(verseRef);
      const bookmarkIcon = `<i class="bookmark-icon" onclick="toggleBookmark('${verseRef}')">${
        isBookmarked ? "★" : "☆"
      }</i>`;

      let animStyle = `animation-delay: ${Math.min(
        (verseNum - 1) * 0.03,
        0.5
      )}s`;

      if (targetVerse && parseInt(verseNum) === parseInt(targetVerse)) {
        animStyle = "animation: none; opacity: 1;";
      }

      contentHTML += `<div id="verse-${verseNum}" class="verse-container" style="${animStyle}"><div class="verse-ref">${verseNum}${bookmarkIcon}</div><div class="verse-content">${verseLangs}</div></div>`;
    }
  }
  contentDiv.innerHTML = contentHTML;

  if (targetVerse) {
    const targetEl = document.getElementById(`verse-${targetVerse}`);
    if (targetEl) {
      setTimeout(() => {
        targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
        targetEl.classList.add("highlight-target");
      }, 50);
    }
  } else {
    window.scrollTo(0, 0);
  }

  const savedSize = localStorage.getItem("fontSize") || "32";
  changeFontSize(savedSize);

  // 疑問点の表示を更新
  loadVerseQuestions(targetBook, targetChapter);
}

// ルビ・拼音を削除して純粋なテキストのみを抽出する
function getCleanText(element) {
  const clone = element.cloneNode(true);
  clone.querySelectorAll("rt").forEach((rt) => rt.remove());
  return clone.innerText.replace(/\s+/g, " ").trim();
}

// 疑問点登録モーダルを開く
function openQuestionModal(ref, lang, containerEl) {
  const cleanText = getCleanText(containerEl); // ここでルビを除去

  document.getElementById("q-display-ref").innerText = `${ref} (${lang})`;
  document.getElementById("q-display-fulltext").innerText = cleanText;
  document.getElementById("q-hidden-ref").value = ref;
  document.getElementById("q-hidden-lang").value = lang;

  document.getElementById("q-target-word").value = "";
  document.getElementById("q-memo").value = "";

  document.getElementById("question-modal").classList.add("open");
  setTimeout(() => document.getElementById("q-target-word").focus(), 300);
}

// 閲覧中の章の疑問点をサーバーから取得してバッジを表示
async function loadVerseQuestions(book, chapter) {
  try {
    const res = await fetch(
      `https://runaaa0712.weblike.jp/church/bibleapp/get_questions.php?book=${encodeURIComponent(
        book
      )}&chapter=${chapter}`
    );
    if (!res.ok) return;
    const questions = await res.json();

    // 既存のバッジを削除
    document
      .querySelectorAll(".verse-q-indicator")
      .forEach((el) => el.remove());

    questions.forEach((q) => {
      const verseNum = q.ref.split(":")[1];
      const refContainer = document.querySelector(
        `#verse-${verseNum} .verse-ref`
      );
      if (refContainer) {
        const badge = document.createElement("span");
        badge.className = "verse-q-indicator";
        badge.innerText = `? ${q.word}`;
        badge.onclick = (e) => {
          openAnswerModal(q);
        };
        refContainer.appendChild(badge);
      }
    });
  } catch (e) {
    console.error("疑問情報の取得に失敗:", e);
  }
}

async function loadVerseQuestions(book, chapter) {
  try {
    const res = await fetch(
      `https://runaaa0712.weblike.jp/church/bibleapp/get_questions.php?book=${book}&chapter=${chapter}`
    );
    const questions = await res.json();

    // 既存の表示をクリア
    document
      .querySelectorAll(".verse-q-indicator")
      .forEach((el) => el.remove());

    questions.forEach((q) => {
      const verseNum = q.ref.split(":")[1];
      const verseEl = document.querySelector(`#verse-${verseNum} .verse-ref`);
      if (verseEl) {
        const badge = document.createElement("span");
        badge.className = "verse-q-indicator";
        badge.style =
          "background: #e74c3c; color: white; font-size: 10px; padding: 2px 5px; border-radius: 4px; margin-left: 8px; cursor: pointer;";
        badge.innerText = `疑問: ${q.word}`;
        badge.onclick = (e) => {
          openAnswerModal(q);
        };
        verseEl.appendChild(badge);
      }
    });
  } catch (e) {
    console.error("疑問点の読み込み失敗", e);
  }
}

function navigateBookChapter(direction, isBook) {
  let { book, chapter } = lastViewed;
  if (isBook) {
    const newBookIndex = bookList.indexOf(book) + direction;
    if (newBookIndex >= 0 && newBookIndex < bookList.length)
      displayChapter(true, bookList[newBookIndex], 1);
  } else {
    const newChapter = chapter + direction;
    if (newChapter > 0 && newChapter <= bookChapters[book])
      displayChapter(true, book, newChapter);
    else if (newChapter <= 0) {
      const newBookIndex = bookList.indexOf(book) - 1;
      if (newBookIndex >= 0)
        displayChapter(
          true,
          bookList[newBookIndex],
          bookChapters[bookList[newBookIndex]]
        );
    } else {
      const newBookIndex = bookList.indexOf(book) + 1;
      if (newBookIndex < bookList.length)
        displayChapter(true, bookList[newBookIndex], 1);
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

function loadUserData() {
  history = JSON.parse(localStorage.getItem("bibleHistory")) || [];
  bookmarks = JSON.parse(localStorage.getItem("bibleBookmarks")) || [];
}

function loadSettings() {
  const savedSize = localStorage.getItem("fontSize") || "32";
  document.getElementById("fontSizeSlider").value = savedSize;
  document.getElementById("font-size-display").innerText = savedSize;

  const savedMode = localStorage.getItem("displayMode");
  if (savedMode)
    document.getElementById("display-mode-select").value = savedMode;

  const savedSearchMode =
    localStorage.getItem("searchDisplayMode") || savedMode || "both-jp";
  document.getElementById("search-display-mode").value = savedSearchMode;
}

function changeFontSize(size) {
  document.getElementById("main-content").style.fontSize = size + "px";
  document.getElementById("modal-search-results").style.fontSize =
    size * 0.9 + "px";
  document.getElementById("font-size-display").innerText = size;
  localStorage.setItem("fontSize", size);
}

function changeDisplayMode() {
  const mode = document.getElementById("display-mode-select").value;
  localStorage.setItem("displayMode", mode);
  populateBooks();
}

function saveAndRefresh() {
  refreshDisplay();
}

function addHistory(book, chapter) {
  const existingIndex = history.findIndex(
    (item) => item.book === book && item.chapter === chapter
  );
  if (existingIndex > -1) history.splice(existingIndex, 1);
  history.unshift({ book, chapter });
  if (history.length > 20) history.pop();
  localStorage.setItem("bibleHistory", JSON.stringify(history));
}

function toggleBookmark(verseRef) {
  // 1. データの更新
  const index = bookmarks.indexOf(verseRef);
  const isBookmarkedNow = index === -1;

  if (index > -1) {
    bookmarks.splice(index, 1);
  } else {
    bookmarks.unshift(verseRef);
    bookmarks.sort();
  }
  localStorage.setItem("bibleBookmarks", JSON.stringify(bookmarks));

  // 2. 画面の更新 (DOMを直接書き換えてスクロール位置を維持する)
  const parts = verseRef.split(":");
  if (parts.length === 2) {
    const verseNum = parts[1];
    const icon = document.querySelector(`#verse-${verseNum} .bookmark-icon`);
    if (icon) {
      icon.innerText = isBookmarkedNow ? "★" : "☆";
    }
  }

  // 3. サイドバーのリストを更新 (開いた時のために)
  renderBookmarks();

  // refreshDisplay(); <-- これを削除したのでスクロールしなくなります
}

function renderHistory() {
  const displayMode = document.getElementById("display-mode-select").value;
  const useChineseNames =
    displayMode === "ch-only" || displayMode === "both-ch";
  const nameMap = useChineseNames ? bookFullNamesCh : bookFullNamesJp;
  const list = document.getElementById("history-list");
  if (history.length === 0) {
    list.innerHTML = `<li class="empty-message">履歴はありません</li>`;
    return;
  }
  list.innerHTML = history
    .map(
      (item) =>
        `<li onclick="displayChapter(true, '${item.book}', ${item.chapter})">${
          nameMap[item.book] || bookFullNamesJp[item.book]
        } ${item.chapter}章</li>`
    )
    .join("");
}

function renderBookmarks() {
  const displayMode = document.getElementById("display-mode-select").value;
  const useChineseNames =
    displayMode === "ch-only" || displayMode === "both-ch";
  const nameMap = useChineseNames ? bookFullNamesCh : bookFullNamesJp;
  const list = document.getElementById("bookmarks-list");
  if (bookmarks.length === 0) {
    list.innerHTML = `<li class="empty-message">ブックマークはありません</li>`;
    return;
  }
  list.innerHTML = bookmarks
    .map((ref) => {
      const match = ref.match(/^([^\d]+)(\d+:\d+)/);
      const bookAbbr = match[1];
      const parts = match[2].split(":");
      return `<li onclick="displayChapter(true, '${bookAbbr}', ${parseInt(
        parts[0]
      )}, ${parseInt(parts[1])})">${
        nameMap[bookAbbr] || bookFullNamesJp[bookAbbr]
      } ${match[2]}</li>`;
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

function refreshDisplay() {
  if (lastViewed.book && lastViewed.chapter)
    displayChapter(false, lastViewed.book, lastViewed.chapter);
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

// --- 検索機能 (モーダル対応版) ---

function openSearchModal() {
  if (isSidebarOpen()) toggleLeftMenu();
  document.getElementById("search-modal").classList.add("open");
  document.getElementById("modal-search-input").focus();
}

function closeSearchModal() {
  document.getElementById("search-modal").classList.remove("open");
}

function searchBible(executeSearch = true) {
  let query = "";

  if (executeSearch) {
    query = document.getElementById("modal-search-input").value.trim();
    if (!query) return;
    lastSearchQuery = query;
  } else {
    query = lastSearchQuery;
    if (!query) return;
  }

  const searchDisplayMode = document.getElementById(
    "search-display-mode"
  ).value;
  localStorage.setItem("searchDisplayMode", searchDisplayMode);

  const keywords = query.split(/\s+/).filter((k) => k);
  const resultsDiv = document.getElementById("modal-search-results");

  if (executeSearch) {
    resultsDiv.innerHTML = `<div class="loader">検索中...</div>`;

    setTimeout(() => {
      let results = [];
      for (let i = 1; i < bible_data.length; i++) {
        const row = bible_data[i];
        const jpText = row[4];
        const chText = row[2];
        if (
          keywords.every((kw) => jpText.includes(kw) || chText.includes(kw))
        ) {
          results.push(row);
        }
      }
      lastSearchResults = results;
      renderSearchResults(keywords);
    }, 10);
  } else {
    renderSearchResults(keywords);
  }
}

function renderSearchResults(keywords) {
  const resultsDiv = document.getElementById("modal-search-results");
  const searchDisplayMode = document.getElementById(
    "search-display-mode"
  ).value;

  const useChineseNames =
    searchDisplayMode === "ch-only" || searchDisplayMode === "both-ch";
  const nameMap = useChineseNames ? bookFullNamesCh : bookFullNamesJp;

  if (lastSearchResults.length > 0) {
    let resultsHTML = `<h3 style="margin-bottom:15px; padding-left:5px;">「${lastSearchQuery}」の検索結果: ${lastSearchResults.length}件</h3>`;

    lastSearchResults.forEach((row) => {
      const verseRef = row[3];
      const jpDiv = `<div class="jp">${highlightKeywords(
        row[4],
        keywords
      )}</div>`;
      const chDiv = `<div class="ch">${highlightKeywords(
        row[2],
        keywords
      )}</div>`;

      const match = verseRef.match(/^([^\d]+)(\d+):(\d+)/);
      if (match) {
        const book = match[1];
        const chapter = match[2];
        const verse = match[3];

        let result_content = "";
        switch (searchDisplayMode) {
          case "jp-only":
            result_content = jpDiv;
            break;
          case "ch-only":
            result_content = chDiv;
            break;
          case "both-ch":
            result_content = chDiv + jpDiv;
            break;
          default:
            result_content = jpDiv + chDiv;
            break;
        }

        const bookName = nameMap[book] || bookFullNamesJp[book];
        const fullVerseRef = verseRef.replace(book, bookName);

        resultsHTML += `<div class="search-result-item" onclick="closeSearchModal(); displayChapter(true, '${book}', '${chapter}', '${verse}')">
            <div class="verse-ref">${fullVerseRef}</div>
            <div class="verse-content">${result_content}</div>
          </div>`;
      }
    });
    resultsDiv.innerHTML = resultsHTML;
  } else {
    resultsDiv.innerHTML = `<h3>「${lastSearchQuery}」の検索結果</h3><p class="empty-message">見つかりませんでした。</p>`;
  }

  const savedSize = localStorage.getItem("fontSize") || "32";
  resultsDiv.style.fontSize = savedSize * 0.9 + "px";
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

let isQuestionMode = false;

function toggleQuestionMode() {
  isQuestionMode = document.getElementById("question-mode-toggle").checked;
  // モードONのときは本文を強調
  document.getElementById("bible-content").style.cursor = isQuestionMode
    ? "help"
    : "default";
}

// 本文クリック時のイベント
document.getElementById("bible-content").addEventListener("click", (e) => {
  if (!isQuestionMode) return;

  const langContainer = e.target.closest(".jp, .ch");
  if (!langContainer) return;

  const verseContainer = langContainer.closest(".verse-container");
  const verseNum = verseContainer.id.replace("verse-", "");
  const lang = langContainer.classList.contains("jp") ? "日本語" : "中国語";
  const verseRef = `${lastViewed.book}${lastViewed.chapter}:${verseNum}`;

  // --- ルビ・拼音を除去する処理 ---
  const tempEl = langContainer.cloneNode(true);
  tempEl.querySelectorAll("rt").forEach((rt) => rt.remove()); // ルビタグの中身を全削除
  const cleanText = tempEl.innerText.trim(); // 純粋な本文のみ取得

  openQuestionModal(verseRef, lang, cleanText);
});

function openQuestionModal(ref, lang, fullText) {
  // 表示のリセットとセット
  document.getElementById("q-display-ref").innerText = `${ref} (${lang})`;
  document.getElementById("q-display-fulltext").innerText = fullText;
  document.getElementById("q-hidden-ref").value = ref;
  document.getElementById("q-hidden-lang").value = lang;

  // 入力欄を空にする
  document.getElementById("q-target-word").value = "";
  document.getElementById("q-memo").value = "";

  document.getElementById("question-modal").classList.add("open");
  // 単語入力欄にフォーカス
  setTimeout(() => document.getElementById("q-target-word").focus(), 300);
}

function closeQuestionModal() {
  document.getElementById("question-modal").classList.remove("open");
}

async function submitQuestion() {
  const word = document.getElementById("q-target-word").value.trim();
  const memo = document.getElementById("q-memo").value.trim();

  if (!word) {
    alert("不明な語句を入力してください。");
    return;
  }

  const data = {
    book: lastViewed.book,
    chapter: lastViewed.chapter,
    ref: document.getElementById("q-hidden-ref").value,
    lang: document.getElementById("q-hidden-lang").value,
    word: word, // 不明単語
    memo: memo,
    fulltext: document.getElementById("q-display-fulltext").innerText, // 文脈確認用
  };

  try {
    const response = await fetch(
      "https://runaaa0712.weblike.jp/church/bibleapp/save_question.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      alert("登録が完了しました。");
      closeQuestionModal();
      // 必要に応じて現在の章の疑問点表示を更新
      if (typeof fetchQuestionsForChapter === "function") {
        fetchQuestionsForChapter(lastViewed.book, lastViewed.chapter);
      }
    }
  } catch (error) {
    alert("エラーが発生しました。");
  }
}

// トースト表示関数
function showToast(message) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// モーダルを閉じる汎用関数
function closeModal(id) {
  document.getElementById(id).classList.remove("open");
}

// 回答モーダルを開く
function openAnswerModal(q) {
  document.getElementById("ans-meta").innerText = `${q.ref} (${q.lang})`;
  document.getElementById("ans-word").innerText = q.word;
  document.getElementById("ans-memo").innerText = q.memo || "メモなし";

  const replySection = document.getElementById("ans-reply-section");
  const ansBody = document.getElementById("ans-body");

  if (q.answer) {
    replySection.style.display = "block";
    ansBody.innerText = q.answer;
  } else {
    replySection.style.display = "block";
    ansBody.innerHTML = "<em style='color: #888;'>まだ回答がありません。</em>";
  }

  document.getElementById("answer-modal").classList.add("open");
}
