<?
class token{
    private $signkey;
    public function __construct($tokenstr=false){
        global $_unique_key;
        $this->signkey = $_unique_key;

        if(is_string($tokenstr)){
        }
    }
    public function generate($userinfo){
        
    }
    public function __toString(){
        return 'mytoken';
    }
}
