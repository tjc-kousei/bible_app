const BOOKS = [
  { id: 1, abbr: "創", name: "創世記", chapters: 50 },
  { id: 2, abbr: "出エジ", name: "出エジプト記", chapters: 40 },
  { id: 3, abbr: "レビ", name: "レビ記", chapters: 27 },
  { id: 4, abbr: "民", name: "民数記", chapters: 36 },
  { id: 5, abbr: "申", name: "申命記", chapters: 34 },
  { id: 6, abbr: "ヨシュ", name: "ヨシュア記", chapters: 24 },
  { id: 7, abbr: "士", name: "士師記", chapters: 21 },
  { id: 8, abbr: "ルツ", name: "ルツ記", chapters: 4 },
  { id: 9, abbr: "サム上", name: "サムエル記上", chapters: 31 },
  { id: 10, abbr: "サム下", name: "サムエル記下", chapters: 24 },
  { id: 11, abbr: "列王上", name: "列王記上", chapters: 22 },
  { id: 12, abbr: "列王下", name: "列王記下", chapters: 25 },
  { id: 13, abbr: "歴代上", name: "歴代志上", chapters: 29 },
  { id: 14, abbr: "歴代下", name: "歴代志下", chapters: 36 },
  { id: 15, abbr: "エズ", name: "エズラ記", chapters: 10 },
  { id: 16, abbr: "ネヘ", name: "ネヘミヤ記", chapters: 13 },
  { id: 17, abbr: "エス", name: "エステル記", chapters: 10 },
  { id: 18, abbr: "ヨブ", name: "ヨブ記", chapters: 42 },
  { id: 19, abbr: "詩", name: "詩篇", chapters: 150 },
  { id: 20, abbr: "箴", name: "箴言", chapters: 31 },
  { id: 21, abbr: "伝", name: "伝道の書", chapters: 12 },
  { id: 22, abbr: "雅", name: "雅歌", chapters: 8 },
  { id: 23, abbr: "イザ", name: "イザヤ書", chapters: 66 },
  { id: 24, abbr: "エレ", name: "エレミヤ書", chapters: 52 },
  { id: 25, abbr: "哀", name: "哀歌", chapters: 5 },
  { id: 26, abbr: "エゼ", name: "エゼキエル書", chapters: 48 },
  { id: 27, abbr: "ダニ", name: "ダニエル書", chapters: 12 },
  { id: 28, abbr: "ホセ", name: "ホセア書", chapters: 14 },
  { id: 29, abbr: "ヨエ", name: "ヨエル書", chapters: 3 },
  { id: 30, abbr: "アモ", name: "アモス書", chapters: 9 },
  { id: 31, abbr: "オバ", name: "オバデア書", chapters: 1 },
  { id: 32, abbr: "ヨナ", name: "ヨナ書", chapters: 4 },
  { id: 33, abbr: "ミカ", name: "ミカ書", chapters: 7 },
  { id: 34, abbr: "ナホ", name: "ナホム書", chapters: 3 },
  { id: 35, abbr: "ハバ", name: "ハバクク書", chapters: 3 },
  { id: 36, abbr: "ゼパ", name: "ゼパニヤ書", chapters: 3 },
  { id: 37, abbr: "ハガ", name: "ハガイ書", chapters: 2 },
  { id: 38, abbr: "ゼカ", name: "ゼカリヤ書", chapters: 14 },
  { id: 39, abbr: "マラ", name: "マラキ書", chapters: 4 },
  { id: 40, abbr: "マタ", name: "マタイによる福音書", chapters: 28 },
  { id: 41, abbr: "マル", name: "マルコによる福音書", chapters: 16 },
  { id: 42, abbr: "ルカ", name: "ルカによる福音書", chapters: 24 },
  { id: 43, abbr: "ヨハ", name: "ヨハネによる福音書", chapters: 21 },
  { id: 44, abbr: "使徒", name: "使徒行伝", chapters: 28 },
  { id: 45, abbr: "ロマ", name: "ローマ人への手紙", chapters: 16 },
  { id: 46, abbr: "Ⅰコリ", name: "コリント人への第一の手紙", chapters: 16 },
  { id: 47, abbr: "Ⅱコリ", name: "コリント人への第二の手紙", chapters: 13 },
  { id: 48, abbr: "ガラ", name: "ガラテヤ人への手紙", chapters: 6 },
  { id: 49, abbr: "エペ", name: "エペソ人への手紙", chapters: 6 },
  { id: 50, abbr: "ピリ", name: "ピリピ人への手紙", chapters: 4 },
  { id: 51, abbr: "コロ", name: "コロサイ人への手紙", chapters: 4 },
  { id: 52, abbr: "Ⅰテサ", name: "テサロニケ人への第一の手紙", chapters: 5 },
  { id: 53, abbr: "Ⅱテサ", name: "テサロニケ人への第二の手紙", chapters: 3 },
  { id: 54, abbr: "Ⅰテモ", name: "テモテへの第一の手紙", chapters: 6 },
  { id: 55, abbr: "Ⅱテモ", name: "テモテへの第二の手紙", chapters: 4 },
  { id: 56, abbr: "テト", name: "テトスへの手紙", chapters: 3 },
  { id: 57, abbr: "ピレ", name: "ピレモンへの手紙", chapters: 1 },
  { id: 58, abbr: "ヘブ", name: "ヘブル人への手紙", chapters: 13 },
  { id: 59, abbr: "ヤコ", name: "ヤコブの手紙", chapters: 5 },
  { id: 60, abbr: "Ⅰペテ", name: "ペテロの第一の手紙", chapters: 5 },
  { id: 61, abbr: "Ⅱペテ", name: "ペテロの第二の手紙", chapters: 3 },
  { id: 62, abbr: "Ⅰヨハ", name: "ヨハネの第一の手紙", chapters: 5 },
  { id: 63, abbr: "Ⅱヨハ", name: "ヨハネの第二の手紙", chapters: 1 },
  { id: 64, abbr: "Ⅲヨハ", name: "ヨハネの第三の手紙", chapters: 1 },
  { id: 65, abbr: "ユダ", name: "ユダの手紙", chapters: 1 },
  { id: 66, abbr: "黙", name: "ヨハネの黙示録", chapters: 22 },
];

