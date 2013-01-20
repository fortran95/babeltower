<?
include(dirname(__FILE__) . "/_general_.php");

$tokenstr = request_var('token');

if(!$tokenstr)
    $r = new failure('token not present.');
else {
    $token = new token();
    if(!$result = $token->read($tokenstr))
        $r = new failure(new Exception('token invalid.',-1));
    else {
        $u = new messaging($token);
        $pulled = $u->pullMessages();
        $r = new success(array('username'=>$token->username,
                               'pulled'=>$pulled));
    }
}
if(isset($r)) die($r->getJSON());
