let jsonarray = []
let json;
let historico;

//buton advice
document.querySelector(".advice").addEventListener("click", async () => {
    let req = await fetch("https://api.adviceslip.com/advice");
    json = await req.json();

    document.querySelector(".box").innerHTML = json.slip.advice
})

//button save
document.querySelector(".save-advice").addEventListener("click", () => {
    let stringJsonArray = JSON.stringify(jsonarray)
    let stringJson = JSON.stringify(json)
    if(stringJsonArray.includes(stringJson)){
        document.querySelector("#modal-text").innerHTML = "Advice repetead"
        document.querySelector(".modal").style.opacity = 1
        document.querySelector(".modal").style.pointerEvents = "all"
    }else{
        if(jsonarray.length < 8){
            historico = document.querySelector(".div-historico")

            jsonarray.push(json);

            let html = `<div class="advice-saved"> <span>${json.slip.advice}</span> <button class="img-trash"> <img class="img" src="Images/trash-black.svg"> </button> </div>`

            document.querySelector(".Empty").style.display = "none"

            historico.innerHTML += html
            historico.style.alignItems = "flex-start"
            historico.style.justifyContent = "flex-start"
            let imgs = document.querySelectorAll(".img") 
            let boxAdviceSaved = document.querySelectorAll(".advice-saved") 
            for (let i in imgs){
                boxAdviceSaved[i].setAttribute("id", "cor"+[i]+"")
                imgs[i].setAttribute("onclick", "mouseClickTrashImg("+ jsonarray[i].slip.id +")");
                imgs[i].setAttribute("onmouseover", "mouseOverTrashImg(this)")
                imgs[i].setAttribute("onmouseout", "mouseOutTrashImg(this)")  
            }
        }else{
            document.querySelector(".modal").style.opacity = 1
            document.querySelector(".modal").style.pointerEvents = "all"
            document.querySelector("#modal-text").innerHTML = "The Advice limit save is eight (8)"
        }
    }
})

//modal button
document.querySelector("#button-ok-modal").addEventListener("click", () => {
    document.querySelector(".modal").style.opacity = 0
    document.querySelector(".modal").style.pointerEvents = "none"
})

//function trashImg
function mouseOverTrashImg(img){
    img.src = "Images/trash-red.svg"
}

//function trashImg
function mouseOutTrashImg(img){
    img.src = "Images/trash-black.svg"
}

//function trashImg
function mouseClickTrashImg(id){
    for (let i in jsonarray){
        if (jsonarray[i].slip.id == id){
            jsonarray.splice(i, 1)
            let box = document.querySelectorAll(".advice-saved")
            box[i].outerHTML = ""
        }
        if (jsonarray.length == 0){
            let empty = document.querySelector(".Empty")
            empty.style.display = "block"
            historico.style.alignItems = "center"
            historico.style.justifyContent = "center"
        }
    }
}
