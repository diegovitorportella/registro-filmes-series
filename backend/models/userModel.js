import squelize from '../config/database.js';
import {Datatypes, Model} from 'sequelize';
import bcrypt from 'bcrypt';

class User extends Model{
    isValidPassword(plainPassword) {
        return bcrypt.compareSync(plainPassword, this.password);
    }
}

User.init({
    name: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    email: {
        type: Datatypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        },
    },
    password: {
        type: Datatypes.STRING,
        allowNull: false,
        set(value) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(value, salt);
            this.setDataValue('password', hash);
        }
    },
}, {
    squelize,
    modelName: 'User',
    tablename: 'users', 
})

export default User;