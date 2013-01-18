<?
include(dirname(__FILE__) . "/_general_.php");

$username = request_var('username');
$password = request_var('password');
$time = request_var('nowtime');
$check = request_var('check');

if(!($username && $password && $time && $check))
    $r = new failure('data not sufficient');
else {
    if($check != sha1($username . $time))
        $r = new failure('detected transmission error. try again.');
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
}

if(isset($r)) die($r->getJSON());
