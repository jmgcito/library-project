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

theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, false);

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
}

addBooktoLibrary();
console.log(library[0].info());
