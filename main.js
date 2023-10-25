let library = [];
const form = document.getElementById("modal-form");
const modal = document.getElementById("popup-modal");
const submitBtn = document.getElementById('modal-submit');
const addNew = document.getElementById('addNew');
const overlay = document.getElementById('overlay');
const dashboard = document.querySelector('.dashboard');

function Book(title, author, pages, isRead, id) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
    this.id = id
    this.info = function() {
        return `"${title} by ${author}, ${pages} pages, ${this.isRead}"`;
    }
}

function addBookToLibrary(event) {
    let formTitle = document.getElementById("title").value;
    let formAuthor = document.getElementById("author").value;
    let formPages = document.getElementById("pages").value;
    let formIsRead = document.getElementById("yes");
    let bookId = library.length;

    if (formIsRead.checked) {
        formIsRead = true;
    } else {
        formIsRead = false;
    }

    let newBook = new Book(formTitle, formAuthor, formPages, formIsRead, bookId);
    library.push(newBook);
    console.log(library);
    event.preventDefault();

    modal.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
    displayLibrary(newBook);
    form.reset();
}

function displayLibrary(book) {
    let bookDiv = document.createElement('div');
    let infoDiv = document.createElement('div');
    let infoDivTitle = document.createElement('h3');
    let infoDivAuthor = document.createElement('h4');
    let infoDivPages = document.createElement('p');
    let toggleDiv = document.createElement('div');
    let toggleRemoveBtn= document.createElement('div');
    let toggleRemoveBtnImg= document.createElement('img');
    let label = document.createElement('label');
    let input = document.createElement('input');
    let toggleSwitch = document.createElement('div');
    let toggleLabel = document.createElement('span');

    infoDiv.appendChild(infoDivTitle);
    infoDiv.appendChild(infoDivAuthor);
    infoDiv.appendChild(infoDivPages);

    toggleDiv.appendChild(toggleRemoveBtn).appendChild(toggleRemoveBtnImg);
    toggleDiv.appendChild(label);

    label.appendChild(input);
    label.appendChild(toggleSwitch);
    label.appendChild(toggleLabel);

    bookDiv.appendChild(infoDiv);
    bookDiv.appendChild(toggleDiv);

    bookDiv.classList.add("card", "book");
    toggleDiv.classList.add("inputToggles");
    toggleRemoveBtn.classList.add("removeBtn");
    toggleRemoveBtnImg.classList.add("close");
    label.classList.add("toggle");
    input.classList.add("toggle-checkbox");
    toggleSwitch.classList.add("toggle-switch");
    toggleLabel.classList.add("toggle-label");

    toggleLabel.textContent = "Read";
    input.type = "checkbox";

    toggleRemoveBtnImg.src = 'img/close.svg';

    library.forEach(element => {
        
        infoDivTitle.textContent = book.title;
        infoDivAuthor.textContent = book.author;
        infoDivPages.textContent = book.pages;
        bookDiv.dataset.id = book.id;

        console.log(book.isRead);

        if (book.isRead) {
            input.checked = true;
        }

        dashboard.appendChild(bookDiv);
    });
}

submitBtn.addEventListener('click', addBookToLibrary, false);

document.addEventListener('click', removeBtn);

function removeBtn(event) {

    var element = event.target;
    console.log(event.target);

    if (element.classList.contains("close")) {
        element.parentNode.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode.parentNode);

        library.splice(element.parentNode.parentNode.parentNode.dataset.id, 1);

        var children = dashboard.childNodes;
        let array = [...children];
        var i = 0;

        console.log(children);
        array.forEach(node => {
            if(node.classList && node.classList.contains("book")) {
                node.dataset.id = i;
                i++;
            }
            
        });

        var y = 0;
        library.forEach(book => {
            book.id = y;
            y++
        });
        console.log(library);
        console.log(array);
        
    }
    
}

addNew.addEventListener('click', function() {
    
    modal.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
});

document.addEventListener('click', toggleRead);

function toggleRead(event) {
    let clicked = event.target;
    if(clicked.classList.contains('toggle-switch')) {
        let toggleId = clicked.parentNode.parentNode.parentNode.dataset.id;
        library[toggleId].isRead == true ? library[toggleId].isRead = false : library[toggleId].isRead = true;
        console.log(library[toggleId]);
    }
}

console.log(library);
console.log(library.length);
