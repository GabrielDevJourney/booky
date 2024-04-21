//*Data structures
class Book {
	constructor(
		title = "Unknown",
		author = "Unknown",
		pages = "0",
		isRead = false
	) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.isRead = isRead;
	}
}

class Library {
	constructor() {
		this.books = [];
	}

    isInLibrary(newBook){
        return this.books.some((book) => book.title === newBook.title)
    }

    deleteBook(title){
        this.books = this.books.filter((book) => book.title !== title)
    }

    addNewBook(newBook){
        if(!this.isInLibrary(newBook)){
            this.books.push(newBook)
        }
    }
}

const library = new Library();
