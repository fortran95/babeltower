<?
function aes_encrypt($plaintext,$key){
    return AesCtr::encrypt($plaintext, $key, 256);
}
function aes_decrypt($ciphertext,$key){
    return AesCtr::decrypt($ciphertext, $key, 256);
}
