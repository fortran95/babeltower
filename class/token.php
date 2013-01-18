<?
class token{
    private $signkey;
    private $maxsession;
    public function __construct(){
        global $_unique_key, $_max_session, $database;
        $this->signkey = $_unique_key;
        $this->db = $database;
        $this->maxsession = $_max_session;
    }
    public function read($tokenstr){
        $parts = explode(':',$tokenstr);
        if(count($parts) < 5)
            return false;

        if(!is_numeric($parts[2])) return false;
        if( time() - $parts[2] > $this->maxsession ) return false;

        $tokenstr = "{$parts[0]}:{$parts[1]}:{$parts[2]}:{$parts[3]}";
        $gotsign = $parts[4];

        if(!$userInfo = $this->getUserInfo($parts[0]))
            return false;
        $checksign = hash_hmac('sha1',$tokenstr,$this->signkey);
        $checksign = hash_hmac('sha1',$checksign,$userInfo['passhash']);

        if($checksign != $gotsign)
            return false;

        $this->userid = $parts[0];
        $this->username = $parts[1];

        if(time() - $userInfo['lastvisit'] > 60)
            $this->updateUserPresence($this->userid);

        return true;
    }
    public function __toString(){
        if(!$userInfo = $this->getUserInfo($this->userid))
            return '';
        # generate token str base
        $tokenstr = implode(':',array($this->userid,
                                      $this->username,
                                      (int)time(),
                           ));
        # generate random padding
        $padding = md5(rand() . $tokenstr);
        $tokenstr = $tokenstr . ":" . $padding;

        $sign = hash_hmac('sha1',$tokenstr,$this->signkey);
        $sign = hash_hmac('sha1',$sign,$userInfo['passhash']);
        
        $result = $tokenstr . ":" . $sign;
        return $result;
    }
    public function getUserInfo($userid){
        if(!is_numeric($userid))
            return false;
        $userq = $this->db->querySQL("SELECT * FROM users
                                      WHERE id='{$userid}'");
        if(count($userq) < 1)
            return false;
        return $userq[0];
    }
    private function updateUserPresence($userid){        
        if(!is_numeric($userid))
            return false;
        $nowtime = time();
        $sql = "UPDATE users SET lastvisit='$nowtime' WHERE id='$userid'";
        $this->db->doSQL($sql);
    }
}
