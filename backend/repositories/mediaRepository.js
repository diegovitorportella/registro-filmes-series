import MediaModel from '../models/mediaModel.js';

class MediaRepository {
    async createMedia(data) {
        return await MediaModel.create(data);
    }
    async getMediaById(id) {
        return await MediaModel.findByPk(id);
    }
    async updateMedia(id, data) {
        await MediaModel.update(data, { where: { id } });
        return await this.getMediaById(id);
    }
    async deleteMedia(id) {
        return await MediaModel.destroy({ where: { id } });
    }
    getAllMedia() {
        return MediaModel.findAll();
    }
    async getMediaByType(type) {
        return await MediaModel.findAll({ where: { mediaType: type } });
    }
    async getMediaByGenre(genre) {
        return await MediaModel.findAll({ where: { genre } });
    }
    async getMediaByAuthor(author) {
        return await MediaModel.findAll({ where: { author } });
    }
    async getMediaByTitle(title) {
        return await MediaModel.findAll({ where: { title } });
    }
    async getTopRatedMedia(limit = 10) {
        return await MediaModel.findAll({
            order: [['stars', 'DESC']],
            limit
        });
    }
}
export default new MediaRepository()