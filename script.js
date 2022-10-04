
function openPop(){
  document.getElementById("popup").style.display = 'block';
  document.getElementById("card-container").style.display = 'none';
  document.getElementById('FilterPop').style.display = 'none';
  console.log("Opening Pop Up");
}

function openFilters(){
  document.getElementById("popup").style.display = 'none';
  document.getElementById('FilterPop').style.display = 'block';
  document.getElementById("card-container").style.display = 'none';
}

function validateData(){
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const pages = document.getElementById('pages');
  if (title.value == ""){
    title.style.border = "solid 1px red";
    return false;
  }

  else if (author.value == ""){
    author.style.border = "solid 1px red";
    return false;
  }

  else if (pages.value <= 0){
    pages.style.border = "solid 1px red";
    return false;
  }

  else{
    title.style.border = "none";
    author.style.border = "none";
    pages.style.border = "none";
    return true;
  }


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
    deleteBtn.setAttribute('id', library[i].title);
    buttonBlock.appendChild(readBtn);
    buttonBlock.appendChild(deleteBtn);
    readBtn.innerHTML = 'Read';
    deleteBtn.innerHTML = 'Delete';
    if (library[i].isRead) readBtn.style.background='green';
    else readBtn.style.background='#F96666';

    const pages = this.element = document.createElement('h3');
    pages.classList.add('pages');
    cardContent.appendChild(pages);
    pages.innerHTML = `${library[i].pages}`;

   

     // making buttons do stuff
    readBtn.onclick = () => {
      const index = library.findIndex(book => {
        return book.title === deleteBtn.id;
      });
      if (library[index].isRead){
        readBtn.style.background='#F96666';
        library[index].isRead = false;
  
      }
      else {
        readBtn.style.background='#829460';
        library[index].isRead = true;
      }
    }

    deleteBtn.onclick = () => {
      const index = library.findIndex(book => {
        return book.title === deleteBtn.id;
      });
      library.splice(index, 1);
      displayBooks(library);
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

 

}
 
const openPopBtn = document.getElementById('openPopBtn');
const closePopBtn = document.getElementById('closePopBtn');
const addBookBtn = document.getElementById('addBookBtn');
const openFiltersBtn = document.getElementById('openFiltersBtn');

const myBooks = new Library();

openPopBtn.onclick = openPop
closePopBtn.onclick = closePop
openFiltersBtn.onclick = openFilters;
addBookBtn.onclick = () => { 
  if (validateData()){
  const newBook = getBookFromPop();
  myBooks.addBook(newBook);
  displayBooks(myBooks.books);
  closePop();
  for (var i=0, iLen=myBooks.books.length; i<iLen; i++) {
    console.log(`Name: ${myBooks.books[i].title}, is read: ${myBooks.books[i].isRead}`);
  }
  }
}




