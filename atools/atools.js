// グローバル静的API設定オプション
const config = {
    url: "https://openlibrary.org/search.json?",
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

async function submitSearch(event){
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

        let parsedCLIArray = ATools.commandLineParser(CLITextInput.value);
        ATools.appendMirrorParagraph(CLIOutputDiv);

        pushCommandInStack(CLITextInput, afterHistory, beforeHistory);
        
        CLITextInput.value = '';

        // バリデーションをかけて結果を変数に格納
        let validateResponse = ATools.parsedArrayValidator(parsedCLIArray);
        if(!validateResponse["isValid"]){
            ATools.appendErrorParagraph(CLIOutputDiv, validateResponse["errorMessage"]);
            CLIOutputDiv.scrollTop = CLIOutputDiv.scrollHeight;
            return;
        }

        // テキストフィールドからのリクエスト時にAPIエンドポイントのURLに付加されるフォームクエリ文字列
        let queryString = ATools.queryStringFromParsedCLIArray(parsedCLIArray);
        CLIOutputDiv.scrollTop = CLIOutputDiv.scrollHeight;

        // API エンドポイントからのレスポンスを JS オブジェクトとして取得します。
        let queryResponseObject = await ATools.queryResponseObjectFromQueryString(queryString);

        // 結果を段落として、CLIOutputDivに追加します。
        ATools.appendResponseParagraphsFromQueryResponseObject(CLIOutputDiv, parsedCLIArray, queryResponseObject);
        CLIOutputDiv.scrollTop = CLIOutputDiv.scrollHeight;

    }else if(event.keyCode == 38){
        moveCommandToOtherStack(CLITextInput, beforeHistory, afterHistory);
    }else if(event.keyCode == 40){
        moveCommandToOtherStack(CLITextInput, afterHistory, beforeHistory);
    }else{}
}

class ATools{
    static command = ["searchByTitle", "uniqueNameCount", "titlesByUniqueName"];

    // 入力された文字列をパッケージ名、コマンド、引数にして返す
    static commandLineParser(CLIInputString){
        return CLIInputString.split(" ")
    }

    // 入力された文字列のパッケージ名、コマンド、引数にわけた配列を引数
    // 戻り値はisValid,errorMessageのハッシュ
    static parsedArrayValidator(parsedArray){
        let validateResponse = ATools.universalValidator(parsedArray)
        if(!validateResponse["isValid"]) return validateResponse;

        // コマンドがsearchByTitleの時のみ別途検証
        if(parsedArray[1] == "searchByTitle"){
            validateResponse = ATools.searchByTitleValidator(parsedArray[2]);
            if(!validateResponse["isValid"]) return validateResponse;
        }
        return {isValid: true, errorMessage: ""}
    }

    // 前コマンドに共通するバリデーション, 有効かどうかとエラ-メッセージを返す
    // 引数はパッケージ名、コマンド、引数の配列
    // 戻り値はisValid,errorMessageのハッシュ
    static universalValidator(parsedArray){
        if(parsedArray.length != 3) return {isValid: false, errorMessage: "引数3つにして"};
        if(parsedArray[0] != "ATools") return {isValid: false, errorMessage: "AToolsしかないよ"};
        if(ATools.command.indexOf(parsedArray[1]) == -1) return {isValid: false, errorMessage: "指定されたコマンドにして"};

        return {isValid: true, errorMessage: "問題なし"};
    }

