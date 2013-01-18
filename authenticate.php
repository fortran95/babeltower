<?
include(dirname(__FILE__) . "/_general_.php");

$username = isset($_POST['username'])?$_POST['username']:false;
$password = isset($_POST['password'])?$_POST['password']:false;

if($username == 'test' && $password == 'test')
    $r = new success(array('token'=>'token'));
else
    $r = new failure('not authenticated.');

if(isset($r)) die($r->getJSON());
