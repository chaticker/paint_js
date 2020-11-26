//html 요소 가져오고 변수 생성
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBT = document.getElementById("jsSave");

const INITIAL_COLOR = "2c2c2c"
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//초기 캔버스 흰색으로 설정
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle= "#INITIAL_COLOR";
ctx.fillStyle = "INITIAL_COLOR"
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

//윈도우 전체가 아닌 캔버스 내에서의 위치를 가져옴
//모든 움직임을 감지하고 라인을 만든다
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else{
        //패스의 이전 위치부터 현재 위치까지의 선을 만드는 역할
        //마우스를 잡고 움직이는 동안 계속 발생함
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

//라인 색 바꾸기
function handleColorchange(event){
    const color = event.target.style.backgroundColor;
    //strokeStyle이 target에 있는 색상이 됨
    ctx.strokeStyle = color;
    //캔버스 전체를 채우기
    ctx.fillStyle = color;   
}

//라인 두께 바꾸기
function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeChange(){
    //클릭하지 않은 경우 Fill
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    //클릭한 경우 Paint
    }else{
        filling = true;
        mode.innerText = "Paint";
    }

}

function hadleCanvasClick(){
    if(filling){
        //사각형 만들기
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }else{

    }
}

//마우스 우클릭 방지
function handleCM(event){
    event.preventDefault();
}

//이미지 링크 받아오기
function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT]";
    link.click();
}

//마우스가 캔버스 안에서 움직일 때만
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", hadleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

if(colors){
    //색을 클릭하면 배열을 가지게 됨
    Array.from(colors).forEach(color => 
        color.addEventListener("click", handleColorchange));
}

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeChange);
}

if(saveBT){
    saveBT.addEventListener("click", handleSaveClick);
}