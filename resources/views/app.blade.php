<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

    <title>{{ $settings['site_name'] ?? 'Ushop' }}</title>
    <link rel="icon" href="{{ asset('storage/' . ($settings['favicon'] ?? 'favicon.ico')) }}" type="image/x-icon">

    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @vite('resources/css/app.css')
    @routes
    @inertiaHead
</head>

<body>
    @inertia
</body>

</html>
