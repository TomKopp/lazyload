# witzbould's lazyload

lazyload inspired by https://github.com/Paul-Browne/lazyestload.js

## Usage

Add `class=lazyload` and `data-src` or `data-srcset` to your HTML markup.\
The lazyloader will automaticaly atach to all `img` with that class and will monitor your DOM for additional images.

It uses [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
and [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).\
*You* have to ensure that the targeted browsers support those!

```html
<!-- normal img -->
<img class="lazyload" src="images/placeholders/forest-compressed.jpg" data-src="images/forest-compressed.jpg">

<!-- img with srcset -->
<img class="lazyload" src="images/placeholders/jon-grogan-compressed.jpg" data-srcset="images/500/jon-grogan-compressed.jpg 500w, images/jon-grogan-compressed.jpg, 2800w">

<!-- picture with default img -->
<picture>
	<source media="(max-width: 300px)" data-srcset="images/300/jeremy-gallman_square_smaller.jpg" />
	<source media="(max-width: 400px)" data-srcset="images/400/jeremy-gallman_square_smaller.jpg" />
	<source media="(max-width: 500px)" data-srcset="images/500/jeremy-gallman_square_smaller.jpg" />
	<source media="(min-width: 501px)" data-srcset="images/jeremy-gallman_square_smaller.jpg" />
	<img class="lazyload" src="images/placeholders/jeremy-gallman_square_smaller.jpg">
</picture>
```

Also have a look at the example (reused from [Paul Browne's lazyestload](https://github.com/Paul-Browne/lazyestload.js)).
