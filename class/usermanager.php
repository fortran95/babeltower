<?
class userManager{
    public function __construct(){
        global $database;
        $this->db = $database;
    }
    public function authenticate($username,$password){
        /*
         *  Authenticates a user with $username and $password
         *
         *  Returns some useful information when passed.
         *  Returns false when failed.
         */
        $qu = $this->encodeUsername($username);
        if(false === ($user=$this->userExists($qu)))
            return false;
        if($user['passhash'] != hash_hmac('sha1',$password,$user['hmackey']))
            return false;

        return new user($user['id'],
                        $this->decodeUsername($user['username']),
                        $password);
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
        $hmackey = getRandomString(40);
        $hashed = hash_hmac('sha1',$password,$hmackey);
        $sql = "INSERT INTO users(username,
                                  hmackey,
                                  passhash)
                       VALUES('$username',
                              '$hmackey',
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
