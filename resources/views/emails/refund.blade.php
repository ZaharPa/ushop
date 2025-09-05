<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Refund Update</title>
    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            background-color: #a0e1ff;
            color: #333;
            padding: 20px;
        }

        .container {
            max-width: 600px;
            margin: auto;
            background: #fff;
            padding: 10px;
            border-radius: 5px;
        }

        .footer {
            font-size: 12px;
            color: #888;
            text-align: center;
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Hello</h1>
        <p>Your refund request for order <strong>#{{ $refund->order_id }}</strong> has been updated. </p>

        <p>Status: <strong>{{ ucfirst($refund->status) }}</strong></p>

        <p>{{ $messageContent }}</p>

        <p>Thank you for shopping with us </p>

        <div class="footer">
            &copy; {{ date('Y') }} USHOP
        </div>
    </div>
</body>

</html>
