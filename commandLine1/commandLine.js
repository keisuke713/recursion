// グローバル静的API設定オプション
const config = {
    CLIOutputDivID: "CLIOutputDiv",
    CLITextInputID: "CLITextInput"
}

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

class FileTree{
    constructor(){
        currentDir = new Node("root", "dir");
    }
}

// フォルダかファイルのインスタンスを作成
class Node{
    constructor(name, type){
        this.name = name;
        this.childSinglyList = new SinglyList();
        this.type = type;
        this.content = null;
        this.next = null;
    }
}

// 同じ階層は単一方向リストでまとめる
class SinglyList{
    constructor(){
        this.head = null;
    }
    append(node){
        if(this.head == null){
            this.head = node;
        }
        let iterator = this.head;
        while(iterator != null){
            iterator = iterator.next;
        }
        iterator.next = node;
    }
    removeAt(nodeName){
        if(this.head == null) return;
        let prevIterator = this.head;
        let currIterator = this.head;

        while(prevIterator != null && currIterator != null){
            if(currIterator.name == nodeName){
                if(prevIterator == this.head) this.head = currIterator.next;
                else prevIterator.next = currIterator.next;
                return;
            }
            prevIterator = currIterator;
            currIterator = currIterator.next;
        } 
    }
}

// コマンドをスタック間で移動させる
let moveCommandToOtherStack = (ele, fromStack, toStack) => {
    if (fromStack.isEmpty()) return;
    let value = fromStack.pop();
    ele.value = value;
    toStack.push(value);
}

let pushCommandInStack = (ele, fromStack, toStack) => {
    while(!fromStack.isEmpty()){
        toStack.push(fromStack.pop());
    }
    toStack.push(ele.value);
}

// 現在の入力欄のコマンド以前の履歴
let beforeHistory = new Stack();
// 現在の入力欄のコマンド以降の履歴
let afterHistory = new Stack();

let CLITextInput = document.getElementById(config.CLITextInputID);
let CLIOutputDiv = document.getElementById(config.CLIOutputDivID);

CLITextInput.addEventListener("keyup", (event)=>submitSearch(event));

function submitSearch(event){
    if (event.key =="Enter"){
        // clearと入力された場合、コマンド履歴とconsole.logを全て削除
        if(CLITextInput.value == "clear"){
            CLIOutputDiv.innerHTML = "";
            pushCommandInStack(CLITextInput, afterHistory, beforeHistory);
            CLITextInput.value = ""
            console.clear();
            console.log("コマンド履歴をクリアしました");
            return;
        }

        let parsedCLIArray = FileSystem.commandLineParser(CLITextInput.value);
        FileSystem.appendMirrorParagraph(CLIOutputDiv);

        pushCommandInStack(CLITextInput, afterHistory, beforeHistory);
        
        CLITextInput.value = '';

        let validateResponse = FileSystem.parsedArrayValidator(parsedCLIArray);
        if(!validateResponse["isValid"]){
            FileSystem.appendErrorParagraph(CLIOutputDiv, validateResponse["errorMessage"]);
            CLIOutputDiv.scrollTop = CLIOutputDiv.scrollHeight;
            return;
        }
    }else if(event.keyCode == 38){
        moveCommandToOtherStack(CLITextInput, beforeHistory, afterHistory);
    }else if(event.keyCode == 40){
        moveCommandToOtherStack(CLITextInput, afterHistory, beforeHistory);
    }else{}
}

class FileSystem{
    // 対応しているコマンド
    static commands = ["touch", "mkdir", "print", "pwd", "ls", "setContent", "rm", "cd"];

    // 入力された文字列をコマンド名、引数にして返す
    static commandLineParser(CLIInputString){
        return CLIInputString.split(" ");
    }

    // 入力されたコマンド名、引数に分けた配列を引数とする
    // 戻り値はisValid, errorMessageのハッシュ
    static parsedArrayValidator(parsedArray){
        let validateResponse = FileSystem.universalValidator(parsedArray);
        if(!validateResponse["isValid"]) return validateResponse;
        return validateResponse;
    }

    // 全コマンド共通バリデーション
    // コマンド、引数以外入力していないか、サポートしているコマンド以外を入力していないかを確認
    static universalValidator(parsedArray){
        if(parsedArray.length > 2) return {isValid: false, errorMessage: "too much arguments"};
        if(FileSystem.commands.indexOf(parsedArray[0]) == -1) return {isValid: false, errorMessage: `does not exist ${parsedArray[0]}`};
        return {isValid: true, errorMessage: ""};
    }

    // 入力されたコマンドを履歴として表示
    static appendMirrorParagraph(parentDiv){

        parentDiv.innerHTML+=
            `<p class="m-0">
            <span style='color:green'>student</span>
            <span style='color:magenta'>@</span>
            <span style='color:blue'>recursionist</span>
            : ${CLITextInput.value}
        </p>`;

        return;
    }

    // エラ-結果を表示
    static appendErrorParagraph(parentDiv, errorMessage){
        parentDiv.innerHTML +=
            `<p class="m-0">
                <span style='color:red'>CLIError</span>: ${errorMessage}
            </p>`;
        return
    }
}