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
        this.rootDir = new Node("root", 0, null);
        this.currentDir = this.rootDir;
    }
    getPathToCurrentDir(){
        return this.getPathToCurrentDirHelper(this.currentDir, [this.currentDir.name]);
    }
    getPathToCurrentDirHelper(target, result){
        if(target.parentNode == null) return result;

        let queue = [];
        queue.push(this.rootDir);

        while(queue.length > 0){
            let node = queue.shift();
            if(node == target.parentNode){
                result.unshift(node.name);
                return this.getPathToCurrentDirHelper(node, result);
            }

            let iterator = node.childSinglyList.head;
            while(iterator != null){
                queue.push(iterator);
                iterator = iterator.next;
            }
        }
        return result;
    }

    // 指定されたパスが正しいか確認(相対パスなら無条件でtrue)
    existPath(paths){
        if(paths.length < 2 && paths[0] != "root") return true;

        let iterator = this.rootDir;
        if(iterator.name != paths[0]) return false;

        let i = 1;
        while(i < paths.length - 1){
            if(!iterator.existNode(paths[i], [0])) return false;
            iterator = iterator.getNode(paths[i], [0]);
            i++;
        }
        return true;
    }

    // 指定されたパスの親ノードを取得
    getNodeFromPath(paths){
        if(paths.length < 2 && paths[0] != "root") return this.currentDir;

        let iterator = this.rootDir;
        if(iterator.name != paths[0]) return null;

        let i = 1;
        while(i < paths.length - 1){
            if(!iterator.getNode(paths[i], [0])) return null;
            iterator = iterator.getNode(paths[i], [0]);
            i++;
        }
        return iterator;
    }
}

// フォルダかファイルのインスタンスを作成
class Node{
    static type = {0: "dir", 1: "file"};
    // name フォルダorファイルの名前
    // type フォルダかファイル
    // dateModified 更新日
    // next　次のノード(同じ階層)
    // path 絶対ぱす
    // childSinglyList 子階層(フォルダのみ)
    // content　中身(ファイルのみ)
    constructor(name, type, parentNode, content){
        this.name = name;
        this.type = type;
        this.dateModified = new Date();
        this.next = null;
        this.parentNode = parentNode;
        this.childSinglyList = new SinglyList();
        this.content = content;
    }
    getType(){
        return Node.type[this.type];
    }
    append(node){
        this.childSinglyList.append(node);
    }
    removeAt(name){
        this.childSinglyList.removeAt(name);
    }
    printList(){
        return this.childSinglyList.printList();
    }
    existNode(name, types){
        return this.childSinglyList.existNode(name, types);
    }
    getNode(name, types){
        return this.childSinglyList.getNode(name, types);
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
            return;
        }
        let iterator = this.head;
        while(iterator.next != null){
            iterator = iterator.next;
        }
        iterator.next = node;
    }
    removeAt(name){
        if(this.head == null) return;
        let prevIterator = null;
        let currIterator = this.head;

        while(currIterator != null){
            if(currIterator.name == name){
                if(prevIterator == null) this.head = currIterator.next;
                else prevIterator.next = currIterator.next;
            }
            prevIterator = currIterator;
            currIterator = currIterator.next;
        } 
    }
    printList(){
        let result = "";

        let iterator = this.head;
        while(iterator != null){
            result += `${iterator.name} `;
            iterator = iterator.next;
        }
        return result;
    }
    existNode(name, types){
        if(this.head == null) return false;
        let iterator = this.head;
        while(iterator != null){
            if(iterator.name == name && types.indexOf(iterator.type) != -1) return true;
            iterator = iterator.next;
        }
        return false;
    }
    getNode(name, types){
        let iterator = this.head;
        while(iterator != null){
            if(iterator.name == name && types.indexOf(iterator.type) != -1) return iterator;
            iterator = iterator.next;
        }
        return null;
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

let fileTree = new FileTree();

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
        let paths = FileSystem.getPathArr(parsedCLIArray[1]);

        FileSystem.appendMirrorParagraph(CLIOutputDiv);

        pushCommandInStack(CLITextInput, afterHistory, beforeHistory);
        
        CLITextInput.value = '';

        let validateResponse = FileSystem.parsedArrayValidator(parsedCLIArray);
        if(!validateResponse["isValid"]){
            FileSystem.appendErrorParagraph(CLIOutputDiv, validateResponse["errorMessage"]);
            CLIOutputDiv.scrollTop = CLIOutputDiv.scrollHeight;
            return;
        }
        if(["pwd"].indexOf(parsedCLIArray[0]) != -1) validateResponse = FileSystem.noArgValidator(parsedCLIArray);     
        else validateResponse = FileSystem.singleArgValidator(parsedCLIArray, paths);
        if(!validateResponse["isValid"]){
            FileSystem.appendErrorParagraph(CLIOutputDiv, validateResponse["errorMessage"]);
            CLIOutputDiv.scrollTop = CLIOutputDiv.scrollHeight;
            return;
        }
        validateResponse = FileSystem.doubleArgValidator(parsedCLIArray);
        if(!validateResponse["isValid"]){
            FileSystem.appendErrorParagraph(CLIOutputDiv, validateResponse["errorMessage"]);
            CLIOutputDiv.scrollTop = CLIOutputDiv.scrollHeight;
            return;
        }

        FileSystem.appendResultParagraph(CLIOutputDiv, true, FileSystem.executeCommand(parsedCLIArray, paths));

    }else if(event.keyCode == 38){
        moveCommandToOtherStack(CLITextInput, beforeHistory, afterHistory);
    }else if(event.keyCode == 40){
        moveCommandToOtherStack(CLITextInput, afterHistory, beforeHistory);
    }else{}
}

