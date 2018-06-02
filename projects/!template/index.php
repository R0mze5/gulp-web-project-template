<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetPageProperty("title", "Главная");
$APPLICATION->SetPageProperty("NOT_SHOW_NAV_CHAIN", "Y");
$APPLICATION->SetTitle("Главная страница");

$APPLICATION->AddHeadString('<link href="/local/templates/website/css/index.min.css" rel="stylesheet">');
?>

<?$APPLICATION->IncludeFile(
    $APPLICATION->GetTemplatePath("/local/templates/website/include_areas/header.php"),
    Array(),
    Array("MODE"=>"html")
);?>
    <!-- /* ********************* header ********************* */ -->


    <main class="main">
        
 

    </main>

<!-- /* ********************* end main__main ********************* */ -->
<?$APPLICATION->IncludeFile(
    $APPLICATION->GetTemplatePath("/local/templates/website/include_areas/footer.php"),
    Array(),
    Array("MODE"=>"html")
);?>


<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>