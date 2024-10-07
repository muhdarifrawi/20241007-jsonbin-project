document.addEventListener("DOMContentLoaded", async function () {
    console.log("DOM Loaded");

    await loadData();
    // console.log(data);

    addBtn();
    saveBtn();
    renderInfo();
})

let keyword = "";
let deletedInfo = false;
let editedInfo = false;

function renderInfo() {
    console.log(originalData);
    keyword = "items";
    // console.log(data[keyword]);
    let dataToRender = originalData.record[keyword];

    let itemList = document.querySelector("#item-list");
    itemList.innerHTML = "";
    let counter = 1;
    for (each of dataToRender) {
        console.log("counter and length>>>",counter, dataLength[keyword]);
        let className = "";
        let newPill = "";
        if (!each.saved) {
            className = ` class="table-success"`;
            newPill = `<span class="badge text-bg-success">New!</span>`;
        }
        if (deletedInfo == true || editedInfo == true || (counter > dataLength[keyword] && dataLength[keyword] != 0 )) {
            document.querySelector("#save-btn").classList.remove("invisible");
            document.querySelector("#save-btn").classList.add("visible");
        }
        else {
            document.querySelector("#save-btn").classList.remove("visible");
            document.querySelector("#save-btn").classList.add("invisible");
        }
        // console.log(each);
        let info = `<tr ${className} id=${each.id}>
                        <td>${each.id}</td>
                        <td>${each.name} ${newPill}</td>
                        <td>${each.cost}</td>
                        <td>
                            <button type="button" class="btn btn-secondary edit" 
                            data-${keyword}-id="${each.id}">
                                Edit
                            </button>
                            <button type="button" class="btn btn-danger delete"
                            data-${keyword}-id="${each.id}">
                                Delete
                            </button>
                        </td>
                    </tr>`
        itemList.innerHTML += info;
        counter += 1;
    }

    let allDeleteBtns = document.querySelectorAll(".delete");
    for (each of allDeleteBtns) {
        each.addEventListener("click", deleteBtn)
    }
    let allEditBtns = document.querySelectorAll(".edit");
    for (each of allEditBtns) {
        each.addEventListener("click", editBtn)
    }
}

function addInfo() {
    keyword = "items"
    let itemName = document.querySelector("#item-name").value;
    let itemCost = document.querySelector("#item-cost").value;
    let checkName = isNameValid(itemName);
    let checkCost = isCostValid(itemCost);
    if(checkName && checkCost){
        addData(keyword, itemName, itemCost);
        itemName = "";
        itemCost = "";
        renderInfo();
    }
    
}

function addBtn() {
    let addBtn = document.querySelector("#add-btn");
    addBtn.addEventListener("click", addInfo);
}

function saveInfo() {
    savingBtn(true)
    let alertBanner = document.querySelector("#alert-banner");
    alertBanner.innerHTML = "";
    originalData.record[keyword].map((i) => {
        i.saved = true;
    })
    console.log(originalData.record.items);
    if(saveData()){
        alertBanner.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                    <strong>Save success!</strong> .
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>`;
    }
    else{
        alertBanner.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>Failed to save</strong> .
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>`;
    }
    savingBtn(false);
    renderInfo();
}

function savingBtn(status) {
    let saveBtn = document.querySelector("#save-btn");
    saveBtn.innerHTML = "";
    if (status) {
        saveBtn.disabled = true;
        saveBtn.innerHTML = `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <span class="visually-hidden" role="status">Saving...</span>`;
    }
    else{
        saveBtn.disabled = false;
        saveBtn.innerHTML = "Save"
    }
    deletedInfo = false;
}

function saveBtn() {
    let saveBtn = document.querySelector("#save-btn");
    saveBtn.addEventListener("click", saveInfo)
}

function deleteBtn(event) {
    console.log(event.target.dataset[`${keyword}Id`]);
    let currentId = event.target.dataset[`${keyword}Id`];
    let newData = originalData.record[keyword].filter((i) => {
        // console.log(i)
        if (i.id != currentId) {
            return i
        }
    })

    originalData.record[keyword] = newData;
    // console.log(originalData.record[keyword].length)
    console.log(dataLength);
    dataLength[keyword] -= 1;
    console.log(dataLength);
    deletedInfo = true;
    renderInfo();
}

function editBtn(event){
    console.log(event.target);
    console.log(event.target.dataset[`${keyword}Id`]);
    let currentId = event.target.dataset[`${keyword}Id`];
    let row = document.querySelector(`#${currentId}`).querySelectorAll("td");
    if(event.target.innerText== "Edit"){
        event.target.innerText = "Done";
        for(i=0;i<row.length;i++){
            console.log(row[i])
            if(i==1 || i==2){
                let value = row[i].innerText
                row[i].innerHTML ="";
                row[i].innerHTML =`<input type="text" value="${value}" class="form-control">`;
            }
        }
    }
    else if(event.target.innerText== "Done"){
        event.target.innerText = "Edit";
        for(i=0;i<row.length;i++){
            if(i==1 || i==2){
                console.log(row[i])
                let value = row[i].children[0].value;
                row[i].innerHTML ="";
                row[i].innerHTML =`${value}`;
            }
        }
        let newData = originalData.record[keyword].map((i) => {
            // console.log(i)
            if (i.id == currentId) {
                i.name = row[1].innerText;
                i.cost = Number(row[2].innerText);
            }
            return i
        })
    
        originalData.record[keyword] = newData;
        console.log(originalData); 
        editedInfo = true;
        renderInfo();
    }
}

