import chars, { Rarity } from "./characters.js";

const charsDiv = document.querySelector("#chars");
const selectorDiv = document.querySelector("#selector");

const charsDivChildren = charsDiv.querySelectorAll("*");
const charsSet = [];

for (let i = 0; i < charsDivChildren.length; i++) {
	charsDivChildren[i].dataset.canvasIdx = i;
	charsSet[i] = null;

	charsDivChildren[i].addEventListener("click", removeChar);
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

		targetEl.style.backgroundColor = getRarityColor(chars[charIdx].rarity);
		targetEl.style.backgroundImage = `url("./chars/${chars[charIdx].name}.png")`;

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
}
