<?
class userManager{
    public function __construct(){
        global $database;
        $this->db = $database;
    }
    public function authenticate($username,$password,$nowtime){
        /*
         *  Authenticates a user with $username and $password
         *
         *  Returns some useful information when passed.
         *  Returns false when failed.
         */
        $qu = $this->encodeUsername($username);
        if(false === ($user=$this->userExists($qu)))
            return -1;
        
        $timediff = time() - $nowtime;
        if(!($timediff >= -15 && $timediff < 15))
            return -2;
        else {
            $check = hash_hmac('sha1',$user['passhash'],"$username$nowtime");
            if($password != $check)
                return -3;
        }
        return 'mytoken';# TODO return a token
    }
    public function userNew($username,$password){
        /*
         *  Add a new user to database.
         *
         *  Return false if anything wrong.
         *  Return true if user did inserted.
         */
        if(!$this->validateUsername($username))
            return -1;
        $username = $this->encodeUsername($username);
        if(false !== $this->userExists($username))
            return -2;
        $hashed = sha1('sha1',$password);
        $sql = "INSERT INTO users(username,
                                  passhash)
                       VALUES('$username',
                              '$hashed')";
        $this->db->doSQL($sql);
        $err = $this->db->lastError();
        return ($err == '');
    }
    public function validateUsername($username){
        $username = trim($username);
        $ulen = strlen($username);
        if($ulen > 20 or $ulen < 4) return false;
        return true;
    }
    private function userExists($username){
        $userq = $this->db->querySQL("SELECT * FROM users
                                      WHERE username='$username'");
        if(count($userq) < 1)
            return false;
        return $userq[0];
    }
    private function encodeUsername($username){  
        return base64_encode(
                strtolower(
                    trim($username)
                )
               );
    }
    private function decodeUsername($encoded){
        return base64_decode($encoded);
    }
}
?>
