import {DataTypes, Model} from 'sequelize';
import sequelize from '../config/database.js'

class Media extends Model {}

Media.init({
    title: {    
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    synopsis: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    author:{
        type: DataTypes.STRING,
        allowNull: false
    },
    publishedDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    //aqui pode ser em minutos ou numero de temporadas
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1 }
    },
    stars: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: { min: 0, max: 5 }
    },
    mediaType: {
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            isIn: [['movie', 'series']]
        }
    },
    coverImageUrl: {
        type: DataTypes.STRING,
        allowNull: true,    
    },
}, {
    sequelize,
    modelName: 'Media',
    tableName: 'media',
    timestamps: true
});