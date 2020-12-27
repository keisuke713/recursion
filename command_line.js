document.getElementById("command").addEventListener("keydown", event => {
    let ele = document.getElementById("command");
    if(event.keyCode == 13){
        let commandHistory = document.getElementById("command-history");
        let student = createSpanTag("student", ["font-lime"]);
        let atmark = createSpanTag(" @ ", ["font-pink"]);
        let recursionist = createSpanTag("recursionist", ["font-blue"]);
        let command = createSpanTag(`: ${ele.value}</br>`, []);
        ele.value = "";
        commandHistory.append(student, atmark, recursionist, command);
    }else if(event.keyCode == 38){
        console.log("arrowap")
    }else if(event.keyCode == 40){
        console.log("arrowdown")
    }else{
    }
});

let createSpanTag = (innerHTML, classNameArr) => {
    let span = document.createElement("span");
    span.innerHTML = innerHTML;
    for(i in classNameArr){
        span.classList.add(classNameArr[i]);
    }
    return span;
}