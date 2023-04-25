let library = [];

function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = (isRead == false) ? "not read yet" : "has been read"
    this.info = function() {
        return `"${title} by ${author}, ${pages} pages, ${this.isRead}"`;
    }
}

function addBookToLibrary() {
    
}