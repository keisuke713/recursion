class Stack{
    constructor() {
        this.arr = [];
    }
    // 末尾に要素を挿入
    push(ele){
        this.arr.push(ele);
    }
    // 末尾の要素を取得及び配列から削除
    pop(){
        if(this.isEmpty()) return "";
        return this.arr.pop();
    }
    // 末尾の要素を取得、配列からは削除されない
    peek(){
        return this.arr[this.arr.length-1];
    }
    // スタックが空かどうかを判断
    isEmpty(){
        return this.arr.length <= 0 ? true : false;
    }
}

// 現在の入力欄のコマンド以前の履歴
let beforeHistory = new Stack();
// 現在の入力欄のコマンド以降の履歴
let afterHistory = new Stack();


// 入力欄でのイベント定義(Enter, 上下の矢印)
document.getElementById("command").addEventListener("keydown", event => {
    let ele = document.getElementById("command");
    if(event.keyCode == 13){
        let commandHistory = document.getElementById("command-history");
        let student = createSpanTag("student", ["font-lime"]);
        let atmark = createSpanTag(" @ ", ["font-pink"]);
        let recursionist = createSpanTag("recursionist", ["font-blue"]);
        let command = createSpanTag(`: ${ele.value}</br>`, []);
        while(!afterHistory.isEmpty()){
            beforeHistory.push(afterHistory.pop());
        }
        beforeHistory.push(ele.value);
        console.log(beforeHistory.arr);
        ele.value = "";
        commandHistory.append(student, atmark, recursionist, command);
    }else if(event.keyCode == 38){
        if(beforeHistory.isEmpty()) return;
        if(ele.value.length > 0) afterHistory.push(ele.value);
        let value = beforeHistory.pop();
        ele.value = value;
    }else if(event.keyCode == 40){
        if(afterHistory.isEmpty()) return;
        if(ele.value.length > 0) beforeHistory.push(ele.value);
        ele.value = afterHistory.pop();
    }else{
    }
});

// spanタグの要素を作成
let createSpanTag = (innerHTML, classNameArr) => {
    let span = document.createElement("span");
    span.innerHTML = innerHTML;
    for(i in classNameArr){
        span.classList.add(classNameArr[i]);
    }
    return span;
}

