import "https://html2canvas.hertzen.com/dist/html2canvas.min.js";

const blackout = document.querySelector("#blackout");
const charsDiv = document.querySelector("#chars");
const resultDiv = document.querySelector("#result");
const createPhotoButton = document.querySelector("#create");
const downloadButton = document.querySelector("#download");

createPhotoButton.addEventListener("click", createPhoto);
downloadButton.addEventListener("click", downloadCanvas);
blackout.addEventListener("click", hideBlackout);

/** @type {HTMLCanvasElement} */
let canvas;

async function createPhoto() {
	canvas = await html2canvas(charsDiv, {
		windowWidth: 1920,
		windowHeight: 1080,
	});
	canvas.style = null;

	resultDiv.replaceChildren(canvas);
	resultDiv.parentElement.classList.add("open");
	blackout.dataset.visibility = "visible";
}

function downloadCanvas() {
	const dataURL = canvas.toDataURL("image/png");

	const downloadLink = document.createElement("a");
	downloadLink.href = dataURL;
	downloadLink.download = "image.png";

	downloadLink.click();
}

function hideBlackout() {
	canvas = null;
	blackout.dataset.visibility = "hidden";
	resultDiv.parentElement.classList.remove("open");
}
