//CSVファイルを読み込む関数getCSV()の定義
function getCSV(){
    var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", "Data.csv", true); // アクセスするファイルを指定
    req.send(null); // HTTPリクエストの発行
	
    // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ	
    req.onload = function(){
	convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
    }
}
var result = []; // 最終的な二次元配列を入れるための配列
// 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
function convertCSVtoArray(str){ // 読み込んだCSVデータが文字列として渡される
    
    var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成
 
    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for(var i=0;i<tmp.length;++i){
        result[i] = tmp[i].split(',');
    }
}

getCSV(); //最初に実行される

document.addEventListener('keydown', event => {
    if(event.key=='Enter') {
        const textbox = document.getElementById('textbox');
        search(textbox.value);
        menu();
    }
});

//検索して出力させる
function search(text){
    if(text.replace(/[\s\t\n]/g, "")!='') {   
        let td = '';
        let message = '';
        for( var n=1,j=1;n<31104;n++){
            if(result[n][4].includes(text)||result[n][2].includes(text)) {
                td += '<tr><td rowspan="2" class="rownumber" id="rownumber'+j+'">'+j+'</td>';
                td += '<td class="setu" id="jp'+j+'">'+result[n][3]+'</td><td class="target_jp" id="jp_con'+j+'">'+result[n][4].replace(text,"<mark>"+text+"</mark>")+'</td></tr>';
                td += '<tr><td class="setu" id="ch'+j+'">'+result[n][1]+'</td><td class="target_ch" id="ch_con'+j+'">'+result[n][2].replace(text,"<mark>"+text+"</mark>")+'</td><tr>';
                j++;
                message = j-1;
            }
        }
        message = (message=='')? 0:message;
        document.getElementById('result').innerHTML = td;
        document.getElementById('message').innerHTML = 'ヒット:'+message+'件<br>検索内容:'+text;
    }
    //文字サイズ固定
    for( var n = 1; n <= document.getElementsByClassName('target_jp').length; n++ ){
        const ch = document.getElementById('ch'+n);
        const jp = document.getElementById('jp'+n);
        const ch_con = document.getElementById('ch_con'+n);
        const jp_con = document.getElementById('jp_con'+n);
        const rownumber = document.getElementById('rownumber'+n);
        ch.style.fontSize = strsize+'em';
        ch_con.style.fontSize = strsize+'em';
        jp.style.fontSize = strsize+'em';
        jp_con.style.fontSize = strsize+'em';
        rownumber.style.fontSize = strsize+'em';
    }
}

function fontSize_change(state){
    strsize = (state=='plus') ? strsize + 0.1 : strsize - 0.1;
    for( var n = 1; n <= document.getElementsByClassName('target_jp').length; n++ ){
        const ch = document.getElementById('ch'+n);
        const jp = document.getElementById('jp'+n);
        const ch_con = document.getElementById('ch_con'+n);
        const jp_con = document.getElementById('jp_con'+n);
        const rownumber = document.getElementById('rownumber'+n);
        ch.style.fontSize = strsize+'em';
        ch_con.style.fontSize = strsize+'em';
        jp.style.fontSize = strsize+'em';
        jp_con.style.fontSize = strsize+'em';
        rownumber.style.fontSize = strsize+'em';
    }
}

function menu() {
    let navmas = document.getElementById('navmas');
    if(navmas.style.display =="" ) {
        navmas.style.display="none";
    }
    else {
        navmas.style.display = "";
        document.getElementById('textbox').focus();
    }
    let url = document.getElementById('url');
    if(url.style.display == "") url.style.display="none";
    else url.style.display= "";
}