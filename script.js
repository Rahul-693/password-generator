const length=document.getElementById("passwordlength");
const button=document.querySelector("button");
const passwords=document.querySelectorAll(".input--password");
const specialChar=document.querySelector("#special-char");
const uppercase=document.querySelector("#uppercase");
const message=document.querySelector(".error-message");

const randomItem=(arr)=>arr[(Math.random()*arr.length)|0];

function randomChar(){
    let randomNumber=Math.round(126-Math.random()*93);
    let char=String.fromCharCode(randomNumber);
    return char;
}

function makePassword(length,word){
    let arrayofChar=generateString(+length);
    const arrayofNum=[];
    
    for(let i=0;i<length;i++){
        arrayofNum.push(i);
    }

    let Num=randomItem(arrayofNum);

    if(uppercase.value==1 && specialChar.value==1){
        for(let i=0;i<length;i++){
            word+=randomChar();
        }
    }
    else if(uppercase.value==1 && specialChar.value==0){
        let item1=randomItem(arrayofChar);
        let item2=randomItem(arrayofChar);
        for(let i=Num;i<length;i++){
            arrayofChar.splice(arrayofChar.indexOf(item1),1,item2.toUpperCase());
        }
        word+=arrayofChar.join("");
    }
    else{
        word+=arrayofChar.join("");
    }
    return word;
}

function generatePassword(){
    let word="";
    message.classList.remove("visibility");
    if(length.value<=0){
        return displayErrorMessage();
    }
    else if(length.value>20){
        return displayErrorLengthMessage();
    }
    else{
        passwords.forEach((password)=>{
            return (password.value=makePassword(length.value,word));
        });
    }
}

function displayErrorMessage(){
    message.classList.add("visibility");
    message.classList.remove("message");
    message.textContent="Password must have at least one character";
}

function displayErrorLengthMessage(){
    message.classList.add("visibility");
    message.classList.remove("message");
    message.textContent="Password will cause problems if more that 20 characters long";
}

function copyMessage(){
    message.classList.add("visibility");
    message.classList.add("message");
    message.textContent="Password copied";
}

function copyToClipboard() {
    /* Select the text field */
  
    this.select();
    this.setSelectionRange(0, 99999); /*For mobile devices */
  
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(this.value);
  
    /*display message*/
    if (this.value != "") {
      copyMessage();
    }
  }
  
button.addEventListener("click",generatePassword);

passwords.forEach((password) => {
    password.addEventListener("click", copyToClipboard);
  });

const generateString = (howLong) =>
    Array(howLong)
      .fill("")
      .map((v) => Math.random().toString(36).charAt(2));
  