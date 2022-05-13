let dataArray = []
let boardSavesAdvices;
let data;

const fetchData = async () => {
    let req = await fetch("https://api.adviceslip.com/advice");
    let json = await req.json();

    return json
}

//buton advice
const clickDrawAdvice = async () => {
    data = await fetchData()
    document.querySelector(".box").innerHTML = data.slip.advice
}

const adviceRepeteadWarning = () => {
    document.querySelector("#modal-text").innerHTML = "Advice repetead";
    document.querySelector(".modal").classList.add("modalWarning");
}

const adviceLimitWarning = () => {
    document.querySelector(".modal").classList.add("modalWarning");
    document.querySelector("#modal-text").innerHTML = "The Advice limit save is eight (8)"
}

const createImageDelete = () => {
    let imgs = document.querySelectorAll(".img") 
    let boxAdviceSaved = document.querySelectorAll(".advice-saved") 
    for (let i in boxAdviceSaved){
        imgs[i].setAttribute("onmouseover", "mouseOverTrashImg(this)")
        imgs[i].setAttribute("onmouseout", "mouseOutTrashImg(this)")  
        imgs[i].setAttribute("onclick", "mouseClickTrashImg("+ dataArray[i].slip.id +")");
        boxAdviceSaved[i].setAttribute("id", "cor"+[i])
    }
}

const clickSaveAdvice = () => {
    let stringDataArray = JSON.stringify(dataArray)
    let stringData = JSON.stringify(data)
    if(stringDataArray.includes(stringData)){
        adviceRepeteadWarning()
    }else{
        if(dataArray.length < 8){
            boardSavesAdvices = document.querySelector(".Board-Saved-Advices")

            dataArray.push(data);

            let spanAdvice = `<span>${data.slip.advice}</span> `;
            let buttonTrashDelete = `<button class="img-trash">`+
                                        `<img class="img" src="assets/Images/trash-white.png">`+
                                    `</button>`;

            let divcardNew = `<div class="advice-saved">`+ 
                                `${spanAdvice}`+
                                `${buttonTrashDelete}`+
                             `</div>`;

            document.querySelector(".Empty").style.display = "none"

            boardSavesAdvices.innerHTML += divcardNew
            boardSavesAdvices.style.alignItems = "flex-start"
            boardSavesAdvices.style.justifyContent = "flex-start"
            createImageDelete()
        }else{
            adviceLimitWarning()
        }
    }
} 

function mouseOverTrashImg(img){
    img.src = "assets/Images/trash-black.png"
}

function mouseOutTrashImg(img){
    img.src = "assets/Images/trash-white.png"
}

function mouseClickTrashImg(id){
    for (let i in dataArray){
        if (dataArray[i].slip.id == id){
            dataArray.splice(i, 1)
            let box = document.querySelectorAll(".advice-saved")
            box[i].outerHTML = ""
        }
        if (dataArray.length == 0){
            let empty = document.querySelector(".Empty")
            empty.style.display = "block"
            boardSavesAdvices.style.alignItems = "center"
            boardSavesAdvices.style.justifyContent = "center"
        }
    }
}

document.querySelector("#button-ok-modal").addEventListener("click", () => {
    document.querySelector(".modal").classList.remove("modalWarning");
})
