<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<!DOCTYPE html>
<html lang="ru">
<head>

    <!-- <meta charset="utf-8"> -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1">


      <!--OpenGraph | http://ogp.me
      Для подключения нужно использовать атрибут prefix="og: http://ogp.me/ns#" в теге html.
      
      Шаблон:
      <meta property="og:type" content="website">
      <meta property="og:url" content="адрес сайта">
      <meta property="og:title" content="заголовок">
      <meta property="og:description" content="описание">
      <meta property="og:image" content="адрес изображения">
      -->

    
    <?$APPLICATION->ShowHead()?>
    <title><?$APPLICATION->ShowTitle()?></title>
  
    <link rel="apple-touch-icon" href="/local/templates/website/images/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" href="/local/templates/website/images/favicon/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="/local/templates/website/images/favicon/favicon-16x16.png" sizes="16x16">
    <link rel="shortcut icon" href="/local/templates/website/images/favicon/favicon.ico">

    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    


    <link href="/local/templates/website/css/common.min.css" rel="stylesheet">

    <link rel="manifest" href="site.webmanifest">


    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>



<?$APPLICATION->ShowPanel();?>

