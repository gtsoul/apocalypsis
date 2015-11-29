<?php 

if(!isset($_GET['z_pos'])) {
  $z_pos = '';
} else {
  $z_pos = htmlentities($_GET['z_pos']);
}

//$file_folder = 'test1/';
//$file_folder = 'low_techs/'; //3_3
//$file_folder = 'unesemaine/'; //3_15
//$file_folder = 'avance_peutroupe/'; //2_0
$file_folder = 'sinaloa/'; //7_0

$file1 = $file_folder.'universe-knowledge.z_pos.'.$z_pos;
$file2 = $file1.'.json';

if (file_exists($file1)) {
  readfile($file1);
} else if (file_exists($file2)) {
  readfile($file2);
} else {
  //echo '"system": {}';
  echo '{"error":"sector '.$z_pos.' not reachable, file '.$file1.'"}';
}

?>