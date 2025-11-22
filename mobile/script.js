let Abbre = ["創", "出エジ", "レビ", "民", "申", "ヨシュ", "士", "ルツ", "サム上", "サム下", "列王上", "列王下", "歴代上", "歴代下", "エズ", "ネヘ", "エス", "ヨブ", "詩", "箴", "伝", "雅", "イザ", "エレ", "哀", "エゼ", "ダニ", "ホセ", "ヨエ", "アモ", "オバ", "ヨナ", "ミカ", "ナホ", "ハバ", "ゼパ", "ハガ", "ゼカ", "マラ", "マタ", "マル", "ルカ", "ヨハ", "使徒", "ロマ", "Ⅰコリ", "Ⅱコリ", "ガラ", "エペ", "ピリ", "コロ", "Ⅰテサ", "Ⅱテサ", "Ⅰテモ", "Ⅱテモ", "テト", "ピレ", "ヘブ", "ヤコ", "Ⅰペテ", "Ⅱペテ", "Ⅰヨハ", "Ⅱヨハ", "Ⅲヨハ", "ユダ", "黙"];
let isLook = false;
let letter_size = 1.2;
// CSVファイルを読み込んで配列にして返す
const getCSV = (url) => {
    let req = new XMLHttpRequest();
    req.open("get", url, false);
    req.send(null);
	
	if( req.status == 200 ) {
		let arr = [];
		let tmp = req.responseText.split("\n");
		for(let i=1;i<tmp.length;++i){
			arr[i] = tmp[i].split(',');
		}
		return arr;
	} else if( req.status == 404 ) console.log("ファイルが見つかりません");
}
const setStrSize = () => {
    letter_size = document.getElementById("fontchange").value;

	// 上限・下限の設定
	if(letter_size>2.5) letter_size = 2.5;
	if(letter_size<1.0) letter_size = 1.0;

	document.getElementById("result").style.fontSize = letter_size + "rem";	
}

// 内容表示
function display(index,value) {
    const result = document.getElementById("result");
    let data = "";
    for( let n = 1, j = 1; n < 31104; n++ ) {
        if( bible_data[n][3].match( new RegExp( "^" + index ) ) != null ) {
            data += `<div class="wrapper">`;
            data += (j % 2 != 0) ? `<div class="specific" style="color:skyblue;">${j}</div>` : `<div class="specific" style="color:yellowgreen;">${j}</div>`;
            data += `<div class="jp">${bible_data[n][4]}</div>`;
            data += `<div class="ch">${bible_data[n][2]}</div>`;
            data += `</div>`;
            j++;
        }
    }
    result.innerHTML = data;
    document.getElementById("log").innerHTML = value;
    setStrSize();
}

// 新旧約・言語の切り替え
// デフォルト設定
let DefaultLang = "japanese";
let DefaultTestament = "ot";