const BOOK_MAP = new Map();
for (const book of BOOKS) {
  BOOK_MAP.set(String(book.id), book);
  BOOK_MAP.set(book.abbr, book);
  BOOK_MAP.set(book.name, book);
}

const MODE_LABELS = {
  both: "日中併記",
  jp: "日本語のみ",
  ch: "中国語のみ",
  compact: "コンパクト",
};

const STORAGE_KEYS = {
  state: "bible_v5_state",
  history: "bible_v5_history",
  bookmarks: "bible_v5_bookmarks",
};

const state = {
  verses: [],
  chapters: new Map(),
  currentBook: BOOKS[0],
  currentChapter: 1,
  currentVerse: null,
  viewMode: "both",
  fontScale: 1.22,
  focusedIndex: -1,
  searchQuery: "",
  history: [],
  bookmarks: [],
  commandHistory: [],
  commandIndex: -1,
};

const ui = {
  commandInput: document.getElementById("commandInput"),
  content: document.getElementById("content"),
  currentLabel: document.getElementById("currentLabel"),
  modeChip: document.getElementById("modeChip"),
  verseChip: document.getElementById("verseChip"),
  statusLine: document.getElementById("statusLine"),
  summaryRef: document.getElementById("summaryRef"),
  summarySearch: document.getElementById("summarySearch"),
  summaryFocus: document.getElementById("summaryFocus"),
  historyList: document.getElementById("historyList"),
  bookmarkList: document.getElementById("bookmarkList"),
  historyCount: document.getElementById("historyCount"),
  bookmarkCount: document.getElementById("bookmarkCount"),
  helpPanel: document.getElementById("helpPanel"),
  template: document.getElementById("verseTemplate"),
};

document.addEventListener("DOMContentLoaded", init);

