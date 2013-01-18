<?
include(dirname(__FILE__) . "/_general_.php");

$tokenstr = isset($_POST['token'])?$_POST['token']:false;

if(!$tokenstr)
    $r = new failure('token not present.');
else {
    $token = new token();
    if(!$result = $token->read($tokenstr))
        $r = new failure(new Exception('token invalid.',-1));
    else {
        $r = new success(array('username'=>$token->username));
    }
}
if(isset($r)) die($r->getJSON());
