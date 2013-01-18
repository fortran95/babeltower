<?
class objectHash{
    /*
     * objectHash: provides uniform interface to
     *  all hashing needs.
     */
    public function __construct($mixedObj){
        $this->source = $this->prepare($mixedObj); 
    }
    public function md5($raw=False){
        if($raw===True)
            return md5($this->source,True);
        else
            return strtolower(md5($this->source,False));
    }
    public function sha1($raw=False){
        if($raw===True)
            return sha1($this->source,$raw);
        else
            return strtolower(sha1($this->source,False));
    }

    private function prepare($mixedObj){
        /*
         * The mission is
         * converting $mixedObj into a serialized
         * form in a determistic way.
         */
        if(is_string($mixedObj))
            return $mixedObj;

        if(is_numeric($mixedObj))
            return $mixedObj;

        if(is_bool($mixedObj))
            return $mixedObj?'TRUE':'FALSE';

        if(is_array($mixedObj)){
            $result = array();
            foreach($mixedObj as $key=>$value){
                $hashValue = $this->prepare($value);
                if(is_string($key))
                    $result[] = hash_hmac('sha1',$hashValue,$key,False);
                else
                    $result[] = sha1($hashValue);
            }
            sort($result);
            return implode('',$result);
        }

        throw new Exception('trying to hash unrecognized type.');
    }
}
?>
