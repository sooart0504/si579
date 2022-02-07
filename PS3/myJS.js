/*
* Excercise 1
*
*/

const colorBlock = document.querySelector("#color-block");
const centerText = document.querySelector("#color-name");
const convertBtn = document.querySelector("#convertbtn");
const inputF = document.querySelector("#f-input");
const outputC = document.querySelector("#c-output");


/*
* Then write a function that changes the text and the color inside the div
*
*/

colorBlock.addEventListener('click',() => {
    changeColor();
});

function changeColor(){
    //Write a condition determine what color it should be changed to
    if(centerText.innerHTML != '#DADADA'){
        //change the background color using JS
        colorBlock.style.background='#DADADA';

        //Change the text of the color using the span id color-name
        centerText.innerHTML='#DADADA';
    }
    else{
        //change the background color using JS
        colorBlock.style.background='#F08080';

        //Change the text of the color using the span id color-name
        centerText.innerHTML='#F08080';
    }
}


/*
* For excercise 2, you need to write an event handler for the button id "convertbtn"
* on mouse click. For best practice use addEventListener.
*
*/

convertBtn.addEventListener('click',() => {
    convertTemp();
});

/*
* Then write a function that calculates Fahrenheit to Celsius and display it on the webpage
*
*/

function convertTemp(){
    //Calculate the temperature here
    // To convert temperatures in degrees Fahrenheit to Celsius, subtract 32 and multiply by 5/9
    temp_c = (inputF.value - 32) * (5/9);

    //Send the calculated temperature to HTML
    outputC.innerHTML=temp_c;


}


