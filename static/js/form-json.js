function objectifyForm(formArray) {//serialize data function
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++){
        if(formArray[i]["value"] != '') {
            returnArray[formArray[i]["name"]] = formArray[i]["value"];
        }
    }
    return returnArray;
}

function convertFormToJson(form) {
    var formData = form.serializeArray();
    var jsonData = objectifyForm(formData);
    jsonData = JSON.stringify(jsonData);
    return jsonData;
}