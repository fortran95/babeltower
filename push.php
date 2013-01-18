<?
include(dirname(__FILE__) . "/_general_.php");

$tokenstr = request_var('token');
$ciphertext = request_var('ciphertext');
$check = request_var('check');
$receiver = request_var('receiver');

if(!$tokenstr)
    $r = new failure('token not present.');
else {
    $token = new token();
    if(!$result = $token->read($tokenstr))
        $r = new failure(new Exception('token invalid.',-1));
    else {
        $r = new success(array('username'=>$token->username,
                               'text'=>aes_decrypt($ciphertext,$token->secret),
                               'check'=>$check,
                               'receiver'=>$receiver,
                        ));
    }
}
if(isset($r)) die($r->getJSON());
