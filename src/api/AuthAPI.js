import api from "../lib/axios";

/**
 * @description: Este archivo contiene las funciones para la autenticación de usuarios.
 */

export default {
  /**
   * @description: Esta función registra un nuevo usuario en la aplicación.
   * @param {Object} data: Los datos del usuario a registrar.
   * @returns {Promise<Object>} Un objeto que contiene el token de autenticación.
   */
  register(data) {
    return api.post("/auth/register", data);
  },
  /**
   * @description: Esta función verifica la cuenta del usuario.
   * @param {string} token: El token de verificación de la cuenta.
   * @returns {Promise<Object>} Un objeto que contiene el token de autenticación.
   */
  verifyAccount(token) {
    return api.get(`/auth/verify/${token}`);
  },
  /**
   * @description: Esta función inicia sesión en la aplicación.
   * @param {Object} data: Los datos del usuario a iniciar sesión.
   * @returns {Promise<Object>} Un objeto que contiene el token de autenticación.
   */
  login(data) {
    return api.post("/auth/login", data);
  },
  /**
   * @description: Esta función obtiene el usuario autenticado.
   * @returns {Promise<Object>} Un objeto que contiene el usuario autenticado.
   */
  auth() {
    return api.get("/auth/user");
  },
  /**
   * @description: Esta función obtiene el usuario autenticado.
   * @returns {Promise<Object>} Un objeto que contiene el usuario autenticado.
   */
  admin() {
    return api.get("/auth/admin");
  },
  /**
   * @description: Esta función restablece la contraseña del usuario.
   * @param {Object} data: Los datos del usuario a restablecer la contraseña.
   * @returns {Promise<Object>} Un objeto que contiene el mensaje de restablecimiento de contraseña.
   */
  forgotPassword(data) {
    return api.post("/auth/forgot-password", data);
  },
  /**
   * @description: Esta función verifica el token de restablecimiento de contraseña.
   * @param {string} token: El token de verificación de la contraseña.
   * @returns {Promise<Object>} Un objeto que contiene el mensaje de verificación de contraseña.
   */
  verifyPasswordResetToken(token) {
    return api.get(`/auth/forgot-password/${token}`);
  },
  /**
   * @description: Esta función actualiza la contraseña del usuario.
   * @param {string} token: El token de verificación de la contraseña.
   * @param {Object} data: Los datos del usuario a actualizar la contraseña.
   * @returns {Promise<Object>} Un objeto que contiene el mensaje de actualización de contraseña.
   */
  updatePassword(token, data) {
    return api.post(`/auth/forgot-password/${token}`, data);
  },
};
