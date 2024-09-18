
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const uploadButton = document.getElementById('upload-button');
const brightnessInput = document.getElementById('brightness');
const contrastInput = document.getElementById('contrast');
const saturationInput = document.getElementById('saturation');
const rotateInput = document.getElementById('rotate');
const downloadButton = document.getElementById('download-button');

let image = new Image();
let imageData = null;

// Load the selected image onto the canvas
uploadButton.addEventListener('change', function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        image.src = event.target.result;
        image.onload = function () {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            applyFilters();
        }
    }

    if (file) {
        reader.readAsDataURL(file);
    }
});

// Function to apply filters based on user input
function applyFilters() {
    const brightness = brightnessInput.value;
    const contrast = contrastInput.value;
    const saturation = saturationInput.value;
    const rotation = rotateInput.value;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
    ctx.drawImage(image, -canvas.width / 2, -canvas.height / 2);
    ctx.restore();
}

// Add event listeners to the range inputs to trigger filters
[brightnessInput, contrastInput, saturationInput, rotateInput].forEach((input) => {
    input.addEventListener('input', applyFilters);
});

// Download the edited image
downloadButton.addEventListener('click', function () {
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvas.toDataURL();
    link.click();
});
