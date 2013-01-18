<?
include(dirname(__FILE__) . "/_general_.php");

$queryid = isset($_GET['id'])?$_GET['id']:false;

if(!$queryid) exit;
if(!is_numeric($queryid)) exit;

$t = new token();
if(!$userInfo = $t->getUserInfo($queryid))
    die('0');
else
    if(time() - $userInfo['lastvisit'] < 90)
        die('1');
    else
        die('0');
