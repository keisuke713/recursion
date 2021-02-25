class Controller{
    static start(){
        ViewRender.renderStartPage();
    }
    static signup(){
        ViewRender.renderSignUpPage();
    }
    // mainpageへ遷移
    // target以下のinnerHtmlを全替え
    static main(){
        ViewRender.renderMainPage()
    }
    // itemへ選択したpageへ遷移
    // idを引数として受け取り対象のitemを取得してその情報をレンダリング
    // mainpageの一部のみ書き換える
    static item(){}
    // itemを購入せずバックする時に使う
    // mainpageの一部を書き換える
    static backMain(){}
    // userのitemリストに購入したitemを加える
    // mainpageの一部のみ書き換える
    static purchase(){}
}
class ViewRender{
    static target = document.getElementById("target");

    static renderMainPage(){
        this.target.append(this.createMainPage());
    }
    static createMainPage(){
        let container = this.createContainer("main");
        container.innerHTML = 
        `
        <div class="row text-white">
                <!-- 左側ハンバーガーとか -->
                <div class="col-sm-5 col-md-5 col-lg-5 bg-dark vh-95 margin-top-15">
                    <div class="margin-top-10 vh-10">
                        <div class="bg-grey" style="height: 100%; vertical-align: middle;">
                            <h3 class="text-center" style="vertical-align: middle;">1,102&nbsp;burgers</h3>
                            <p class="text-center" style="vertical-align: middle;">2.5$ per second</p>
                        </div>
                    </div>
                    <div class="text-center" style="padding-top: 50px;">
                        <img src="https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png" style="max-width: 60%;">
                    </div>
                </div>
                <!-- 右側アイテムとかw -->
                <div class="col-sm-7 col-md-7 col-lg-7 vh-95 margin-top-15">
                    <!-- user-info -->
                    <div class="bg-dark" style="padding-top:10px; margin-bottom: 10px; height: 12vh;">
                        <div class="user-info-row">
                            <div class="bg-grey text-center user-info-cell">Steven</div>
                            <div class="bg-grey text-center user-info-cell">25 yrs old</div>
                        </div>
                        <div class="user-info-row">
                            <div class="bg-grey text-center user-info-cell">1,882 days</div>
                            <div class="bg-grey text-center user-info-cell">$1000</div>
                        </div>
                    </div>
                    <!-- purchaseScreen -->
                    <!-- <div class="bg-dark vh-70" style="padding-top: 10px;">
                        <div class="bg-grey purchase-screen">
                            <div style="width:90%; margin: 10px auto; display: table; table-layout: fixed;">
                                <div style="display: table-cell; vertical-align: top;">
                                    <h3>House</h3>
                                    <p>Max Purchased: 100</p>
                                    <p>Price: $20,000,000</p>
                                    <p>Get 32,000 extra yen per second</p>
                                </div>
                                <div style="display: table-cell;">
                                    <img src="https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png" class="item-img">
                                </div>
                            </div>
                            <div class="ele-center">
                                <p>Hou many would you like to Purchase?</p>
                                <input type="number" name="quantity" class="form-control" placeholder="" value="" required>
                            </div>
                            <div class="text-right ele-center">
                                <button type="button" class="btn btn-lg btn-primary">Go back</button>
                                <button type="button" class="btn btn-lg btn-primary">Purchase</button>
                            </div>
                        </div>
                    </div> -->
                    <!-- 消しちゃダメ -->
                    <!-- itemlist -->
                    <div class="bg-dark vh-70" style="overflow: scroll;" id="item-box">
                        <div class="item bg-grey">
                            <div style="display: table-cell;">
                                <img src="https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png" class="item-img">
                            </div>
                            <div style="display: table-cell;">
                                <h3>ItemName</h3>
                                <p><span>$30,000</span><span>&nbsp;&nbsp;</span><span>+32,000</span></p>
                            </div>
                            <div class="text-center" style="display: table-cell; vertical-align: middle;">
                                <h3>2</h3>
                            </div>
                        </div>
                    </div>
                    <div class="vh-10 text-right" style="margin-top: 10px;">
                        <button type="button" class="btn btn-lg btn-primary fa fa-repeat"></button>
                        <button type="button" class="btn btn-lg btn-primary fa fa-save"></button>
                    </div>
                </div>
            </div>
        `
        return container;
    }

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
                            <input type="number" name="age" class="form-control" placeholder="年齢" value="" required>
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

Controller.main();