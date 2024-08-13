class Book {
	constructor(
		title = "Unknown",
		author = "Unknown",
		pages = "0",
		isRead = false,
		id = Math.floor(Math.random() * 100000)
	) {
		this._title = title;
		this._author = author;
		this._pages = Number(pages);
		this._isRead = isRead;
		this._id = id;
	}
	get title() {
		return this._title;
	}
	get author() {
		return this._author;
	}
	get pages() {
		return this._pages;
	}
	get isRead() {
		return this._isRead;
	}
	get id() {
		return this._id;
	}
	toggleRead() {
		this._isRead = !this._isRead;
	}
	getInfo() {
		return `${this.title} by ${this.author}, ${this.pages} pages, ${
			this.isRead ? "Read" : "Not Read Yet"
		}`;
	}

	set title(newTittle) {
		if (newTittle && typeof newTittle === "string") {
			this._title = newTittle;
		} else {
			throw new Error("Title must be a non-empty string");
		}
	}

	set author(newAuthor) {
		if (newAuthor && typeof newAuthor === "string") {
			this._author = newAuthor;
		} else {
			throw new Error("Author must be a non-empty string");
		}
	}

	set pages(newPages) {
		const pageCount = Number(newPages);

		if (Number.isInteger(pageCount) && pageCount > 0) {
			if (pageCount <= 2000) {
				this._pages = pagesCount;
			} else {
				throw new Error(
					"Page count seems unreasonably high. Please check the input."
				);
			}
		} else {
			throw new Error("Pages must be an integer number.");
		}
	}

	set isRead(newIsReadState) {
		this._isRead = Boolean(newIsReadState);
	}

	toJSON() {
		return {
			title: this.title,
			author: this.author,
			pages: this.pages,
			isRead: this.isRead,
			id: this.id,
		};
	}
}
class Library {
	constructor() {
		this._myLibrary = [];
	}

	bookExists(bookId) {
		return this._myLibrary.some((book) => book.id === bookId);
	}

	addBook(book) {
		if (book instanceof Book) {
			this._myLibrary.push(book);
		} else {
			throw new Error("You can only add Book ojects to the library");
		}
	}

	removeBook(bookId) {
		const indexToDelete = this._myLibrary.findIndex(
			(item) => item.id === bookId
		);
		if (indexToDelete !== -1) {
			this._myLibrary.splice(indexToDelete, 1);
			return true;
		}
		return false;
	}

    getBooks(){
        return this._myLibrary
    }
	getBookInfo(bookId) {
		const book = this._myLibrary.find((book) => book.id === bookId);
		return book ? book.getInfo() : "Book not found";
	}

	getTotalBooks() {
		return this._myLibrary.length;
	}

	getReadBooks() {
		return this._myLibrary.filter(
			(book) => book instanceof Book && book.isRead
		).length;
	}

	getUnreadBooks() {
		return this._myLibrary.filter(
			(book) => book instanceof Book && !book.isRead
		).length;
	}

	getTotalPagesRead() {
		return this._myLibrary.reduce((total, book) => {
			if (book instanceof Book && book.isRead) {
				return total + parseInt(book.pages, 10);
			}
			return total;
		}, 0);
	}

	saveLibraryInLocalStorage() {
		localStorage.setItem("myLibrary", JSON.stringify(this._myLibrary));
	}

	loadLibraryFromLocalStorage() {
		const storedLibrary = localStorage.getItem("myLibrary");
		if (storedLibrary) {
			const parsedLibrary = JSON.parse(storedLibrary);
			this._myLibrary = parsedLibrary.map(
				(bookData) =>
					new Book(
						bookData.title,
						bookData.author,
						bookData.pages,
						bookData.isRead,
						bookData.id
					)
			);
			return true;
		}
		return false;
	}
}
class Ui {
	constructor(library) {
		this.library = library;
		this.bookContainer = document.querySelector(".book-container");
		//elements already exist in html
		this.titleInput = document.getElementById("title");
		this.authorInput = document.getElementById("author");
		this.pagesInput = document.getElementById("pages");
		this.readOrNotInput = document.getElementById("readornot");
		this.btnAddBook = document.querySelector(".btn-add-book");
		this.btnCloseModal = document.querySelector(".close-book-form");
		this.modalToAddBook = document.querySelector(".form-wrapper");
		this.btnCloseModal = document.querySelector(".close-book-form");
		this.btnSubmitBook = document.querySelector(".submit-btn");
		this.wrapper = document.querySelector(".wrapper");
		this.btnAddBook = document.querySelector(".btn-add-book");
		this.cardsContainer = document.querySelector(".cards-container");

		//inicialize event listeners
		this.initEventListeners();
	}

