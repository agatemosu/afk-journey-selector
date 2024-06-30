import chars from "./characters.js";

const charsDiv = document.querySelector("#chars");
const selectorDiv = document.querySelector("#selector");

const charsDivChildren = charsDiv.querySelectorAll("*");
const charsSet = [];

for (let i = 0; i < charsDivChildren.length; i++) {
	charsDivChildren[i].dataset.idx = i;
	charsSet[i] = null;

	charsDivChildren[i].addEventListener("click", removeChar);
}

for (let i = 0; i < chars.length; i++) {
	const charEl = document.createElement("div");

	charEl.classList.add("char", "select");
	charEl.style.backgroundImage = `url("./chars/${chars[i]}.png")`;

	const idxEl = document.createElement("span");
	charEl.appendChild(idxEl);

	selectorDiv.appendChild(charEl);
	charEl.addEventListener("click", selectChar);
}

function selectChar({ target }) {
	const imageStyle = target.style.backgroundImage;
	const idx = target.dataset.idx;
	const test = charsSet.find((el) => el === null);

	if (idx === undefined) {
		if (test === undefined) {
			return;
		}

		const availableIdx = charsSet.findIndex((el) => el === null);
		target.dataset.idx = availableIdx;
		target.firstChild.textContent = availableIdx + 1;

		charsSet[availableIdx] = availableIdx;
		const targetEl = charsDiv.querySelector(`[data-idx="${availableIdx}"]`);

		targetEl.style.backgroundImage = imageStyle;
		return;
	}

	removeSelection(target, idx);
}

function removeChar({ target }) {
	const idx = target.dataset.idx;
	const test = charsSet[idx];

	if (test === null) {
		return;
	}

	const targetEl = selectorDiv.querySelector(`[data-idx="${idx}"]`);
	removeSelection(targetEl, idx);
}

function removeSelection(target, idx) {
	target.removeAttribute("data-idx");
	target.firstChild.textContent = "";
	charsSet[idx] = null;

	const targetEl = charsDiv.querySelector(`[data-idx="${idx}"]`);
	targetEl.style.backgroundImage = null;
}
