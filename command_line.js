document.getElementById("command").addEventListener("keydown", event => {
    let ele = document.getElementById("command");
    if(event.keyCode == 13){
        let commandHistory = document.getElementById("command-history");
        let student = document.createElement("span");
        let atmark = document.createElement("span");
        let recursionist = document.createElement("span");
        let command = document.createElement("span");
        student.innerHTML = "student ";
        student.classList.add("font-lime");
        atmark.innerHTML = "@";
        atmark.classList.add("font-pink");
        recursionist.innerHTML = " recursionist";
        recursionist.classList.add("font-blue");
        command.innerHTML = `:${ele.value}</br>`
        ele.value = "";
        commandHistory.append(student);
        commandHistory.append(atmark);
        commandHistory.append(recursionist);
        commandHistory.append(command);
    }else if(event.keyCode == 38){
        console.log("arrowap")
    }else if(event.keyCode == 40){
        console.log("arrowdown")
    }else{
    }
})