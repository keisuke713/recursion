const config = {
    flipMachineImgUrl: "https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png",
    etcStockImgUrl: "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png",
    etcBondsImgUrl: "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png",
    lemonadeImgUrl: "https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png",
    iceCreamImgUrl: "https://cdn.pixabay.com/photo/2020/01/30/12/37/ice-cream-4805333_960_720.png",
    houseImgUrl: "https://cdn.pixabay.com/photo/2016/03/31/18/42/home-1294564_960_720.png",
    townHouseImgUrl: "https://cdn.pixabay.com/photo/2019/06/15/22/30/modern-house-4276598_960_720.png",
    mansionImgUrl: "https://cdn.pixabay.com/photo/2017/10/30/20/52/condominium-2903520_960_720.png",
    industrialSpaceImgUrl: "https://cdn.pixabay.com/photo/2012/05/07/17/35/factory-48781_960_720.png",
    hotelSkyscraperImgUrl: "https://cdn.pixabay.com/photo/2012/05/07/18/03/skyscrapers-48853_960_720.png",
    bulletSpeedSkyRailswayImgUrl: "https://cdn.pixabay.com/photo/2013/07/13/10/21/train-157027_960_720.png"
}
let currentUser = null;
let displayedItems = null;

class User{
    constructor(name, age, flipMachine){
        this.name = this.#initializedName(name);
        this.age = this.#initializedAge(age);
        this.assets = 50000;
        this.timeKeeper = new TimeKeeper(flipMachine);
        this.hambuerCount = 0;
        this.items = new Items(flipMachine);
    }
    // ハンバーガーを一回クリックするごとに得られる金額
    getAmountPerClick(){}
    // 一秒経つごとに得られる金額
    getAmountPerSecond(){}

    // バリデーション
    #initializedName(name){
        // if(name.length <= 0) alert("名前決めないなら勝手に決めちゃうよ？君の名前は名無しのゴンベだ！")
        return name.length > 0 ? name : "名前もないクズ";
    }
    #initializedAge(age){
        // if(age <= 0) alert("Age is just a number! Be relax!!")
        return age > 0 ? age : 20;
    }
}
class TimeKeeper{
    constructor(){
        this.amountOfDays = 0;
    }
    // 1年経過したかどうか
    passedOneYear(){}
}
// 本当はインターフェイスを使いたかったけどJavaScriptにはなかったから仕方なく継承
class Item{
    static name = "item";
    constructor(imgUrl, maxPurchased, price){
        this.imgUrl = imgUrl;
        this.maxPurchased = maxPurchased;
        this.price = price;
    }
    getName(){
        if(this.constructor.name == undefined) return "";
        return this.constructor.name;
    }
    getAmountPer(){
        throw "You need to implement this method in child class";
    }
}
class FlipMachine extends Item{
    static name = "flipMachine";
    constructor(imgUrl, maxPurchased, price, amount){
        super(imgUrl, maxPurchased, price);
        this.amount = amount;
    }
    getAmountPer(){
        return this.#getAmount();
    }
    #getAmount(){
        return this.amount;
    }
}
class EtcStock extends Item{
    static name = "etcStock";
    constructor(imgUrl, maxPurchased, price, percentage){
        super(imgUrl, maxPurchased, price);
        this.percentage = percentage;
    }
    getAmountPer(){
        return this.#getPrice() * this.#getPercentage();
    }
    #getPrice(){
        return this.price;
    }
    #getPercentage(){
        return this.percentage;
    }
}
class EtcBonds extends Item{
    static name = "etcBonds";
    constructor(imgUrl, maxPurchased, price, percentage){
        super(imgUrl, maxPurchased, price);
        this.percentage = percentage;
    }
    getAmountPer(){
        return this.#getPrice() * this.#getPercentage();
    }
    #getPrice(){
        return this.price;
    }
    #getPercentage(){
        return this.percentage;
    }
}
class LemonadeStand extends Item{
    static name = "lemonadeStand";
    constructor(imgUrl, maxPurchased, price, amount){
        super(imgUrl, maxPurchased, price);
        this.amount = amount;
    }
    getAmountPer(){
        return this.#getAmount();
    }
    #getAmount(){
        return this.amount;
    }
}
class IceCreamTruck extends Item{
    static name = "iceCreamTruck";
    constructor(imgUrl, maxPurchased, price, amount){
        super(imgUrl, maxPurchased, price);
        this.amount = amount;
    }
    getAmountPer(){
        return this.#getAmount();
    }
    #getAmount(){
        return this.amount;
    }
}
class House extends Item{
    static name = "house";
    constructor(imgUrl, maxPurchased, price, amount){
        super(imgUrl, maxPurchased, price);
        this.amount = amount;
    }
    getAmountPer(){
        return this.#getAmount();
    }
    #getAmount(){
        return this.amount;
    }
}
class TownHouse extends Item{
    static name = "townHouse";
    constructor(imgUrl, maxPurchased, price, amount){
        super(imgUrl, maxPurchased, price);
        this.amount = amount;
    }
    getAmountPer(){
        return this.#getAmount();
    }
    #getAmount(){
        return this.amount;
    }
}
class Mansion extends Item{
    static name = "mansion";
    constructor(imgUrl, maxPurchased, price, amount){
        super(imgUrl, maxPurchased, price);
        this.amount = amount;
    }
    getAmountPer(){
        return this.#getAmount();
    }
    #getAmount(){
        return this.amount;
    }
}
class IndustrialSpace extends Item{
    static name = "industrialSpace";
    constructor(imgUrl, maxPurchased, price, amount){
        super(imgUrl, maxPurchased, price);
        this.amount = amount;
    }
    getAmountPer(){
        return this.#getAmount();
    }
    #getAmount(){
        return this.amount;
    }
}
class HotelSkyscraper extends Item{
    static name = "hotelSkyscraper";
    constructor(imgUrl, maxPurchased, price, amount){
        super(imgUrl, maxPurchased, price);
        this.amount = amount;
    }
    getAmountPer(){
        return this.#getAmount();
    }
    #getAmount(){
        return this.amount;
    }
}
class BulletSpeedSkyRailsway extends Item{
    static name = "bulletSpeedSkyRailsway";
    constructor(imgUrl, maxPurchased, price, amount){
        super(imgUrl, maxPurchased, price);
        this.amount = amount;
    }
    getAmountPer(){
        return this.#getAmount();
    }
    #getAmount(){
        return this.amount;
    }
}
class Items{
    list = [];
    eachItemCount = new Map();
    constructor(item){
        this.addItemToList(item);
        this.addItemToCache(item);
    }
    addItemToList(item){
        // if(this.#isItem(item)) this.list.push(item);
        this.#isItem(item);
        this.list.push(item);
    }
    addItemToCache(item){
        // if(!this.#isItem(item)) return;
        this.#isItem(item);
        if(this.eachItemCount.get(item.getName())==undefined) this.eachItemCount.set(item.getName(),1);
        else this.eachItemCount.set(item.getName(), this.eachItemCount.get(item.getName())+1);
    }
    #isItem(item){
        if(item instanceof Item == false) throw `${item} is not Item`;
        // return item instanceof Item;
    }
}

