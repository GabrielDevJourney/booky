const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readOrNotInput = document.getElementById("readornot");
const modalToAddBook = document.getElementById("wrapper");
const btnCloseModal = document.querySelector(".close-book-form");
const btnSubmitBook = document.querySelector(".submit-btn");

//GETTING THE WEBPAGE WRAPPER
const wrapper = document.querySelector(".wrapper");

//MAKE THE ADD BOOK BTN OPEN MODAL
const btnAddBook = document.querySelector(".btn-add-book");
//function to open modal and blur bcg
function openModal() {
	modalToAddBook.style.display = "block";
	wrapper.classList.add("blur-bcg");
}
//FUCNTION TO CLOSE MODAL FOR BETTER MULTIPLE USAGE
function closeModal() {
	modalToAddBook.style.display = "none";
	wrapper.classList.remove("blur-bcg");
}
btnAddBook.addEventListener("click", openModal, clearInputAfterSubmit);

//Modal close btn fucntions
btnCloseModal.addEventListener("click", closeModal);

//*Data structures
class Book {
	constructor(
		title = "Unknown",
		author = "Unknown",
		pages = "0",
		isRead = false,
		id = Math.floor(Math.random() * 100000)
	) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.isRead = isRead;
		this.id = id;
	}
}

const myLibrary = [];

//FUNCTION TO GET THE VALUES FROM THE INPUTS then call to create library book object
function getBookInfo() {
	const title = titleInput.value;
	const author = authorInput.value;
	const pagesNumber = pagesInput.value;
	const isRead = readOrNotInput.checked;
	return new Book(title, author, pagesNumber, isRead);
}

//FUNC TO CLEAR INPUT
function clearInputAfterSubmit() {
	titleInput.value = "";
	authorInput.value = "";
	pagesInput.value = "";
	readOrNotInput.checked = false;
}

//FCUNTION THAT WILL STORE INFO AND CALL THE FCUNTION TO CREATE CARD
function addNewBook() {
	const newBook = getBookInfo();
	myLibrary.push(newBook);

	closeModal();
	createBookCard(newBook);
	updateStatsWhenCardCreated(newBook);
	clearInputAfterSubmit();
}

//CREATE FUCNTION TO BUILD THE CARD
//declare in the whole scope to be able to access them in other func

function createBookCard(book) {
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

	//create data id to identify each card
	card.setAttribute("data-id", book.id);

	//Adding icon sources
	isReadIcon.src = "assets/readcheck stats.png";
	isReadIcon.alt = "";
	noneReadIcon.src = "assets/cancel stats.png";
	noneReadIcon.alt = "";

	//Tex content from book object
	title.textContent = book.title;
	author.textContent = `By ${book.author}`;
	pages.textContent = `${book.pages} pages`;

	// Determine which icon to display based on isRead property
	if (book.isRead) {
		readContainer.appendChild(isReadIcon);
	} else {
		readContainer.appendChild(noneReadIcon);
	}

	//APPEDING ELEMENTS
	cardsContainer.appendChild(card);
	card.appendChild(cardInfo);
	cardInfo.appendChild(title);
	cardInfo.appendChild(author);
	cardInfo.appendChild(pages);
	cardInfo.appendChild(readContainer);

	//refer to the fucntion and append to the main card
	const btnsShowWhenHover = createHoverBtns(
		book,
		card,
		readContainer,
		isReadIcon,
		noneReadIcon
	);
	card.appendChild(btnsShowWhenHover);

	//EVENT TO MAKE CARD HOVER DISPLAY THE BTN OF DELETE AND EDIT
	card.addEventListener("mouseenter", () => {
		btnsShowWhenHover.style.display = "block";
		cardInfo.classList.add("blur-card");
	});
	card.addEventListener("mouseleave", () => {
		btnsShowWhenHover.style.display = "none";
		cardInfo.classList.remove("blur-card");
	});

	return card;
}

//FUNCTION TO CREATE THE CARD THAT APPEAR WHEN CARD IS HOVER

