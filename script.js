const library = [];
let buttonArray = [];
const newbookButton = document.getElementById("newbook");
const display = document.getElementById("display");
const board = document.getElementById("function");
const scoreDisplay = document.getElementById("score");
const starsInput = document.getElementById("stars");
const titleInput = document.getElementById("title");
const pagesInput = document.getElementById("pages");
const bodyInput = document.getElementById("text-body");
const submitButton = document.getElementById("submit");
const exitButton = document.getElementById("exit");
const clearButton = document.getElementById("reset");

let index = 0;



function displayBook() {
    const last = library[library.length - 1];

    let book = document.createElement("div");
    let bookTitle = document.createElement("div");
    let bookPage = document.createElement("div");
    let bookScore = document.createElement("div");
    let bookPaScWrapper = document.createElement("div");
    let bookBody = document.createElement("div");
    let buttonDeleteBook = document.createElement("button");
    let wrapper = document.createElement("div");

    bookTitle.textContent = last.name;
    bookBody.textContent = last.text;
    bookScore.textContent = `Score ${last.star} / 5`;
    bookPage.textContent = `Pages: ${last.pages}`;
    buttonDeleteBook.setAttribute("data", `${last.index}`);
    //Add created elements to DOM 
    book.appendChild(bookTitle);
    book.appendChild(bookPaScWrapper);
    bookPaScWrapper.appendChild(bookScore);
    bookPaScWrapper.appendChild(bookPage);
    book.appendChild(bookBody);
    book.appendChild(buttonDeleteBook);
    wrapper.appendChild(book);
    display.appendChild(wrapper);
    //Add book delete buttons to an array
    buttonArray=document.querySelectorAll("button[data]");
    buttonArray.forEach(e => {
        e.addEventListener("click", (el) => {
            console.log(el);
           let book = library[library.findIndex((x)=> x.index==el.target.getAttribute("data"))]
           console.log(book);
        })
    
    });
}

class Book {
    constructor(titleInputValue, bodyInputValue, star, pages) {
        this.name = titleInputValue;
        this.text = bodyInputValue;
        this.star = star;
        this.pages = pages;
        this.index = ++index;
        console.log(this.index);
        index = this.index;
        library.push(this);
        console.log("book added success");
    }
    remove(index) {
        library.splice(library.findIndex((e) => e.index == index), 1);
    }
}



function createBook() {
    let titleInputValue = titleInput.value;
    let bodyInputValue = bodyInput.value;
    let starsInputValue = starsInput.value;
    let pagesInputValue = pagesInput.value;
    let book = new Book(titleInputValue, bodyInputValue, starsInputValue, pagesInputValue);
    displayBook();
}

//Display score aside the score slider
function scoreDisplayer(e) {
    scoreDisplay.innerHTML = `${e.target.value} / 5`
}
starsInput.addEventListener("input", (e) => scoreDisplayer(e))

submitButton.addEventListener("click", (e) => {
    if (titleInput.value !== "" && pagesInput.value !== "" && bodyInput.value !== "") {
        console.log("book displayed")
        createBook()
    }
});
newbookButton.addEventListener("click", (e) => { board.style.display = "grid" });
clearButton.addEventListener("click", (e) => {
    starsInput.value = "";
    titleInput.value = "";
    bodyInput.value = "";
    pagesInput.value = "";
    console.log("cleared");
});
exitButton.addEventListener("click", (e) => { board.style.display = "none" });

