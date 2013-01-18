<?
class messaging{
    public function __construct(){
        global $database;
        $this->db = $database;
    }
    public function pullMessages($userid){
        
    }
    public function pushMessage($userid,$buddyid,$message){
        if(!$this->validateUsername($username))
            return -1;
        $username = $this->encodeUsername($username);
        if(false !== $this->userExists($username))
            return -2;
        $hashed = sha1($password);
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
