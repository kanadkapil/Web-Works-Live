<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Validation</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <div class="container mx-auto max-w-lg p-8 bg-white shadow-lg rounded-lg my-10">
        <h2 class="text-2xl font-bold mb-6 text-center">Form Validation</h2>
        <form onsubmit="return validateForm()" class="space-y-4">
            
            <!-- Name Input -->
            <div class="form-control">
                <label class="label">Name:</label>
                <input type="text" name="name" id="name" class="input input-bordered w-full" required>
                <span class="text-error" id="nameError"></span>
            </div>

            <!-- Mobile Input -->
            <div class="form-control">
                <label class="label">Mobile:</label>
                <input type="text" name="mobile" id="mobile" class="input input-bordered w-full" required>
                <span class="text-error" id="mobileError"></span>
            </div>

            <!-- Email Input -->
            <div class="form-control">
                <label class="label">Email:</label>
                <input type="email" name="email" id="email" class="input input-bordered w-full" required>
                <span class="text-error" id="emailError"></span>
            </div>

            <!-- Submit Button -->
            <div class="form-control mt-6">
                <input type="submit" value="Submit" class="btn btn-primary w-full">
            </div>
        </form>
    </div>

    <script>
        function validateForm() {
            let name = document.getElementById("name").value;
            let mobile = document.getElementById("mobile").value;
            let email = document.getElementById("email").value;
            
            let nameError = document.getElementById("nameError");
            let mobileError = document.getElementById("mobileError");
            let emailError = document.getElementById("emailError");

            // Name validation (only letters and spaces)
            if (!/^[a-zA-Z ]+$/.test(name)) {
                nameError.textContent = "Name must contain only letters and spaces.";
                return false;
            } else {
                nameError.textContent = "";
            }

            // Mobile number validation (10 digits)
            if (!/^\d{10}$/.test(mobile)) {
                mobileError.textContent = "Mobile must be a 10-digit number.";
                return false;
            } else {
                mobileError.textContent = "";
            }

            // Email validation (basic format)
            let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailPattern.test(email)) {
                emailError.textContent = "Invalid email format.";
                return false;
            } else {
                emailError.textContent = "";
            }

            return true; // Submit form if all validations pass
        }
    </script>
</body>
</html>
