//book class: represent a book, instatiate a book object, constructor method that runs. take parameters and assign to proerpty of onect using this
class Book{
    constructor(title, author, isbn){
this.title = title;
this.author = author;
this.isbn = isbn;
    }
}


//UI class: handle ui tasks. don't have instatiate ui class so make all methods static 
class UI {
static displayBook(){
const books = Stored.getBooks();

//loop through books in arrray, call method addbook in UI list
books.forEach((book) => UI.addBookToList(book));
}

static addBookToList(book) {
const list = document.querySelector('#book-list');

const row = document.createElement('tr');

row.innerHTML= `
<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.isbn}</td>
<td><a href="#" class="btn btn-danger btn-sm delete"> X</a></td>
`;

//append row to the list
list.appendChild(row);
}

static deleteBook(element){
if(element.classList.constains('delete')){
//delete parent, the whole row
element.parentElement.parentElement.remove();
}
}

//build div from scratch and insert into UI DOM
static showAlert(message, className){
const div = document.createElement('div');
div.className =`alert alert-${className}`;
//add text, take div, put someting in div. text node
div.appendChild(document.createTextNode(message));
const container = document.querySelector('.container');
const form = document.querySelector('#book-form');
constainer.instertBefore(div, form);
//make it vanish in 3 seconds
setTimeout(()=> document.querySelector('.alert').remove(), 3000);
}

static clearFields(){
document.querySelector('#title').value='';
document.querySelector('#author').value='';
document.querySelector('#isbn').value='';
}
}

//Store class: takes care of storage, local storage in browser
//before adding to local storage must stringify, when pulling out of local storage must parse it
class Store{
static getBooks(){
let books;
if(localStorage.getItem('books')=== null){
books = [];
} else {
    books = JSON.parse(localStorage.getItem('books'));
}
return books;
}

static addBook(book){
const books = Store.getBooks();
books.push(book);
localStorage.setItem('books', JSON.stringify(books)); 
}

static removeBook(isbn){
const books = Store.getBooks();

books.forEach((book, index) => {
    if(book.isbn === isbn) {
      books.splice(index, 1);
    }
  });

localStorage.setItem('books', JSON.stringify(books));
}
}


//Event: display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event: Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {

    //prevent default actual submit
    e.preventDefault();

//get form values
const title = document.querySelector('#title').value;
const author = document.querySelector('#author').value;
const isbn = document.querySelector('#isbn').value;

//validate
if(title=== '' || author === '' || isbn === ''){
UI.showAlert('Please fill in all fields', 'danger');
} else {
//instatiate book to add a book
const book = new Book(title, author, isbn);

//add book to UI
UI.addBookToList(book);

//add book to store
Store.addBook(book);

//show success message after adding book
UI.showAlert('Book Added', 'success');

//method clear fields
UI.clearFields();
}
});

//Event: remove a book
//use event propogation, select something above it, booklist array, target what is clicked inside of it
document.querySelector('#book-list').addEventListener('click', (e) 
=>{

    //remove book from UI
UI.deleteBook(e.target) 

//Remove book from Store, target link clicked, naviage to parent element
//previous element sibling should give isbn and then passed into remove books
Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

//show remove message after remove book
UI.showAlert('Book Removed', 'success');
});
