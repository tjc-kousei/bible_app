// --- グローバル変数 ---
let bible_data = [];
let lastViewed = { book: "", chapter: "" };
let history = [];
let bookmarks = [];

// --- IndexedDB 設定 ---
const DB_NAME = "BibleAppDB";
const DB_VERSION = 1;
const DB_STORE_NAME = "bible_store";

// --- お知らせのバージョンID (更新があるとIDを変える) ---
const LATEST_ANNOUNCEMENT_ID = "announce-2025-12-02-update";

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
  loadSettings(); // 設定（文字サイズ、表示モード）を読み込む
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

        if (navigator.onLine) {
          checkForUpdates(db, storedData);
        }
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

    const isHiraChanged = newHiraText !== storedData.hiraRaw;
    const isZhChanged = newZhText !== storedData.zhRaw;

    if (isHiraChanged || isZhChanged) {
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
      setTimeout(() => {
        loader.style.display = "none";
      }, 2000);
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
  const openBtn = document.getElementById("report-modal-open-btn");
  const closeBtn = document.getElementById("report-modal-close-btn");
  openBtn.addEventListener("click", () => {
    reportModal.classList.add("open");
    if (isSidebarOpen()) toggleRightMenu();
  });
  closeBtn.addEventListener("click", () => {
    reportModal.classList.remove("open");
  });
  reportModal.addEventListener("click", (event) => {
    if (event.target === reportModal) reportModal.classList.remove("open");
  });

  const announceModal = document.getElementById("announce-modal");
  const closeXBtn = document.getElementById("announce-modal-close-btn");
  const closeTempBtn = document.getElementById("announce-close-temp-btn");
  const closePermBtn = document.getElementById("announce-close-perm-btn");
  const closeAnnouncementTemp = () => {
    announceModal.classList.remove("open");
  };
  const closeAnnouncementPerm = () => {
    localStorage.setItem("seenAnnouncementId", LATEST_ANNOUNCEMENT_ID);
    announceModal.classList.remove("open");
  };
  closeXBtn.addEventListener("click", closeAnnouncementTemp);
  closeTempBtn.addEventListener("click", closeAnnouncementTemp);
  closePermBtn.addEventListener("click", closeAnnouncementPerm);
}

