import mediaRepository from "../repository/mediaRepository";

class MediaService {
    constructor(MediaRepository){
        this.mediaRepository = MediaRepository;
    }
    async createMedia(data) {
        const existingMedia = await this.mediaRepository.findMediaByTitle(Media.title);
        if(existingMedia){
            throw new Error('Ja existe uma midia com esse titulo');
        }
        return await this.mediaRepository.createMedia(data);
    }
    async getMediaById(id) {
        const media = await this.mediaRepository.getMediaById(id);
        if (!media) throw new Error("Media nao encontrada");
        return media;
    }
    async updateMedia(id, data) {
        const media = await this.mediaRepository.getMediaById(id);
        if (!media) throw new Error("Media nao encontrada");
        return mediaRepository.updateMedia(id, data);
    }
    async deleteMedia(id) {
        const media = await mediaRepository.getMediaById(id);
        if (!media) throw new Error("Media nao encontrada");
        return media;
    }
    async getAllMedia() {
        return await mediaRepository.getAllMedia();
    }
    async getMediaByType(type) {
        const media = await this.mediaRepository.getMediaByType(type);
        if (!media) throw new Error("Genero nao encontrado");
        return media;
    }
    async getMediaByGenre(genre) {
        const media = await this.mediaRepository.getMediaByGenre(genre);
        if (!media) throw new Error("Genero nao encontrado");
        return media;
    }
    async getMediaByAuthor(author) {
        const media = await this.mediaRepository.getMediaByAuthor(author);
        if (!media) throw new Error("Autor nao encontrado");
        return media;
    }
    async getMediaByTitle(title) {
        const media = await this.mediaRepository.getMediaByTitle(title);
        if (!media) throw new Error("Titulo nao encontrado");
        return media;
    }
    async getTopRatedMedia(limit) {
        return await mediaRepository.getTopRatedMedia(limit);
    }
}
export default new MediaService(mediaRepository);