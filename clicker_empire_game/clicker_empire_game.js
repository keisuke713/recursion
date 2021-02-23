class Controller{
    static start(){
        ViewRender.renderStart();
    }
}
class ViewRender{
    static target = document.getElementById("target");
    static start  = document.getElementById("start-page");
    static main   = document.getElementById("main-page");
    // static items  = document.getElementById("items");

    static renderStart(){
        this.target.append(this.createStart());
    }
    static createStart(){
        let container = document.createElement("div");
        container.classList.add("d-flex");
        container.innerHTML = 
        `
        <div class="container" id="start-page">
            <div class="row align-middle">
                <div class="col-md-12 col-lg-12 text-center">
                    <h1>Clicker Empire Game</h1>
                </div>
                <div class="col-sm-6 col-md-12 col-lg-12 text-center">
                    <button type="button" class="btn btn-lg btn-primary">最初から</button>
                </div>
                <div class="col-sm-6 col-md-12 col-lg-12 text-center">
                    <button type="button" class="btn btn-lg btn-primary">続きから</button>
                </div>
            </div>
        </div>
        `
        return container;
    }
}

Controller.start();