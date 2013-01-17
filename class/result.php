<?
class result{
    protected $type = 'unknown';

    public function getJSON(){
        $ret = array('type'=>$this->type);
        if(isset($this->content)){
            $c = $this->content;
            switch($c){
                case(is_array($c)):
                    $ret['data'] = $c;
                    break;
                case($c instanceof Exception):
#                    print var_dump($c);
                    if($this->type != 'failure') break;
                    $ret['error'] = array(
                        'message'=>$c->getMessage(),
                        'code'=>$c->getCode(),
                        'line'=>$c->getLine(),
#                        'file'=>$c->getFile(),
                    );
                    break;
                case(is_string($c)):
                    # TODO translate
                    $ret['description'] = $c;
                    break;
                default:
                    break;
            }
        }
        return json_encode($ret);
    }
}
class success extends result{
    protected $type = 'success';

    public function __construct($mixed){
        $this->content = $mixed;
    }
}
class failure extends result{
    protected $type = 'failure';

    public function __construct($mixed){
        $this->content = $mixed;
    }
}

/* Test code
$a = new success('good');
print $a->getJSON();*/
?>
