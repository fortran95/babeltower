<?
include(dirname(__FILE__) . "/_general_.php");

$tokenstr = request_var('token',false);
$action = request_var('action',false,'GET');

if(!($tokenstr && $action))
    $r = new failure('token or action not present.');
else {
    $token = new token();
    if(!$result = $token->read($tokenstr))
        $r = new failure(new Exception('token invalid.',-1));
    else {
        $f = new friendship($token);
        switch($action){
            case('list'):
                $r = new success(array('list'=>$f->query(True)));
                break;
            case('add'):
                $buddyid = request_var('id',false);
                $ret = $f->add($buddyid);
                if($ret === true)
                    $r = new success('new buddy added.');
                else if($ret == -1)
                    $r = new failure('no such user.');
                else if($ret == -2)
                    $r = new failure('your buddy list has reached max storage.');
                else
                    $r = new failure('unknown error. perhaps a database access failure.');
                break;
            default:
                $r = new failure('unrecognized action');
        }
    }
}
if(isset($r)) die($r->getJSON());