function testament(add,del) {
    if(!document.getElementById(add).classList.contains("looking")) {
        document.getElementById(add).classList.toggle("looking");
        if(add.length == 2) DefaultTestament = add;
        else DefaultLang = add;
    }
    if(document.getElementById(del).classList.contains("looking"))
        document.getElementById(del).classList.toggle("looking");
    
    document.getElementById("abbre").innerHTML = "";
    createbutton( DefaultLang + "_" + DefaultTestament );
}
function createbutton(name) {
    let language, start, end;
    switch(name) {
        case "japanese_ot":
            language = ["創世記", "出エジプト記", "レビ記", "民数記", "申命記", "ヨシュア記", "士師記", "ルツ記", "サムエル記上", "サムエル記下", "列王記上", "列王記下", "歴代志上", "歴代志下", "エズラ記", "ネヘミヤ記", "エステル記", "ヨブ記", "詩篇", "箴言", "伝道の書", "雅歌", "イザヤ書", "エレミヤ書", "哀歌", "エゼキエル書", "ダニエル書", "ホセア書", "ヨエル書", "アモス書", "オバデア書", "ヨナ書", "ミカ書", "ナホム書", "ハバクク書", "ゼパニヤ書", "ハガイ書", "ゼカリヤ書", "マラキ書"];
            start = 0; end = 39;
            break;
        case "japanese_nt":
            language = ["マタイによる福音書", "マルコによる福音書", "ルカによる福音書", "ヨハネによる福音書", "使徒行伝", "ローマ人への手紙", "コリント人への第一の手紙", "コリント人への第二の手紙", "ガラテヤ人への手紙", "エペソ人への手紙", "ピリピ人への手紙", "コロサイ人への手紙", "テサロニケ人への第一の手紙", "テサロニケ人への第二の手紙", "テモテへの第一の手紙", "テモテへの第二の手紙", "テトスへの手紙", "ピレモンへの手紙", "ヘブル人への手紙", "ヤコブの手紙", "ペテロの第一の手紙", "ペテロの第二の手紙", "ヨハネの第一の手紙", "ヨハネの第二の手紙", "ヨハネの第三の手紙", "ユダの手紙", "ヨハネの黙示録"];
            start = 39; end = 66;
            break;
        case "chinese_ot":
            language = ["创世记","出埃及记","利未记","民数记","申命记","约书亚记","士师记","路得记","撒母耳记上","撒母耳记下","列王纪上","列王纪下","历代志上","历代志下","以斯拉记","尼希米记","以斯帖记","约伯记","诗篇","箴言","传道书","雅歌","以赛亚书","耶利米书","耶利米哀歌","以西结书","但以理书","何西阿书","约珥书","阿摩司书","俄巴底亚书","约拿书","弥迦书","那鸿书","哈巴谷书","西番雅书","哈该书","撒迦利亚书","玛拉基书"];
            start = 0; end = 39;
            break;
        case "chinese_nt":
            language = ["马太福音","马可福音","路加福音","约翰福音","使徒行传","罗马书","哥林多前书","哥林多后书","加拉太书","以弗所书","腓立比书","歌罗西书","帖撒罗尼迦前书","帖撒罗尼迦后书","提摩太前书","提摩太后书","提多书","腓利门书","希伯来书","雅各书","彼得前书","彼得后书","约翰一书","约翰二书","约翰三书","犹大书","启示录"];
            start = 39; end = 66;
            break;
    }
    let syous =  ["50", "40", "27", "36", "34", "24", "21", "4", "31", "24", "22", "25", "29", "36", "10", "13", "10", "42", "150", "31", "12", "8", "66", "52", "5", "48", "12", "14", "3", "9", "1", "4", "7", "3", "3", "3", "2", "14", "4", "28", "16", "24", "21", "28", "16", "16", "13", "6", "6", "4", "4", "5", "3", "6", "4", "3", "1", "13", "5", "5", "3", "5", "1", "1", "1", "22"];
    let ele = document.getElementById("abbre");
    for( let n = 0; start < end; n++, start++ ) {
        let target = document.getElementById("modal_syou_content");
        let button = document.createElement("button");
        button.value = start;
        button.innerHTML = language[n];
        button.classList.add("abbre_button");
        button.addEventListener("click", (e) => {
            target.innerHTML = "";
            for( let n = 1; n <= syous[e.target.value]; n++ ) {
                let button_nest = document.createElement("button");
                button_nest.innerHTML = n;
                button_nest.value = Abbre[e.target.value] + n + ":";
                button_nest.dataset.abbre = e.target.innerHTML;
                target.appendChild(button_nest);
                button_nest.addEventListener("click", (e_chil) => {
                    display(e_chil.target.value,e_chil.target.dataset.abbre+e_chil.target.innerHTML+"章");
                    isLook = true;
                    document.getElementById("modal_syou").style.left = "-150%";        
                })
            }
            document.getElementById("close").click();
            document.getElementById("modal_syou").style.left = "0";
        })
        ele.appendChild(button);
    }
}
function Goku(text) {
    let contents = "";
    let keywords = text.split(/\s/);
    if(text.replace(/[\s\t\n]/g, "") != '') {
        if(keywords.length == 1) { //検索ワードが一つのみ
            const pattern = text;
            let setu = "";
            for( let n = 1, j = 1; n <= 31103; n++ ){
                if(bible_data[n][2].includes(pattern) || bible_data[n][4].includes(pattern)) {
                    contents += `<div class="wrapper">`;
                    contents += `<div  class="specific" style="color:white; border:dotted 1px white; display:inline-block">${bible_data[n][3]}</div>`;
                    contents += `<div class="jp">${bible_data[n][4].replace(text,`<mark>${text}</mark>`)}</div>`;
                    contents += `<div class="ch">${bible_data[n][2].replace(text,`<mark>${text}</mark>`)}</div>`;
                    contents += `</div>`;
                    setu = j++;
                    document.getElementById("log").innerHTML = `${setu}件`;
                }
            }
        }
        else { //検索ワードが複数の場合 [ , ] で区切る
            const pattern = keywords;
            let hit = "";
            for( let n=1, j=1; n<=31103; n++ ){
                let check_flag = true;
                let chinese  = bible_data[n][2];
                let japanese = bible_data[n][4];
                for( let i = 0; i < pattern.length; i++ ) {
                    if( chinese.includes(pattern[i]) || japanese.includes(pattern[i]) ) {
                        japanese = japanese.replace(new RegExp(pattern[i], "g"),`<mark>${pattern[i]}</mark>`);
                        chinese  = chinese.replace(new RegExp(pattern[i], "g"),`<mark>${pattern[i]}</mark>`);
                    }
                    else {
                        check_flag = false;
                        break;
                    }
                }
    
                if(check_flag) {
                    contents += `<div class="wrapper">`;
                    contents += `<div  class="specific" style="color:white; border:dotted 1px white; display:inline-block">${bible_data[n][3]}</div>`;
                    contents += `<div class="jp">${japanese}</div>`;
                    contents += `<div class="ch">${chinese}</div>`;
                    contents += `</div>`;
                    hit = j; //件数をhitに代入
                    j++;
                }
            }
            document.getElementById("log").innerHTML = `${hit}件`;
        }
        document.getElementById("result").innerHTML = contents;	
    }
    setStrSize();
}
function Hanyi(text) {
    let value = text.replace(/[～〜~\s]/g,',').split(',');
		keyword = value[0];
		contents = "";
		pattern = keyword;

		if(value.length == '2' ) {
			setu = pattern.split(':');
			range = setu[0]+':'+value[1]; //range -> 範囲
			start = end = '';
			if(keyword.replace(/[\s\t\n]/g, "")!='') { 
				for( let n=1,j=1;n<=31103;n++){
					if(bible_data[n][1] === pattern || bible_data[n][2] === pattern || bible_data[n][3] === pattern || bible_data[n][4] === pattern) start = n;
					if(bible_data[n][1] === range || bible_data[n][2] === range || bible_data[n][3] === range || bible_data[n][4] === range) end = n;
				}
				japanese = chinese = '';
				for( let n=start; n<=end; n++ ) {
					japanese += bible_data[n][4];
					chinese  += bible_data[n][2];
				}
			}
			contents += `<div class="wrapper">`;
			contents += `<div  class="specific" style="color:white; border:dotted 1px white; display:inline-block">${value[0]}~${value[1]}</div>`;
			contents += `<div class="jp" id="range_ja" style="border-bottom: 5px solid red; color: skyblue;">${japanese}</div>`;
			contents += `<div class="ch" style="color: yellowgreen;">${chinese}</div></div>`;
		}else {
			if(keyword.replace(/[\s\t\n]/g, "")!='') { 
				for( let n=1,j=1;n<=31103;n++){
					if(bible_data[n][1] === pattern || bible_data[n][2] === pattern || bible_data[n][3] === pattern || bible_data[n][4] === pattern) {
						contents += `<div class="wrapper">`;
						contents += `<div  class="specific" style="color:white; border:dotted 1px white; display:inline-block">${bible_data[n][3]}</div>`;
						contents += `<div class="jp" id="range_ja" style="border-bottom: 5px solid red; color: skyblue;">${bible_data[n][4].replace(keyword,`<mark>${keyword}</mark>`)}</div>`;
						contents += `<div class="ch" style="color: yellowgreen;">${bible_data[n][2].replace(keyword,`<mark>${keyword}</mark>`)}</div></div>`;
					}
				}
			}
		}

		document.getElementById("result").innerHTML = contents;

		// 選択範囲を操作するRangeオブジェクトを用意する
		let selectrange = document.createRange();

		// 選択範囲を設定する（引数に選択状態にする要素を指定）
		selectrange.selectNodeContents( document.getElementById("range_ja") );

		// 選択状態にする
		window.getSelection().removeAllRanges();
		window.getSelection().addRange(selectrange);

        document.getElementById("log").innerHTML = "";
}

// 初期化
const bible_data = getCSV("../Data(hira).csv");
document.getElementById("japanese").click();