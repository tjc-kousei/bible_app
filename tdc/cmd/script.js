function getCSV(){
    let req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", "../../Data(hira).csv", true); // アクセスするファイルを指定
    req.send(null); // HTTPリクエストの発行
	
    req.onload = function(){
		convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
		
		let tdc_req = new XMLHttpRequest();
		tdc_req.open("get", "../data.csv", true);
		tdc_req.send(null);
		tdc_req.onload = function() {
			let str = tdc_req.responseText;
			let tmp = str.split("\n");
			let memo_array = [];
			for(let i=0;i<tmp.length;++i){
				memo_array[i] = tmp[i].split(',');
			}
			for(let n=0;n<memo_array.length;n++){
				bible_data[n+1][1] = memo_array[n][0];
				bible_data[n+1][2] = memo_array[n][1];
			}
		}
    }
}
bible_data = []; // 最終的な二次元配列を入れるための配列
// 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
function convertCSVtoArray(str){ // 読み込んだCSVデータが文字列として渡される
    
    var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成
 
    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for(var i=1;i<tmp.length;++i){
        bible_data[i] = tmp[i].split(',');
    }
}
getCSV(); //最初に実行される

document.addEventListener('keydown', event => {
    // console.log(document.querySelector("input").focus())
    if(document.getElementById("searchbox").style.display=="") {
        document.querySelector("input").focus()
    }
	if( event.key=="Escape") { 
        document.getElementById("result").style.display = (document.getElementById("result").style.display=="")? "none":""
        document.getElementById("searchbox").style.display = (document.getElementById("searchbox").style.display=="none")? "":"none"
        if(document.getElementById("searchbox").style.display==""){
            text = document.getElementById("inputtext")
            text.select()
        }
    }
})

function search() {
    input = document.querySelector("input")
    keyword = input.value + ":"   
    contents = ""
    pattern = keyword
    if(keyword.replace(/[\s\t\n]/g, "")!='') { 
		for( let n=1,j=1;n<=31103;n++){
			if( bible_data[n][1].includes(pattern) || bible_data[n][3].includes(pattern) ) {
				contents += `<div id="place" style="color:white; border:dotted 1px white; display:inline-block">${bible_data[n][3]}</div>`
				contents += `<div id="jp" class="jp">${bible_data[n][4].replace(keyword,`<mark>${keyword}</mark>`)}</div>`
				contents += `<div id="ch" class="ch">${bible_data[n][2].replace(keyword,`<mark>${keyword}</mark>`)}</div>`
			}
		}
    }
    
    document.getElementById("result").style.display = ""
    document.getElementById("searchbox").style.display = "none"
	document.getElementById("result").innerHTML =  contents
}