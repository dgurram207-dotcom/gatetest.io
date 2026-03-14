const state={

questions:[],
current:0,
answers:{}

}

async function init(){

const res=await fetch("data/questions.json")

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

const options=document.getElementById("options")

options.innerHTML=""

Object.entries(q.options).forEach(([key,val])=>{

const label=document.createElement("label")

label.className="option"

label.innerHTML=`

<input type="radio" name="ans" value="${key}">
${val}

`

options.appendChild(label)

})

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

function saveAnswer(){

const selected=document.querySelector(
"input[name=ans]:checked"
)

if(selected){

state.answers[state.current]=selected.value

}

}

function clearAnswer(){

delete state.answers[state.current]

renderQuestion()

}

function buildPalette(){

const palette=document.getElementById("palette-grid")

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

function openCalculator(){

window.open(
"components/calculator.html",
"calc",
"width=420,height=600"
)

}

init()