async function init() {
  bindEvents();
  restorePersistedState();
  setStatus("データを読み込んでいます...");

  try {
    await loadData();
    applyViewMode(state.viewMode);
    applyFontScale();
    openChapter(state.currentBook, state.currentChapter, {
      verse: state.currentVerse,
      preserveInput: true,
      addToHistory: false,
    });
    ui.commandInput.focus();
    setStatus("準備完了。`g` で移動、`/` で検索できます。");
  } catch (error) {
    console.error(error);
    setStatus("データの読み込みに失敗しました。");
    ui.content.innerHTML = `<div class="empty-state">CSV の読み込みに失敗しました。ファイル配置を確認してください。</div>`;
  }
}

function bindEvents() {
  ui.commandInput.addEventListener("keydown", handleCommandKeydown);
  ui.commandInput.addEventListener("focus", () => {
    state.commandIndex = -1;
  });

  document.addEventListener("keydown", handleGlobalKeydown);
  ui.content.addEventListener("click", handleContentClick);
}

async function loadData() {
  const [jpText, compactText] = await Promise.all([
    fetch("../Data(hira).csv").then((res) => {
      if (!res.ok) {
        throw new Error("Data(hira).csv の取得に失敗");
      }
      return res.text();
    }),
    fetch("../chinese_compact.csv").then((res) => {
      if (!res.ok) {
        throw new Error("chinese_compact.csv の取得に失敗");
      }
      return res.text();
    }),
  ]);

  const compactLines = compactText.replace(/\uFEFF/g, "").trim().split(/\r?\n/);
  const compactRows = compactLines.slice(1);
  const jpLines = jpText.replace(/\uFEFF/g, "").trim().split(/\r?\n/);

  state.verses = [];
  state.chapters.clear();

  for (let i = 1; i < jpLines.length; i += 1) {
    const row = jpLines[i].split(",");
    if (row.length < 5) {
      continue;
    }

    const ref = row[3].trim();
    const parsed = parseReference(ref);
    if (!parsed) {
      continue;
    }

    const verse = {
      id: Number(row[0]),
      ref,
      book: parsed.book,
      chapter: parsed.chapter,
      verse: parsed.verse,
      jp: row[4].trim(),
      jpRuby: (row[5] || "").trim(),
      ch: row[2].trim(),
      compact: (compactRows[i - 1] || "").trim(),
    };

    state.verses.push(verse);
    const chapterKey = toChapterKey(verse.book.abbr, verse.chapter);
    if (!state.chapters.has(chapterKey)) {
      state.chapters.set(chapterKey, []);
    }
    state.chapters.get(chapterKey).push(verse);
  }
}

function handleCommandKeydown(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    executeCommand(ui.commandInput.value);
    return;
  }

  if (event.key === "ArrowUp") {
    if (!state.commandHistory.length) {
      return;
    }
    event.preventDefault();
    if (state.commandIndex < state.commandHistory.length - 1) {
      state.commandIndex += 1;
    }
    ui.commandInput.value =
      state.commandHistory[state.commandHistory.length - 1 - state.commandIndex];
    ui.commandInput.setSelectionRange(ui.commandInput.value.length, ui.commandInput.value.length);
    return;
  }

  if (event.key === "ArrowDown" && state.commandIndex >= 0) {
    event.preventDefault();
    state.commandIndex -= 1;
    ui.commandInput.value =
      state.commandIndex >= 0
        ? state.commandHistory[state.commandHistory.length - 1 - state.commandIndex]
        : "";
  }
}

