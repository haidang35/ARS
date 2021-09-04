<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <title>Flight Hi</title>
    <link rel="shortcut icon" href="https://i.postimg.cc/cH1Xsyb0/fight-hi-favicon.png" type="image/x-icon">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" type="text/css"
        rel="stylesheet" />
</head>

<body>
    <div id="app"></div>
</body>
<script src="{{ asset('js/app.js') }}"></script>
<script src="{{ asset('assets/vendors/perfect-scrollbar/perfect-scrollbar.min.js') }}"></script>
<script src="{{ asset('assets/js/bootstrap.bundle.min.js') }}"></script>
{{-- <script src="{{ asset('assets/vendors/apexcharts/apexcharts.js') }}"></script> --}}
<script src="{{ asset('assets/js/pages/dashboard.js') }}"></script>
<script src="{{ asset('ssets/js/main.js') }}a"></script>
{{-- <script src="https://www.paypalobjects.com/api/checkout.js"></script> --}}

</html>
