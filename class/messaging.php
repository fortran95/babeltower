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
        if(!$this->userExists($buddyid))
            return -1;
        if(strlen($ciphertext) > $this->max_message_length)
            return -2;

        # Check integrity first.
        $calculatedCheck = hash_hmac('sha1',$ciphertext,$this->token->secret);
        if($calculatedCheck != $check) return -3;

        # Decrypt now.
        $message = aes_decrypt($ciphertext,$this->token->secret);

        # now prepare for inserting to database.
        $message = base64_encode($message);
        $sendtime = time();
        $sender = $this->token->userid;
        $sql = "INSERT INTO single(sender,
                                   receiver,
                                   message,
                                   sendtime)
                       VALUES('{$sender}',
                              '{$buddyid}',
                              '{$message}',
                              '{$sendtime}')";
        $this->db->doSQL($sql);
        $err = $this->db->lastError();
        
        if($err == '')
            return true;
        else
            return $err;
    }
    private function userExists($userid){
        if(!is_numeric($userid))
            return false;
        $userq = $this->db->querySQL("SELECT * FROM users
                                      WHERE id='$userid'");
        if(count($userq) < 1)
            return false;
        return true;
    }
}
