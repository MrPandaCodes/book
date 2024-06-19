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

let id = 0;



function displayBook() {
    const last = library[library.length - 1];

    let book = document.createElement("div");
    let bookTitle = document.createElement("div");
    let bookPage = document.createElement("div");
    let bookScore = document.createElement("div");
    let bookPaScWrapper = document.createElement("div");
    let bookBody = document.createElement("div");
    let buttonDeleteBook = document.createElement("button");
    let buttonReadBook = document.createElement("button");
    let wrapperButtons= document.createElement("div");
    let wrapper = document.createElement("div");

    bookTitle.textContent = last.name;
    bookBody.textContent = last.text;
    bookScore.textContent = `Score ${last.star} / 5`;
    bookPage.textContent = `Pages: ${last.pages}`;
    buttonDeleteBook.setAttribute("data", `${last.id}`);
    buttonReadBook.setAttribute("data", `${last.id}`);
    //Style created elements
    wrapperButtons.classList.add("wrapperButtons");
    buttonDeleteBook.classList.add("buttonDeleteBook");
    buttonReadBook.classList.add("buttonReadBook");
    //Add created elements to DOM 
    book.appendChild(bookTitle);
    book.appendChild(bookPaScWrapper);
    bookPaScWrapper.appendChild(bookScore);
    bookPaScWrapper.appendChild(bookPage);
    book.appendChild(bookBody);
    book.appendChild(wrapperButtons);
    wrapperButtons.appendChild(buttonReadBook);
    wrapperButtons.appendChild(buttonDeleteBook);
    wrapper.appendChild(book);
    display.appendChild(wrapper);
    //Add book delete buttons to an array
    //Add eventlistener to book deleting button
    buttonDeleteBook.addEventListener("click", (e)=>{
        let book = library[library.findIndex((el)=> el.id==e.target.getAttribute("data"))];
        book.remove();
        let bookDisplay = e.target.parentNode.parentNode.parentNode;
        bookDisplay.style.display="none";
    })
    buttonReadBook.addEventListener("click", (e)=>{
        let book = library[library.findIndex((el)=> el.id==e.target.getAttribute("data"))];
        console.log(book, book.read);
        if(book.read==false){
            book.read=true;
            buttonReadBook.classList.add("check");
        }
        else{
            book.read=false;
            buttonReadBook.classList.remove("check");
        }
    });
}

class Book {
    constructor(titleInputValue, bodyInputValue, star, pages) {
        this.name = titleInputValue;
        this.text = bodyInputValue;
        this.star = star;
        this.pages = pages;
        this.id = ++id;
        this.read = false;
        console.log(this.id);
        id = this.id;
        library.push(this);
    }
    //Find index of book object in library array using book.id and remove book object
    remove() {
        library.splice(library.findIndex((x) => x.id == this.id), 1);
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


