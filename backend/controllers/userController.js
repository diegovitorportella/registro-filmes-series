import userService from '../services/userService.js'

class UserController{
    constructor(Service){
        this.userService = Service
    }
    async createUserController(req, res){
        const newUser = (req.body)
        try{
            const user = await this.userService.createUserService(newUser)
            res.status(200).send(user)
        }catch(err){
            res.status(410).json({erro: err.message})
        }
    }
    async loginUserController(req, res){
        const {email, password} = req.body
        try{
            const result = await this.userService.loginUser(email, password)
            res.status(200).json(result)
        }catch(err){
            res.status(410).json({erro: err.message})
        }
    }
    async getUserByEmail(req, res){
        const {email} = req.params
        try{
            const user = await this.userService.getUserByEmail(email)
            res.status(200).json(user)
        }catch(err){
            res.status(400).json({erro: err.message})
        }
    }
    async getUserById(req, res){
        try{
            const user = await this.userService.getUserById(req.user.id)
            res.status(200).json(user)
        }catch(err){
         res.status(400).json({erro: err.message})   
        }
    }
    async updateUserController(req, res){
        const userData = req.body
        try{
            const updatedUser = await this.userService.updateUser(req.user.id, userData)
            res.status(200).json(updatedUser)
        }
        catch(err){
            res.status(400).json({erro: err.message})
        }
    }
    async deleteUserController(req, res){
        try{
            const result = await this.userService.deleteUser(req.user.id)
            res.status(200).json(result)
        }catch(err){
            res.status(400).json({erro: err.message})
        }
    }
    async getAllUsersController(req, res){
        try{
            const users = await this.userService.getAllUsers()
            res.status(200).json(users)
        }catch(err){
            res.status(400).json({erro: err.message})
        }
    }
}

export default new UserController(userService)