const eraseBtn = document.getElementById("eraser-btn")
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.getElementById("line-width");
const color = document.querySelector("#color");
const fileInput = document.getElementById('file');
const textInput = document.getElementById('text');
const saveBtn = document.getElementById("save");


const colorOptions = Array.from(
    document.getElementsByClassName("color-option")
);

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;


canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round"

let isPainting = false;
let isFilling = false;

function onMove(e){
    if(isPainting){
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(e.offsetX, e.offsetY);
}
function startPainting(){
    isPainting = true;
}
function cancelPainting(){
    isPainting = false;
    ctx.beginPath();
}

function onLineWidthChange(e){

   ctx.lineWidth = e.target.value;
}

function onColorChange(e){
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
}

function onColorClick(e){
    const colorValue = e.target.dataset.color
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}
function onModeClick(){
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "Draw";
    }else{
        isFilling = true;
        modeBtn.innerText = "Fill";
    }
}

function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}
function onDestroyClick(){
    ctx.fillStyle = "white"
    ctx.fillRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraseClick(){
    ctx.strokeStyle = "white"
    isFilling = false;
    modeBtn.innerText = "Fill"
}

function onFileChange(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image,0,0, 800,800);
        fileInput.value = null;
    }
}

function onDoubleClick(event){
    const text = textInput.value
    if(text !== ""){
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font=" 50px serif"
    ctx.strokeText(text, event.offsetX, event.offsetY);
    ctx.restore();
    }
}

function onSaveClick(){
    const url = canvas.toDataURL();
    const a = document.createElement('a');
    a.href = url ;
    a.download = "myDrawing.png";
    a.click();

}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);


lineWidth.addEventListener("change", onLineWidthChange)
color.addEventListener("change",onColorChange);

colorOptions.forEach(color => color.addEventListener("click", onColorClick))

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraseBtn.addEventListener("click", onEraseClick);
fileInput.addEventListener("change",onFileChange);
saveBtn.addEventListener("click", onSaveClick)
