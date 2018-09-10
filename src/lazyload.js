(function LazyLoader(root, { className = 'lazyload', rootMargin = '100px' } = {}) {

	// img is a non-live dom-node
	const load = (img, intersectionObserver) => {

		// wait until the new image is loaded
		img.addEventListener('load', (event) => {
			event.target.classList.remove(className);
			intersectionObserver.unobserve(img);
		});

		// replace the src with the data-src
		if (img.dataset.src) {
			img.src = img.dataset.src;
		}

		// replace the srcset with the data-srcset
		if (img.dataset.srcset) {
			img.srcset = img.dataset.srcset;
		}

		// replace the source srcset's with the data-srcset's
		if (img.parentElement.tagName === 'PICTURE') {
			Array.from(img.parentElement.children)
				.filter((el) => el.tagName === 'SOURCE')
				.forEach((el) => (el.srcset = el.dataset.srcset));
		}
	};

	// filters for intersecting elements and loads each
	const intersectionHandler = (intersectionObserverEntryArray, intersectionObserver) => intersectionObserverEntryArray
		.filter(({ isIntersecting }) => isIntersecting)
		.forEach(({ target }) => load(target, intersectionObserver));

	// watches for dom changes, filters for element changes and className, adds element to intersectionObserver
	const mutationHandler = (intersectionObserver) => (mutationRecordArray) => mutationRecordArray
		.filter(({ type }) => type === 'childList')
		.reduce((acc, { addedNodes }) => acc.concat(Array.from(addedNodes)), [])
		.filter(({ classList }) => classList && classList.contains(className))
		.forEach((el) => intersectionObserver.observe(el));


	const intersectionObserver = new IntersectionObserver(intersectionHandler, { rootMargin });
	root.querySelectorAll(`img.${className}`).forEach((el) => intersectionObserver.observe(el));

	const mutationObserver = new MutationObserver(mutationHandler(intersectionObserver));
	mutationObserver.observe(root, { childList: true, subtree: true });

})(document);

// * add background img load
// if (img.getAttribute('data-background-image')) {
// 	img.style.backgroundImage = `url('${img.getAttribute('data-background-image')}')`;
// }
// * add video; iframe
