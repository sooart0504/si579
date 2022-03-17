/**
 * Returns a list of objects grouped by some property. For example:
 * groupBy([{name: 'Steve', team:'blue'}, {name: 'Jack', team: 'red'}, {name: 'Carol', team: 'blue'}], 'team')
 *
 * returns:
 * { 'blue': [{name: 'Steve', team: 'blue'}, {name: 'Carol', team: 'blue'}],
 *    'red': [{name: 'Jack', team: 'red'}]
 * }
 *
 * @param {any[]} objects: An array of objects
 * @param {string|Function} property: A property to group objects by
 * @returns  An object where the keys representing group names and the values are the items in objects that are in that group
 */

 function groupBy(objects, property) {
    // If property is not a function, convert it to a function that accepts one argument (an object) and returns that object's
    // value for property (obj[property])
    if(typeof property !== 'function') {
        const propName = property;
        property = (obj) => obj[propName];
    }

    const groupedObjects = new Map(); // Keys: group names, value: list of items in that group
    for(const object of objects) {
        const groupName = property(object);
        //Make sure that the group exists
        if(!groupedObjects.has(groupName)) {
            groupedObjects.set(groupName, []);
        }
        groupedObjects.get(groupName).push(object);
    }

    // Create an object with the results. Sort the keys so that they are in a sensible "order"
    const result = {};
    for(const key of Array.from(groupedObjects.keys()).sort()) {
        result[key] = groupedObjects.get(key);
    }
    return result;
}



// Initialize DOM elements that will be used.
const outputDescription = document.querySelector('#output_description');
const wordOutput = document.querySelector('#word_output');
const showRhymesButton = document.querySelector('#show_rhymes');
const showSynonymsButton = document.querySelector('#show_synonyms');
const wordInput = document.querySelector('#word_input');
const savedWords = document.querySelector('#saved_words');

// Stores saved words.
const savedWordsArray = [];



/**
 * Makes a request to Datamuse and updates the page with the
 * results.
 *
 * Use the getDatamuseRhymeUrl()/getDatamuseSimilarToUrl() functions to make
 * calling a given endpoint easier:
 * - RHYME: `datamuseRequest(getDatamuseRhymeUrl(), () => { <your callback> })
 * - SIMILAR TO: `datamuseRequest(getDatamuseRhymeUrl(), () => { <your callback> })
 *
 * @param {String} url
 *   The URL being fetched.
 * @param {Function} callback
 *   A function that updates the page.
 */

function datamuseRequest(url, callback) {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            // This invokes the callback that updates the page.
            callback(data);
        }, (err) => {
            console.error(err);
        });
}



/**
 * Gets a URL to fetch rhymes from Datamuse
 *
 * @param {string} rel_rhy
 *   The word to be rhymed with.
 *
 * @returns {string}
 *   The Datamuse request URL.
 */

function getDatamuseRhymeUrl(rel_rhy) {
    return `https://api.datamuse.com/words?${(new URLSearchParams({'rel_rhy': wordInput.value})).toString()}`;
}



/**
 * Gets a URL to fetch 'similar to' from Datamuse.
 *
 * @param {string} ml
 *   The word to find similar words for.
 *
 * @returns {string}
 *   The Datamuse request URL.
 */

function getDatamuseSimilarToUrl(ml) {
    return `https://api.datamuse.com/words?${(new URLSearchParams({'ml': wordInput.value})).toString()}`;
}



/**
 * Add a word to the saved words array and update the #saved_words `<span>`.
 *
 * @param {string} word
 *   The word to add.
 */

function addToSavedWords(word) {
    // You'll need to finish this...

    // word is added to savedWordsArray
    // append the list of saved words in the savedWordsArray to the innerHTML of savedWords (separated by commas) - .join()
    //
    console.log(word);

    savedWordsArray.push(word);
    savedWords.innerHTML = savedWordsArray.join(', ');

    // ids = [1, 2, 3, 4];
    // val = ids.join(', ');
    // val is now "1, 2, 3, 4"
}



// Add additional functions/callbacks here.
savedWords.innerHTML += '(none)';



// Add event listeners here.
showRhymesButton.addEventListener('click', () => {
    datamuseRequest(getDatamuseRhymeUrl(), (data) => {
        outputDescription.innerHTML = `Words that rhyme with ${wordInput.value}`
        wordOutput.innerHTML = '...loading';

        if (data.length) {
            wordOutput.innerHTML = '';
            console.log(data)

            sorted_data = groupBy(data, 'numSyllables');
            console.log(sorted_data)

            for (const [key, value] of Object.entries(sorted_data)) {
                console.log(key);
                console.log(value);

                wordOutput.innerHTML += `<h3>Syllables: ${key}</h3>`
                // wordOutput.innerHTML += `<ul>`
                // value.forEach((word) => {
                //     wordOutput.innerHTML += `<li class="list-group-item">${word.word}</li>`;
                // })
                // wordOutput.innerHTML += `</ul>`

                var temp = "";
                temp += `<ul>`
                value.forEach((word) => {
                    temp += `<li>${word.word} <button class="btn-success" onclick="addToSavedWords('${word.word}')"> Save </button> </li>`;
                })
                temp += `</ul>`

                wordOutput.innerHTML += temp;
            }

            // sorted_data.forEach((array) => {
            //     if (array.numSyllables == 1) {
            //         wordOutput.innerHTML += `<h3>Syllables: 1</h3>`
            //         wordOutput.innerHTML += `<ul>`

            //         array.forEach((item) => {
            //             wordOutput.innerHTML += `<li class="list-group-item">${item.word}</li>`;
            //         })

            //         wordOutput.innerHTML += `</ul>`
            //     }

            //     if (array.numSyllables == 2) {
            //         wordOutput.innerHTML += `<h3>Syllables: 2</h3>`
            //         wordOutput.innerHTML += `<ul>`

            //         array.forEach((item) => {
            //             wordOutput.innerHTML += `<li class="list-group-item">${item.word}</li>`;
            //         })

            //         wordOutput.innerHTML += `</ul>`
            //     }

            //     if (array.numSyllables == 3) {
            //         wordOutput.innerHTML += `<h3>Syllables: 3</h3>`
            //         wordOutput.innerHTML += `<ul>`

            //         array.forEach((item) => {
            //             wordOutput.innerHTML += `<li class="list-group-item">${item.word}</li>`;
            //         })

            //         wordOutput.innerHTML += `</ul>`
            //     }

            //     if (array.numSyllables == 4) {
            //         wordOutput.innerHTML += `<h3>Syllables: 4</h3>`
            //         wordOutput.innerHTML += `<ul>`

            //         array.forEach((item) => {
            //             wordOutput.innerHTML += `<li class="list-group-item">${item.word}</li>`;
            //         })

            //         wordOutput.innerHTML += `</ul>`
            //     }
            // });

        } else {
            wordOutput.innerHTML = '(no results)';
        }

    })
})


showSynonymsButton.addEventListener('click', () => {
    datamuseRequest(getDatamuseSimilarToUrl(), (data) => {
        outputDescription.innerHTML = `Words with a similar meaning to ${wordInput.value}`
        wordOutput.innerHTML = '...loading';

        if (data.length) {
            wordOutput.innerHTML = '';

            data.forEach((item) => {
                wordOutput.innerHTML += `<li>${item.word} <button class="btn-success" onclick="addToSavedWords('${item.word}')"> Save </button> </li>`;
                // add a save button
                // When save button is clicked, activate addToSavedWords
                // <button onclick={() => addToSavedWords(item.word)}> Save </button>
            })


        } else {
            wordOutput.innerHTML = '(no results)';
        }
    })
})