let syou =  ["50", "40", "27", "36", "34", "24", "21", "4", "31", "24", "22", "25", "29", "36", "10", "13", "10", "42", "150", "31", "12", "8", "66", "52", "5", "48", "12", "14", "3", "9", "1", "4", "7", "3", "3", "3", "2", "14", "4", "28", "16", "24", "21", "28", "16", "16", "13", "6", "6", "4", "4", "5", "3", "6", "4", "3", "1", "13", "5", "5", "3", "5", "1", "1", "1", "22"];
let Abbre = ["創", "出エジ", "レビ", "民", "申", "ヨシュ", "士", "ルツ", "サム上", "サム下", "列王上", "列王下", "歴代上", "歴代下", "エズ", "ネヘ", "エス", "ヨブ", "詩", "箴", "伝", "雅", "イザ", "エレ", "哀", "エゼ", "ダニ", "ホセ", "ヨエ", "アモ", "オバ", "ヨナ", "ミカ", "ナホ", "ハバ", "ゼパ", "ハガ", "ゼカ", "マラ", "マタ", "マル", "ルカ", "ヨハ", "使徒", "ロマ", "Ⅰコリ", "Ⅱコリ", "ガラ", "エペ", "ピリ", "コロ", "Ⅰテサ", "Ⅱテサ", "Ⅰテモ", "Ⅱテモ", "テト", "ピレ", "ヘブ", "ヤコ", "Ⅰペテ", "Ⅱペテ", "Ⅰヨハ", "Ⅱヨハ", "Ⅲヨハ", "ユダ", "黙"];
let names = ["01 創世記", "02 出エジプト記", "03 レビ記", "04 民数記", "05 申命記", "06 ヨシュア記", "07 士師記", "08 ルツ記", "09 サムエル記上", "10 サムエル記下", "11 列王記上", "12 列王記下", "13 歴代志上", "14 歴代志下", "15 エズラ記", "16 ネヘミヤ記", "17 エステル記", "18 ヨブ記", "19 詩篇", "20 箴言", "21 伝道の書", "22 雅歌", "23 イザヤ書", "24 エレミヤ書", "25 哀歌", "26 エゼキエル書", "27 ダニエル書", "28 ホセア書", "29 ヨエル書", "30 アモス書", "31 オバデア書", "32 ヨナ書", "33 ミカ書", "34 ナホム書", "35 ハバクク書", "36 ゼパニヤ書", "37 ハガイ書", "38 ゼカリヤ書", "39 マラキ書", "40 マタイによる福音書", "41 マルコによる福音書", "42 ルカによる福音書", "43 ヨハネによる福音書", "44 使徒行伝", "45 ローマ人への手紙", "46 コリント人への第一の手紙", "47 コリント人への第二の手紙", "48 ガラテヤ人への手紙", "49 エペソ人への手紙", "50 ピリピ人への手紙", "51 コロサイ人への手紙", "52 テサロニケ人への第一の手紙", "53 テサロニケ人への第二の手紙", "54 テモテへの第一の手紙", "55 テモテへの第二の手紙", "56 テトスへの手紙", "57 ピレモンへの手紙", "58 ヘブル人への手紙", "59 ヤコブの手紙", "60 ペテロの第一の手紙", "61 ペテロの第二の手紙", "62 ヨハネの第一の手紙", "63 ヨハネの第二の手紙", "64 ヨハネの第三の手紙", "65 ユダの手紙", "66 ヨハネの黙示録"];

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

// 内容表示
function display() {
	document.querySelectorAll(".bible_input").forEach( ele => {
		ele.addEventListener("input", (e) => {
			const result = document.getElementById("result");
			const num = document.getElementById("abbre");
			const syou = document.getElementById("syou");
			if ( num.value != "" && syou.value != "" ) {
				let data = "";
				const index = syou.value;
				for( let n = 1, j = 1; n < 31104; n++ ) {
					if( bible_data[n][3].match( new RegExp( "^" + Abbre[num.value-1	] + index + ":" ) ) != null ) {
						data += `<div id="wrapper">`;
						data += `<div id="${j}" style="color:white;">${j}</div>`;
						data += `<div id="jp${j}" class="jp">${bible_data[n][4]}</div>`;
						data += `<div id="ch${j}" class="ch">${bible_data[n][2]}</div>`;
						data += `</div>`;
						setu = j;
						j++;
					}
				}
				result.innerHTML = data;
			} else document.getElementById("result").innerHTML = "";
		})
	});
}

