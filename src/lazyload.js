(function LazyLoader(ctx, root) {

	// img is a non-live dom-node
	const load = (img) => {
		let srcs;

		// wait until the new image is loaded
		img.addEventListener('load', (event) => event.target.classList.remove('lazyload'));

		// replace the src with the data-src
		srcs = img.getAttribute('data-src');
		if (srcs) {
			img.src = srcs;
		}

		// replace the srcset with the data-srcset
		srcs = img.getAttribute('data-srcset');
		if (srcs) {
			img.srcset = srcs;
		}

		// replace the source srcset's with the data-srcset's
		if (img.parentElement.tagName === 'PICTURE') {
			img.parentElement
				.querySelectorAll('source')
				.forEach((el) => (el.srcset = el.getAttribute('data-srcset')));
		}
	};

	// main function wrapper
	const lazyload = (intersectionObserverEntryArray) => intersectionObserverEntryArray
		.filter(({ isIntersecting }) => isIntersecting)
		.forEach(({ target }) => load(target));

	const updateNodeList = (intersectionObserver, MutationRecordArray) => MutationRecordArray
		.filter(({ type }) => type === 'childList')
		.forEach(({ addedNodes }) => Array
			.from(addedNodes)
			.filter(({ classList }) => classList && classList.contains('lazyload'))
			.forEach((el) => intersectionObserver.observe(el)));


	const intersectionObserver = new IntersectionObserver(lazyload, { rootMargin: '100px' });
	root.querySelectorAll('img.lazyload').forEach((el) => intersectionObserver.observe(el));

	const mutationObserver = new MutationObserver((mutationRecordArray) => updateNodeList(intersectionObserver, mutationRecordArray));
	mutationObserver.observe(root, { childList: true, subtree: true });

})(window, document);
