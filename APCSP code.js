let Y = getHeight();
let X = getWidth();
let livegame = false;
let gameover = false;
var Right_Color;
var playBt;
let cPick;
var end = ("","30pt Arial");
var pseudoback = new Rectangle(X,Y);
    pseudoback.setPosition(0,0);
const cList = ["#FF0000", "#00FF00", Color.BLUE, Color.YELLOW, Color.CYAN,
    Color.ORANGE, Color.GRAY, Color.PURPLE];
let cnamelist = ["Red", "Green", "Blue", "Yellow", "Cyan", "Orange", "Gray", "Purple"];


function start(){
    var title = new Text("Stroop Game", "50pt Arial");
    title.setPosition(X/2-title.getWidth()/2,Y/3-title.getHeight()/2);
    title.setColor(Color.BLACK);
    add(title);
    
    playBt = new Rectangle(200, 100);
    playBt.setPosition(X/2-100, Y/2-50);
    playBt.setColor(Color.red);
    playBt.setBorderWidth(5);
    add(playBt);
    let start = new Text("Start", "30pt Arial");
    start.setPosition(X/2-start.getWidth()/2, (playBt.getY()+40)+start.getHeight()/2);
    add(start);
    mouseClickMethod(checkgame);
    
}


function congrats(){
    removeAll();
    pseudoback.setColor(Color.GREEN);
    add(pseudoback);
    var suc = new Text(/*"You'ren't color blind!*/ "Nice Job","20pt Arial");
    suc.setPosition(X/2 - suc.getWidth()/2, Y/2- suc.getHeight()/2);
    add(suc)
}


function failure(){
    removeAll();
    pseudoback.setColor(Color.RED);
    add(pseudoback);
    var fail = new Text("YOU FAILED, try again.");
    fail.setPosition(X/2- fail.getWidth()/2, Y/2- fail.getHeight()/2);
    add(fail);
    
}


function maketext(pos, colorA){
    
    let Xpos = 25;
    let Ypos = 100;
    
    if(pos > 4 ){
        Xpos = X/10*6;
        pos-=4
    }
    Ypos = pos*Ypos;
    let txt = new Text(cnamelist[Randomizer.nextInt(0,cnamelist.length-1)], "30pt Arial");
    txt.setPosition(Xpos, Ypos);
    txt.setColor(colorA);
    add(txt);


    
}


function loadgame(){
    Right_Color = cList[Randomizer.nextInt(0,cnamelist.length-1)];
    cPick = cList;
    println(cPick)
    var quest = new Text("Click the color of the word: " + Right_Color, "15pt Arial");
    quest.setPosition(X/2-150,Y/2-200);
    add(quest);
    for(var i = 8; i > 0; i--){
        let morearr = cPick;
        let curcolor = morearr[Randomizer.nextInt(0,cPick.length-1)];
        for(var e = 0; e < morearr.length; e++){
            if(morearr[e]== curcolor){
                morearr.remove(e);
            }
        }        maketext(i,curcolor);
    }
}


function checkcolor(rightColor, clickedColor){
  
    
    if(rightColor == clickedColor){
        congrats();
        gameover = true;
    }else{
        gameover = true;
        failure();
    }
    
}


function checkgame(e){
    if(gameover == true) return;
    let elesel;
    let elecol;
    var Xgud;
    var Ygud;
    clear()
    
    if( livegame == false ){
        if((e.getX() > playBt.getX()) && (e.getX()< playBt.getX()+playBt.getWidth())){
            Xgud = true;
        }
        if((e.getY() > playBt.getY()) && (e.getY()< playBt.getY()+playBt.getHeight())){
            Ygud = true;
        }
        if((Xgud == true)&& (true== Ygud)){
            removeAll();
            livegame = true;
            loadgame();
        }
    }
    
    if(getElementAt(e.getX() , e.getY()) != null){
        elesel = getElementAt(e.getX(),e.getY());
        elecol = elesel.getColor();
        checkcolor(Right_Color, elecol)
    }
    
}