// 検索機能
function search( option, text ) {
	document.getElementById("log").innerHTML = "";
	if( option == 1 ) {
		let contents = "";
		let keywords = text.split("　");
		
		if(text.replace(/[\s\t\n]/g, "")!='') { 
			if(keywords.length == 1) keywords = text.split(" ");
			if(keywords.length == 1) { //検索ワードが一つのみ
				const pattern = text;
				let setu = "";
				if(text.replace(/[\s\t\n]/g, "")!='') {
					for( let n = 1, j = 1; n <= 31103; n++ ){
						if(bible_data[n][2].includes(pattern) || bible_data[n][4].includes(pattern)) {
							contents += `<div class="wrapper">`;
							contents += `<div style="color:white; border:dotted 1px white; display:inline-block">${bible_data[n][3]}</div>`;
							contents += `<div class="jp">${bible_data[n][4].replace(text,`<mark>${text}</mark>`)}</div>`;
							contents += `<div class="ch">${bible_data[n][2].replace(text,`<mark>${text}</mark>`)}</div>`;
							contents += `</div>`;
							setu = j++;
							document.getElementById("log").innerHTML = `<mark style="background:aqua">${setu}</mark>件見つかりました`;
						}
					}
				}
			}
			else { //検索ワードが複数の場合 [ , ] で区切る
				const pattern = keywords;
				let hit = "";for( let n=1, j=1; n<=31103; n++ ){
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
						contents += `<div style="color:white; border:dotted 1px white; display:inline-block">${bible_data[n][3]}</div>`;
						contents += `<div class="jp">${japanese}</div>`;
						contents += `<div class="ch">${chinese}</div>`;
						contents += `</div>`;
						hit = j; //件数をhitに代入
						j++;
					}
				}
				document.getElementById("log").innerHTML = `<mark style="background:aqua">${hit}</mark>件`;
			}		
		}
		document.getElementById("search_result").innerHTML = contents;
	}
	if( option == 2 ) {
		let value = text.replace(/[～〜~]/g,',').split(',');
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
			contents += `<div id="place" style="color:white; border:dotted 1px white; display:inline-block">${value[0]}~${value[1]}</div>`;
			contents += `<div class="jp" style="border-bottom: 5px solid red; color: skyblue;">${japanese}</div>`;
			contents += `<div class="ch" style="color: yellowgreen;">${chinese}</div>`;
		}else {
			if(keyword.replace(/[\s\t\n]/g, "")!='') { 
				for( let n=1,j=1;n<=31103;n++){
					if(bible_data[n][1] === pattern || bible_data[n][2] === pattern || bible_data[n][3] === pattern || bible_data[n][4] === pattern) {
						contents += `<div id="place" style="color:white; border:dotted 1px white; display:inline-block">${bible_data[n][3]}</div>`;
						contents += `<div class="jp" style="border-bottom: 5px solid red; color: skyblue;">${bible_data[n][4].replace(keyword,`<mark>${keyword}</mark>`)}</div>`;
						contents += `<div class="ch" style="color: yellowgreen;">${bible_data[n][2].replace(keyword,`<mark>${keyword}</mark>`)}</div>`;
					}
				}
			}
		}

		document.getElementById("search_result").innerHTML = contents;

		// 選択範囲を操作するRangeオブジェクトを用意する
		let selectrange = document.createRange();

		// 選択範囲を設定する（引数に選択状態にする要素を指定）
		selectrange.selectNode( document.querySelector(".jp") );

		// ユーザーの選択状態を得る
		let selection = document.getSelection();

		// 現在の選択状態を解除する
		selection.removeAllRanges();

		// 対象要素を選択状態にする
		selection.addRange(selectrange);
	}
}

const bible_data = getCSV("../Data(hira).csv");
display();

// キーを押下した時のイベント設定
document.addEventListener( "keydown", (e) => {
	// エスケープ
	if( e.key == "Escape" ) {
		// 検索画面が開いてる場合
		if( document.getElementById("search_modal").style.display == "block" ) {
			document.getElementById("search_modal").style.display = "none";
		}
		else {
			const num = document.getElementById("abbre");
			const syou = document.getElementById("syou");
			if ( document.activeElement == num ) num.blur();
			else if ( document.activeElement == syou ) syou.blur();
			else if( document.activeElement != num &&  document.activeElement != syou ) num.focus();
		}

	}

	// コントロール＋S
	if( e.ctrlKey === true && e.key=="s" || e.key=="S" ) {
		const modal = document.getElementById("search_modal");
		modal.style.display = "block";
		document.querySelector("#search_text").focus();
		document.querySelector("#search_text").select();
	}
})

document.addEventListener( "keyup", (e) => {
	// エンター
	if(  e.key == "Enter" && document.getElementById("search_modal").style.display == "block") {
		const text = document.getElementById("search_text").value;
		const option = document.getElementsByName("option");
		
		// 語句検索
		if( option[0].checked ) search( 1, text );
		// 節範囲表示
		if( option[1].checked ) search( 2, text );

		// テキストボックスからカーソルを外す
		document.getElementById("search_text").blur();
	}
})