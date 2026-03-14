let questions=[]
let current=0

let answers={}
let review={}

fetch("questions.json")
.then(r=>r.json())
.then(data=>{

questions=data

loadQuestion()
buildPalette()

})

function loadQuestion(){

let q=questions[current]

document.getElementById("q-number").innerText=
"Question "+(current+1)

document.getElementById("question-text").innerText=q.question

document.getElementById("optA").innerText=q.A
document.getElementById("optB").innerText=q.B
document.getElementById("optC").innerText=q.C
document.getElementById("optD").innerText=q.D

restoreSelection()

}

function restoreSelection(){

let radios=document.querySelectorAll("input[name=option]")

radios.forEach(r=>{

r.checked=false

})

if(answers[current]){

document.querySelector(
`input[value=${answers[current]}]`
).checked=true

}

}

function saveAnswer(){

let selected=document.querySelector(
"input[name=option]:checked"
)

if(selected){

answers[current]=selected.value

}

updatePalette()

}

function next(){

saveAnswer()

if(current<questions.length-1){

current++

loadQuestion()

}

}

function previous(){

if(current>0){

current--

loadQuestion()

}

}

function clearResponse(){

delete answers[current]

restoreSelection()

updatePalette()

}

function markReview(){

review[current]=true

updatePalette()

}

function buildPalette(){

let palette=document.getElementById("palette-grid")

questions.forEach((q,i)=>{

let btn=document.createElement("button")

btn.innerText=i+1

btn.onclick=()=>{

current=i

loadQuestion()

}

palette.appendChild(btn)

})

}

function updatePalette(){

let buttons=document.querySelectorAll("#palette-grid button")

buttons.forEach((btn,i)=>{

btn.className=""

if(review[i]){

btn.classList.add("review")

}

else if(answers[i]){

btn.classList.add("answered")

}

else{

btn.classList.add("notanswered")

}

})

}

function openCalculator(){

window.open(
"calculator/calculator.html",
"calc",
"width=400,height=600"
)

}
