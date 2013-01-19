var userData = {};

userData.ids = {};
userData.names = {};

userData.register = function(id,name){
    userData.ids[name] = id;
    userData.names[id] = name;
}
