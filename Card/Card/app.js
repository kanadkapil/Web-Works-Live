document.getElementById('businessCardForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const designation = document.getElementById('designation').value;
    const email = document.getElementById('email').value;
    const contactNumber = document.getElementById('contactNumber').value;
    const homeAddress = document.getElementById('homeAddress').value;
    const officeAddress = document.getElementById('officeAddress').value;
    const profileImage = document.getElementById('profileImage').files[0];
    const cardOrientation = document.getElementById('cardOrientation').value;
    const showQRCode = document.getElementById('showQRCode').checked;
    const backgroundColor = document.getElementById('backgroundColor').value;

    // Show the business card preview div
    const cardPreview = document.getElementById('cardPreview');
    cardPreview.classList.remove('hidden');
    
    // Set background color for the card
    cardPreview.style.backgroundColor = backgroundColor;

    // Set the card content
    document.getElementById('previewName').textContent = name;
    document.getElementById('previewDesignation').textContent = designation;
    document.getElementById('previewEmail').textContent = email;
    document.getElementById('previewPhone').textContent = contactNumber ? `Phone: ${contactNumber}` : '';
    document.getElementById('previewHomeAddress').textContent = homeAddress ? `Home: ${homeAddress}` : '';
    document.getElementById('previewOfficeAddress').textContent = officeAddress ? `Office: ${officeAddress}` : '';

    // Display Profile Image
    const profileImageElement = document.getElementById('previewProfileImage');
    if (profileImage) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profileImageElement.src = e.target.result;
            profileImageElement.classList.remove('hidden');
        };
        reader.readAsDataURL(profileImage);
    } else {
        profileImageElement.classList.add('hidden');
    }

    // QR Code generation
    const qrCodeElement = document.getElementById('previewQRCode');
    qrCodeElement.innerHTML = ''; // Clear any existing QR code

    if (showQRCode) {
        const qrData = `Name: ${name}\nDesignation: ${designation}\nEmail: ${email}\nPhone: ${contactNumber}\nHome: ${homeAddress}\nOffice: ${officeAddress}`;
        
        // Generate QR code
        const qrCode = new QRCode(qrCodeElement, {
            text: qrData,
            width: 100,
            height: 100,
        });
    }

    // Set the card to vertical or horizontal
    if (cardOrientation === 'vertical') {
        cardPreview.classList.add('vertical');
        cardPreview.classList.remove('horizontal');
    } else {
        cardPreview.classList.add('horizontal');
        cardPreview.classList.remove('vertical');
    }
});

// Profile Image Preview
document.getElementById('profileImage').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imagePreview = document.getElementById('imagePreview');
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block'; // Show the image preview
        };
        reader.readAsDataURL(file);
    }
});

// Download Card (Future Implementation - Placeholder)
function downloadCard() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // Draw the card content to the canvas
    ctx.fillText(document.getElementById('previewName').textContent, 10, 10);
    // Convert canvas to image and trigger download
    const dataURL = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'business_card.png';
    a.click();
}
