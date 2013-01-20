<?
$color = isset($_POST['p'])?$_POST['p']:'red';
$j = array('status'=>$color);
die(json_encode($j));
