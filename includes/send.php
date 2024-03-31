<?php

require_once dirname(__DIR__) . '/config.php';

require 'mail.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        exit();
    }
    sendEmail($_POST['name'], $_POST['email'], $_POST['description']);
}
