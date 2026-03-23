const authService = require("../service/authService");

module.exports = {
   login: async ({ email, password }) => {
      return await authService.login({ email, password });
   },
   
   register: async ({ username, email, password }) => {
      return await authService.register({ username, email, password });
   }
};