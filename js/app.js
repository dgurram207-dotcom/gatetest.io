const state={

questions:[],
current:0,

answers:{},
review:{}

}

async function init(){

const res=await fetch("data/questions.json")

state.questions=await res.json()

renderQuestion()

buildPalette()

startTimer()

}

function renderQuestion(){

const q=state.questions[state.current]

qNumber.innerText="Question "+(state.current+1)

qText.innerText=q.question

options.innerHTML=""

Object.entries(q.options).forEach(([k,v])=>{

const label=document.createElement("label")

label.className="option"

label.innerHTML=`<input type="radio" name="ans" value="${k}"> ${v}`

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

const selected=document.querySelector("input[name=ans]:checked")

if(selected){

state.answers[state.current]=selected.value

}

updatePalette()

}

function clearAnswer(){

delete state.answers[state.current]

renderQuestion()

}

function markReview(){

state.review[state.current]=true

updatePalette()

}

function buildPalette(){

palette.innerHTML=""

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

if(state.review[i]) btn.classList.add("review")
else if(state.answers[i]) btn.classList.add("answered")
else btn.classList.add("notanswered")

})

}

function openCalculator(){

window.open(
"calculator/calculator.html",
"calc",
"width=420,height=600"
)

}

function startTimer(){

let time=3*60*60

setInterval(()=>{

time--

const h=Math.floor(time/3600)
const m=Math.floor((time%3600)/60)
const s=time%60

timer.innerText=
`${h.toString().padStart(2,'0')}:`+
`${m.toString().padStart(2,'0')}:`+
`${s.toString().padStart(2,'0')}`

},1000)

}

document.addEventListener("keydown",e=>{

if(e.key==="ArrowRight") nextQuestion()
if(e.key==="ArrowLeft") prevQuestion()

})

init()
