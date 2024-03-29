<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'settings.php';

function sendEmail($name, $email, $description) {
    global $smtpConfig, $recipient;

    if (!isset($smtpConfig['host'], $smtpConfig['port'], $smtpConfig['username'], $smtpConfig['password'], $smtpConfig['secure'])) {
        echo json_encode(array("success" => false, "error" => "smtp configuration is incomplete"));
        return;
    }

    $message = "";
    if ($name !== null) $message .= "Name: $name\n";
    if ($email !== null) $message .= "Email: $email\n";
    if ($description !== null) $message .= "Message: $description\n";

    try {
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->CharSet    = "UTF-8";
        $mail->Host       = $smtpConfig['host'];
        $mail->Port       = $smtpConfig['port'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $smtpConfig['username'];
        $mail->Password   = $smtpConfig['password'];
        $mail->SMTPSecure = $smtpConfig['secure'];

        $mail->setFrom($smtpConfig['username'], 'Testove');

        $mail->addAddress($recipient);

        $mail->isHTML(false);
        $mail->Subject = '=?UTF-8?B?' . base64_encode('6weeks - Форма заповнена') . '?=';
        $mail->Body = $message;

        $mail->send();

        echo json_encode(array("success" => true, "message" => "message has been sent"));
    } catch (Exception $e) {
        echo json_encode(array("success" => false, "error" => "message could not be sent mailer error: {$mail->ErrorInfo}"));
    }
}
