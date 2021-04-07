var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
const size = 8;
const scale = 10;
const white = 1;
const black = 0;
const row = [0,1,2,3,4,5,6,7]
var theme = changeTheme()
var selectedElm = false;
var selectedField = false;
var fieldPosition = [];
var swapPos = [];

class Table{
    constructor(size,color,field){
        this.size = size;
        this.color = color;
        this.field = field
    }

    drawTable(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        var size = this.field.length
        for(var i = 0; i<size; i++){
            for(var j = 0; j<size; j++){
                if(this.field[i][j]%2==0){
                    ctx.fillRect((j*this.size*scale), (i*this.size*scale), this.size*scale, this.size*scale);
                } 
            }
        }           
    }
    
    set makeField(field){      
        for(var i = 0; i<this.size; i++){
            var row = [];
            for(var j = 0+i; j<this.size+i; j++){
                j%2==0? row.push(white) : row.push(black)
            }
            field.push(row)
        }
        this.field = field
    }
}

class ChessPieces{
    constructor(id,position,active,color,name,status,size){
        this.id = id;
        this.size = size;
        this.position = position;
        this.color = color;
        this.name = name;
        this.active = active;
        this.status = status;
    }
}

class Pawn extends ChessPieces{
    constructor(id,position,active,color,name,status,size){
        super(id,position,active,color,name,status,size)
    }
    drawPawnW(){
        ctx.beginPath();   
        var img = document.getElementById("wPawn");   
        ctx.drawImage(img, this.position.x-((size*scale)/2)+scale+3, this.position.y-((size*scale)/2)+scale);
        ctx.stroke();
    }
    drawPawnB(){
        ctx.beginPath();   
        var img = document.getElementById("bPawn");   
        ctx.drawImage(img, this.position.x-((size*scale)/2)+5, this.position.y-((size*scale)/2)+5);
        ctx.stroke();
    }
}

class Rook extends ChessPieces{
    constructor(id,position,active,color,name,status,size){
        super(id,position,active,color,name,status,size)
    }
        drawRookW(){
        ctx.beginPath();   
        var img = document.getElementById("wRook");   
        ctx.drawImage(img, this.position.x-((size*scale)/2)+7, this.position.y-((size*scale)/2)+5);
        ctx.stroke();
    }
    drawRookB(){
        ctx.beginPath();   
        var img = document.getElementById("bRook");   
        ctx.drawImage(img, this.position.x-((size*scale)/2)+5, this.position.y-((size*scale)/2)+5);
        ctx.stroke();
    }
}

class Knight extends ChessPieces{
    constructor(id,position,active,color,name,status,size){
        super(id,position,active,color,name,status,size)
    }
     drawKnightW(){
        ctx.beginPath();   
        var img = document.getElementById("wKnight");   
        ctx.drawImage(img, this.position.x-((size*scale)/2)+7, this.position.y-((size*scale)/2)+5);
        ctx.stroke();
    }
    drawKnightB(){
        ctx.beginPath();   
        var img = document.getElementById("bKnight");   
        ctx.drawImage(img, this.position.x-((size*scale)/2)+5, this.position.y-((size*scale)/2)+5);
        ctx.stroke();
    }
}

class Bishop extends ChessPieces{
    constructor(id,position,active,color,name,status,size){
        super(id,position,active,color,name,status,size)
    }
    drawBishopW(){
        ctx.beginPath();   
        var img = document.getElementById("wBishop");   
        ctx.drawImage(img, this.position.x-((size*scale)/2)+7, this.position.y-((size*scale)/2)+5);
        ctx.stroke();
    }
    drawBishopB(){
        ctx.beginPath();   
        var img = document.getElementById("bBishop");   
        ctx.drawImage(img, this.position.x-((size*scale)/2)+10, this.position.y-((size*scale)/2)+10);
        ctx.stroke();
    }
}

class Queen extends ChessPieces{
    constructor(id,position,active,color,name,status,size){
        super(id,position,active,color,name,status,size)
    }
    drawQueenW(){
        ctx.beginPath();   
        var img = document.getElementById("wQueen");   
        ctx.drawImage(img, this.position.x-((size*scale)/2)+10, this.position.y-((size*scale)/2)+10);
        ctx.stroke();
    }
    drawQueenB(){
        ctx.beginPath();   
        var img = document.getElementById("bQueen");   
        ctx.drawImage(img, this.position.x-((size*scale)/2)+10, this.position.y-((size*scale)/2)+10);
        ctx.stroke();
    }
}

