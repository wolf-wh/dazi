let code =new Code();
let buttons = document.querySelectorAll("button");
let start = buttons[0];
let ting = buttons[1];
let starTts = buttons[2];
let stops = buttons[3];
start.onclick=function(){
    code.start();
}
ting.onclick=function(){
    code.stop();
}
stops.onclick=function(){
    close();
}
