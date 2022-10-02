var tipos;
var servicio;
var busqueda;
var idUsuario;
var idReceta;
var nickname;
var order;
var mail;
var nombre;
var activo;
var textoBusqueda;
var avatar;
var numero;

const setTextoBusqueda=(texto)=>{
    textoBusqueda=texto;
}

const setAvatar=(image)=>{

    avatar=image;
}

const getAvatar=()=>{
    return avatar;
}

const getTexto=()=>{

    return textoBusqueda;
}

const setActivo=(active)=>{
    activo = active;
}

const getActivo=()=>{
    return activo;
}

const setOrder=(criterio)=>{
    order=criterio;
}

const getOrder=()=>{
    return order;
}

const setUsuario=(idUser)=>{
    idUsuario =idUser
}

const setMail=(mailApp)=>{
    mail = mailApp
}

const getMail=()=>{
    return mail;
}

const setNombre=(nombreApp)=>{
    nombre = nombreApp
}

const getNombre=()=>{
    return nombre;
}

const setNick=(alias)=>{
    nickname =alias;
}

const getNick=()=>{
    return nickname;
}

const setReceta=(receta)=>{
    idReceta=receta;
}

const getReceta=()=>{
    return idReceta;
}

const getUsuario=()=>{
    return idUsuario; 
}

const setTipos=(datosReceta) =>{
    tipos =datosReceta;
}

const setServicio =(sweb)=>{
    servicio =sweb;
}

const getServicio=() =>{
    return servicio;
}

const getTipos=() =>{
    return tipos;
}

const setBusqueda =(busq) =>{
    busqueda =busq;
}

const getBusqueda=()=>{

    return busqueda;
}

const setNumero = (num) => {
    numero = num;
}

const getNumero = () => {
    return numero;
}

export default {
    setTipos,
    getTipos,
    setServicio,
    getServicio,
    setBusqueda,
    getBusqueda,
    setUsuario,
    getUsuario,
    setReceta,
    getReceta,
    getNick,
    setNick,
    getOrder,
    setOrder,
    setMail,
    getMail,
    getNombre,
    setNombre,
    setActivo,
    getActivo,
    setTextoBusqueda,
    getTexto,
getAvatar,
setAvatar,
setNumero,
getNumero}