function hello() {
    new google.translate.TranslateElement({ pageLanguage: 'en', layout: google.translate.TranslateElement.FloatPosition.TOP_LEFT }, 'quote_block');
}
// Display today's date
const todayDate = dayjs().format('MM/DD/YYYY');
const dateEl = document.getElementById("currentDate");
dateEl.textContent = todayDate

// Global Variable used to store the quotes 
// fetched from the API
var data;
let front = true;

// Getting the front and the back author boxes
const authors = document.querySelectorAll(".author");
const authors2 = document.querySelectorAll(".tranAuthor");

// Getting the front and the back texts
let texts = document.querySelectorAll(".text");
const texts2 = document.querySelectorAll(".tranText");
// Getting the body
const body = document.getElementById("body");

// Getting the buttons
const button = document.querySelectorAll(".new-quote");
const save = document.querySelectorAll(".save")
const rerun = document.querySelectorAll(".rerun")
const blockFront = document.querySelector(".block__front");
const blockBack = document.querySelector(".block__back");
let author2 = ""
let quotetosave = ""

const authorFront = authors[0];
const authorBack = authors[1];
const authorFront2 = authors[0];
const authorBack2 = authors[1];

const textFront = texts[0];
const textBack = texts[1];
// const textFront2 = texts[0];
// const textBack2 = texts[1];
const buttonFront = button[0];
const buttonBack = button[1];
const trans = document.getElementById("google_translate_element");

// An arrow function used to get a quote randomly
const displayQuote = () => {

    // Generates a random number between 0 
    // and the length of the dataset
    let index = Math.floor(Math.random() * data.length);

    // Stores the quote present at the randomly generated index
    let quote = data[index].text;

    // Stores the author of the respective quote
    let author = data[index].author;

    // Making the author anonymous if no author is present
    if (!author) {
        author = "Anonymous"
    }

    // Replacing the current quote and the author with a new one

    if (front) {
        // Changing the front if back-side is displayed
        textFront.innerHTML = quote;
        authorFront.innerHTML = author;
      
    console.log(authorFront2);
    } else {
        // Changing the back if front-side is displayed
        textBack.innerHTML = quote;
        authorBack.innerHTML = author;
    }

    front = !front;

}
// help.on('click', function(){
//     hello
// });


// Fetching the quotes from the type.fit API using promises
fetch("https://type.fit/api/quotes")
    .then(function (response) {
        return response.json();
    }) // Getting the raw JSON data
    .then(function (data) {

        // Storing the quotes internally upon 
        // successful completion of request
        this.data = data;

        // Displaying the quote When the Webpage loads
        displayQuote()
    });


// Adding an onclick listener for the button
function newQuote() {

    // Rotating the Quote Box
    blockBack.classList.toggle('rotateB');
    blockFront.classList.toggle('rotateF');

    // Displaying a new quote when the webpage loads
    displayQuote();
}



const translateEL = document.getElementById("texttotranslate").children[0].children[1].innerText
console.log(translateEL)
const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2/detect';
const options = {
    method: 'POST',
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': 'da30ef9e92msh9064eb8ecf5ca2ep1640fdjsn765e66d2173f',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
    },
    // body: new URLSearchParams({
    //     q: 'English is hard, but detectably so'
    // })
};


async function test() {
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    };
}
// function hello() {
//     new google.translate.TranslateElement({ pageLanguage: 'en', layout: google.translate.TranslateElement.FloatPosition.TOP_LEFT }, 'quote_block');
// };
function transf() {
    save[0].addEventListener('click', function () {
        quotetosave = texts[0].innerText + "-" + authors[0].innerText;
        console.log(quotetosave);
        localStorage.setItem('Quote', JSON.stringify(quotetosave));
    });
}
transf()

function transf2() {
    save[0].addEventListener('click', function () {
        quoteto = texts[1].innerText + "-" + authors[1].innerText;
        console.log(quoteto);
        localStorage.setItem('Quote', JSON.stringify(quoteto));
    });
}
transf2()

rerun[0].addEventListener('click', function () {

    var saveQuote = JSON.parse(localStorage.getItem('Quote'));
    var quoteText = saveQuote.split("-")[0]
    var authorText = saveQuote.split("-")[1]
    texts[0].textContent = quoteText;
    authors[0].textContent = authorText
    // let wierd = texts.replace(saveQuote)
    console.log(saveQuote);
});