function handleGlobalKeydown(event) {
  const activeTag = document.activeElement?.tagName;
  const isTyping =
    document.activeElement === ui.commandInput ||
    activeTag === "INPUT" ||
    activeTag === "TEXTAREA";

  if (event.key === "Escape") {
    ui.helpPanel.classList.add("hidden");
    ui.commandInput.blur();
    clearVerseFocus();
    setStatus("操作待機中。`g` で移動できます。");
    return;
  }

  if (isTyping) {
    return;
  }

  if (event.key === "/") {
    event.preventDefault();
    prepareCommand("/");
    return;
  }

  if (event.key === "g") {
    event.preventDefault();
    prepareCommand(`${state.currentBook.abbr} ${state.currentChapter}`);
    return;
  }

  if (event.key === "n") {
    event.preventDefault();
    moveChapter(1);
    return;
  }

  if (event.key === "p") {
    event.preventDefault();
    moveChapter(-1);
    return;
  }

  if (event.key === "j" || event.key === "ArrowDown") {
    event.preventDefault();
    moveVerseFocus(1);
    return;
  }

  if (event.key === "k" || event.key === "ArrowUp") {
    event.preventDefault();
    moveVerseFocus(-1);
    return;
  }

  if (event.key === "b") {
    event.preventDefault();
    toggleBookmark();
    return;
  }

  if (event.key === "Enter" && state.focusedIndex >= 0) {
    event.preventDefault();
    openFocusedVerse();
    return;
  }

  if (event.key === "1") {
    applyViewMode("both");
    return;
  }

  if (event.key === "2") {
    applyViewMode("jp");
    return;
  }

  if (event.key === "3") {
    applyViewMode("ch");
    return;
  }

  if (event.key === "4") {
    applyViewMode("compact");
    return;
  }

  if (event.key === "+" || event.key === "=") {
    event.preventDefault();
    updateFontScale(0.08);
    return;
  }

  if (event.key === "-") {
    event.preventDefault();
    updateFontScale(-0.08);
    return;
  }

  if (event.key === "?") {
    event.preventDefault();
    ui.helpPanel.classList.toggle("hidden");
    setStatus(ui.helpPanel.classList.contains("hidden") ? "ヘルプを閉じました。" : "ヘルプを表示中です。");
  }
}

function handleContentClick(event) {
  const jumpButton = event.target.closest(".verse-jump");
  const verseCard = event.target.closest(".verse-card");

  if (jumpButton && verseCard) {
    const index = Number(verseCard.dataset.index);
    focusVerse(index, { scroll: true });
    openFocusedVerse();
    return;
  }

  if (verseCard) {
    const index = Number(verseCard.dataset.index);
    focusVerse(index, { scroll: false });
  }
}

function executeCommand(rawInput) {
  const command = rawInput.trim();
  if (!command) {
    return;
  }

  state.commandHistory.push(command);
  if (state.commandHistory.length > 30) {
    state.commandHistory.shift();
  }
  state.commandIndex = -1;

  if (command.startsWith("/")) {
    const query = command.slice(1).trim();
    searchVerses(query);
    return;
  }

  if (command.startsWith(":")) {
    runColonCommand(command.slice(1).trim().toLowerCase());
    return;
  }

  const parsed = parsePassageCommand(command);
  if (!parsed) {
    setStatus("入力を解釈できませんでした。例: `ヨハ 3` `ヨハ 3:16-18` `/愛 信仰`");
    return;
  }

  openChapter(parsed.book, parsed.chapter, {
    verse: parsed.verseStart,
    rangeEnd: parsed.verseEnd,
    preserveInput: false,
    addToHistory: true,
  });
}

function runColonCommand(command) {
  if (["both", "jp", "ch", "compact"].includes(command)) {
    applyViewMode(command);
    return;
  }

  if (command === "help") {
    ui.helpPanel.classList.remove("hidden");
    setStatus("ヘルプを表示しました。");
    return;
  }

  if (command === "clear") {
    state.searchQuery = "";
    openChapter(state.currentBook, state.currentChapter, {
      verse: state.currentVerse,
      preserveInput: false,
      addToHistory: false,
    });
    setStatus("検索結果を閉じて現在章へ戻りました。");
    return;
  }

  setStatus("未対応のコマンドです。`:both` `:jp` `:ch` `:compact` `:help` `:clear` を使えます。");
}

