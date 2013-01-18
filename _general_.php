<?
$basepath = dirname(__FILE__);

# Read in user configuration
include("$basepath/config/database.php");
include("$basepath/config/security.php");

###############################################################################

# Below inclusions, defining classes that may exists in sessions, should be
# done with priority.
include("$basepath/class/user.php");

# Connect Database
include("$basepath/class/database.php");
switch($_database_credentials['type']){
    case 'mysql':
        $database = new MySQL($_database_credentials['server'],
                              $_database_credentials['user'],
                              $_database_credentials['password'],
                              $_database_credentials['dbname']);
        break;
}

include("$basepath/class/usermanager.php");
include("$basepath/class/time.php");
include("$basepath/class/result.php");

?>
