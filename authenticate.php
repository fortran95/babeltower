<?
include(dirname(__FILE__) . "/_general_.php");

$username = isset($_POST['username'])?$_POST['username']:false;
$password = isset($_POST['password'])?$_POST['password']:false;
$time = isset($_POST['nowtime'])?$_POST['nowtime']:false;

if(!($username && $password && $time))
    $r = new failure('unknown data');
else {
    $timediff = time() - $time;
    if(!($timediff >= 0 && $timediff < 30))
        $r = new failure('login timeout.');
    else {
        $ary = array(
            'test'=>'test',
        );
        $findkey = strtolower(trim($username));
        if(!isset($ary[$findkey]))
            $r = new failure('unknown username');
        else {
            $check = hash_hmac('sha1',$ary[$findkey],"$username$time");
            if($password != $check){
                $r = new failure('incorrect password');
            } else {
                $r = new success(array('token'=>'mytoken'));
            }
        }
    }
}


if(isset($r)) die($r->getJSON());
