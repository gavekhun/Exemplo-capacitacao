import {Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()


interface Categoria{
    nome: string
}

class CategoriaController {
    async create (req: Request, res: Response){
        try{
            const { nome }  = req.body
            let categoriaInput: Prisma.CategoriaCreateInput = {
                nome: String(nome),
            }
            const newCategoria = await prisma.categoria.create({
                data: categoriaInput
            });
            return res.status(201).json(newCategoria)
        } catch (error: any){
            return res.status(500).json({ error: error.message })
        }

    }

    async createCategoria (req: Request, res: Response){
        try {
            const { nome }: Categoria = req.body;
            const newCategoria = await prisma.categoria.create({
                data: {
                    nome
                }
            })
            return res.status(201).json(newCategoria);
            
        } catch (error: any) {
            return res.status(500).json({ error: error.message })            
        }
    }
    async show (req: Request, res: Response) {

       try {
        const showCategorias = await prisma.categoria.findMany({
            include: {
                postagem: true
            }
        })
        return res.status(201).json(showCategorias)        
       } catch (error: any) {
        return res.status(500).json({ error: error.message })        
       }

    }
    async index (req: Request, res: Response){
        try {
            const { id } = req.params
            const categoria = await prisma.categoria.findUnique({
                where: {
                    id: Number(id)
                },
                include: {
                    postagem: true
                }
                
            })
            return res.status(201).json(categoria)
            
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
            
        }
    }    

    async delete ( req: Request, res: Response){
        try {
            const { id } = req.params;
            const deleteCategoria = await prisma.categoria.delete({
                where: {
                    id: Number(id)
                }
            })
            return res.status(201).json({ msg: "Categoria excluída com sucesso!", Categoria_Deletada: deleteCategoria});            
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
        }
    }
    async search (req: Request, res: Response){
        try {
            const { key } = req.body
            const categorias = await prisma.categoria.findMany({
                where:{
                    nome: {
                        search: String(key),
                        mode: "insensitive"
                    }
                }
            })
            return res.status(201).json(categorias)
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
            
        }
    }

}

export default new CategoriaController();


