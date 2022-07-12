let library = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    let readMessage = "",
      info = "";

    if (read) {
      readMessage = "read";
    } else {
      readMessage = "not read yet";
    }

    info = `${this.title} by ${this.author}, ${this.pages} pages, ${readMessage}`;
    return info;
  };
}

//prompts user to enter book information
function addBooktoLibrary() {
  let valid = true;
  let title = prompt("Book Title: ");
  let author = prompt("Author: ");
  let pages = prompt("# of Pages: ");
  let read = prompt("Have you read it? (y/n): ");

  // pages variable input validation and integer conversion
  do {
    valid = true;
    pages = parseInt(pages, 10);
    if (!pages) {
      valid = false;
      pages = prompt(
        "Ok, that was not a number that I can decipher, dude. Try again. How many pages? : "
      );
    }
  } while (!valid);

  // read variable input validation and boolean conversion
  do {
    valid = true;
    if (read.slice(0, 1).toLowerCase() == "y") {
      read = true;
    } else if (read.slice(0, 1).toLowerCase() == "n") {
      read = false;
    } else {
      valid = false;
      read = prompt(
        "Invalid Input. Now tell me, have your read this book or not? (y/n): "
      );
    }
  } while (!valid);

  let newBook = new Book(title, author, pages, read);
  library.push(newBook);
  return newBook;
}

//adds individual books to dom
const libraryContainer = document.querySelector("#library-container");
function addBooktoDOM(currBook) {
  const div = document.createElement("div");
  const p = document.createElement("p");
  p.innerText = currBook.info();
  div.appendChild(p);
  //use insert before so newest title appears at top
  libraryContainer.insertBefore(div, libraryContainer.firstChild);
}

// loops through array to display books on dom
//ran only once when page is first loaded
function displayLibrary() {
  for (const currBook of library) {
    addBooktoDOM(currBook);
  }
}

const addBook = document.querySelector("#add-book");
addBook.addEventListener("click", () => {
  //prompts user to add book, new book is added to library, then added to dom
  // does not require rerenderering entire library on dom
  addBooktoDOM(addBooktoLibrary());
});

theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, false);
ocarina = new Book("Ocarina of Time", "Akira Himekawa", 370, false);
catcher = new Book("Catcher in the Rye", "J.D. Salinger", 250, true);
goblet = new Book("The Goblet of Fire", "J.K. Rowling", 634, true);
library.push(theHobbit);
library.push(ocarina);
library.push(catcher);
library.push(goblet);
displayLibrary();
