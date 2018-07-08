<?php
require 'phpmailer/PHPMailerAutoload.php';

$mail = new PHPMailer();

$mail->isSMTP();
$mail->Host = "smtp.gmail.com";
$mail->SMTPSecure = "ssl";
$mail->Port = 465;
$mail->SMTPAuth = true;
$mail->Username = 'sendersite999@gmail.com';
$mail->Password = 'nashdvijblij4emvashdvijA';

$mail->setFrom('sendersite999@gmail.com', 'My Site Visitator');
$mail->addAddress('fugybogie@gmail.com');
$mail->Subject = 'SMTP email test';
$mail->Body = 'this is some body';

if ($mail->send())
    echo "Mail sent";
?>