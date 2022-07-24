const pageLocation = {
	HOME: './home.html',
	BLOG: './blog.html',
	ARTICLE: './article.html'
};

const headerClasses = {
	BLOG: 'header--blog',
	ARTICLE: 'header--blogpost'
};

const sharedClasses = {
	LINK_SELECTED: 'crumb__link--selected'
}

let container;
let header;

let home;
let blog;

window.addEventListener('DOMContentLoaded', () => {
	container = document.getElementById('dynamic-container');
	header = document.querySelector('.header');
	home = document.getElementById('home');
	blog = document.getElementById('blog');

	loadContent(pageLocation.HOME);
	selectHome();

	addClickHandlers();
});

function addClickHandlers() {
	document.addEventListener('click', (event) => {
		console.log("CLICKED: ", event.target);
		const target = event.target;
		if (isBlog(target)) {
			loadContent(pageLocation.ARTICLE);
			selectBlog();
		}
	});

	home.addEventListener('click', () => {
		loadContent(pageLocation.HOME);
		selectHome();
	});

	blog.addEventListener('click', () => {
		loadContent(pageLocation.BLOG);
		selectBlog();
	});
}

function selectHome() {
	blog.classList.remove(sharedClasses.LINK_SELECTED);
	home.classList.add(sharedClasses.LINK_SELECTED);
}

function selectBlog() {
	home.classList.remove(sharedClasses.LINK_SELECTED);
	blog.classList.add(sharedClasses.LINK_SELECTED);
}

function isBlog(target) {
	const isCard = target.classList.contains('card');

	let isInCard = false;
	let parent = target.parentElement;

	while (parent && !isInCard) {
		if (parent.classList.contains('card')) {
			isInCard = true;
		} else {
			parent = parent.parentElement;
		}
	}

	return isCard || isInCard;
}

/**
* Returns the HTML string fragment of the provided file.
*/
async function fetchHtmlAsText(url) {
	return await (await fetch(url)).text();
}

async function loadContent(page) {
	container.innerHTML = await fetchHtmlAsText(page);
	swapHeader(page);
}

async function swapHeader(page) {
	Object.values(headerClasses).forEach(headerClass => {
		header.classList.remove(headerClass);
	});

	switch (page) {
		case pageLocation.BLOG:
			header.classList.add(headerClasses.BLOG);
			break;
		case pageLocation.ARTICLE:
			header.classList.add(headerClasses.ARTICLE);
			break;
		default:
			break;
	}
}