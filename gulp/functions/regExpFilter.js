'use strict';

module.exports = function regExpFilter(str) {
  let output; 
  let header = `<? \
	require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php"); \
	$APPLICATION->SetPageProperty("keywords", ""); \
  $APPLICATION->SetPageProperty("description", ""); \
	$APPLICATION->SetPageProperty("title", "Главная"); \
	$APPLICATION->SetTitle("Главная страница"); \
	?>
	`;
  let footer = '<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>';

  if (str.search(/base_areas\/header.pug/ig) != -1) {
    output = header;
  } else if (str.search(/base_areas\/footer.pug/ig) != -1) {
    output = footer;
  } else {
    let clearStr = str.split(' ')[1].replace(/\.pug/, '').replace(/\.\.\//, '');

    output = '| <?require($_SERVER["DOCUMENT_ROOT"]./"'+ $.path.sourcePath + clearStr + '.php");?>';
  }
    
  return output;
}