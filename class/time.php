<?
class timeRegulator{
    public function __construct($timestr){
        $this->reptime = $this->convert($timestr);
    }
    public function __toString(){
        return "{$this->reptime}";
    }
    private function convert($timestr){
        return strtotime($timestr);
    }
}
?>
