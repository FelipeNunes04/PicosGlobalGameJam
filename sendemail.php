<?php

//pega os dados do $http do Angular
$meuPost = file_get_contents("php://input");

//para acessar os dados: $json.nome ou $Json.email e etc.

if($meuPost){
    $json= json_decode( $meuPost );

    $nome = $json->nome;
    $email = $json->email;
    $assunto = $json->assunto;
    $assunto = "Edifpi - ".$assunto;
    $mensagem = $json->mensagem;
    $to =  "aislanrafael@ifpi.edu.br";

    $message = "
    <html>
        Recebemos uma mensagem de contato de $nome<br><br>
        <b>Assunto:</b> $assunto<br><br>
        <b>Email:</b> $email<br><br>
        <b>Mensagem:</b> $mensagem
    </html>
    ";

}

$headers = 'Content-type: text/html; charset=utf-8' . "\r\n";
$headers .= "From: contato@edifpi.com\n";
$headers .= "Reply-To: $email_address";  

if(mail($to, $assunto, $message, $headers)){
  echo "<p class='text-success'>Mensagem Enviada Com Sucesso!</p>";
  echo json_encode(array(

                        "nome"=>$json->nome,
                        "email"=>$json->email,
                        "assunto"=>$json->assunto

                    ));
}else{
  echo "<p class='text-danger'>Sua Mensagem Não Foi Enviada!</p>";
}

//retorna os dados para o success do Angular