class FileSystem{
    // 対応しているコマンド
    static commands = ["touch", "mkdir", "cat", "pwd", "ls", "setContent", "rm", "cd", "mv", "cp"];
    // lsコマンドの対応しているオプション
    static lsOptions = ["-r", "-a"];

    // 入力された文字列をコマンド名、引数にして返す
    static commandLineParser(CLIInputString){
        return CLIInputString.split(" ");
    }

    // 引数として渡されたパスを階層ごとに分ける
    static getPathArr(argument){
        let paths = argument != null ? argument.split("/") : [];
        if(paths[0] != null && paths[0] == "") paths.shift();
        return paths;
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
        if(parsedArray.length > 3) return {"isValid": false, "errorMessage": "too much arguments"};
        if(FileSystem.commands.indexOf(parsedArray[0]) == -1) return {"isValid": false, "errorMessage": `${parsedArray[0]} does not exist`};
        return {"isValid": true, "errorMessage": ""};
    }

    // 引数を取らないls,pwdコマンドのバリデーション
    static noArgValidator(parsedCLIArray){
        if(parsedCLIArray.length > 1) return {"isValid": false, "errorMessage": `${parsedCLIArray[0]} needs no argument`};
        return {"isValid": true, "errorMessage": ""};
    }

    // 引数を一つ以上取るコマンドのバリデーション
    static singleArgValidator(parsedCLIArray, paths){
        if(["ls"].indexOf(parsedCLIArray[0]) == -1 && parsedCLIArray[1] == null) return {"isValid": false, "errorMessage": `${parsedCLIArray[0]} require single argument`};
        if(!fileTree.existPath(paths)) return {"isValid": false, "errorMessage": `${parsedCLIArray[1]} doesn't exist`};

        let parentNode = fileTree.getNodeFromPath(paths);

        if(["mkdir"].indexOf(parsedCLIArray[0]) != -1){
            if(parentNode.existNode(paths[paths.length - 1], [0])) return {"isValid": false, "errorMessage": `${parsedCLIArray[1]} already exists`};
        } else if(["touch"].indexOf(parsedCLIArray[0]) != -1){
            if(parentNode.existNode(paths[paths.length - 1], [1])) return {"isValid": false, "errorMessage": `${parsedCLIArray[1]} already exists`};
        } else if(["cd"].indexOf(parsedCLIArray[0]) != -1 && parsedCLIArray[1] != ".." && paths[0] != "root"){
            if(!parentNode.existNode(paths[paths.length - 1], [0])) return {"isValid": false, "errorMessage": `${parsedCLIArray[1]} doesn't exist`};
        } else if(["cat", "setContent"].indexOf(parsedCLIArray[0]) != -1){
            if(!parentNode.existNode(paths[paths.length - 1], [1])) return {"isValid": false, "errorMessage": `${parsedCLIArray[1]} doesn't exist`};
        } else if(["mv", "cp", "rm"].indexOf(parsedCLIArray[0]) != -1){
            if(!parentNode.existNode(paths[paths.length - 1], [0,1])) return {"isValid": false, "errorMessage": `${parsedCLIArray[1]} doesn't exist`};
        } else if(["ls"].indexOf(parsedCLIArray[0]) != -1 && parsedCLIArray[1] != null && parsedCLIArray[2] != null){
            if(!parentNode.existNode(paths[paths.length - 1], [0,1])) return {"isValid": false, "errorMessage": `${parsedCLIArray[1]} doesn't exist`};
        } else {}
        return {"isValid": true, "errorMessage": ""};
    }

