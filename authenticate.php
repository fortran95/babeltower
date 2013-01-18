<?
include(dirname(__FILE__) . "/_general_.php");

$username = isset($_POST['username'])?$_POST['username']:false;
$password = isset($_POST['password'])?$_POST['password']:false;
$time = isset($_POST['nowtime'])?$_POST['nowtime']:false;

if(!($username && $password && $time))
    $r = new failure('unknown data');
else {
    
}

if(isset($r)) die($r->getJSON());
