<?
class messaging{
    public function __construct($token){
        global $database;
        $this->db = $database;
        $this->token = $token;
    }
    public function pullMessages(){
        
    }
    public function pushMessage($buddyid,$message){
        if(false !== $this->userExists($buddyid))
            return -1;

        
        $sql = "INSERT INTO users(username,
                                  passhash)
                       VALUES('$username',
                              '$hashed')";
        $this->db->doSQL($sql);
        $err = $this->db->lastError();
        return ($err == '');
    }
    private function userExists($userid){
        if(!is_numeric($userid))
            return false;
        $userq = $this->db->querySQL("SELECT * FROM users
                                      WHERE username='$userid'");
        if(count($userq) < 1)
            return false;
        return $userq[0];
    }
}
