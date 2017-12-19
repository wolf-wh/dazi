class Code {
    constructor() {
        this.char = [{c:"Q",b:"img/q.jpg"}, {c:"W",b:"img/w.jpg"}, {c:"E",b:"img/e.jpg"},
            {c:"R",b:"img/r.jpg"}, {c:"T",b:"img/t.jpg"},{c:"Y",b:"img/y.jpg"},
            {c:"u",b:"img/u.jpg"}, {c:"I",b:"img/i.jpg"},{c:"O",b:"img/o.jpg"},
            {c:"P",b:"img/p.jpg"}];
        this.length = 6;
        this.current = [];
        this.speed = 10;
        this.scoreObj = document.querySelector('.frist-fen');
        this.lave = document.querySelector('.last-fen');
        this.score = 0;
        this.gq = 6;
        this.leavs = 10;
        this.positionX=[];
    }
    start() {
        this.getChars(this.length);
        this.drop();
        this.keys();
    }

    getChars(length) {
        for (let i = 0; i < length; i++) {
            this.getChar();
        }
    }
    checkExist(char){
        return this.current.some(element => element.innerText == char);
    }
    checkPosition(pos){
        return this.positionX.some(element => Math.abs(element-pos)<=70);
    }
    getChar() {
        let num = Math.floor(Math.random() * this.char.length);
        do { num = Math.floor(Math.random() * this.char.length);
        }while (this.checkExist(this.char[num].c));
        let divs = document.createElement('div');
        let tops = Math.floor(Math.random() * 100);
        let lefts = Math.floor((window.innerWidth - 400) * Math.random() + 200);
        do{lefts = Math.floor((window.innerWidth - 400) * Math.random() + 200);
        }while (this.checkPosition(lefts));
        divs.style.cssText = `
            width:70px;
            height:70px;
            background:url(${this.char[num].b}) center/cover ;
            border-radius:50%;
            text-align:center;
            line-height:50px;
            font-size:20px;
            position:absolute;
            top:${tops}px;
            left:${lefts}px;
            color:rgba(0,0,0,0);
        `
        divs.innerText = this.char[num].c;
        document.body.appendChild(divs);
        this.current.push(divs);
        this.positionX.push(lefts);
    }

    drop() {
        let _this = this;
        _this.time=setInterval(moves, 100);
        function moves() {
            for (let i = 0; i < _this.current.length; i++) {
                let tops = _this.current[i].offsetTop + _this.speed;
                _this.current[i].style.top = tops + 'px';
                if (tops >= 500) {
                    document.body.removeChild(_this.current[i]);
                    _this.current.splice(i, 1);
                    _this.positionX.splice(i, 1);
                    _this.lave.innerText = --_this.leavs;
                    _this.getChar();
                    if (_this.leavs <= 0){
                        clearInterval(_this.time);
                        if(confirm("游戏失败，是否重新开始")){
                           _this.restart();
                        }else{
                            alert(`您的分数是${_this.score}`);
                        }
                    }
                }
            }
        }
    }
    keys() {
        let _this = this;
        document.onkeydown = function (e) {
            let code = String.fromCharCode(e.keyCode);//e.key.toUpperCase();
            for (let i = 0; i < _this.current.length; i++) {
                if (code == _this.current[i].innerText) {
                    document.body.removeChild(_this.current[i]);
                    _this.current.splice(i, 1);
                    _this.positionX.splice(i,1);
                    _this.scoreObj.innerText =++_this.score;
                    _this.getChar();
                    if (_this.score == _this.gq){
                        let flag = confirm("恭喜您进入下一关");
                        if(flag==true) {
                            _this.next();
                        }else {
                            clearInterval(_this.time);
                            alert(`您的分数是${_this.score}`);
                        }
                    }


                }
            }
            /*_this.current.forEach(function (element, index) {
                console.log(this);
            }, _this.current)*/
        }
    }
    next(){
        clearInterval(this.time);
        this.current.forEach(element=>{
            document.body.removeChild(element);
        });
        this.current=[];
        this.positionX=[];
        this.length++;
        this.speed++;
        this.gq +=10;
        if (this.length >=10){
            this.length=10;
        }
        this.getChars(this.length);
        this.drop();
    }
    stop(){
        clearInterval(this.time);
    }
    restart(){
        clearInterval(this.time);
        this.current.forEach(element=>{
            document.body.removeChild(element);
        });
        this.current=[];
        this.positionX=[];
        this.scoreObj.innerText=this.score=0;
        this.lave.innerText=this.leavs=10;
        this.length=6;
        this.getChars(this.length);
        this.drop();
    }
}