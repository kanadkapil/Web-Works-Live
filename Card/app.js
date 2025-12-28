// DOM Elements
const form = document.getElementById("cardForm");
const inputs = form.querySelectorAll("input, select");
const previewQR = document.getElementById("previewQR");
const cardCapture = document.getElementById("cardCapture");
const cardGradient = document.getElementById("cardGradient");

// Initial Data
const defaultData = {
  name: "Johnathan Doe",
  designation: "Creative Director",
  email: "john@pro.design",
  phone: "+1 202 555 0124",
  address: "New York, NY",
  template: "modern",
  orientation: "landscape", // Added default orientation
  color: "#3b82f6",
  showQR: true,
};

// --- REAL-TIME UPDATES ---
function updatePreview() {
  const data = {
    name: document.getElementById("name").value || defaultData.name,
    designation:
      document.getElementById("designation").value || defaultData.designation,
    email: document.getElementById("email").value || defaultData.email,
    phone: document.getElementById("phone").value || defaultData.phone,
    address: document.getElementById("address").value || defaultData.address,
    template: document.getElementById("templateType").value,
    orientation: document.getElementById("orientation").value,
    color: document.getElementById("themeColor").value,
    showQR: document.getElementById("showQR").checked,
  };

  // Card Geometry & Class
  cardCapture.className = `card-${data.template} ${data.orientation} relative overflow-hidden transition-all duration-500 shadow-2xl`;
  cardCapture.style.setProperty("--theme-color", data.color);

  // Inject Structured HTML to allow Flex re-ordering via CSS
  cardCapture.innerHTML = `
        <div id="cardBody" class="w-full h-full p-12 flex flex-col justify-between relative z-10 transition-all duration-500">
            <div class="flex justify-between items-start card-top-row w-full">
                <div class="max-w-[70%] card-text-group">
                    <h3 id="previewName" class="text-3xl font-black mb-1 leading-tight tracking-tight">${
                      data.name
                    }</h3>
                    <p id="previewDesignation" class="text-sm font-semibold uppercase tracking-widest opacity-70">${
                      data.designation
                    }</p>
                </div>
                <div id="previewLogo" class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 overflow-hidden shadow-xl shrink-0">
                    ${
                      localStorage.getItem("savedLogo")
                        ? `<img src="${localStorage.getItem(
                            "savedLogo"
                          )}" class="w-full h-full object-cover">`
                        : '<i class="fa-solid fa-cube text-2xl"></i>'
                    }
                </div>
            </div>

            <div class="flex justify-between items-end card-bottom-row w-full">
                <div class="space-y-3 text-xs font-semibold opacity-90 card-details-group flex flex-col">
                    <div class="flex items-center"><i class="fa-solid fa-envelope w-6 opacity-60"></i> <span>${
                      data.email
                    }</span></div>
                    <div class="flex items-center"><i class="fa-solid fa-phone w-6 opacity-60"></i> <span>${
                      data.phone
                    }</span></div>
                    <div class="flex items-center"><i class="fa-solid fa-location-dot w-6 opacity-60"></i> <span>${
                      data.address
                    }</span></div>
                </div>
                <div id="previewQR" class="w-20 h-20 bg-white p-1 rounded-lg shadow-lg card-qr-group shrink-0" style="display: ${
                  data.showQR ? "block" : "none"
                }"></div>
            </div>
        </div>
        <div id="cardGradient" class="absolute inset-0 pointer-events-none opacity-40"></div>
    `;

  // Reset Gradient Reference (since we re-injected innerHTML)
  const newCardGradient = cardCapture.querySelector("#cardGradient");
  newCardGradient.style.background = `linear-gradient(30deg, #ffffff 25%, ${data.color} 100%)`;

  // QR Code Update
  if (data.showQR) {
    generateQR(data, cardCapture.querySelector("#previewQR"));
  }
}

// --- QR GENERATION ---
let qrDebounce;
function generateQR(data, qrContainer) {
  clearTimeout(qrDebounce);
  qrDebounce = setTimeout(() => {
    const qrData = `BEGIN:VCARD\nVERSION:3.0\nFN:${data.name}\nTITLE:${data.designation}\nEMAIL:${data.email}\nTEL:${data.phone}\nADR:${data.address}\nEND:VCARD`;

    const canvas = document.createElement("canvas");
    QRCode.toCanvas(
      canvas,
      qrData,
      {
        width: 80,
        margin: 0,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      },
      function (error) {
        if (error) console.error(error);
        if (qrContainer) {
          qrContainer.innerHTML = "";
          qrContainer.appendChild(canvas);
        }
      }
    );
  }, 300);
}

// --- IMAGE EXPORT ---
async function downloadCard() {
  const btn = document.querySelector('button[onclick="downloadCard()"]');
  const originalText = btn.innerHTML;

  btn.innerHTML =
    '<i class="fa-solid fa-circle-notch fa-spin mr-2"></i> Generating...';
  btn.disabled = true;

  try {
    const canvas = await html2canvas(cardCapture, {
      scale: 3, // High scale for HQ print
      backgroundColor: null,
      useCORS: true,
    });

    const link = document.createElement("a");
    link.download = `BusinessCard_${
      document.getElementById("name").value || "User"
    }.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  } catch (err) {
    console.error("Export failed:", err);
  } finally {
    btn.innerHTML = originalText;
    btn.disabled = false;
  }
}

// --- PROFILE IMAGE HANDLING ---
document
  .getElementById("profileImage")
  .addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const logoDiv = document.getElementById("previewLogo");
        logoDiv.innerHTML = `<img src="${event.target.result}" class="w-full h-full object-cover">`;
      };
      reader.readAsDataURL(file);
    }
  });

// --- EVENT LISTENERS ---
inputs.forEach((input) => {
  input.addEventListener("input", updatePreview);
});

// Initial Render
updatePreview();