    // 入力されたコマンドがsearchByTitleだった時のバリデーション
    // 引数は本のタイトルと最大件数の文字列
    // 戻り値はisValid,errorMessageのハッシュ
    static searchByTitleValidator(parsedArray){
        if(parsedArray.indexOf(",") == -1) return {isValid: true, errorMessage: "問題なし"};

        let argument = parsedArray.split(",");
        if(isNaN(Number(argument[1]))) return {isValid: false, errorMessage: "最大件数は数字にして"};
        if(argument[1] < 0) return {isValid: false, errorMessage: "最大件数は1以上にして"};
        if(!Number.isInteger(Number(argument[1]))) return {isValid: false, errorMessage: "最大件数は整数にして"};

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

    // 入力されたコマンドをもとにurlのパラメータを返す
    static queryStringFromParsedCLIArray(parsedCLIArray){
        if(parsedCLIArray[1] == "searchByTitle"){
            return `title=${parsedCLIArray[2].split(",")[0]}`;
        }else if(parsedCLIArray[1] == "uniqueNameCount"){
            return `author=${parsedCLIArray[2]}`;
        }else if(parsedCLIArray[1] == "titlesByUniqueName"){
            return `author=${parsedCLIArray[2]}`;
        }else{}
    }

    // クエリを実行してjsオブジェクトを取得します。
    static async queryResponseObjectFromQueryString(queryString){
        let queryResponseObject = {};
        let queryURL = config.url+queryString;
        await fetch(queryURL).then(response=>response.json()).then(data=>queryResponseObject = data);
        return queryResponseObject;
    }

    static appendResponseParagraphsFromQueryResponseObject(parentDiv, parsedCLIArray, queryResponseObject){
        // 一致するものがない場合は、その旨のメッセージをレンダリングします。
        if (queryResponseObject.docs.length == 0){
            parentDiv.innerHTML += `<p class="m-0"> <span style='color:turquoise'>openLibrary</span>: 0 matches </p>`;
            return;
        }

        // 一致した件数を表示
        parentDiv.innerHTML+=`<p class="m-0"> <span style='color:turquoise'>openLibrary</span>: at least ${queryResponseObject['docs'].length} matches`;

        // 入力されたコマンドにより、違う文字列を画面に描画
        if(parsedCLIArray[1] == "searchByTitle"){
            parentDiv.innerHTML += ATools.getInnerHTMLFromQueryResponseObject(ATools.getAuthorsBooksArr(queryResponseObject, parsedCLIArray).join(","));
        }else if(parsedCLIArray[1] == "uniqueNameCount"){
            parentDiv.innerHTML += ATools.getInnerHTMLFromQueryResponseObject(Object.keys(ATools.getAuthorsBooksHash(queryResponseObject)).join(""));
        }else if(parsedCLIArray[1] == "titlesByUniqueName"){
            parentDiv.innerHTML += ATools.getInnerHTMLFromQueryResponseObject(ATools.getAuthorsBooksString(ATools.getAuthorsBooksHash(queryResponseObject)));
        }else{}
    }

    // 著者をキー、著書の本一覧をバリューとしたハッシュを返す
    // 引数はapiレスポンスのハッシュ
    static getAuthorsBooksHash(queryResponseObject){
        let cache = {};
        for(let i=0; i<queryResponseObject.docs.length; i++){
            let queryResponseDocument = queryResponseObject.docs[i];
            for(let j=0; j<queryResponseDocument.author_name.length; j++){
                if(cache[queryResponseDocument.author_name[j]] == null) cache[queryResponseDocument.author_name[j]] = [queryResponseDocument.title];
                else cache[queryResponseDocument.author_name[j]].push(queryResponseDocument.title);
            }
        }   
        return cache;   
    }

    // "author"->"book1,book2"のフォーマットの文字列を返す
    // 引数は著者をキー、著書の一覧をバリューとしたハッシュ
    static getAuthorsBooksString(authorsBooksHash){
        let authorsBooksString = "";
        for(let key in authorsBooksHash){
            authorsBooksString += `${key}->${authorsBooksHash[key].join(",")}</br>`
        }
        return authorsBooksString;
    }

    //parentDivのinnerHTMLに追加するコードを生成する
    static getInnerHTMLFromQueryResponseObject(argString){
        return `<p class="m-0">
                <span style='color:turquoise'>openLibrary</span>: authorsBooksList</br>
                ${argString}`;
    }

    //表示する情報の最大件数を返す
    //引数はapiのレスポンスで渡されるハッシュ
    static getMaxDisplayCount(queryResponseObject, parsedCLIArray){
        return parsedCLIArray[2].split(",")[1] == null ? queryResponseObject.docs.length : parsedCLIArray[2].split(",")[1]
    }

    //本の著者とタイトルを表示する文字列の配列を返す
    // 引数はapiのレスポンスで渡されるハッシュ
    static getAuthorsBooksArr(queryResponseObject, parsedCLIArray){
        let authorBookTitleArr = []

        for(let i=0; i<ATools.getMaxDisplayCount(queryResponseObject, parsedCLIArray); i++){
            let queryResponseDocument = queryResponseObject.docs[i];
            authorBookTitleArr.push(`authorName:${queryResponseDocument.author_name}->title:${queryResponseDocument.title}</br>`)
        }

        return authorBookTitleArr;
    }
}