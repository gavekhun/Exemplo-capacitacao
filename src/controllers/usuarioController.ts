import {Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

interface Usuario {
    email: string,
    senha: string,
    role: boolean
    nome: string,
    telefone: string,
    dataDeNascimento: Date,
    bio: string,
    fotoPerfil: string
}

class UsuarioController {
    async create (req: Request, res: Response) {
        try {
            const { email, senha , role, nome, telefone, dataDeNascimento, bio, fotoPerfil }: Usuario = req.body;            
            const usuario = await prisma.usuario.create({
                data: {
                    email,
                    senha,
                    role,                   
                    nome,
                    dataDeNascimento,
                    fotoPerfil,
                    telefone,
                    bio                   
                },      
            })
            return res.status(201).json(usuario)
            
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
            
        }

    }
    async update (req: Request, res: Response) {
        try{
            const { id } = req.params;
            const { email, senha , role, nome, telefone, dataDeNascimento, bio, fotoPerfil }: Usuario = req.body;            

            const usuarioUpdate = await prisma.usuario.update({
                where: {
                    id: Number(id)

                },
                data: {
                    email,
                    senha,
                    role,                   
                    nome,
                    dataDeNascimento,
                    fotoPerfil,
                    telefone,
                    bio   
                },               
            })
            return res.status(201).json(usuarioUpdate)

        }catch(error: any){
            return res.status(500).json({ error: error.message })

        }

    }
    async show (req: Request, res: Response) {

        try {
            const usuarios = await prisma.usuario.findMany({
                include:{ 
                    postagem: true
                }                
            })

            res.status(201).json(usuarios)
            
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
            
        }
    }
    async index (req: Request, res: Response){
        try {
            const { id } = req.params;
            const usuario = await prisma.usuario.findUnique({
                where: {
                    id: Number(id)
                }
            })
            return res.status(201).json(usuario)
            
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
        }
    }
    async delete (req: Request, res: Response) {
        try {
            const { id } = req.params
            const usuario = await prisma.usuario.delete({
                where: {
                    id: Number(id)
                }
            })
            return res.status(201).json({ msg: "Usuário excluído", usuario: usuario});
            
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
            
        }
    }
}

export default new UsuarioController();