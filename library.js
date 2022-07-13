let library = [];
let index = 0;

// book object literal
// updates index when called
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.index = index;
  index++;
  this.info = function () {
    let info = `${this.title} by ${this.author}, ${this.pages} pages`;
    return info;
  };
}
//toggles read boolean
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

//prompts user to enter book information
function addBooktoLibrary() {
  const title = document.querySelector("#book-title");
  const author = document.querySelector("#author");
  const pages = document.querySelector("#pages");
  const read = document.querySelector("#read");

  let newBook = new Book(title.value, author.value, pages.value, read.checked);
  library.push(newBook);
  return newBook;
}

//removes book index from library and updates book indices
function removeBookFromLibrary(currBook) {
  library.splice(currBook.index, 1);
  index--;
  for (let i = 0; i < index; i++) {
    library[i].index = i;
  }
}

//adds individual books to dom
const libraryContainer = document.querySelector("#library-container");
function addBooktoDOM(currBook) {
  const div = document.createElement("div");
  const p = document.createElement("p");

  const readButton = document.createElement("button");
  if (currBook.read) {
    readButton.innerText = "Read";
  } else {
    readButton.innerText = "Not Read";
  }
  readButton.addEventListener("click", () => {
    if (currBook.read) {
      readButton.innerText = "Not Read";
    } else {
      readButton.innerText = "Read";
    }
    currBook.toggleRead();
  });

  const removeButton = document.createElement("button");
  removeButton.innerText = "X";
  removeButton.addEventListener("click", () => {
    div.remove();
    removeBookFromLibrary(currBook);
  });
  p.innerText = currBook.info();
  div.appendChild(p);
  div.appendChild(readButton);
  div.appendChild(removeButton);
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

//brings up form for book input
const newBook = document.querySelector("#new-book");
newBook.addEventListener("click", () => {
  //reset form
  document.querySelector("#book-title").value = null;
  document.querySelector("#author").value = null;
  document.querySelector("#pages").value = null;
  document.querySelector("#read").checked = false;

  const bookForm = document.querySelector("#book-form");
  bookForm.style.cssText = "display: block";
});

const addBook = document.querySelector("#add-book");
addBook.addEventListener("click", () => {
  //prompts user to add book, new book is added to library, then added to dom
  // does not require rerenderering entire library on dom
  if (
    document.querySelector("#book-title").validity.valid &&
    document.querySelector("#author").validity.valid &&
    document.querySelector("#pages").validity.valid
  ) {
    addBooktoDOM(addBooktoLibrary());
    const bookForm = document.querySelector("#book-form");
    bookForm.style.cssText = "display: none";
  } // manual validation since information isn't sent through an actual form
  else {
    if (!document.querySelector("#book-title").validity.valid) {
      document.querySelector("#book-title").reportValidity();
    } else if (!document.querySelector("#author").validity.valid) {
      document.querySelector("#author").reportValidity();
    } else if (!document.querySelector("#pages").validity.valid) {
      document.querySelector("#pages").reportValidity();
    }
  }
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