class King extends ChessPieces{
    constructor(id,position,active,color,name,status,size){
        super(id,position,active,color,name,status,size)
    }
     drawKingW(){
        ctx.beginPath();   
        var img = document.getElementById("wKing");   
        ctx.drawImage(img, this.position.x-((size*scale)/2)+7, this.position.y-((size*scale)/2)+5);
        ctx.stroke();
    }
    drawKingB(){
        ctx.beginPath();   
        var img = document.getElementById("bKing");   
        ctx.drawImage(img, this.position.x-((size*scale)/2)+8, this.position.y-((size*scale)/2)+6);
        ctx.stroke();
    }
}

var chessTabel = new Table(size,theme,[])
chessTabel.makeField = [];
chessTabel.drawTable()
console.log(chessTabel)
var whitePawns = [];
var blackPawns = [];

var whiteRooks = [];
var blackRooks = [];

var whiteKnights = [];
var blackKnights = []; 

var whiteBishops = [];
var blackBishops = []; 

var blackKing;
var whiteQueen;
var whiteKing;
var blackQueen;

function setTable(){
    
    if(fieldPosition.length<64){ 
        for(var i = 0; i<size; i++){
            for(var j = 0; j<size; j++){
                 fieldPosition.push({
                   position :{
                        x : (size*scale)/2 + j * (size*scale),
                        y : (size*scale)/2 + i*(size*scale)
                   } ,
                   active : false
                 })
            }
        } 
    }
    

        for(var i = 0; i<8; i++){
    var newPawnB =  new Pawn (
                       i+"PawnB",
                      { x : Math.floor((size * scale)/2)+(i*size*scale), 
                        y : (size * scale)*row[1]
                        +Math.floor((size * scale))/2
                       }
                        , false, "black", "pawn", false, 5)
    var newPawnW = new Pawn (
                       i+"PawnW",
                      { x : Math.floor((size * scale)/2)+(i*size*scale), 
                        y : (size * scale)*row[6]+Math.floor((size * scale))/2
                       }
                        , false, "orange", "pawn", false, 5)
    
    whitePawns.push(newPawnW)
    blackPawns.push(newPawnB)
    whitePawns[i].drawPawnW()
    blackPawns[i].drawPawnB()
}


for(var i = 0; i<2; i++){
    var newKnightB = new Knight(
                        i+"KnightB",
                      { x : Math.floor((size * scale)/2)+(size*scale)+(i*row[5]*size*scale), 
                        y : (size * scale)*row[0]
                        +Math.floor((size * scale))/2
                       }
                        , false, "black", "knight", false, 5 )
    var newKnightW = new Knight(
                        i+"KnightW",
                      { x : Math.floor((size * scale)/2)+(size*scale)+(i*row[5]*size*scale), 
                        y : (size * scale)*row[7]
                        +Math.floor((size * scale))/2
                       }
                        , false, "orange", "knight", false, 5 )
                        
    var newRookB = new Rook(
                        i+"RookB",
                      { x : Math.floor((size * scale)/2)+(i*row[7]*size*scale), 
                        y : (size * scale)*row[0]
                        +Math.floor((size * scale))/2
                       }
                        , false, "black", "rook", false, 5 )
    var newRookW = new Rook(
                        i+"RookW",
                      { x : Math.floor((size * scale)/2)+(i*row[7]*size*scale), 
                        y : (size * scale)*row[7]
                        +Math.floor((size * scale))/2
                       }
                        , false, "orange", "rook", false, 5 )

    var newBishopB = new Bishop(
                        i+"BishopB",
                      { x : Math.floor((size * scale)/2)+(size*scale*row[2])+(i*row[3]*size*scale), 
                        y : (size * scale)*row[0]
                        +Math.floor((size * scale))/2
                       }
                        , false, "black", "bishop", false, 5 )
    var newBishopW = new Bishop(
                        i+"BishopW",
                      { x : Math.floor((size * scale)/2)+(size*scale*row[2])+(i*row[3]*size*scale),
                        y : (size * scale)*row[7]
                        +Math.floor((size * scale))/2
                       }
                        , false, "orange", "bishop", false, 5 )
    
     blackRooks.push(newRookB)    
     whiteRooks.push(newRookW)    
     blackRooks[i].drawRookB()     
     whiteRooks[i].drawRookW() 

                                                
     whiteKnights.push(newKnightB)    
     blackKnights.push(newKnightW)    
     whiteKnights[i].drawKnightB()     
     blackKnights[i].drawKnightW()     

     blackBishops.push(newBishopB)    
     whiteBishops.push(newBishopW)    
     blackBishops[i].drawBishopB()     
     whiteBishops[i].drawBishopW() 
}

 blackQueen = new Queen(
                        "QueenB",
                       { x : Math.floor((size * scale)/2)+(size*scale*row[3]),
                        y : (size * scale)*row[0]
                        +Math.floor((size * scale))/2
                       }
                        , false, "black", "queen", false, 5 )

 whiteQueen = new Queen(
                        "QueenW",
                      { x : Math.floor((size * scale)/2)+(size*scale*row[3]),
                        y : (size * scale)*row[7]
                        +Math.floor((size * scale))/2
                       }
                        , false, "orange", "queen", false, 5 )
 blackKing = new King(
                        "KingB",
                      { x : Math.floor((size * scale)/2)+(size*scale*row[4]),
                        y : (size * scale)*row[0]
                        +Math.floor((size * scale))/2
                       }
                        , false, "black", "king", false, 5 )

 whiteKing = new King(
                        "KingW",
                      { x : Math.floor((size * scale)/2)+(size*scale*row[4]),
                        y : (size * scale)*row[7]
                        +Math.floor((size * scale))/2
                       }
                        , false, "orange", "king", false, 5 )

    whiteQueen.drawQueenW();                    
    blackQueen.drawQueenB();                    
    whiteKing.drawKingW();                    
    blackKing.drawKingB();                    


}


 setTable()

