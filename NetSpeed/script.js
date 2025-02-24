let startTime, endTime;
let imageSize = 0; // Default as a number
let bitOutput = document.querySelector("#bits .value");
let kbOutput = document.querySelector("#kbs .value");
let mbOutput = document.querySelector("#mbs .value");

// Direct image link (ensure it's a static image to avoid CORS issues)
let imageLink = "https://upload.wikimedia.org/wikipedia/commons/3/3f/JPEG_example_flower.jpg";

// Function to fetch image size
async function getImageSize(url) {
    let response = await fetch(url, { method: "HEAD" });
    let size = response.headers.get("content-length");
    return size ? parseInt(size) : 1000000; // Default 1MB if size is null
}

// Function to calculate speed
function calculateSpeed() {
    let timeDuration = (endTime - startTime) / 1000; // Convert to seconds
    let loadedBits = imageSize * 8;
    let speedInBps = (loadedBits / timeDuration).toFixed(2);
    let speedInKbps = (speedInBps / 1024).toFixed(2);
    let speedInMbps = (speedInKbps / 1024).toFixed(2);

    // Update the UI
    bitOutput.textContent = `${speedInBps} bps`;
    kbOutput.textContent = `${speedInKbps} Kbps`;
    mbOutput.textContent = `${speedInMbps} Mbps`;
}

// Function to start the speed test
async function startSpeedTest() {
    startTime = new Date().getTime();
    imageSize = await getImageSize(imageLink);

    let image = new Image();
    image.onload = function () {
        endTime = new Date().getTime();
        calculateSpeed();
    };
    image.src = imageLink;
}

// Start test when the page loads
window.onload = startSpeedTest;
