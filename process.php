<?php

$servername = "localhost";
$username = "offetiyx_pagina";
$password = 'id1$qXgqu9Wi';
$db = "offetiyx_offerte";
$conn = mysqli_connect($servername, $username, $password, $db);


if (!empty($_SERVER['HTTP_CLIENT_IP']))   //check ip from share internet
{
    $ip = $_SERVER['HTTP_CLIENT_IP'];
} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))   //to check ip is pass from proxy
{
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
    $ip = $_SERVER['REMOTE_ADDR'];
}
$ip = $_SERVER['REMOTE_ADDR'];
$geo_url = "http://ip-api.com/php/" . $ip;
$user_details = unserialize(file_get_contents($geo_url));
$geo = $user_details["city"] . ' / ' . $user_details["regionName"];

if (isset($_POST['username']) && isset($_POST['email'])) {
    $name = $_POST['username'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $postcode = $_POST['postcode'];
    $user_agent = $_SERVER['HTTP_USER_AGENT'];
    $url = $_POST['url'];
    $s1 = $_POST['s1'];
    $s2 = $_POST['s2'];
    date_default_timezone_set('Europe/Amsterdam');
    $date = date('m/d/Y h:i:s a', time());

    $q1 = $_POST['question0'];
    $q2 = $_POST['question1'];
    $q3 = $_POST['question2'];
    $q4 = $_POST['question3'];
    $q5 = $_POST['question4'];
    $q6 = $_POST['question5'];
    $q7 = $_POST['question6'];




    $sql = "INSERT INTO `data`( `name`, `email`, `phone`, `postcode`, `user_agent`, `date`, `ip`,`url`, `geo`, `s1`, `s2`, `q1`, `q2`, `q3`, `q4`, `q5`, `q6`, `q7`) 
VALUES ('$name','$email','$phone','$postcode', '$user_agent', '$date', '$ip','$url', '$geo', '$s1', '$s2', '$q1', '$q2', '$q3', '$q4', '$q5', '$q6', '$q7')";
    if (mysqli_query($conn, $sql)) {
        echo "true";
    } else {
        echo mysqli_connect_error();
    }
    mysqli_close($conn);
}