class Controller{
    // トップページ(GET)
    static start(){
        ViewRender.renderStartPage();
    }
    // 新規登録ページ(GET)
    static signup(){
        ViewRender.renderSignUpPage();
    }
    // ユーザー登録(POSt)
    static register(){
        let userName = document.getElementById("input-user-name").value;
        let userAge  = Number(document.getElementById("input-user-age").value);

        currentUser = new User(userName, userAge, new FlipMachine(config.hambugerImgUrl,500,15000,25));
        displayedItems = initializeItemMap();

        this.main();
    }
    // mainpageへ遷移(GET)
    // target以下のinnerHtmlを全替え
    static main(){
        if(!this.#isUserPresent()){
            alert("ログインしてね")
            this.start();
            return;
        }
        ViewRender.renderMainPage()
    }
    // itemへ選択したpageへ遷移(GET)
    // idを引数として受け取り対象のitemを取得してその情報をレンダリング
    // mainpageの一部のみ書き換える
    static item(){
        ViewRender.renderItemPage();
    }
    // itemを購入せずバックする時に使う(GET?)
    // mainpageの一部を書き換える
    static backMain(){
        ViewRender.renderItemsPage();
    }
    // userのitemリストに購入したitemを加える(POST)
    // mainpageの一部のみ書き換える
    static purchase(){
        ViewRender.renderItemsPage();
    }
    static #isUserPresent(){
        return currentUser != null;
    }
}
class ViewRender{
    static target = document.getElementById("target");

