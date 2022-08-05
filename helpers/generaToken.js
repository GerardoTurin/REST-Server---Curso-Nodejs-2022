import  jwt  from "jsonwebtoken";

const generarToken = (usuarioID = '') => {
    return new Promise((resolve, reject) => {
        const payload = { usuarioID };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, { expiresIn: '4h' }, (error, token) => {
            if (error) {
                console.log(error);
                reject('Error al crear el token');
            } else {
                resolve(token);
            }
        }
    )});
}







export {
    generarToken
};