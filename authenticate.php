<?
include(dirname(__FILE__) . "/_general_.php");

$r = new failure('not authenticated.');

if(isset($r)) die($r->getJSON());
