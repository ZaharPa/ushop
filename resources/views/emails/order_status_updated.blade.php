<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Order Status Updated</title>
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
        <h1>Hello, {{ $order->name }}</h1>
        <p>Your order <strong>#{{ $order->id }}</strong> status has been updated to</p>
        <p><strong>{{ strtoupper($order->status) }}</strong></p>

        <p>Thank you for shopping with us </p>

        <div class="footer">
            &copy; {{ date('Y') }} USHOP
        </div>
    </div>
</body>

</html>
