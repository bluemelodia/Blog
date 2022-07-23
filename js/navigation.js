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
	home.classList.add(sharedClasses.LINK_SELECTED);

	addClickHandlers();
});

function addClickHandlers() {
	home.addEventListener('click', () => {
		loadContent(pageLocation.HOME);

		blog.classList.remove(sharedClasses.LINK_SELECTED);
		home.classList.add(sharedClasses.LINK_SELECTED);
	});

	blog.addEventListener('click', () => {
		loadContent(pageLocation.BLOG);

		home.classList.remove(sharedClasses.LINK_SELECTED);
		blog.classList.add(sharedClasses.LINK_SELECTED);
	});
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