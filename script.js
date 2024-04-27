//Getting data from the Add Book From
const modalNewBookInfo = document.querySelector('.form-wrapper')
const btnCloseModal = document.querySelector('.close-book-form')
const title = document.getElementById('tile')
const author = document.getElementById('author')
const pagesNumber = document.getElementById('pages')
const readOrNot = document.getElementById('readornot')
const submitBookInfo = document.getElementById('submit-book-info')

//GETTING THE PAGE WRAPPER
const wrapper = document.querySelector('.wrapper')

//MAKE THE ADD BOOK BTN OPEN MODAL
const btnAddBook = document.querySelector('.btn-add-book')
btnAddBook.addEventListener('click', () => {
    modalNewBookInfo.style.display = 'block'
    wrapper.classList.add('blur-bcg')
})

//Modal close btn fucntions
btnCloseModal.addEventListener('click', () => {
    modalNewBookInfo.style.display = "none"
    wrapper.classList.remove("blur-background")
})



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
