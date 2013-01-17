<?
interface Database{
    public function querySQL($sql);
    public function doSQL($sql);
    public function lastError();
}

class MySQL implements Database{
    public function __construct($server,$user,$pass,$dbname){
        $this->con = mysql_connect($server,$user,$pass);
        mysql_select_db($dbname,$this->con);
    }
    public function doSQL($sql){
        mysql_query($sql, $this->con);
    }
    public function querySQL($sql){
        $query_resource = mysql_query($sql, $this->con);
        $ret = array();
        if($query_resource){
            while($row = mysql_fetch_assoc($query_resource)){
                $ret[] = $row;
            }
            mysql_free_result($query_resource);
        }
        return $ret;
    }
    public function lastError(){
        return mysql_error($this->con);
    }
}
?>
