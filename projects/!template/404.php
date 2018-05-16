<?
include_once($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/include/urlrewrite.php');

CHTTP::SetStatus("404 Not Found");
@define("ERROR_404","Y");

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("404 Страница не найдена");

$APPLICATION->AddHeadString('<link href="/local/templates/website/css/404.min.css" rel="stylesheet">');
?>


 <!-- /* ********************* header ********************* */ -->


    <!-- <main class="main">
        
        <section class="section">
        	<div class="error">
        		<h1 class="error__header">
        			Ошибка 404
        		</h1>
        		<p class="error__description">
        			Страницы не существует или она была удалена. 
        		</p>
        		<img src="/local/templates/website/images/icons/404.png" alt="" class="error__img">
        		<a href="/" class="button red_btn transparent">
        			вернуться на главную страницу
        		</a>
        	</div>
            
        </section>

    </main> -->

<!-- /* ********************* end main__main ********************* */ -->
<?$APPLICATION->IncludeFile(
    $APPLICATION->GetTemplatePath("/local/templates/website/include_areas/footer.php"),
    Array(),
    Array("MODE"=>"html")
);?>


<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>