function createHoverBtns(book, card, readContainer, isReadIcon, noneReadIcon) {
	const cardHoverWrapper = document.createElement("div");
	const cardWhenHover = document.createElement("div");
	const haveReadContainer = document.createElement("div");
	const toggleReadBtn = document.createElement("button");
	const deleteContainer = document.createElement("div");
	const deleteBtn = document.createElement("button");
	const toggleReadImg = document.createElement("img");
	const deleteImg = document.createElement("img");

	cardHoverWrapper.classList.add("hover-wrapper");
	haveReadContainer.classList.add("read-icons-container");
	deleteContainer.classList.add("delete-icon-container");
	cardWhenHover.classList.add("card-when-hover");
	toggleReadBtn.classList.add("edit-btn-hover");
	toggleReadImg.classList.add("read-img");
	deleteBtn.classList.add("delete-btn-hover");

	deleteImg.src = "assets/final-delete-btn-img.png";
	deleteImg.alt = "trash icon";

	if (book.isRead) {
		toggleReadImg.src = "assets/hover-read.png";
	} else {
		toggleReadImg.src = "assets/hover-no-read.png";
	}

	cardHoverWrapper.appendChild(cardWhenHover);
	cardWhenHover.appendChild(haveReadContainer);
	cardWhenHover.appendChild(deleteContainer);
	haveReadContainer.appendChild(toggleReadBtn);
	toggleReadBtn.appendChild(toggleReadImg);
	deleteContainer.appendChild(deleteBtn);
	deleteBtn.appendChild(deleteImg);

	cardHoverWrapper.style.display = "none";
	toggleReadBtn.addEventListener("click", () => {
		if (book.isRead) {
			toggleReadImg.src = "assets/hover-no-read.png";
			readContainer.appendChild(noneReadIcon);
			readContainer.removeChild(isReadIcon);
			book.isRead = false;
		} else {
			toggleReadImg.src = "assets/hover-read.png";
			readContainer.appendChild(isReadIcon);
			readContainer.removeChild(noneReadIcon);
			book.isRead = true;
		}
        updateStatsWhenChaingReadStatus(book)
		updateStatsDisplay()
	});

	deleteBtn.addEventListener("click", () => {
		const cardId = parseInt(card.getAttribute("data-id"));
		const bookToDelete = myLibrary.find((book) => book.id === cardId);
		deleteCard(bookToDelete);
	});

	return cardHoverWrapper;
}

function deleteCard(book) {
	const cardToRemove = document.querySelector(`[data-id="${book.id}"]`);
	cardToRemove.remove();

	const indexToDelete = myLibrary.findIndex((item) => item.id === book.id);
	if (indexToDelete !== -1) {
		myLibrary.splice(indexToDelete, 1);
	}
	if (book.isRead) {
		readCount--;
		pagesCount -= parseInt(book.pages);
	} else {
		noReadCount--;
	}
	TotalbookCount--;
	updateStatsDisplay();
}
btnSubmitBook.addEventListener("click", addNewBook, createBookCard);

let readCount = 0;
let noReadCount = 0;
let pagesCount = 0;
let TotalbookCount = 0;

//where it will be displayed
function updateStatsDisplay() {
	const bookStatsDisplay = document.querySelector(".stack-count");
	const bookPageStatsDisplay = document.querySelector(".pages-count");
	const booksReadDisplay = document.querySelector(".read-count");
	const booksNotReadDisplay = document.querySelector(".non-read-count");
	bookStatsDisplay.textContent = TotalbookCount;
	bookPageStatsDisplay.textContent = pagesCount;
	booksReadDisplay.textContent = readCount;
	booksNotReadDisplay.textContent = noReadCount;
}

function updateStatsWhenCardCreated(book) {
	if (book.isRead) {
		readCount++;
		pagesCount += parseInt(book.pages);
	} else {
		noReadCount++;
	}
	TotalbookCount++;
	updateStatsDisplay();
}
function ensureNonNegative(value) {
	return Math.max(0, value);
}

function updateStatsWhenChaingReadStatus(book){
    if (book.isRead) {
        readCount ++
        noReadCount --
        pagesCount += parseInt(book.pages)
    }else{
        readCount --
        noReadCount ++
        pagesCount -= parseInt(book.pages)
    }
}