var elem = document.getElementById("myCanvas")
    elemLeft = elem.offsetLeft + elem.clientLeft,
    elemTop = elem.offsetTop + elem.clientTop,
    ctx = elem.getContext("2d"),   
    elements = [];
    fieldSpace = [];
    
elem.addEventListener('click', function(event){
    var x = event.pageX - elemLeft,
        y = event.pageY - elemTop;

    fieldPosition.forEach(function(element,i){
        
        if (y > element.position.y-(scale * size)/2 && y < element.position.y-(scale * size)/2 + size * scale 
            && x > element.position.x-(scale * size)/2 && x < element.position.x-(scale * size)/2 + size * scale) {
            fieldPosition.map((elm)=>{
               return  elm.active = false        // All eml who did not selected is false
            })
            
            fieldPosition[i].active = true;          // Selected Chess Pieces .active = true
            
            selectedField = fieldPosition.filter((elm)=>elm.active == true)
           
            PlayChess()
            
          }
    });
}, false)

for(var i = 0; i<blackPawns.length; i++){ 
    elements.push(blackPawns[i]);
    elements.push(whitePawns[i]);
 
}

for(var i = 0; i<blackRooks.length; i++){
    elements.push(whiteRooks[i]);
    elements.push(blackRooks[i]);
    elements.push(blackBishops[i]);
    elements.push(whiteBishops[i]);
    elements.push(blackKnights[i]);
    elements.push(whiteKnights[i]);  
}

for(var i = 0; i<1; i++){
    elements.push(blackKing);
    elements.push(whiteKing);
    elements.push(blackQueen);
    elements.push(whiteQueen); 
}



function DrawSelectedField(){
            ctx.beginPath();
            ctx.strokeStyle = "red";
            ctx.lineWidth = "3";
            ctx.rect(selectedField[0].position.x-(scale * size)/2, selectedField[0].position.y-(scale * size)/2, size * scale , size * scale);
            ctx.stroke();
}
 

function PlayChess(){
            ctx.clearRect(0,0,640,640)
            DrawSelectedField()
                 
            swapPos.push(selectedField[0])

             if(swapPos.length == 2){                
                    selectedElm = elements.filter((elm)=>{
                    return elm.position.x == swapPos[0].position.x && elm.position.y == swapPos[0].position.y
                })

                 selectedElm[0].position.x = swapPos[1].position.x
                 selectedElm[0].position.y = swapPos[1].position.y

                 eatChessPieces(elements,selectedElm)
                 swapPos = []
             }           
            chessTabel.drawTable()
            setTable()
}


function eatChessPieces(elements, selectedElm){
            for (let i = 0; i < elements.length; i++) {
                    if(elements[i].position.x == selectedElm[0].position.x  
                    && elements[i].position.y == selectedElm[0].position.y
                    && elements[i].id != selectedElm[0].id){
                        elements[i].position.x = -100;
                        elements[i].position.y = -100;
                }       
            }
        }



setTable()

function changeTheme(){
    var randNum = Math.floor(Math.random()*10);
    var color = ["brown","red","orange","grey","grey","purple","pink","green","blue"]
    return color[randNum]
}

// onload issue
// free field issue
// change theme issue
