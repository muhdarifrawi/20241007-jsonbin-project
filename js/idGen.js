// This just makes random id for use
// borrowed from: 
// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
let idBook =[];

function idKeeper(data){
    // console.log(data)
    for(properties in data){
        // console.log("idKeeper: ", data[properties]);
        for(each of data[properties]){
            // console.log(each.id);
            idBook.push(each.id);
        }
    }
    // console.log(idBook);
}

function generateId() {
    let keyLength = 12;
    // console.log("genId load data: ", loadData)
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    let generatedID = "";

    let counter = 0;
    while (counter < keyLength) {
        generatedID += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }

    console.log(generatedID)
    // idk if this will work
    if(checkId(generatedID)){
        generateId();
    }
    else{
        idBook.push(generatedID);
    }
    

    return generatedID;
}

function checkId(generatedID){
    let searchId = idBook.includes(generatedID);
    // console.log(searchId);
    return searchId;
}
