import {z} from 'zod';

export const createUserSchema = z.object({
    body: z.object({
        name: z.string({required_error: 'O nome é obrigatório.',}).min(3, 'O Nome precisa de ter pelo menos 3 aracterres').max(20, 'O Nome pode ter no máximo 20 caracteres'),
        email: z.string({ required_error: 'O email é obrigatório.',}).email('Email inválido'),
        password: z.string({ required_error: 'A senha é obrigatório.',}).min(6, 'A senha precisa ter pelo menos 6 caracteres').max(30, 'A senha pode ter no máximo 30 caracteres'),
    }),
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string({ required_error: 'O email é obrigatório.',}).email('Email inválido'),
        password: z.string({ required_error: 'A senha é obrigatório.',}).min(6, 'A senha precisa ter pelo menos 6 caracteres').max(30, 'A senha pode ter no máximo 30 caracteres'),
    }),
});

export const userIdParamsSchema = z.object({
    params: z.object({
        // 'coerce' tenta converter a string do parâmetro para número automaticamente
        id: z.coerce.number({
            required_error: 'O ID do utilizador é obrigatório.',
            invalid_type_error: 'O ID do utilizador deve ser um número.'
        }).int().positive('O ID do utilizador deve ser um número positivo.'),
    }),
});

export const updateUserSchema = z.object({
    body: z.object({
        name: z.string().min(3, 'O Nome precisa de ter pelo menos 3 aracterres').max(20, 'O Nome pode ter no máximo 20 caracteres').optional(), 
        email: z.string().email('Email inválido').optional(),
        password: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres').max(30, 'A senha pode ter no máximo 30 caracteres').optional(),
    }).refine((data) => Object.keys(data).length > 0, {
        message: 'Pelo menos um campo (name, email ou password) deve ser fornecido para atualização.',
    }),
    params: z.object({
        id: z.coerce.number({
            required_error: 'O ID do utilizador é obrigatório.',
            invalid_type_error: 'O ID do utilizador deve ser um número.'
        }).int().positive('O ID do utilizador deve ser um número positivo.'),
    }),
}); 