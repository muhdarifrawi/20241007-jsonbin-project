const JSON_BIN_URL = "https://api.jsonbin.io/v3";
const JSON_BIN_ID = "66a9cdcce41b4d34e419881c";

let originalData = {};
let dataLength = {};

async function loadData(){
    let response = await axios.get(`${JSON_BIN_URL}/b/${JSON_BIN_ID}/latest`);
    console.log("data loaded: ", response);
    originalData.record = response.data.record;
    // return response.data.record;
    console.log(originalData);
    idKeeper(originalData.record);
    checkInitialDataLength();
    // return originalData
}

// async function exisitingItemsId(){
//     let a = "items";
//     let response = await axios.get(`${JSON_BIN_URL}/b/${JSON_BIN_ID}/latest`);
//     let itemsData = response.data.record[a];
//     let arrId = itemsData.map(arr => arr.id);
//     console.log(arrId);
// }

// exisitingItemsId();


async function addData(keyword, itemName,itemCost){
    // let keyword = "items"
    let id = generateId();
    let newData = {
        "id":id,
        "name":itemName,
        "cost":Number(itemCost),
        "saved":false
    }
    console.log(newData)
    originalData.record[keyword].push(newData);
    console.log(originalData);
}

// addData();

function checkInitialDataLength(){
    for(each in originalData.record){
        console.log(originalData.record[each].length);
        let currentInfoLength = originalData.record[each].length;
        dataLength[each] = currentInfoLength
    }
}

async function saveData(){
    try{
        await axios.put(`${JSON_BIN_URL}/b/${JSON_BIN_ID}`, originalData.record);
    }
    catch(error){
        console.log(error);
        return false
    }
    return true
}