    // 引数を二つ取るコマンドのバリデーション
    static doubleArgValidator(parsedCLIArray){
        if(["setContent", "mv", "cp"].indexOf(parsedCLIArray[0]) != -1 && parsedCLIArray[2] == null) return {"isValid": false, "errorMessage": `${parsedCLIArray[0]} require two argument`};
        if(["touch", "mkdir", "cat", "pwd", "rm", "cd"].indexOf(parsedCLIArray[0]) != -1 && parsedCLIArray[2] != null) return {"isValid": false, "errorMessage": `${parsedCLIArray[0]} doesn't require two argument`};
        if(["ls"].indexOf(parsedCLIArray[0]) != -1 && parsedCLIArray[2] != null) {
            if(FileSystem.lsOptions.indexOf(parsedCLIArray[2]) == -1) return {"isValid": false, "errorMessage": `${parsedCLIArray[2]} isn't supported`};
        }

        return {"isValid": true, "errorMessage": ""};
    }

    // 入力された文字列をもとに処理を実行
    static executeCommand(parsedArray, paths){
        let command = parsedArray[0];
        let parentNode = fileTree.getNodeFromPath(paths);

        switch(command){
            case "pwd":
                return fileTree.getPathToCurrentDir().join("/");
                break;
            case "touch":
                parentNode.append(new Node(paths[paths.length-1], 1, parentNode));
                break;
            case "mkdir":
                parentNode.append(new Node(paths[paths.length-1], 0, parentNode));
                break;
            case "ls":
                if(parsedArray[1] == null){
                    return parentNode.printList();
                }else{
                    let node = parentNode.getNode(paths[paths.length-1], [0,1]);
                    if(node.getType = "dir") return node.printList();
                    else return node.name;
                }
                break;
            case "cd":
                if(parsedArray[1] == ".." && fileTree.currentDir.parentNode != null){
                    fileTree.currentDir = fileTree.currentDir.parentNode;
                }else{
                    let currentDir = parentNode.getNode(paths[paths.length-1], [0]);
                    if(currentDir != null) fileTree.currentDir = currentDir;
                    else fileTree.currentDir = parentNode;
                }
                break;
            case "cat":
                return parentNode.getNode(paths[paths.length-1], [1]).content;
                break;
            case "rm":
                parentNode.removeAt(paths[paths.length-1]);
                break;
            case "setContent":
                parentNode.getNode(paths[paths.length-1], [1]).content = parsedArray[2];
                break;
            case "mv": {
                let node = parentNode.getNode(paths[paths.length-1], [0,1]);
                let distinationPath = FileSystem.getPathArr(parsedArray[2]);

                parentNode.removeAt(node.name);
                let distinationParentNode = fileTree.getNodeFromPath(distinationPath);
                if(distinationParentNode == null){
                    parentNode.append(node);
                    return `${parsedArray[2]} contains ${parsedArray[1]}`;
                }
                if(node.name != distinationPath[distinationPath.length - 1]) node.name = distinationPath[distinationPath.length - 1];
                distinationParentNode.append(node);

                break;
            }
            case "cp": {
                let node = parentNode.getNode(paths[paths.length-1], [0,1]);
                let distinationPath = FileSystem.getPathArr(parsedArray[2]);
                let distinationParentNode = fileTree.getNodeFromPath(distinationPath);
                let newNode = new Node(distinationPath[distinationPath.length-1], node.type, distinationParentNode, node.content);
                newNode.childSinglyList = FileSystem.cpSinglyList(node.childSinglyList, newNode);
                distinationParentNode.append(newNode);
                break;
            }
            default:
                console.log(`${command} doesn't unsupported`);
        }
        return `${parsedArray[0]} is done`;
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

    // 評価結果を表示
    static appendResultParagraph(parentDiv, isValid, message){
        let promptName = "";
        let promptColor = "";
        if (isValid){
            promptName = "FileSystem";
            promptColor = "turquoise";
        }
        else{
            promptName = "FileSystem";
            promptColor = "red";
        }
        parentDiv.innerHTML+=
                `<p class="m-0">
                    <span style='color: ${promptColor}'>${promptName}</span>: ${message}
                </p>`;
        return;
    }

    static cpSinglyList(originalSinglyList, parentNode){
        let singlyList = new SinglyList();
        return FileSystem.cpSinglyListHelper(originalSinglyList, singlyList, parentNode);
    }

    static cpSinglyListHelper(originalSinglyList, singlyList, parentNode){
        let iterator = originalSinglyList.head;
        while(iterator != null){
            let newNode = new Node(iterator.name, iterator.type, parentNode, iterator.content);
            newNode.childSinglyList = FileSystem.cpSinglyListHelper(iterator.childSinglyList, new SinglyList(), newNode);
            singlyList.append(newNode);
            iterator = iterator.next;
        }
        return singlyList;
    }
}