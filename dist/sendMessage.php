<?php
    $to = 'ivan-trushko@rambler.ru';
    $subject = 'Заявка с сайта';
    $message = '
            <html>
                <head>
                    <title>' . $subject . '</title>
                </head>
                <body>
                    <h2> Заявка с сайта </h2>
                    <p>Имя: ' . $_POST['name'] . '</p>   
                    <p>Телефон: ' . $_POST['phone'] . '</p>    
                    <p>E-mail: ' . $_POST['email'] . '</p>    
                    <p>Интернет ресурс (если не указан, значит пользователь оставил строчку пустой): ' . $_POST['link'] . '</p>  
                    <p>Сообщение: ' . $_POST['message'] . '</p>  
                </body>
            </html>';
    $headers = "Content-type: text/html; charset=utf-8 \r\n";
    $headers .= "From: Отправитель <test@test.ru>\r\n";
    mail($to, $subject, $message, $headers);
?>