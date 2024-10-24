<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Combined Form</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <div class="container mx-auto max-w-lg p-8 bg-white shadow-lg rounded-lg my-10">
        <h2 class="text-2xl font-bold mb-6 text-center">Combined Form</h2>
        <?php
            // Define error variables
            $nameErr = $mobileErr = $emailErr = "";
            $name = $mobile = $email = "";

            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                // Sanitize and validate name
                if (empty($_POST["name"])) {
                    $nameErr = "Name is required";
                } else {
                    $name = htmlspecialchars(trim($_POST["name"]));
                    if (!preg_match("/^[a-zA-Z ]*$/", $name)) {
                        $nameErr = "Only letters and spaces allowed";
                    }
                }

                // Sanitize and validate mobile
                if (empty($_POST["mobile"])) {
                    $mobileErr = "Mobile number is required";
                } else {
                    $mobile = htmlspecialchars(trim($_POST["mobile"]));
                    if (!preg_match("/^\d{10}$/", $mobile)) {
                        $mobileErr = "Valid 10-digit mobile number required";
                    }
                }

                // Sanitize and validate email
                if (empty($_POST["email"])) {
                    $emailErr = "Email is required";
                } else {
                    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
                    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                        $emailErr = "Invalid email format";
                    }
                }

                // If no errors, process the data
                if (empty($nameErr) && empty($mobileErr) && empty($emailErr)) {
                    echo "<div class='alert alert-success'>Form submitted successfully!</div>";
                    echo "<p><strong>Sanitized Data:</strong></p>";
                    echo "Name: $name<br>";
                    echo "Mobile: $mobile<br>";
                    echo "Email: $email<br>";
                }
            }
        ?>

        <form method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" class="space-y-4">
            
            <!-- Name Input -->
            <div class="form-control">
                <label class="label">Name:</label>
                <input type="text" name="name" class="input input-bordered w-full" value="<?php echo $name; ?>" required>
                <span class="text-error"><?php echo $nameErr; ?></span>
            </div>

            <!-- Mobile Input -->
            <div class="form-control">
                <label class="label">Mobile:</label>
                <input type="text" name="mobile" class="input input-bordered w-full" value="<?php echo $mobile; ?>" required>
                <span class="text-error"><?php echo $mobileErr; ?></span>
            </div>

            <!-- Email Input -->
            <div class="form-control">
                <label class="label">Email:</label>
                <input type="email" name="email" class="input input-bordered w-full" value="<?php echo $email; ?>" required>
                <span class="text-error"><?php echo $emailErr; ?></span>
            </div>

            <!-- Submit Button -->
            <div class="form-control mt-6">
                <input type="submit" value="Submit" class="btn btn-primary w-full">
            </div>
        </form>
    </div>
</body>
</html>
