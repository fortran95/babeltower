<?
class user{
    public function __construct($userid,
                                $username,
                                $rawpass){
        global $database;
        $this->db = $database;

        $this->userid = $userid;
        $this->username = $username;
    }
}
?>
