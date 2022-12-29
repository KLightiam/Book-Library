let myLibrary = [];

let bookForm = document.querySelector('.book-form');
let createBook = document.querySelector('.new-book > button');
let emptyFields = document.querySelector('.empty-fields');
let submit = document.querySelector('.insert-book');
let caution = document.querySelector('.caution');

let bookTitle = document.querySelector('#book-title');
let bookAuthor = document.querySelector('#book-author');
let pages = document.querySelector('#pages');
let publishedDate = document.querySelector('#published-date');
let readStatus = document.querySelector('#read-status');
let BOOKARR = [bookTitle,bookAuthor,pages,publishedDate,readStatus];


// console.log(readStatus.value);



createBook.addEventListener('click',showForm);
bookForm.addEventListener('click',hideForm,{capture: false})
emptyFields.addEventListener('click',clearFields);
submit.addEventListener('click',addBookToLibrary);
// readStatus.addEventListener('input',checkSomething)


function showForm(){
    bookForm.style.display = 'flex';
}

function hideForm(e){
    if(e.target.className == "book-form"){
        bookForm.style.display = "none";
    }
}

function clearFields(){
    for(let i = 0,len = BOOKARR.length; i < len-1;i++){
        BOOKARR[i].value = '';
    }
    readStatus.checked = false;
}

function addBookToLibrary(e){
    e.preventDefault();
    for(let i = 0,len = BOOKARR.length; i < len-2;i++){
        if(BOOKARR[i].value == ''){
             caution.style.display = 'block';
             return;
        }
        else{
            caution.style.display = 'none';
        }
     }
    myLibrary.push(new Book());
    // console.log(myLibrary);
    displayBook();
    bookForm.style.display = "none";
    clearFields();

}

function Book(){
    this.bookTitle = bookTitle.value;
    this.bookAuthor = bookAuthor.value;
    this.pages = pages.value;
    this.publishedDate = publishedDate.value;
    this.readStatus = readStatus.checked;
}

// console.log(new Book());

function displayBook(){
    let content = document.querySelector('.content');
    let div = document.createElement('div');
    let ul = document.createElement('ul');
    let len = myLibrary.length;
    let currentObj = myLibrary[len-1];
    let objectValues = Object.values(currentObj);
    let details =['Title: ','Author(s): ','Pages: ','Published: ','Read? '];

   for(let i = 0; i < 5; i++){
    let li = document.createElement('li');
    li.textContent = details[i] + objectValues[i];
    ul.appendChild(li);
   }
   div.dataset.key = len - 1;
   div.appendChild(ul);
   content.appendChild(div);
}