    static renderStartPage(){
        this.target.innerHTML = null;
        this.target.append(this.#createStartPage());
    }
    static renderSignUpPage(){
        this.target.innerHTML = null;
        this.target.append(this.#createSignUpPage());
    }
    static renderMainPage(){
        this.target.innerHTML = null;
        this.target.append(this.#createMainPage());
        let itemBox = document.getElementById("item-box");
        // this.#appendItemDetail(itemBox);
        this.#appendItemDetail(itemBox);
    }
    static renderItemsPage(){
        let itemBox = document.getElementById("item-box");
        if(itemBox==null) return;

        itemBox.innerHTML = null;
        itemBox.append(this.#createPatialItems());
    }
    static renderItemPage(){
        let itemBox = document.getElementById("item-box");
        if(itemBox==null) return;

        itemBox.innerHTML = null;
        itemBox.append(this.#createPatialItem());
    }
    static #createStartPage(){
        let container = this.#createContainer("start");
        container.innerHTML = 
        `
        <div class="row align-middle">
            <div class="col-sm-12 col-md-12 col-lg-12 text-center">
                <h1>Clicker Empire Game</h1>
            </div>
            <div class="col-sm-6 col-md-12 col-lg-12 text-center">
                <button type="button" class="btn btn-lg btn-primary" onclick='Controller.signup()'>最初から</button>
            </div>
            <div class="col-sm-6 col-md-12 col-lg-12 text-center">
                <button type="button" class="btn btn-lg btn-primary" onclick='alert("coming soon")'>続きから</button>
            </div>
        </div>
        `
        return container;
    }
    static #createSignUpPage(){
        let container = this.#createContainer("signup");
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
                            <input type="text" name="userName" class="form-control" id="input-user-name" placeholder="ユーザーネーム" value="">
                        </div>
                        <div class="form-group">
                            <input type="number" name="userAge" class="form-control" id="input-user-age" placeholder="年齢" value="">
                        </div>
                        <button type="submit" class="btn btn-primary col-12" onclick='Controller.register();return false;'>新規登録</button>
                    </form>
                </div>
            </div>
        </div>
        `
        return container;
    }
    static #createMainPage(){
        let container = this.#createContainer("main");
        let test = "fsdkljfalksdfj";
        container.innerHTML = 
        `
        <div class="row text-white">
                <!-- 左側ハンバーガーとか -->
                <div class="col-sm-5 col-md-5 col-lg-5 bg-dark vh-95 margin-top-15">
                    <div class="margin-top-10 vh-10">
                        <div class="bg-grey" style="height: 100%; vertical-align: middle;">
                            <h3 class="text-center" style="vertical-align: middle;">${currentUser.hambuerCount}&nbsp;burgers</h3>
                            <p class="text-center" style="vertical-align: middle;">${displayedItems.get("flipMachine").getAmountPer()}$ per second</p>
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
                            <div class="bg-grey text-center user-info-cell">${test}</div>
                            <div class="bg-grey text-center user-info-cell">25 yrs old</div>
                        </div>
                        <div class="user-info-row">
                            <div class="bg-grey text-center user-info-cell">1,882 days</div>
                            <div class="bg-grey text-center user-info-cell">$1000</div>
                        </div>
                    </div>
                    <!-- itemlist -->
                    <div class="bg-dark vh-70" style="overflow: scroll;" id="item-box">
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
    static #createPatialItems(){
        let container = document.createElement("div");
        container.classList.add("bg-dark", "vh-70");
        container.setAttribute("style", "overflow:scroll;");
        container.innerHTML = 
        `
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
        `
        return container;
    }
    static #createPatialItem(){
        let container = document.createElement("div");
        container.classList.add("bg-dark", "vh-70");
        container.setAttribute("style", "overflow:scroll;");
        container.innerHTML = 
        `
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
        `
        return container;
    }
    static #createContainer(id){
        let container = document.createElement("div");
        container.classList.add("container");
        container.setAttribute("id", id);
        return container;
    }
    static #appendItemDetail(parentNode){
        if(parentNode == null) return;
        displayedItems.forEach((value, key) => {
            let itemDiv = document.createElement("div");
            let item = value;
            itemDiv.classList.add("item", "bg-grey");
            itemDiv.innerHTML = `
            <div style="display: table-cell;">
                <img src=${item.imgUrl} class="item-img">
            </div>
            <div style="display: table-cell;">
                <h3>${item.getName()}</h3>
                <p>$${item.price}&nbsp;&nbsp;+${item.getAmountPer()}&nbsp;per&nbsp;second</p>
            </div>
            <div class="text-center" style="display: table-cell; vertical-align: middle;">
                <h3>${currentUser.items.eachItemCount.get(item.getName()) == undefined ? 0 : currentUser.items.eachItemCount.get(item.getName())}</h3>
            </div>
            `
            parentNode.append(itemDiv);
        });
    }
}

class ClickerEmpireGame{
    static main(){
        Controller.start();
    }
}

function initializeItemMap(){
    itemMap = new Map([
        ["flipMachine", new FlipMachine(config.flipMachineImgUrl, 500, 15000, 25)],
        ["etcStock", new EtcStock(config.etcStockImgUrl, Infinity, 300000, 0.001)],
        ["etcBonds", new EtcBonds(config.etcBondsImgUrl, Infinity, 300000, 0.0007)],
        ["lemonadeStand", new LemonadeStand(config.lemonadeImgUrl, 1000, 30000, 30)],
        ["iceCreamTruck", new IceCreamTruck(config.iceCreamImgUrl, 500, 100000, 120)],
        ["house", new House(config.houseImgUrl, 100, 20000000, 32000)],
        ["townHouse", new TownHouse(config.townHouseImgUrl, 100, 40000000, 64000)],
        ["mansion", new Mansion(config.mansionImgUrl, 100, 250000000, 500000)],
        ["industrialSpace", new IndustrialSpace(config.industrialSpaceImgUrl, 10, 1000000000, 2200000)],
        ["hotelSkyscraper", new HotelSkyscraper(config.hotelSkyscraperImgUrl, 5, 10000000000, 25000000)],
        ["bulletSpeedSkyRailsway", new BulletSpeedSkyRailsway(config.bulletSpeedSkyRailswayImgUrl, 1, 10000000000, 39999999999)]
    ]);
    return itemMap;
}

ClickerEmpireGame.main();