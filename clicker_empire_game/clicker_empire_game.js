class Controller{
    static start(){
        ViewRender.renderStartPage();
    }
    static signup(){
        ViewRender.renderSignUpPage();
    }
}
class ViewRender{
    static target = document.getElementById("target");

    static renderStartPage(){
        this.target.append(this.createStartPage());
    }
    static createStartPage(){
        let container = this.createContainer("start");
        container.innerHTML = 
        `
        <div class="row align-middle">
            <div class="col-sm-12 col-md-12 col-lg-12 text-center">
                <h1>Clicker Empire Game</h1>
            </div>
            <div class="col-sm-6 col-md-12 col-lg-12 text-center">
                <button type="button" class="btn btn-lg btn-primary">最初から</button>
            </div>
            <div class="col-sm-6 col-md-12 col-lg-12 text-center">
                <button type="button" class="btn btn-lg btn-primary">続きから</button>
            </div>
        </div>
        `
        return container;
    }
    static renderSignUpPage(){
        this.target.append(this.createSignUpPage());
    }
    static createSignUpPage(){
        let container = this.createContainer("signup");
        container.innerHTML = 
        `
        <div class="row align-middle">
            <div class="col-sm-12 col-md-12 col-lg-12">
                <div class="col-sm-12 col-md-12 col-lg-12 text-center">
                    <h2>ログイン</h2>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-12 text-center">
                    <form id="signup">
                        <div class="form-group">
                            <input type="text" name="userName" class="form-control" placeholder="ユーザーネーム" value="" required>
                        </div>
                        <div class="form-group">
                            <input type="number" name="age" class="form-control" name="userAge" placeholder="年齢" value="" required>
                        </div>
                        <button type="submit" class="btn btn-primary col-12">新規登録</button>
                    </form>
                </div>
            </div>
        </div>
        `
        return container;
    }
    static createContainer(id){
        let container = document.createElement("div");
        container.classList.add("container");
        container.setAttribute("id", id);
        return container;
    }
}

// Controller.signup();