"use strict";
var dataset;
document.addEventListener("DOMContentLoaded", function(e){
    let promise = fetch("/data.json");
    promise.then(raw => raw.json())
        .then(data => {
            dataset = data
            Object.freeze(dataset);
        });

    document
        .getElementById('tula-form')
        .addEventListener("submit", function(e) {
            e.preventDefault();

            let phrase = this['phr'].value.replace(/\s|\W/g, '').toUpperCase().split('');
            phrase = phrase.map(letter => findLineStartingWith(letter));

            const html = phrase.map(line => `${line}<br/>`).join('');
            document.getElementById('tula')
                .innerHTML = html;
        })
})

function findLineStartingWith(letter) {
    let lines = dataset.filter(line => letter[0].toUpperCase() === line[0].toUpperCase());    
    let index = getRandomArbitrary(0, lines.length);

    return (lines[index] || '')
        .replace(/undefined<br\/>/g, '')
        .replace(/^\W\s/g, '');
}

function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}