<?
class friendship{
    public function __construct($token){
        global $database,$_max_buddies_per_user;
        $this->max_buddies_limit = $_max_buddies_per_user;
        $this->db = $database;
        $this->token = $token;
    }
    public function query($raw=True){
        $userid = $this->token->userid;
        $userq = $this->db->querySQL("SELECT * FROM friendship
                                      WHERE userid='{$userid}'");
        if(count($userq) < 1){
            $sql = "INSERT INTO frienship(userid,data) VALUES('$userid','')";
            $this->db->doSQL($sql);
            $ret = '';
        } else
            $ret = $userq[0]['data'];
        return $raw ? $ret : json_decode($ret,True);
    }
    public function add($userid){
        if(!$newuser = $this->token->getUserInfo($userid))
            return -1;
        $data = $this->query(False);
        if(count($data) > $this->max_buddies_limit)
            return -2;

        $userid = (int)$userid;
        $data[$userid] = $newuser['username'];
        return $this->updateData($data);
    }
    public function remove($userid){
        $data = $this->query(False);
        if(!isset($data[$userid]))
            return false;
        unset($data[$userid]);
        return $this->updateData($data);
    }
    private function updateData($data){
        $target = $this->token->userid;
        $data = json_encode($data);
        $sql = "UPDATE friendship SET data='$data' WHERE userid='$target'";
        $this->db->doSQL($sql);
        $err = $this->db->lastError();
        return ($err == '');
    }
}
