
const modalToAddBook = document.getElementById('wrapper')
const btnCloseModal = document.querySelector('.close-book-form')
const btnSubmitBook = document.querySelector(".submit-btn")

//GETTING THE WEBPAGE WRAPPER
const wrapper = document.querySelector('.wrapper')

//MAKE THE ADD BOOK BTN OPEN MODAL
const btnAddBook = document.querySelector('.btn-add-book')
btnAddBook.addEventListener('click', () => {
    modalToAddBook.style.display = 'block'
    wrapper.classList.add('blur-bcg')
})

//Modal close btn fucntions
btnCloseModal.addEventListener('click', closeModal)

//FUCNTION TO CLOSE MODAL FOR BETTER MULTIPLE USAGE 
function closeModal(){
    modalToAddBook.style.display = "none";
	wrapper.classList.remove("blur-bcg");
}

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


const myLibrary = []


//FUNCTION TO GET THE VALUES FROM THE INPUTS
function getBookInfo() {
    const title = document.getElementById("title").value;
	const author = document.getElementById("author").value;
	const pagesNumber = document.getElementById("pages").value;
	const isRead = document.getElementById("readornot").checked;
    return new Book(title, author, pagesNumber, isRead)
}

function addNewBook(){
    const newBook = getBookInfo()
    myLibrary.push(newBook)

    closeModal()
    createBookCard(newBook)
}

btnSubmitBook.addEventListener('click', addNewBook, createBookCard)

//CREATE FUCNTION TO BUILD THE CARD

function createBookCard(book){
	//grab cards container
	const cardsContainer = document.querySelector(".cards-container");
	//create elements of card
	const card = document.createElement("div");
	const cardInfo = document.createElement("div");
	const title = document.createElement("h2");
	const author = document.createElement("p");
	const pages = document.createElement("p");
	const readContainer = document.createElement("div");
	const isReadIcon = document.createElement("img");
	const noneReadIcon = document.createElement("img");

	//ADD CLASSES TO ELEMENTS
	card.classList.add("card");
	cardInfo.classList.add("card-info-enable");
	title.classList.add("card-header");
	author.classList.add("card-author");
	pages.classList.add("card-pages");
	readContainer.classList.add("read-or-nonread-icons-container");
	isReadIcon.classList.add("card-icon", "is-read");
	noneReadIcon.classList.add("card-icon", "none-read");

	//Adding icon sources
	isReadIcon.src = "assets/readcheck stats.png";
	isReadIcon.alt = "";
	noneReadIcon.src = "assets/cancel stats.png";
	noneReadIcon.alt = "";

	//Tex content from book object
	title.textContent = book.title
	author.textContent = `By ${book.author}`
	pages.textContent = `${book.pages} pages`

	// Determine which icon to display based on isRead property
	if (book.isRead) {
		readContainer.appendChild(isReadIcon);
	} else {
		readContainer.appendChild(noneReadIcon);
	}

	//APPEDING ELEMENTS
	cardsContainer.appendChild(card);
	card.appendChild(cardInfo);
	card.appendChild(readContainer);
	cardInfo.appendChild(title);
	cardInfo.appendChild(author);
	cardInfo.appendChild(pages);
}