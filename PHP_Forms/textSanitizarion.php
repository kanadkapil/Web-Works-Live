<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Text Sanitization</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <div class="container mx-auto max-w-lg p-8 bg-white shadow-lg rounded-lg my-10">
        <h2 class="text-2xl font-bold mb-6 text-center">Text Sanitization</h2>
        <form method="POST" action="receive_sanitize.php" class="space-y-4">
            
            <!-- Name Input -->
            <div class="form-control">
                <label class="label">Name:</label>
                <input type="text" name="name" class="input input-bordered w-full" required>
            </div>

            <!-- Mobile Input -->
            <div class="form-control">
                <label class="label">Mobile:</label>
                <input type="text" name="mobile" class="input input-bordered w-full" required>
            </div>

            <!-- Email Input -->
            <div class="form-control">
                <label class="label">Email:</label>
                <input type="email" name="email" class="input input-bordered w-full" required>
            </div>

            <!-- Submit Button -->
            <div class="form-control mt-6">
                <input type="submit" value="Submit" class="btn btn-primary w-full">
            </div>
        </form>
    </div>
</body>
</html>

<?php
// receive_sanitize.php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST["name"]));
    $mobile = htmlspecialchars(trim($_POST["mobile"]));
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);

    echo "Sanitized Data:<br>";
    echo "Name: $name<br>";
    echo "Mobile: $mobile<br>";
    echo "Email: $email<br>";
}
?>
