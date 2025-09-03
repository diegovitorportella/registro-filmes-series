import sequelize from '../config/database.js';
import {DataTypes, Model} from 'sequelize';
import bcrypt from 'bcrypt';

class User extends Model{
    isValidPassword(plainPassword) {
        return bcrypt.compareSync(plainPassword, this.password);
    }
}

User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(value, salt);
            this.setDataValue('password', hash);
        }
    },
}, {
    sequelize,
    modelName: 'User',
    tablename: 'users', 
})

export default User;