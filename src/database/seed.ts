import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient();

async function seed(){

    const userData = Array.from({ length: 30 }).map((_, index) => ({        
        email: faker.internet.email(),        
        senha: faker.internet.password(),
        role: faker.datatype.boolean(),
        nome: faker.person.fullName(),
        telefone: faker.phone.number('+55 ## ##### ####'),
        dataDeNascimento: faker.date.birthdate({ min: 1960, max: 2005, mode: 'year'}),
        bio: faker.person.bio(),
        fotoPerfil: faker.image.url()
        
      }));

    const postData = Array.from({ length: 30 }).map((_, index) => ({
        titulo: faker.commerce.productName(),
        conteudo: faker.lorem.text(),
        usuarioId: faker.number.int({ min: 1, max: 30})      

    }))

    const categoryData = Array.from({ length: 30}).map((_, index) =>({
        nome: faker.commerce.department(),
        

    }))

      await prisma.usuario.createMany({
        data: userData
      })
      await prisma.postagem.createMany({
        data: postData
      })
      await prisma.categoria.createMany({
        data: categoryData
      })
}

seed()
.then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });


