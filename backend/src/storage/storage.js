class Storage {
   async upload(file, userId) {
      throw new Error("Not implemented");
   }

   async delete(fileId) {
      throw new Error("Not implemented");
   }

   getPublicUrl(fileId) {
      throw new Error("Not implemented");
   }
}

module.exports = Storage;