const state={

questions:[],
current:0,

answers:{},
review:{}

}

async function init(){

const res=await fetch("questions.json")

state.questions=await res.json()

renderQuestion()

buildPalette()

}

function renderQuestion(){

const q=state.questions[state.current]

document.getElementById("question-number")
.innerText=`Question ${state.current+1}`

document.getElementById("question-text")
.innerText=q.question

optA.innerText=q.A
optB.innerText=q.B
optC.innerText=q.C
optD.innerText=q.D

restoreSelection()

}

function restoreSelection(){

const radios=document.querySelectorAll(
"input[name=answer]"
)

radios.forEach(r=>r.checked=false)

const saved=state.answers[state.current]

if(saved){

document.querySelector(
`input[value=${saved}]`
).checked=true

}

}

function saveAnswer(){

const selected=document.querySelector(
"input[name=answer]:checked"
)

if(selected){

state.answers[state.current]=selected.value

}

updatePalette()

}

function nextQuestion(){

saveAnswer()

if(state.current<state.questions.length-1){

state.current++

renderQuestion()

}

}

function prevQuestion(){

if(state.current>0){

state.current--

renderQuestion()

}

}

function clearAnswer(){

delete state.answers[state.current]

restoreSelection()

updatePalette()

}

function markReview(){

state.review[state.current]=true

updatePalette()

}

function buildPalette(){

const palette=document.getElementById("palette")

state.questions.forEach((q,i)=>{

const btn=document.createElement("button")

btn.innerText=i+1

btn.onclick=()=>{

state.current=i

renderQuestion()

}

palette.appendChild(btn)

})

}

function updatePalette(){

const buttons=document.querySelectorAll("#palette button")

buttons.forEach((btn,i)=>{

btn.className=""

if(state.review[i]){

btn.classList.add("review")

}

else if(state.answers[i]){

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
"width=420,height=600"
)

}

init()
