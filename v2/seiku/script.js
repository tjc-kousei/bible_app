function getCSV(){
    var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", "../../Data(hira).csv", true); // アクセスするファイルを指定
    req.send(null); // HTTPリクエストの発行
	
    // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ	
    req.onload = function(){
	convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
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
    document.querySelector("input").focus()
    if(document.getElementById("searchbox").style.display=="") {
        document.querySelector("input").focus()
    }
	if( event.key=="Escape") { 
        document.getElementById("result").style.display = (document.getElementById("result").style.display=="")? "none":""
        document.getElementById("searchbox").style.display = (document.getElementById("searchbox").style.display=="none")? "":"none"
        if(document.getElementById("searchbox").style.display==""){
            text = document.getElementById("inputtext")
            // text.setSelectionRange(0, text.value.length)
            text.select()
        }
    }
})

function search() {
    input = document.querySelector("input")
    value = input.value
    value = value.replace(/[～〜~]/g,',').split(',')
    keyword = value[0]
    console.log(value)
    
    contents = ""
    pattern = keyword
    if(value.length == '2' ) {
        setu = pattern.split(':')
        range = setu[0]+':'+value[1] //range -> 範囲
        start = end = ''
        if(keyword.replace(/[\s\t\n]/g, "")!='') { 
            for( let n=1,j=1;n<=31103;n++){
                if(bible_data[n][1] === pattern || bible_data[n][2] === pattern || bible_data[n][3] === pattern || bible_data[n][4] === pattern) start = n
                if(bible_data[n][1] === range || bible_data[n][2] === range || bible_data[n][3] === range || bible_data[n][4] === range) end = n
            }
            japanese = chinese = ''
            for( let n=start; n<=end; n++ ) {
                japanese += bible_data[n][4]
                chinese  += bible_data[n][2]
            }
        }
        contents += `<div id="place" style="color:white; border:dotted 1px white; display:inline-block">${value[0]}~${value[1]}</div>`
        contents += `<div id="jp" class="jp">${japanese}</div>`
        contents += `<div id="ch" class="ch">${chinese}</div>`
    }else {
        if(keyword.replace(/[\s\t\n]/g, "")!='') { 
            for( let n=1,j=1;n<=31103;n++){
                if(bible_data[n][1] === pattern || bible_data[n][2] === pattern || bible_data[n][3] === pattern || bible_data[n][4] === pattern) {
                    contents += `<div id="place" style="color:white; border:dotted 1px white; display:inline-block">${bible_data[n][3]}</div>`
                    contents += `<div id="jp" class="jp">${bible_data[n][4].replace(keyword,`<mark>${keyword}</mark>`)}</div>`
                    contents += `<div id="ch" class="ch">${bible_data[n][2].replace(keyword,`<mark>${keyword}</mark>`)}</div>`
                }
            }
        }
    }
    
    document.getElementById("result").style.display = ""
    document.getElementById("searchbox").style.display = "none"
	document.getElementById("result").innerHTML =  contents
    if(document.getElementById("jp")){
        text = document.getElementById("jp")
        range = document.createRange()
        range.selectNodeContents(text)
        window.getSelection().addRange(range)
    }
}