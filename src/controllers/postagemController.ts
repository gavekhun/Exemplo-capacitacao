import { Categoria, PrismaClient, Usuario } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient();

interface Postagem {
    titulo: string,
    conteudo: string,
    usuarioId: number,
    categoria: any
}

class PostagemController {
    async create (req: Request, res: Response) {
        try {
            
            const { titulo, conteudo, usuarioId, categoria }: Postagem = req.body
            const postagem = await prisma.postagem.create({
                data: {
                    titulo,
                    conteudo,
                    usuario: {
                        connect: {
                            id: usuarioId,                            
                        }
                    },
                    categoria: {
                        connect: categoria                     
                    }
                }
                
                
            })
            console.log("oi")
            return res.status(201).json(postagem)            
        } catch (error: any) {
            console.log(error)
            return res.status(201).json({ error: error.message })
        }

    }
    async show(req: Request, res: Response){
        try {
            const postagens = await prisma.postagem.findMany({
                include:{
                    categoria: true
                }
            })
            return res.status(201).json(postagens)
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
            
        }
    }
    async index(req: Request, res: Response){
        try {
            const { id } = req.params
            const postagem = await prisma.postagem.findUnique({
                where:{
                    id: Number(id)
                },
                include:{
                    categoria: true
                }
            })
            return res.status(201).json(postagem)
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
            
        }
    }
    async update (req: Request, res: Response){
        try {
            const { id } = req.params
            const { titulo, conteudo }:Postagem = req.body
            const postagem = await prisma.postagem.update({
                where:{
                    id: Number(id)
                },
                data:{
                    titulo,
                    conteudo,                   
                    
                },
                include:{
                    categoria: true,
                    usuario: true
                }
            })
            return res.status(201).json(postagem)
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
            
        }
    }
    async delete(req:Request, res:Response){
        try {
            const { id } = req.params
            const postagem = await prisma.postagem.delete({
                where: {
                    id: Number(id)
                },                
            })
            return res.status(201).json(postagem)
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
            
        }

    }
}

export default new PostagemController();