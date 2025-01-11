let btn = document.querySelector('#btn')
let content = document.querySelector("#content")
let voice=document.querySelector('#voice')

function speak(text){
    let text_speak=new SpeechSynthesisUtterance(text)
    text_speak.rate=1
    text_speak.pitch=1
    text_speak.volume=1
    text_speak.lang="en-GB"
    window.speechSynthesis.speak(text_speak)
}

// wish according to time 

function wishMe(){
    let day=new Date()
    let hours=day.getHours()
    if(hours>=0 && hours<12){
        speak("Good Morning Mam")
    }
    else if(hours>=12 && hours <16){
        speak("Good Afternoon Mam")
    }else{
        speak("Good Evening Mam")
    }
}
window.addEventListener('load',()=>{
    wishMe()
})

//  speech recognitation (recognize our speech and create api format data so we can acess it) 

let speechRecognitation= window.SpeechRecognition || window.webkitSpeechRecognition
let recognition =new speechRecognitation()
recognition.onresult=(event)=>{
    let currentIndex=event.resultIndex
   let transcript= event.results[currentIndex][0].transcript

//   as we talk it to print on button
   content.innerText=transcript 
   
//  to get answer of questions
 takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click",()=>{
    recognition.start()
    btn.style.display='none'
    voice.style.display = "block"
})
function takeCommand(message){
     btn.style.display='flex'
     voice.style.display = "none"
    if(message.includes("hello")||message.includes("hey")){
        speak("hello mam,what can i help you")
    }
    else if(message.includes("who are you")){
            speak("i am virtual assistanat, created by ankita")  
        }
        else if(message.includes('open youtube')){
            speak('opening the youtube..')
            window.open('https://www.youtube.com/',"_blank")
        }
        else if(message.includes('open github')){
            speak('opening the github..')
            window.open('https://github.com/',"_blank")
        }
        else if(message.includes('open calculator')){
            speak('opening the calculator..')
            window.open('calculator://')
        }
        else if(message.includes('what is time')){
           let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
           speak(time)
        }
        else if(message.includes('date')){
            let date=new Date().toDateString(undefined,{day:"numeric",month:"short"})
            speak(date)
        }

        // the link used for serch anything on internet
        
        else{
            let finaltext = "this is what i found on internet regarding" + message.replace("luke","") || message.replace("luke","")
            speak(finaltext)
            window.open(`https://www.google.com/search?q=${message.replace("luke","")}`,"_blank")
        }
        
    
}
    