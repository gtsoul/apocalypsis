<?php 

if(!isset($_GET['z_pos'])) {
  $z_pos = '';
} else {
  $z_pos = htmlentities($_GET['z_pos']);
}

$file = 'universe-knowledge.z_pos.'.$z_pos;

if (file_exists($file)) {
  readfile($file);
} else {
  echo '"system": {}';
}

?>