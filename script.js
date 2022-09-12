
function openPop(){
  document.getElementById("popup").style.display = 'block';
  document.getElementById("card-container").style.display = 'none';
  console.log("Opening Pop Up");
}

function closePop(){
  document.getElementById("popup").style.display = 'none';
  document.getElementById("card-container").style.display = 'grid';
  console.log("Closing Pop Up");
  document.getElementById('title').value = "";
  document.getElementById('author').value = "";
  document.getElementById('pages').value = "";
  document.getElementById('isRead').checked = false;
}

function getBookFromPop(){
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('isRead').checked;
      return new Book(title, author, pages, isRead)
}

function displayBooks(library){
  document.getElementById("card-container").innerHTML = ('');
  for (var i=0, iLen=library.length; i<iLen; i++) {
    // adding book to grid
    const grid = document.getElementById('card-container');
    const cardTemplate = this.element = document.createElement('div');
    grid.appendChild(cardTemplate);
    cardTemplate.classList.add('card');
    
    // adding elements to book
    const border = this.element = document.createElement('div');
    cardTemplate.appendChild(border);
    border.classList.add('card-border');

    const cardContent = this.element = document.createElement('div');
    cardTemplate.appendChild(cardContent);
    cardContent.classList.add('card-content');
    const title = this.element = document.createElement('h1');
    cardContent.appendChild(title);
    title.innerHTML = `${library[i].title}`;
    const author = this.element = document.createElement('h2');
    cardContent.appendChild(author);
    author.innerHTML = `By ${library[i].author}`;

    // adding buttons
    const buttonBlock = this.element = document.createElement('div');
    buttonBlock.classList.add('button-block');
    cardContent.appendChild(buttonBlock);
    const readBtn = this.element = document.createElement('button');
    const deleteBtn = this.element = document.createElement('button');
    buttonBlock.appendChild(readBtn);
    buttonBlock.appendChild(deleteBtn);
    readBtn.innerHTML = 'Read';
    deleteBtn.innerHTML = 'Delete';
    if (library[i].isRead) readBtn.style.background='green';
    else readBtn.style.background='red';

    const pages = this.element = document.createElement('h3');
    pages.classList.add('pages');
    cardContent.appendChild(pages);
    pages.innerHTML = `${library[i].pages}`;

     // making buttons do stuff
    readBtn.onclick = () => {
      
      if (library.isRead == true){
        
        library.isRead = false;
        readBtn.style.background='red';
      }
      else {
        library.isRead = true;
        readBtn.style.background='green';
      }
      console.log(library.isRead);
    }

    deleteBtn.onclick = () => {
    cardTemplate.style.display = 'none';
    library.splice(- 1, 1);

    }
  }

}

class Book {
  constructor(
    title = 'Unknown',
    author = 'Unknown',
    pages = '0',
    isRead = false
  ) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
  }
}

class Library {
  constructor() {
    this.books = []
  }

  addBook(newBook) {
    this.books.push(newBook)
  }

  deleteBook(book){
    for (var i=0, iLen=this.books.length; i<iLen; i++) {
      if (this.books[i].b == book){
        this.books.splice(i, 1);
      }
    }
  }

}
 
const openPopBtn = document.getElementById('openPopBtn');
const closePopBtn = document.getElementById('closePopBtn');
const addBookBtn = document.getElementById('addBookBtn');

const myBooks = new Library();

openPopBtn.onclick = openPop
closePopBtn.onclick = closePop
addBookBtn.onclick = () => {
  const newBook = getBookFromPop();
  myBooks.addBook(newBook);
  displayBooks(myBooks.books);
  closePop();

  
}
