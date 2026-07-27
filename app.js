const menus = {


"🍙 おにぎり":{
"鮭おにぎり":190,
"梅おにぎり":170,
"ツナマヨ":240,
"昆布":180,
"明太子":190,
"焼きおにぎり":210
},


"🍜 ラーメン":{
"醤油ラーメン":500,
"味噌ラーメン":550,
"豚骨ラーメン":650,
"塩ラーメン":480
},


"🍱 定食":{
"唐揚げ定食":850,
"焼魚定食":650,
"生姜焼き定食":780,
"とんかつ定食":950,
"ハンバーグ定食":850,
"麻婆豆腐定食":750
},


"🍛 ご飯もの":{
"白ご飯":250,
"チャーハン":700,
"オムライス":850,
"牛丼":750,
"親子丼":650,
"カツ丼":900
},


"🍝 麺類":{
"うどん":320,
"そば":300,
"ナポリタン":650,
"カルボナーラ":800,
"焼きそば":600,
"冷やし中華":450
},


"🍣 寿司・海鮮":{
"寿司5貫":300,
"寿司10貫":600,
"海鮮丼":700,
"マグロ丼":650,
"サーモン丼":700
},


"🍔 ファストフード":{
"ハンバーガー":450,
"チーズバーガー":560,
"ダブルチーズバーガー":700,
"てりやきバーガー":520,
"フィッシュバーガー":420,
"チキンバーガー":480,
"ベーコンバーガー":600,
"エビバーガー":430,
"アボカドバーガー":550,
"ビッグバーガー":650,
"ポテト":320,
"ホットドッグ":350,
"ナゲット":250
},


"🥗 おかず":{
"サラダ":80,
"ポテトサラダ":180,
"味噌汁":50,
"豚汁":150,
"餃子6個":300,
"唐揚げ5個":400
},


"🍞 パン":{
"食パン":160,
"クロワッサン":220,
"あんパン":280,
"メロンパン":350,
"サンドイッチ":350
},


"🍰 お菓子飲料":{
"ケーキ":350,
"クッキー":250,
"アイス":220,
"チョコ":280,
"コーヒー":10,
"ジュース":120
}

};



let target=0;

let total=0;

let foods=[];


const menuButtons=
document.getElementById("menuButtons");



// 大分類表示

function showMainMenu(){

menuButtons.innerHTML="";
    
let colors={

"🍙 おにぎり":"#ffb74d",
"🍜 ラーメン":"#ef5350",
"🍱 定食":"#66bb6a",
"🍛 ご飯もの":"#ffca28",
"🍝 麺類":"#42a5f5",
"🍣 寿司・海鮮":"#26c6da",
"🍔 ファストフード":"#ab47bc",
"🥗 おかず":"#8bc34a",
"🍞 パン":"#a1887f",
"🍰 お菓子飲料":"#ec407a"

};

for(let category in menus){

let btn=document.createElement("button");

btn.textContent=category;

//カテゴリー色を設定
btn.style.background=colors[category];



btn.onclick=function(){

showSubMenu(category);

};


menuButtons.appendChild(btn);

}

}


showMainMenu();



// 詳細表示

function showSubMenu(category){

menuButtons.innerHTML="";


let back=document.createElement("button");

back.textContent="戻る";


back.onclick=function(){

showMainMenu();

};


menuButtons.appendChild(back);


for(let food in menus[category]){

    let btn=document.createElement("button");

    btn.innerHTML = `
        ${food}<br>
        <small>${menus[category][food]} kcal</small>
    `;

    btn.onclick=function(){

        eat(food,menus[category][food]);

    };

    menuButtons.appendChild(btn);

}



}




// 目標カロリー計算

function setTarget(){


let gender=document.getElementById("gender").value;

let age=Number(document.getElementById("age").value);

let height=Number(document.getElementById("height").value);

let weight=Number(document.getElementById("weight").value);



if(age<=0 || height<=0 || weight<=0){

alert("入力してください");

return;

}



if(gender==="male"){

target=
(10*weight)
+(6.25*height)
-(5*age)
+5;


}else{

target=
(10*weight)
+(6.25*height)
-(5*age)
-161;

}



target=Math.round(target*1.5);


total=0;

foods=[];


updateGauge();

display();


alert("目標 "+target+" kcal");

}




// 食べる

function eat(name,kcal){


if(target===0){

alert("先に目標設定してください");

return;

}


foods.push({

name:name,

kcal:kcal

});


total+=kcal;


updateGauge();

display();

}




// ゲージ更新


function updateGauge(){

let remain = target - total;

let percent = (remain / target) * 100;


if(percent < 0){

percent = 0;

}


document.getElementById("bar").style.width =
percent + "%";


if(remain < 0){

document.getElementById("remain").textContent =
"食べすぎ " + Math.abs(Math.floor(remain)) + " kcal";

document.getElementById("bar").style.background =
"#e53935";


}else{

document.getElementById("remain").textContent =
"残り " + Math.floor(remain) + " kcal";

document.getElementById("bar").style.background =
"#4caf50";

}

}



// 履歴


function display(){

    let list=document.getElementById("list");

    list.innerHTML="";

    foods.forEach((food,index)=>{

        list.innerHTML+=`

        <div class="food">

        ${food.name}<br>

        ${food.kcal} kcal<br>

        <button class="delete" onclick="deleteFood(${index})">

        削除

        </button>

        </div>

        `;

    });

}

function deleteFood(index){

    total -= foods[index].kcal;

    foods.splice(index,1);

    updateGauge();

    display();

}



function resetFood(){

foods=[];

total=0;

document.getElementById("bar").style.background="#4caf50";

updateGauge();

display();

}



