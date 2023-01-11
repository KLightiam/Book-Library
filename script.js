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


createBook.addEventListener('click',showForm);
bookForm.addEventListener('click',hideForm,{capture: false})
emptyFields.addEventListener('click',clearFields);
submit.addEventListener('click',addBookToLibrary);


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

function displayBook(){
    let content = document.querySelector('.content');
    let div = document.createElement('div');
    let ul = document.createElement('ul');
    let len = myLibrary.length;
    let currentObj = myLibrary[len-1];
    let objectValues = Object.values(currentObj);
    let details =['Title: ','Author(s): ','Pages: ','Published: ','Read? '];
    let red1 = Math.floor(Math.random() * 256);
    let red2 = Math.floor(Math.random() * 256);
    let green1 = Math.floor(Math.random() * 256);
    let green2 = Math.floor(Math.random() * 256);
    let blue1 = Math.floor(Math.random() * 256);
    let blue2 = Math.floor(Math.random() * 256);
    for(let i = 0; i < 5; i++){
        let li = document.createElement('li');
        if(i==4){
            li.textContent = details[i];
            createCheckBox();
        }
        else{
        li.textContent = details[i] + objectValues[i];
        } 
        ul.appendChild(li);

        function createCheckBox(){
            let checkBox = document.createElement("input");
            checkBox.setAttribute('type','checkbox');
            checkBox.checked = objectValues[i];
            li.appendChild(checkBox);
        }
    }

   div.dataset.key = len - 1;
   div.style.backgroundImage = `linear-gradient(to right,rgb(${red1},${green1},${blue1}) 0%,rgb(${red2},${green2},${blue2}) 100%)`;
   div.style.position = 'relative';
   div.appendChild(ul);
   createCancelButton();
   content.appendChild(div);



   function createCancelButton(){
    let cancelButton = document.createElement('button');
    cancelButton.textContent = 'X'
    cancelButton.style.position = 'absolute';
    cancelButton.style.right = '5px';
    cancelButton.style.top = '5px';
    cancelButton.style.backgroundColor = 'rgba(0,0,0,0)';
    div.appendChild(cancelButton);

    cancelButton.addEventListener('click',() => div.remove());
    }
}


