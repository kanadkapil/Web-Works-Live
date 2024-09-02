document.addEventListener("DOMContentLoaded", () => {
    const partitionCountInput = document.getElementById("partitionCount");
    const partitionInputsDiv = document.getElementById("partitionInputs");
    const createWheelButton = document.getElementById("createWheelButton");
    const spinButton = document.getElementById("spinButton");
    const resultDiv = document.getElementById("result");
    const wheel = document.getElementById("wheel");

    let partitionNotes = [];

    // Create input fields for each partition note
    partitionCountInput.addEventListener("input", () => {
        partitionInputsDiv.innerHTML = ""; // Clear previous inputs
        const partitionCount = parseInt(partitionCountInput.value);

        for (let i = 0; i < partitionCount; i++) {
            const inputDiv = document.createElement("div");
            inputDiv.className = "mb-2";

            const label = document.createElement("label");
            label.className = "block text-lg font-medium mb-1";
            label.textContent = `Partition ${i + 1} Note:`;

            const input = document.createElement("input");
            input.type = "text";
            input.className = "input input-bordered w-full";
            input.dataset.index = i;

            inputDiv.appendChild(label);
            inputDiv.appendChild(input);
            partitionInputsDiv.appendChild(inputDiv);
        }
    });

    // Create the wheel
    createWheelButton.addEventListener("click", () => {
        const partitionCount = parseInt(partitionCountInput.value);
        partitionNotes = Array.from(partitionInputsDiv.querySelectorAll("input")).map(input => input.value || `Section ${parseInt(input.dataset.index) + 1}`);

        if (partitionCount < 2) {
            alert("Please enter at least 2 partitions.");
            return;
        }

        // Generate dynamic conic gradient for partitions
        const colors = Array.from({ length: partitionCount }, () => getRandomColor());
        const colorStops = colors.map((color, index) => {
            const angle = (index * (360 / partitionCount)).toFixed(2);
            return `${color} ${angle}deg ${(parseFloat(angle) + (360 / partitionCount)).toFixed(2)}deg`;
        });

        // Apply conic-gradient as the wheel's background
        wheel.style.background = `conic-gradient(${colorStops.join(', ')})`;
        wheel.style.transform = 'rotate(0deg)';
        wheel.classList.remove("hidden");
        spinButton.classList.remove("hidden");
    });

    // Spin the wheel when the button is clicked
    spinButton.addEventListener("click", () => {
        const spinDuration = 3000; // Duration of the spin in milliseconds
        const partitionCount = partitionNotes.length;
        const spinDegrees = Math.floor(Math.random() * 360) + 360 * 3; // Random angle for spinning (at least 3 full rotations)

        // Apply spin
        wheel.style.transition = `transform ${spinDuration}ms cubic-bezier(0.33, 1, 0.68, 1)`;
        wheel.style.transform = `rotate(${spinDegrees}deg)`;

        // Determine the result after the spin
        setTimeout(() => {
            wheel.style.transition = ""; // Remove transition after spin
            const selectedSection = Math.floor(((spinDegrees % 360) / 360) * partitionCount);
            resultDiv.textContent = `You landed on: ${partitionNotes[selectedSection]}`;
        }, spinDuration);
    });

    // Generate a random color for each partition
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Trigger initial partition inputs rendering
    partitionCountInput.dispatchEvent(new Event('input'));
});
