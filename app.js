const displayPin = document.getElementById('display-pin')
const displayNumbers = document.getElementById('display-numbers')
const notifySuccess = document.getElementById('notify-success')
const notifyFailed = document.getElementById('notify-failed')
const attempt = document.getElementById('attempt-left')

function getPin(){
    const pin = generatePin()
    const pinStr = pin + '';
    if(pinStr.length === 4){
        return pin
    }else{
        return getPin()
    }
}
function generatePin(){
    const random = Math.round(Math.random()*10000)
    return random;
}
document.getElementById('generate-btn').addEventListener('click', function(){
    const pinNo= getPin();
    displayPin.value = pinNo
})
document.getElementById('calculator-body').addEventListener('click', function(e){
    const value = e.target.innerText;
    let previousDisplayNumbers = displayNumbers.value

    if(isNaN(value)){
        if(value === 'C'){
            displayNumbers.value = '';
        }
        else if(value === '<'){
             previousDisplayNumbers =previousDisplayNumbers.slice(0, previousDisplayNumbers.length - 1)
             displayNumbers.value = previousDisplayNumbers;
        }
    }else{
        const newNumbers = previousDisplayNumbers + value
        displayNumbers.value = newNumbers
    }
})

function pinMatcher(success, failed) {   
    const attemptToInt = parseInt(attempt.innerText)
    console.log(attemptToInt);
    if((displayPin.value === '') || (displayNumbers.value === '')){
        alert("Please Enter pin")
    }
    else if(displayPin.value === displayNumbers.value){
        failed.style.display = "none"
        success.style.display = "block"
    }else if(displayPin.value !== displayNumbers.value){
        success.style.display = "none"
        failed.style.display = "block"
       if(attemptToInt === 0){
        alert('Sorry You Reached the maximum attempt, Trt Again carefully')
        attempt.innerText = 3
       
       }else{
        attempt.innerText = attemptToInt -1
       }
    }
}

document.getElementById('btn-submit').addEventListener('click', function(){
    pinMatcher(notifySuccess , notifyFailed);
})