	initEventListeners() {
		this.btnAddBook.addEventListener("click", () => this.openModal());
		this.btnCloseModal.addEventListener("click", () => this.closeModal());
		this.btnSubmitBook.addEventListener("click", () => this.addNewBook());
	}

	createBookCard(book) {
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

		this.cardsContainer.appendChild(card);
		card.appendChild(cardInfo);
		cardInfo.appendChild(title);
		cardInfo.appendChild(author);
		cardInfo.appendChild(pages);
		cardInfo.appendChild(readContainer);

		const hoverCardBtns = this.createHoverBtns(
			book,
			card,
			readContainer,
			isReadIcon,
			noneReadIcon
		);
		card.appendChild(hoverCardBtns);

		card.addEventListener("mouseenter", () => {
			hoverCardBtns.style.display = "block";
			cardInfo.classList.add("blur-card");
		});
		card.addEventListener("mouseleave", () => {
			hoverCardBtns.style.display = "none";
			cardInfo.classList.remove("blur-card");
		});

		return card;
	}

	createHoverBtns(book, card, readContainer, isReadIcon, noneReadIcon) {
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

		toggleReadImg.src = book.isRead
			? "assets/hover-read.png"
			: "assets/hover-no-read.png";

		cardHoverWrapper.appendChild(cardWhenHover);
		cardWhenHover.appendChild(haveReadContainer);
		cardWhenHover.appendChild(deleteContainer);
		haveReadContainer.appendChild(toggleReadBtn);
		toggleReadBtn.appendChild(toggleReadImg);
		deleteContainer.appendChild(deleteBtn);
		deleteBtn.appendChild(deleteImg);

		cardHoverWrapper.style.display = "none";

		toggleReadBtn.addEventListener("click", () =>
			this.toggleReadStatus(
				book,
				toggleReadBtn,
				readContainer,
				isReadIcon,
				noneReadIcon
			)
		);
		deleteBtn.addEventListener("click", () => this.deleteBook(book, card));

		return cardHoverWrapper;
	}

	toggleReadStatus(
		book,
		toggleReadImg,
		readContainer,
		isReadIcon,
		noneReadIcon
	) {
		book.toggleRead();
		toggleReadImg.src = book.isRead
			? "assets/hover-read.png"
			: "assets/hover-no-read.png";

		if (book.isRead) {
			readContainer.replaceChild(isReadIcon, noneReadIcon);
		} else {
			readContainer.replaceChild(noneReadIcon, isReadIcon);
		}

		this.library.updateBook(book);
		this.updateStatsDisplay();
	}

	deleteBook(book, card) {
		this.library.removeBook(book.id);
		card.remove();
		this.updateStatsDisplay();
	}

	updateStatsDisplay() {
		const bookStatsDisplay = document.querySelector(".stack-count");
		const bookPageStatsDisplay = document.querySelector(".pages-count");
		const booksReadDisplay = document.querySelector(".read-count");
		const booksNotReadDisplay = document.querySelector(".non-read-count");

		bookStatsDisplay.textContent = this.library.getTotalBooks();
		bookPageStatsDisplay.textContent = this.library.getTotalPagesRead();
		booksReadDisplay.textContent = this.library.getReadBooks();
		booksNotReadDisplay.textContent = this.library.getUnreadBooks();
	}

	addNewBook() {
		const title = this.titleInput.value;
		const author = this.authorInput.value;
		const pages = this.pagesInput.value;
		const isRead = this.readOrNotInput.checked;

		const newBook = new Book(title, author, pages, isRead);
		this.library.addBook(newBook);
		this.createBookCard(newBook);
		this.updateStatsDisplay();
		this.closeModal();
		this.clearInputFields();
	}

	openModal() {
		this.modalToAddBook.style.display = "block";
		this.wrapper.classList.add("blur-bcg");
	}

	closeModal() {
		this.modalToAddBook.style.display = "none";
		this.wrapper.classList.remove("blur-bcg");
	}

	clearInputFields() {
		this.titleInput.value = "";
		this.authorInput.value = "";
		this.pagesInput.value = "";
		this.readOrNotInput.checked = false;
	}

	displayAllBooks() {
		this.cardsContainer.innerHTML = ""; // Clear existing cards
		this.library.getBooks().forEach((book) => this.createBookCard(book));
		this.updateStatsDisplay();
	}
    
    init(){
        this.library.loadLibraryFromLocalStorage()
        this.displayAllBooks()
    }
}

const library = new Library();
const ui = new Ui(library);

window.addEventListener("load", () => ui.init());
