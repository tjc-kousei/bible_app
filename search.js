//CSVファイルを読み込む関数getCSV()の定義
function getCSV(){
    var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", "Data(hira).csv", true); // アクセスするファイルを指定
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

var syokan = '';
var syou = '';
var max = '';

function menu() {
    let navmas = document.getElementById('navmas');
    if(navmas.hidden) {
        navmas.hidden = false;
        navmas.style.display = "";
    }
    else if(navmas.style.display =="" ) navmas.style.display="none";
    else navmas.style.display = "";
    let url = document.getElementById('url');
    if(url.style.display == "") url.style.display="none";
    else url.style.display= "";
}

function rule(place) {
    history_num = ''
    if(document.getElementById('syou_pos')) document.getElementById('syou_pos').remove();
    if(document.getElementById('syou_show')) document.getElementById('syou_show').remove();
    const nav = document.getElementById('nav');
    var clone = nav.cloneNode( false );
    nav.parentNode.replaceChild( clone, nav );

    if(place=='nt') {
      document.F.nt[0].selected="true";
      position = document.F.ot;
      syokan = position.options[position.selectedIndex].value;
    }
    if(place=='ot') {
      document.F.ot[0].selected="true";
      position = document.F.nt;
      syokan = position.options[position.selectedIndex].value;
    }
    out(place);
}
function out(place) {
    if(place=='nt') {
      const setu = document.F.ot;
      const num = setu.selectedIndex;
      const str = setu.options[num].value;
      process(lists[str][1]);
      max = Number(lists[str][1]);
    }
    if(place=='ot') {
      const setu = document.F.nt;
      const num = setu.selectedIndex;
      const str = setu.options[num].value;
      process(lists[str][1]);
      max = Number(lists[str][1]);
    }
}
//章のボタン作成
function process(value) {
    const navmas = document.getElementById('navmas');
    const button = document.createElement('button');
    button.id = 'syou_pos';
    button.textContent = '章';
    button.setAttribute('onclick', 'del()');
    navmas.appendChild(button);
    const nav = document.getElementById('nav');
    const div = document.createElement('div');
    div.id = 'group';
    for( var n = 1; n <= value; n++ ) {
        const button = document.createElement('button');
        button.id = 'box';
        button.innerHTML = n
        button.setAttribute('onclick', 'wrap('+n+')');
        div.appendChild(button);
    }
    nav.appendChild(div);
}
//章を選んだ後節を選んで飛ぶ
function wrap(syou){
    history_num = ''
    const navmas = document.getElementById('navmas');
    const button = document.createElement('button');
    button.disabled = true;
    button.id = 'syou_show';
    button.innerHTML = syou; navmas.appendChild(button);
    navmas.appendChild(button);
    document.getElementById('group').style.display = "none";
    let table = query(jp_Abbre[syokan],syou);//table[0]->節数、table[1]->table中身
    document.getElementById('table').innerHTML = table[1];
    document.getElementById('table').hidden = false;
    let name = list[syokan].toString();
    document.getElementById('title').innerHTML = '<font size="6"><strong>'+ name.replace(name.substr(0,3),'') + ' 第' + syou + '章</strong></font>';
    const nav = document.getElementById('nav');
    const div = document.createElement('div');
    div.id = 'group_setu';
    for( var n = 1; n <= table[0]; n++ ) {
        const button = document.createElement('button');
        button.id = 'box';
        button.setAttribute('onclick','marker("'+n+'")');
        button.innerHTML = n;
        button.style.color = 'green';
        div.appendChild(button);
    }
    nav.appendChild(div);
    //文字サイズ状態反映
    for( var n = 1; n <= document.getElementsByClassName('target_jp').length; n++ ){
        const ch = document.getElementById('ch'+n);
        const jp = document.getElementById('jp'+n);
        const setu = document.getElementById('setu'+n);
        ch.style.fontSize = strsize+'em';
        jp.style.fontSize = strsize+'em';
        setu.style.fontSize = strsize+'em';
    }
}

//表示させるテーブルの作成
function query( syokan, syou ) {
    let table = '';
    let td = '';
    let setu = '';
    pattern = syokan+syou+':';
    for( var n=1,j=1;n<31104;n++){
        if(result[n][3].includes(pattern)) {
            td += '<div id="setu'+j+'"><b><u id="'+j+'">' + j + '</u></b></div>';
            td += '<div class="target_jp" id="jp'+j+'">'+result[n][5]+'</div>';
            td += '<div class="target_ch" id="ch'+j+'">'+result[n][2]+'</div><br>';
            setu = j;
            j++;
        }
    }
    plus = Number(syou+1);
    minus = Number(syou-1);
    if(Number(syou)=='1'){
        table += '<div class="header"><div id="syou_minus"></div><div id="syou_plus"><button id="syou_change" onclick="spc('+plus+')">＞</button></div></div>';
        table += td+'<div class="header"><div id="syou_minus"></div><div id="syou_plus"><button id="syou_change" onclick="spc('+plus+')">＞</button></div></div>';
    }
    else if(Number(syou)==Number(max)){
        table += '<div class="header"><div id="syou_minus"><button id="syou_change" onclick="spc('+minus+')">＜</button></div><div id="syou_plus"></div></div>'+td;
        table += '<div class="header"><div id="syou_minus"><button id="syou_change" onclick="spc('+minus+')">＜</button></div><div id="syou_plus"></div></div>';
    }
    else{
        table += '<div class="header"><div id="syou_minus"><button id="syou_change" onclick="spc('+minus+')">＜</button></div>';
        table += '<div id="syou_plus"><button id="syou_change" onclick="spc('+plus+')">＞</button></div></div>';
        table += td+'<div class="header"><div id="syou_minus"><button id="syou_change" onclick="spc('+minus+')">＜</button></div>';
        table += '<div id="syou_plus"><button id="syou_change" onclick="spc('+plus+')">＞</button></div></div>';
    }
    return [setu,table];
}

//文字サイズ変更関数
let strsize = 1;
function fontSize_change(state){
    strsize = (state=='plus') ? strsize + 0.1 : strsize - 0.1;
    for( var n = 1; n <= document.getElementsByClassName('target_jp').length; n++ ){
        const ch = document.getElementById('ch'+n);
        const jp = document.getElementById('jp'+n);
        const setu = document.getElementById('setu'+n);
        ch.style.fontSize = strsize+'em';
        jp.style.fontSize = strsize+'em';
        setu.style.fontSize = strsize+'em';
    }
}
//表示させる節にマーク
let history_num = '';
function marker(num){
    if(history_num != ''){
        document.getElementById('ch'+history_num).style.color = "black";
        document.getElementById('jp'+history_num).style.color = "black";
    }
    document.getElementById('ch'+num).style.color = "red";
    document.getElementById('jp'+num).style.color = "red";
    menu();
    history_num = num;
    location.href = "#"+num;
}
function spc(num){
    if(document.getElementById('group_setu')){
        //menu();
        del();
        wrap(num);
    } else if(document.getElementById('group')) {
        //menu();
        wrap(num);
    } else {}
    window.scrollTo({
        top : 0,
        behavior: "smooth"
    });
}
function del() {
    document.getElementById('group').style.display = "";
    document.getElementById('group_setu').remove();
    if(document.getElementById('syou_show')) document.getElementById('syou_show').remove();
}

var lists = [["0", "50"], ["1", "40"], ["2", "27"], ["3", "36"], ["4", "34"], ["5", "24"], ["6", "21"], ["7", "4"], ["8", "31"], ["9", "24"], ["10", "22"], ["11", "25"], ["12", "29"], ["13", "36"], ["14", "10"], ["15", "13"], ["16", "10"], ["17", "42"], ["18", "150"], ["19", "31"], ["20", "12"], ["21", "8"], ["22", "66"], ["23", "52"], ["24", "5"], ["25", "48"], ["26", "12"], ["27", "14"], ["28", "3"], ["29", "9"], ["30", "1"], ["31", "4"], ["32", "7"], ["33", "3"], ["34", "3"], ["35", "3"], ["36", "2"], ["37", "14"], ["38", "4"], ["39", "28"], ["40", "16"], ["41", "24"], ["42", "21"], ["43", "28"], ["44", "16"], ["45", "16"], ["46", "13"], ["47", "6"], ["48", "6"], ["49", "4"], ["50", "4"], ["51", "5"], ["52", "3"], ["53", "6"], ["54", "4"], ["55", "3"], ["56", "1"], ["57", "13"], ["58", "5"], ["59", "5"], ["60", "3"], ["61", "5"], ["62", "1"], ["63", "1"], ["64", "1"], ["65", "22"]];
var jp_Abbre = ["創", "出エジ", "レビ", "民", "申", "ヨシュ", "士", "ルツ", "サム上", "サム下", "列王上", "列王下", "歴代上", "歴代下", "エズ", "ネヘ", "エス", "ヨブ", "詩", "箴", "伝", "雅", "イザ", "エレ", "哀", "エゼ", "ダニ", "ホセ", "ヨエ", "アモ", "オバ", "ヨナ", "ミカ", "ナホ", "ハバ", "ゼパ", "ハガ", "ゼカ", "マラ", "マタ", "マル", "ルカ", "ヨハ", "使徒", "ロマ", "Ⅰコリ", "Ⅱコリ", "ガラ", "エペ", "ピリ", "コロ", "Ⅰテサ", "Ⅱテサ", "Ⅰテモ", "Ⅱテモ", "テト", "ピレ", "ヘブ", "ヤコ", "Ⅰペテ", "Ⅱペテ", "Ⅰヨハ", "Ⅱヨハ", "Ⅲヨハ", "ユダ", "黙"];
var list = ["01 創世記", "02 出エジプト記", "03 レビ記", "04 民数記", "05 申命記", "06 ヨシュア記", "07 士師記", "08 ルツ記", "09 サムエル記上", "10 サムエル記下", "11 列王記上", "12 列王記下", "13 歴代志上", "14 歴代志下", "15 エズラ記", "16 ネヘミヤ記", "17 エステル記", "18 ヨブ記", "19 詩篇", "20 箴言", "21 伝道の書", "22 雅歌", "23 イザヤ書", "24 エレミヤ書", "25 哀歌", "26 エゼキエル書", "27 ダニエル書", "28 ホセア書", "29 ヨエル書", "30 アモス書", "31 オバデア書", "32 ヨナ書", "33 ミカ書", "34 ナホム書", "35 ハバクク書", "36 ゼパニヤ書", "37 ハガイ書", "38 ゼカリヤ書", "39 マラキ書", "40 マタイによる福音書", "41 マルコによる福音書", "42 ルカによる福音書", "43 ヨハネによる福音書", "44 使徒行伝", "45 ローマ人への手紙", "46 コリント人への第一の手紙", "47 コリント人への第二の手紙", "48 ガラテヤ人への手紙", "49 エペソ人への手紙", "50 ピリピ人への手紙", "51 コロサイ人への手紙", "52 テサロニケ人への第一の手紙", "53 テサロニケ人への第二の手紙", "54 テモテへの第一の手紙", "55 テモテへの第二の手紙", "56 テトスへの手紙", "57 ピレモンへの手紙", "58 ヘブル人への手紙", "59 ヤコブの手紙", "60 ペテロの第一の手紙", "61 ペテロの第二の手紙", "62 ヨハネの第一の手紙", "63 ヨハネの第二の手紙", "64 ヨハネの第三の手紙", "65 ユダの手紙", "66 ヨハネの黙示録"];

//キーボードのショートカット
document.addEventListener('keydown', event => {
    if(event.key=='Escape') menu();
    if(event.key=='+'||event.key==';') fontSize_change('plus');
    if(event.key=='-'||event.key=='=') fontSize_change('minus');
});

function form_hidden(){
    const houkoku = document.getElementById('houkoku');
    houkoku.style.display = (houkoku.style.display=='') ? "none" : '';
}
function ruby_toggle() {
    const rt = document.getElementsByTagName('rt');
    //getElementByTagNameで取得したものは”HTMLCollectionオブジェクト”であ配列ではない。
    //そのため「Array.prototype.forEach.call()」を利用して配列のようにして扱う
    Array.prototype.forEach.call(rt, element => {
        element.classList.toggle('hide');
    });
}