let itemName = document.querySelector("#item-name");
let itemCost = document.querySelector("#item-cost");

let invalidName = document.querySelector("#invalid-name");
let invalidCost = document.querySelector("#invalid-cost");

function isNameValid(value){
    if(itemName.classList.contains("is-invalid")){
        itemName.classList.remove("is-invalid");
        invalidName.innerText = "";
    }
    if(value == ""){
        itemName.classList.add("is-invalid");
        invalidName.innerText = "Name cannot be empty.";
        return false
    }
    if(!isNaN(value)){
        itemName.classList.add("is-invalid");
        invalidName.innerText = "Name cannot be a number.";
        return false
    }
    return true
}

function isCostValid(value){
    if(itemCost.classList.contains("is-invalid")){
        itemCost.classList.remove("is-invalid");
        invalidCost.innerText = "";
    }
    if(value == ""){
        itemCost.classList.add("is-invalid");
        invalidCost.innerText = "Cost cannot be empty.";
        return false
    }
    if(isNaN(value)){
        itemCost.classList.add("is-invalid");
        invalidCost.innerText = "Cost must be numeric.";
        return false
    }
    return true
}