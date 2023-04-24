const API_KEY = ""
const submitButton = document.querySelector('#submit');
const outPutElement = document.querySelector('#output');
const inPutElement = document.querySelector('input');
const historyElement = document.querySelector('.history');
const buttonElement = document.querySelector('button');

function changeInput(value) {
    const inputElement  = document.querySelector('input');
    inputElement.value = value;
}
async function getMessage(){
    console.log(`LINE 06 clicked=`);
    const options = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user",
                content: inPutElement.value
            }],
            max_tokens: 100
        })
    }
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions",options)
    const data = await response.json();
    console.log(`LINE 16 data=`, data);
    outPutElement.textContent = data.choices[0].message.content;
    if(data.choices[0].message.content && inPutElement.value){
        const pElement = document.createElement('p');
        pElement.textContent = inPutElement.value;
        pElement.addEventListener ('click', () => changeInput(pElement.textContent));

        historyElement.append(pElement);

    }  
        
    } catch (error) {
        console.error(`LINE 28 error=`, error);
    }
    
    
    



}
// fetchData();
submitButton.addEventListener('click',getMessage);
function clearInput(){
    inPutElement.value = '';
}
buttonElement.addEventListener('click',clearInput)