function searchVerses(query) {
  if (!query) {
    setStatus("検索語を入力してください。");
    return;
  }

  const tokens = query.split(/\s+/).filter(Boolean);
  const results = state.verses.filter((verse) => {
    const haystack = `${verse.jp} ${verse.ch} ${verse.compact}`;
    return tokens.every((token) => haystack.includes(token));
  });

  state.searchQuery = query;
  renderVerses(results, { kind: "search", tokens });
  ui.currentLabel.textContent = `検索結果: ${query}`;
  ui.verseChip.textContent = `${results.length} 件`;
  ui.summarySearch.textContent = query;
  ui.summaryRef.textContent = "検索モード";
  ui.summaryFocus.textContent = "-";
  clearVerseFocus();
  setStatus(results.length ? `${results.length} 件見つかりました。Enter で開けます。` : "一致する節はありませんでした。");
}

function openChapter(book, chapter, options = {}) {
  const verses = state.chapters.get(toChapterKey(book.abbr, chapter)) || [];
  state.currentBook = book;
  state.currentChapter = chapter;
  state.currentVerse = options.verse || null;
  state.searchQuery = "";

  renderVerses(verses, {
    kind: "chapter",
    verseStart: options.verse || null,
    verseEnd: options.rangeEnd || null,
  });

  ui.currentLabel.textContent = `${book.name} ${chapter}章`;
  ui.verseChip.textContent = `${verses.length} 節`;
  ui.summaryRef.textContent = `${book.abbr} ${chapter}章`;
  ui.summarySearch.textContent = "なし";
  ui.summaryFocus.textContent = options.verse ? `${chapter}:${options.verse}` : "-";

  if (options.addToHistory !== false) {
    pushHistory({
      book: book.abbr,
      chapter,
      label: `${book.name} ${chapter}章`,
      at: new Date().toLocaleString("ja-JP"),
    });
  }

  if (options.verse) {
    const chapterIndex = verses.findIndex((verse) => verse.verse === options.verse);
    if (chapterIndex >= 0) {
      focusVerse(chapterIndex, { scroll: true });
    }
  } else {
    clearVerseFocus();
    ui.content.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  persistState();

  if (!options.preserveInput) {
    ui.commandInput.value = "";
    ui.commandInput.blur();
  }

  setStatus(`${book.name} ${chapter}章を表示しています。`);
}

function renderVerses(verses, context = {}) {
  ui.content.innerHTML = "";

  if (!verses.length) {
    ui.content.innerHTML = `<div class="empty-state">表示できるデータがありません。</div>`;
    return;
  }

  const fragment = document.createDocumentFragment();
  const tokens = context.tokens || [];

  verses.forEach((verse, index) => {
    const node = ui.template.content.firstElementChild.cloneNode(true);
    node.dataset.index = String(index);
    node.dataset.ref = verse.ref;
    node.querySelector(".verse-ref").textContent = verse.ref;
    node.querySelector(".verse-jump").dataset.index = String(index);
    node.querySelector(".verse-jp").innerHTML = highlightText(verse.jp, tokens);
    node.querySelector(".verse-ch").innerHTML = highlightText(verse.ch, tokens);
    node.querySelector(".verse-compact").innerHTML = highlightText(verse.compact || verse.ch, tokens);

    if (context.kind === "search") {
      node.classList.add("is-search");
    }

    if (context.kind === "chapter" && context.verseStart) {
      if (
        verse.verse >= context.verseStart &&
        (!context.verseEnd || verse.verse <= context.verseEnd)
      ) {
        node.classList.add("is-search");
      }
    }

    fragment.appendChild(node);
  });

  ui.content.appendChild(fragment);
  refreshVisibleMode();
}

function refreshVisibleMode() {
  const cards = ui.content.querySelectorAll(".verse-card");
  cards.forEach((card) => {
    const jp = card.querySelector(".verse-jp");
    const ch = card.querySelector(".verse-ch");
    const compact = card.querySelector(".verse-compact");

    jp.hidden = state.viewMode === "ch" || state.viewMode === "compact";
    ch.hidden = state.viewMode === "jp" || state.viewMode === "compact";
    compact.hidden = state.viewMode !== "compact";
  });
}

function moveChapter(delta) {
  let nextBook = state.currentBook;
  let nextChapter = state.currentChapter + delta;

  if (nextChapter < 1) {
    const prevBook = BOOKS[state.currentBook.id - 2];
    if (!prevBook) {
      setStatus("これ以上前の章はありません。");
      return;
    }
    nextBook = prevBook;
    nextChapter = prevBook.chapters;
  } else if (nextChapter > nextBook.chapters) {
    const followingBook = BOOKS[state.currentBook.id];
    if (!followingBook) {
      setStatus("これ以上次の章はありません。");
      return;
    }
    nextBook = followingBook;
    nextChapter = 1;
  }

  openChapter(nextBook, nextChapter, { addToHistory: true });
}

function moveVerseFocus(delta) {
  const cards = Array.from(ui.content.querySelectorAll(".verse-card"));
  if (!cards.length) {
    return;
  }

  let nextIndex = state.focusedIndex;
  if (nextIndex < 0) {
    nextIndex = delta > 0 ? 0 : cards.length - 1;
  } else {
    nextIndex = Math.max(0, Math.min(cards.length - 1, nextIndex + delta));
  }

  focusVerse(nextIndex, { scroll: true });
}

function focusVerse(index, options = {}) {
  const cards = Array.from(ui.content.querySelectorAll(".verse-card"));
  const card = cards[index];
  if (!card) {
    return;
  }

  cards.forEach((item) => item.classList.remove("is-focused"));
  card.classList.add("is-focused");
  state.focusedIndex = index;
  state.currentVerse = parseReference(card.dataset.ref)?.verse || null;
  ui.summaryFocus.textContent = card.dataset.ref;

  if (options.scroll) {
    card.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  card.focus({ preventScroll: true });
}

function clearVerseFocus() {
  state.focusedIndex = -1;
  ui.summaryFocus.textContent = "-";
  ui.content.querySelectorAll(".verse-card").forEach((card) => {
    card.classList.remove("is-focused");
  });
}

function openFocusedVerse() {
  const cards = Array.from(ui.content.querySelectorAll(".verse-card"));
  const card = cards[state.focusedIndex];
  if (!card) {
    return;
  }

  const parsed = parseReference(card.dataset.ref);
  if (!parsed) {
    return;
  }

  openChapter(parsed.book, parsed.chapter, {
    verse: parsed.verse,
    preserveInput: false,
    addToHistory: true,
  });
}

function toggleBookmark() {
  const key = toChapterKey(state.currentBook.abbr, state.currentChapter);
  const existingIndex = state.bookmarks.findIndex((item) => item.key === key);

  if (existingIndex >= 0) {
    state.bookmarks.splice(existingIndex, 1);
    setStatus("ブックマークを解除しました。");
  } else {
    state.bookmarks.unshift({
      key,
      book: state.currentBook.abbr,
      chapter: state.currentChapter,
      label: `${state.currentBook.name} ${state.currentChapter}章`,
    });
    state.bookmarks = state.bookmarks.slice(0, 20);
    setStatus("現在章をブックマークしました。");
  }

  renderBookmarkList();
  persistState();
}

function pushHistory(entry) {
  state.history = state.history.filter((item) => item.label !== entry.label);
  state.history.unshift(entry);
  state.history = state.history.slice(0, 20);
  renderHistoryList();
}

function renderHistoryList() {
  renderStackList(ui.historyList, state.history, "履歴はまだありません。");
  ui.historyCount.textContent = String(state.history.length);
  localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(state.history));
}

function renderBookmarkList() {
  renderStackList(ui.bookmarkList, state.bookmarks, "ブックマークはまだありません。");
  ui.bookmarkCount.textContent = String(state.bookmarks.length);
  localStorage.setItem(STORAGE_KEYS.bookmarks, JSON.stringify(state.bookmarks));
}

function renderStackList(root, items, emptyText) {
  root.innerHTML = "";

  if (!items.length) {
    root.innerHTML = `<div class="stack-item"><span class="stack-sub">${emptyText}</span></div>`;
    return;
  }

  const fragment = document.createDocumentFragment();
  items.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "stack-item";
    button.innerHTML = `<span><span class="stack-main">${item.label}</span><span class="stack-sub">${item.at || item.key}</span></span><kbd>Enter</kbd>`;
    button.addEventListener("click", () => {
      const book = BOOK_MAP.get(item.book);
      if (book) {
        openChapter(book, item.chapter, { addToHistory: true });
      }
    });
    fragment.appendChild(button);
  });
  root.appendChild(fragment);
}

