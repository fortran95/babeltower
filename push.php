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
        $msgCenter = new messaging($token);

        $result = $msgCenter->pushMessage($receiver,$ciphertext,$check);

        if($result === true)
            $r = new success(array('check'=>$check));
        else if($result == -1)
            $r = new failure('receiver not exists.');
        else if($result == -2)
            $r = new failure('message too long.');
        else if($result == -3)
            $r = new failure('integrity check not passed.');
        else
            $r = new failure('Database accessing error: ' . $result);
    }
}
if(isset($r)) die($r->getJSON());
