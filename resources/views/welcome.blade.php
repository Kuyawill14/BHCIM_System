<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>BARANGAY HEALTH CENTER INFORMATION MANAGEMENT SYSTEM WITH SMS SUPPORT</title> 
        <link rel="icon" type="image/png" href="{{URL::asset('/img/system_logo.png')}}">
        <link rel="stylesheet" type="text/css" href="{{asset('css/app.css')}}"> 
        <style>
            html {
                scroll-behavior: smooth !important;
            }
        </style>
    </head>
    <body>
        <div id="app">
            <main-app></main-app>
        </div>
        <script src="{{ mix('/js/app.js') }}"></script>
    </body>
</html>
