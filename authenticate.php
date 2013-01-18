<?
include(dirname(__FILE__) . "/_general_.php");

$username = isset($_POST['username'])?$_POST['username']:false;
$password = isset($_POST['password'])?$_POST['password']:false;
$time = isset($_POST['nowtime'])?$_POST['nowtime']:false;

if(!($username && $password && $time))
    $r = new failure('unknown data');
else {
    $u = new userManager();
    $token = $u->authenticate($username,$password,$time);
    if($token == -1)
        $r = new failure('user does not exist.');
    else if($token == -2)
        $r = new failure('login timeout.');
    else if($token == -3)
        $r = new failure('incorrect password.');
    else if(is_string($token))
        $r = new success(array('token'=>$token));
    else
        $r = new failure('unknown error.');
}

if(isset($r)) die($r->getJSON());
