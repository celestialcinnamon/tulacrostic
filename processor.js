const fs = require('fs');

let dataset;
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

fs.readFile("./dataset.txt", function(err, data) {
    console.log("Reading file...")
    if(err) {
        console.error(err);
        return;
    }
    
    console.log("Processing data...");
    dataset = sliceIntoLines(data.toString());
    dataset = uniquify(dataset);

    console.log("Saving to file...");
    fs.writeFile("./data.json", JSON.stringify(dataset), err => console.error("There was an error: " + err));

    console.log("Done.");
})



function sliceIntoLines(dataset) {
    return dataset
        .split("\n")
        .filter(line => line.length > 1)
        .sort();
}

function getLinesStartingWith(letter) {
    return dataset.filter(line => letter[0].toUpperCase() === line[0].toUpperCase());
}

var uniquify = (arrArg) => arrArg.filter((elem, pos, arr) => arr.indexOf(elem) == pos); 