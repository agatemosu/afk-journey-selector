import chars, { Rarity } from "./characters.js";

const charsDiv = document.querySelector("#chars");
const selectorDiv = document.querySelector("#selector");

const charsClasses = ["first", "second", "third", "fourth", "fifth"];
const charsSet = [];

for (let i = 0; i < charsClasses.length; i++) {
	charsSet[i] = null;

	const charEl = document.createElement("div");
	charEl.dataset.canvasIdx = i;
	charEl.classList.add("char", charsClasses[i]);

	const imgEl = document.createElement("div");
	imgEl.classList.add("char-img");

	charEl.appendChild(imgEl);
	charEl.addEventListener("click", removeChar);
	charsDiv.appendChild(charEl);
}

for (let i = 0; i < chars.length; i++) {
	const charEl = document.createElement("div");

	charEl.dataset.charIdx = i;
	charEl.classList.add("char", "select");
	charEl.style.backgroundImage = `url("./chars/${chars[i].name}.png")`;

	const idxEl = document.createElement("span");
	charEl.appendChild(idxEl);

	selectorDiv.appendChild(charEl);
	charEl.addEventListener("click", selectChar);
}

function getRarityColor(rarity) {
	switch (rarity) {
		case Rarity.S:
			return "#d98c47";

		case Rarity.A:
			return "#81578f";

		default:
			return "#5c6786";
	}
}

function selectChar({ target }) {
	const canvasIdx = target.dataset.canvasIdx;

	if (canvasIdx === undefined) {
		const test = charsSet.find((el) => el === null);

		if (test === undefined) {
			return;
		}

		const charIdx = target.dataset.charIdx;
		const availableIdx = charsSet.findIndex((el) => el === null);

		charsSet[availableIdx] = availableIdx;
		target.dataset.canvasIdx = availableIdx;
		target.firstChild.textContent = availableIdx + 1;

		const targetEl = charsDiv.querySelector(
			`[data-canvas-idx="${availableIdx}"]`,
		);

		targetEl.style.backgroundImage = `linear-gradient(180deg, ${getRarityColor(chars[charIdx].rarity)}, #20252b)`;
		targetEl.firstChild.style.backgroundImage = `url("./chars/${chars[charIdx].name}.png")`;

		return;
	}

	removeSelection(target, canvasIdx);
}

function removeChar({ target }) {
	const idx = target.dataset.canvasIdx;

	if (charsSet[idx] === null) {
		return;
	}

	const targetEl = selectorDiv.querySelector(`[data-canvas-idx="${idx}"]`);
	removeSelection(targetEl, idx);
}

function removeSelection(target, idx) {
	target.removeAttribute("data-canvas-idx");
	target.firstChild.textContent = null;

	charsSet[idx] = null;

	const targetEl = charsDiv.querySelector(`[data-canvas-idx="${idx}"]`);
	targetEl.style = null;
	targetEl.firstChild.style.backgroundImage = null;
}