function applyViewMode(mode) {
  state.viewMode = mode;
  ui.modeChip.textContent = MODE_LABELS[mode];
  refreshVisibleMode();
  setStatus(`表示モード: ${MODE_LABELS[mode]}`);
  persistState();
}

function updateFontScale(delta) {
  state.fontScale = Math.min(1.8, Math.max(0.9, Number((state.fontScale + delta).toFixed(2))));
  applyFontScale();
  persistState();
  setStatus(`文字サイズを ${Math.round(state.fontScale * 100)}% にしました。`);
}

function applyFontScale() {
  document.documentElement.style.setProperty("--font-size", `${state.fontScale}rem`);
}

function prepareCommand(value) {
  ui.commandInput.value = value;
  ui.commandInput.focus();
  ui.commandInput.setSelectionRange(ui.commandInput.value.length, ui.commandInput.value.length);
}

function persistState() {
  localStorage.setItem(
    STORAGE_KEYS.state,
    JSON.stringify({
      book: state.currentBook.abbr,
      chapter: state.currentChapter,
      verse: state.currentVerse,
      viewMode: state.viewMode,
      fontScale: state.fontScale,
    })
  );
}

function restorePersistedState() {
  try {
    const savedState = JSON.parse(localStorage.getItem(STORAGE_KEYS.state) || "{}");
    const savedBook = BOOK_MAP.get(savedState.book);
    if (savedBook) {
      state.currentBook = savedBook;
      state.currentChapter = Number(savedState.chapter) || 1;
      state.currentVerse = Number(savedState.verse) || null;
    }
    if (savedState.viewMode && MODE_LABELS[savedState.viewMode]) {
      state.viewMode = savedState.viewMode;
    }
    if (savedState.fontScale) {
      state.fontScale = savedState.fontScale;
    }
    state.history = JSON.parse(localStorage.getItem(STORAGE_KEYS.history) || "[]");
    state.bookmarks = JSON.parse(localStorage.getItem(STORAGE_KEYS.bookmarks) || "[]");
  } catch (error) {
    console.warn("state restore failed", error);
  }

  renderHistoryList();
  renderBookmarkList();
}

