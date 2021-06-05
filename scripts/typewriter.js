'use strict';

const runTypewriter = () => {

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

	// Typewriter element and text reset
	const typewriterElement = document.getElementById('typewriter');
	const rawText = typewriterElement.innerHTML;
	typewriterElement.innerHTML = '';

	// Position tracker and speed configurations
	let cursorPosition = 0;
	const durationVariation = 0;
	const durationMin = 10;
	let tempTypeSpeed = 0;

	// Variables to deal with tags
	let tag = '';
	let writingTag = false;
	let tagOpen = false;

	// Recursive typing function
	const printNextChar = () => {

		if (writingTag === true) {
			tag += rawText[cursorPosition];
		}

		if (rawText[cursorPosition] === '<') {
			tempTypeSpeed = 0;
			if (tagOpen) {
				tagOpen = false;
				writingTag = true;
			} else {
				tag = '';
				tagOpen = true;
				writingTag = true;
				tag += rawText[cursorPosition];
			}
		}
		if (!writingTag && tagOpen) {
			tag.innerHTML += rawText[cursorPosition];
		} else if (!writingTag && !tagOpen) {
			typewriterElement.innerHTML += rawText[cursorPosition];
		}
		if (writingTag === true && rawText[cursorPosition] === '>') {
			writingTag = false;
			if (tagOpen) {
				const newSpan = document.createElement('span');
				typewriterElement.appendChild(newSpan);
				newSpan.innerHTML = tag;
				tag = newSpan.firstChild;
			}
		}

		// NextPos
		cursorPosition += 1;
		// Pause longer if new line
		if (!writingTag) tempTypeSpeed = (Math.random() * durationVariation) + durationMin;
		if (rawText[cursorPosition] === '\n') tempTypeSpeed += 200;

		if (cursorPosition < rawText.length - 1) {
			setTimeout(printNextChar, tempTypeSpeed);
		} else {
			populateOptions();
		}
	};

	printNextChar();
};
runTypewriter();
