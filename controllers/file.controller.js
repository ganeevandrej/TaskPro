import fileService from "../service/file-service.js";

class FileController {
  async uploadAvatar(req, res, next) {
    
    try {
      const userId = req.params.userId;
      const imageData = req.file.buffer;

      const imageUrl = await fileService.uploadAvatar(imageData, userId);

      return res.send(imageUrl);
    } catch (error) {
      next(error);
    }
  }

  async deleteAvatar(req, res, next) {
    try {
      const userId = req.params.userId;
      await fileService.deleteAvatar(userId);

      return res.send("Аватар пользователя успешно удален!");
    } catch (error) {
      next(error)
    }
  }
}

export default new FileController();
