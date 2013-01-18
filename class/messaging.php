<?
class messaging{
    public function __construct($token){
        global $database, $_max_message_length;
        $this->db = $database;
        $this->token = $token;
        $this->max_message_length = $_max_message_length;
    }
    public function pullMessages(){
        
    }
    public function pushMessage($buddyid,$ciphertext,$check){
        if(false !== $this->userExists($buddyid))
            return -1;

        if(strlen($ciphertext) > $this->max_message_length)
            return -2;

        $message = aes_decrypt($ciphertext,$this->token->secret); 
        # TODO check hash
        
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
