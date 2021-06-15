'use strict';

const runTypewriter = () => {

	/*
	// First clear and store the 5 options
	const options = [];
	for (let i = 1; i <= 5; i++) {
		options[i] = {};
		options[i].element = document.getElementById('opt' + i);
		options[i].text = options[i].element.innerHTML;
		options[i].element.innerHTML = '';
	}

	// Create function to repopulate them when finished
	const populateOptions = () => {
		for (let i = 1; i <= 5; i++) {
			options[i].element.innerHTML = options[i].text;
		}
	}
	*/

	// Typewriter element and text reset
	const typewriterElement = document.getElementById('typewriter');
	const rawText = typewriterElement.innerHTML;
	typewriterElement.innerHTML = '';

	// Position tracker and speed configurations
	let cursorPosition = -1;
	const durationVariation = 0;
	const durationMin = 10;
	let tempTypeSpeed = 0;

	// Variables to deal with tags
	let tag = '';
	let readingTag = false;
	let tagOpen = false;

	// Recursive typing function
	const printNextChar = () => {
		cursorPosition++;

		if (readingTag === true) {
			tag += rawText[cursorPosition];
		}

		// Determine if we're about to start a tag
		if (rawText[cursorPosition] === '<') {
			if (tagOpen) {
				tagOpen = false;
				readingTag = true;
			} else {
				tag = '';
				tagOpen = true;
				readingTag = true;
				tag += rawText[cursorPosition];
			}
		}

		// Add data to appropriate element
		if (!readingTag && tagOpen) {
			tag.innerHTML += rawText[cursorPosition];
		} else if (!readingTag && !tagOpen) {
			typewriterElement.innerHTML += rawText[cursorPosition];
		} else if (readingTag === true && rawText[cursorPosition] === '>') {
			readingTag = false;
			if (tagOpen) {
				if (tag === '<br>') {
					const newSpan = document.createElement('br');
					typewriterElement.appendChild(newSpan);
					tagOpen = false;
					readingTag = false;
				} else {
					const newSpan = document.createElement(tag.substr(1, tag.length - 2));
					typewriterElement.appendChild(newSpan);
					newSpan.innerHTML = tag;
					tag = newSpan.firstChild;
				}
			}
		}

		// Pause if not a tag, longer if new line, don't pause if tag
		if (!readingTag)
			tempTypeSpeed = (Math.random() * durationVariation) + durationMin;
		else if (readingTag)
			tempTypeSpeed = 0;
		else if (rawText[cursorPosition] === '\n')
			tempTypeSpeed += 200;
		else // this should never be thrown
			console.log('Debug this black magic!');

		if (cursorPosition < rawText.length - 1) {
			setTimeout(printNextChar, tempTypeSpeed);
		} else {
			/* populateOptions(); */
		}
	};

	setTimeout(printNextChar, 500);
};
runTypewriter();
