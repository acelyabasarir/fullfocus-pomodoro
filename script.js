let timer = null

const alarm = new Audio("alarm.mp3")
alarm.preload = "auto"

alarm.preload = "auto"

let workTime = 25
let breakTime = 5

let time = workTime * 60
let isBreak = false

let sessionCount = 0
let targetSessions = 4

const timerDisplay = document.getElementById("timer")
const startBtn = document.getElementById("start")
const pauseBtn = document.getElementById("pause")
const resetBtn = document.getElementById("reset")

const workInput = document.getElementById("workInput")
workInput.addEventListener("input", () => {

let minutes = parseInt(workInput.value)

if(!isNaN(minutes)){

time = minutes * 60
updateDisplay()

}

})
const breakInput = document.getElementById("breakInput")
const sessionInput = document.getElementById("sessionInput")

const quote = document.getElementById("quote")

const quoteList = document.getElementById("quoteList")

const newQuote = document.getElementById("newQuote")
const addQuote = document.getElementById("addQuote")

let quotes = [

"Yapamazsın diyenlere inat yap!",
"Hareket eden bir insanı depresyon yakalayamaz.",
"Disiplin özgürlüğün anahtarıdır.",
"Odaklan, üret, kazan.",
"Bugünün emeği yarının başarısıdır.",
"Her gün biraz ilerleme büyük fark yaratır.",
"Odaklandığın yerde büyürsün.",
"Bugün yaptığın şey geleceğini belirler."

]

function safeNumber(value, fallback){

const n = parseInt(value)

if(isNaN(n) || n < 1){
return fallback
}

return n

}

function renderQuotes(){

quoteList.innerHTML=""

quotes.forEach(q=>{

const li=document.createElement("li")
li.innerText=q

li.onclick=()=>{
quote.innerText=q
}

quoteList.appendChild(li)

})

}

function updateDisplay(){

let minutes=Math.floor(time/60)
let seconds=time%60

timerDisplay.innerText=`${minutes}:${seconds<10?"0"+seconds:seconds}`

}

function readInputs(){

workTime = safeNumber(workInput.value,25)
breakTime = safeNumber(breakInput.value,5)
targetSessions = safeNumber(sessionInput.value,4)

}

function startTimer(){

alarm.play().then(()=>alarm.pause()).catch(()=>{})

readInputs()

if(timer!==null) return

timer=setInterval(()=>{

time--

updateDisplay()

if(time<=0){

alarm.currentTime = 0
alarm.play().catch(()=>{})

if(isBreak){

isBreak=false
time=workTime*60

}else{

sessionCount++

if(sessionCount>=targetSessions){

clearInterval(timer)
timer=null

quote.innerText="Hedefine ulaştın ! Durma Devam Et! "

return

}

isBreak=true
time=breakTime*60

quote.innerText=
quotes[Math.floor(Math.random()*quotes.length)]

}

updateDisplay()

}

},1000)

}

function pauseTimer(){

clearInterval(timer)
timer=null

}

function resetTimer(){

pauseTimer()

readInputs()

sessionCount=0
isBreak=false

time=workTime*60

updateDisplay()

}

addQuote.onclick=()=>{

if(newQuote.value.trim()!==""){

quotes.push(newQuote.value)

newQuote.value=""

renderQuotes()

}

}

startBtn.onclick=startTimer
pauseBtn.onclick=pauseTimer
resetBtn.onclick=resetTimer

renderQuotes()
readInputs()
updateDisplay()