function handleAnnouncements() {
  const seenId = localStorage.getItem("seenAnnouncementId");
  if (seenId !== LATEST_ANNOUNCEMENT_ID) {
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

// --- 書巻リスト作成 (言語設定に応じて切り替え) ---
function populateBooks() {
  const bookSelect = document.getElementById("book-select");
  const chapterSelect = document.getElementById("chapter-select");

  // 現在の表示モードを取得し、中国語優先または中国語のみなら中国語名を使う
  const displayMode = document.getElementById("display-mode-select").value;
  const useChineseNames =
    displayMode === "ch-only" || displayMode === "both-ch";
  const nameMap = useChineseNames ? bookFullNamesCh : bookFullNamesJp;

  const currentBookVal = bookSelect.value; // 選択状態を維持するため取得

  bookSelect.innerHTML = "";

  bookList.forEach((abbr) => {
    const option = document.createElement("option");
    option.value = abbr;
    option.textContent = nameMap[abbr];
    bookSelect.appendChild(option);
  });

  // もし前に選択していたものが存在すればセット、なければ履歴またはデフォルト
  if (currentBookVal && bookList.includes(currentBookVal)) {
    bookSelect.value = currentBookVal;
  } else {
    const lastHistory = history[0];
    if (lastHistory) {
      bookSelect.value = lastHistory.book;
    }
  }

  // 章の更新は必須
  updateChapters();

  // 現在表示されている章を再描画（タイトル更新などのため）
  const lastHistory = history[0];
  const targetChapter = currentBookVal
    ? chapterSelect.value || 1
    : lastHistory
    ? lastHistory.chapter
    : 1;
  if (chapterSelect.value === "") chapterSelect.value = targetChapter;

  // 初期ロード時のみここから描画、それ以外はchangeイベント等に任せるが
  // populateが呼ばれるのはデータロード時と言語切り替え時
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
  if (currentChapter <= totalChapters) {
    chapterSelect.value = currentChapter;
  }
}

function displayChapter(closeSidebar = true, book = null, chapter = null) {
  if (closeSidebar && isSidebarOpen()) {
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
  const targetChapter = chapter || chapterSelect.value || 1;

  if (bookSelect.value !== targetBook) {
    bookSelect.value = targetBook;
    updateChapters();
  }
  chapterSelect.value = targetChapter;

  lastViewed = { book: targetBook, chapter: parseInt(targetChapter) };

  // タイトルも言語に合わせて更新
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

      // 表示モードに応じた出し分け
      let verseLangs = "";
      switch (displayMode) {
        case "jp-only":
          verseLangs = jpDiv;
          break;
        case "ch-only":
          verseLangs = chDiv;
          break;
        case "both-ch": // 中国語優先
          verseLangs = chDiv + jpDiv;
          break;
        case "both-jp": // 日本語優先
        default:
          verseLangs = jpDiv + chDiv;
          break;
      }

      const isBookmarked = bookmarks.includes(verseRef);
      const bookmarkIcon = `<i class="bookmark-icon" onclick="toggleBookmark('${verseRef}')">${
        isBookmarked ? "★" : "☆"
      }</i>`;
      contentHTML += `<div class="verse-container"><div class="verse-ref">${verseNum}${bookmarkIcon}</div><div class="verse-content">${verseLangs}</div></div>`;
    }
  }
  contentDiv.innerHTML = contentHTML;
  window.scrollTo(0, 0);

  // 設定されたフォントサイズを適用
  const savedSize = localStorage.getItem("fontSize") || "32";
  changeFontSize(savedSize);
}

function navigateBookChapter(direction, isBook) {
  let { book, chapter } = lastViewed;
  if (isBook) {
    const newBookIndex = bookList.indexOf(book) + direction;
    if (newBookIndex >= 0 && newBookIndex < bookList.length) {
      displayChapter(true, bookList[newBookIndex], 1);
    }
  } else {
    const newChapter = chapter + direction;
    if (newChapter > 0 && newChapter <= bookChapters[book]) {
      displayChapter(true, book, newChapter);
    } else if (newChapter <= 0) {
      const newBookIndex = bookList.indexOf(book) - 1;
      if (newBookIndex >= 0) {
        const prevBook = bookList[newBookIndex];
        displayChapter(true, prevBook, bookChapters[prevBook]);
      }
    } else {
      const newBookIndex = bookList.indexOf(book) + 1;
      if (newBookIndex < bookList.length) {
        displayChapter(true, bookList[newBookIndex], 1);
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

function loadUserData() {
  history = JSON.parse(localStorage.getItem("bibleHistory")) || [];
  bookmarks = JSON.parse(localStorage.getItem("bibleBookmarks")) || [];
}

// --- 設定の保存・読み込み (文字サイズ・表示モード) ---
function loadSettings() {
  // フォントサイズ
  const savedSize = localStorage.getItem("fontSize");
  if (savedSize) {
    document.getElementById("fontSizeSlider").value = savedSize;
    document.getElementById("font-size-display").innerText = savedSize;
  } else {
    // デフォルト
    document.getElementById("fontSizeSlider").value = "32";
    document.getElementById("font-size-display").innerText = "32";
  }

  // 表示モード
  const savedMode = localStorage.getItem("displayMode");
  if (savedMode) {
    document.getElementById("display-mode-select").value = savedMode;
  }

  // 以前の "langOrderSwapped" 設定との互換性は、上記がなければデフォルト(both-jp)で吸収
}

function changeFontSize(size) {
  document.getElementById("main-content").style.fontSize = size + "px";
  document.getElementById("font-size-display").innerText = size;
  localStorage.setItem("fontSize", size);
}

function changeDisplayMode() {
  const mode = document.getElementById("display-mode-select").value;
  localStorage.setItem("displayMode", mode);

  // 書巻リストの言語も更新する必要があるため再生成
  populateBooks();
  // populateBooks内で displayChapter も呼ばれる
}

function saveAndRefresh() {
  refreshDisplay();
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
  // 履歴表示時の書巻名も現在の言語設定に合わせる
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
      const chapterAndVerse = match[2];
      const chapter = parseInt(chapterAndVerse.split(":")[0]);
      return `<li onclick="displayChapter(true, '${bookAbbr}', ${chapter})">${
        nameMap[bookAbbr] || bookFullNamesJp[bookAbbr]
      } ${chapterAndVerse}</li>`;
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
  if (lastViewed.book && lastViewed.chapter) {
    displayChapter(false, lastViewed.book, lastViewed.chapter);
  }
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

function searchBible() {
  if (document.getElementById("left-sidebar").classList.contains("open"))
    toggleLeftMenu();
  const query = document.getElementById("search-input").value.trim();
  if (!query) return;
  document.title = `「${query}」の検索結果`;
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

    const displayMode = document.getElementById("display-mode-select").value;
    let resultsHTML = "";

    if (results.length > 0) {
      resultsHTML = `<h3>「${query}」の検索結果: ${results.length}件</h3>`;
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

          let result_content = "";
          switch (displayMode) {
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

          const useChineseNames =
            displayMode === "ch-only" || displayMode === "both-ch";
          const bookName = useChineseNames
            ? bookFullNamesCh[book]
            : bookFullNamesJp[book];

          const fullVerseRef = verseRef.replace(book, bookName);
          resultsHTML += `<div class="search-result-item" onclick="displayChapter(true, '${book}', '${chapter}')"><div class="verse-ref">${fullVerseRef}</div><div class="verse-content">${result_content}</div></div>`;
        }
      });
    } else {
      resultsHTML = `<h3>「${query}」の検索結果</h3><p>見つかりませんでした。</p>`;
    }
    resultsDiv.innerHTML = resultsHTML;

    // 検索結果表示後も文字サイズ適用
    const savedSize = localStorage.getItem("fontSize") || "32";
    changeFontSize(savedSize);
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