function parsePassageCommand(input) {
  const normalized = input.replace(/\s+/g, " ").trim();
  const match =
    normalized.match(/^(.+?)\s+(\d+)(?::(\d+)(?:\s*[-~]\s*(\d+))?)?$/) ||
    normalized.match(/^(.+?)(\d+)(?::(\d+)(?:\s*[-~]\s*(\d+))?)?$/);
  if (!match) {
    return null;
  }

  const bookToken = match[1].trim();
  const book = BOOK_MAP.get(bookToken);
  const chapter = Number(match[2]);
  const verseStart = match[3] ? Number(match[3]) : null;
  const verseEnd = match[4] ? Number(match[4]) : null;

  if (!book || chapter < 1 || chapter > book.chapters) {
    return null;
  }

  return { book, chapter, verseStart, verseEnd };
}

function parseReference(ref) {
  const match = ref.match(/^(.+?)(\d+):(\d+)$/);
  if (!match) {
    return null;
  }

  const book = BOOK_MAP.get(match[1]);
  if (!book) {
    return null;
  }

  return {
    book,
    chapter: Number(match[2]),
    verse: Number(match[3]),
  };
}

function toChapterKey(bookAbbr, chapter) {
  return `${bookAbbr}:${chapter}`;
}

function highlightText(text, tokens) {
  if (!tokens.length) {
    return escapeHtml(text);
  }

  let output = escapeHtml(text);
  tokens.forEach((token) => {
    const escapedToken = escapeRegExp(token);
    output = output.replace(new RegExp(escapedToken, "g"), `<mark>${escapeHtml(token)}</mark>`);
  });
  return output;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function setStatus(message) {
  ui.statusLine.textContent = message;
}
