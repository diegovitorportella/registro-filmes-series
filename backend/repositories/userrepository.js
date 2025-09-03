import userModel from '../models/userModel.js'

class UserRepository {
    async createUser(data) {
        return await userModel.create(data);
    }
    async findUserByEmail(email) {
        return await userModel.findOne({ where: { email } });
    }
    async getUserByemailWithPassword(email){
        return await userModel.findOne({where: {email}, attributes: {include: ['password']}});
    }
    async findUserById(id) {
        return await userModel.findByPk(id);
    }
    async updateUser(id, updates) {
        return await userModel.update(updates, {where: { id } });
    }
    async deleteUser(id) {
        return await userModel.destroy({where: { id } });
    }
    getAllUsers() {
        return userModel.findAll({attributs: {exclude: ['password']}});
    }
}

export default new UserRepository();