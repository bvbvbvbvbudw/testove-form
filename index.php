<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="includes/files/css/style.css">
    <title>Testove Email Sender</title>
</head>
<body>
<form id="mail-sender" method="POST" accept-charset="UTF-8">
    <input type="email" name="email" required placeholder="Пошта...">
    <input type="text" name="name" placeholder="Ім'я..." pattern="[^0-9]*" title="Будь ласка, використовуйте лише букви">
    <textarea name="description" placeholder="Опис..."></textarea>
    <button type="submit">Відправити</button>
    <div id="loadingCircle"></div>
</form>

<div id="modal">
    <div>Повідомлення відправлено!</div>
    <button id="closeModal">Закрити</button>
</div>

<div id="errorMessage">Виникла помилка при відправленні повідомлення!</div>

<script src="includes/files/js/script.js"></script>
</body>
</html>
