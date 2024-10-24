<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error Handling</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <div class="container mx-auto max-w-lg p-8 bg-white shadow-lg rounded-lg my-10">
        <h2 class="text-2xl font-bold mb-6 text-center">Error Handling</h2>
        <form method="POST" action="receive_error.php" class="space-y-4">
            
            <!-- Name Input -->
            <div class="form-control">
                <label class="label">Name:</label>
                <input type="text" name="name" class="input input-bordered w-full">
                <span class="text-error"><?php echo $nameErr ?? ''; ?></span>
            </div>

            <!-- Mobile Input -->
            <div class="form-control">
                <label class="label">Mobile:</label>
                <input type="text" name="mobile" class="input input-bordered w-full">
                <span class="text-error"><?php echo $mobileErr ?? ''; ?></span>
            </div>

            <!-- Email Input -->
            <div class="form-control">
                <label class="label">Email:</label>
                <input type="email" name="email" class="input input-bordered w-full">
                <span class="text-error"><?php echo $emailErr ?? ''; ?></span>
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
// receive_error.php
$nameErr = $mobileErr = $emailErr = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty($_POST["name"])) {
        $nameErr = "Name is required";
    }

    if (empty($_POST["mobile"]) || !preg_match("/^\d{10}$/", $_POST["mobile"])) {
        $mobileErr = "Valid mobile number is required";
    }

    if (empty($_POST["email"]) || !filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
        $emailErr = "Valid email is required";
    }
}
?>
