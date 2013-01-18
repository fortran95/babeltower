<?
function request_var($name,$default=false,$method='POST'){
    global $_POST, $_GET;
    if($method == 'POST')
        return isset($_POST[$name])?$_POST[$name]:$default;
    else
        return isset($_GET[$name])?$_GET[$name]:$default;
}
