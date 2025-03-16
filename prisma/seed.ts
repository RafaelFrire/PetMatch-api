import { PrismaClient } from '@prisma/client';
import { encode } from "../src/config/bcrypt";
const prisma = new PrismaClient();

async function seed() {
  // Criando 2 usuários ADOPTER
  const adopter1 = await prisma.user.create({
    data: {
      email: "rafael@teste.com",
      name: "Rafael",
      lastname: "Freire",
      role: "ADOPTER",
      password: (await encode("123456")) || "",
      status: "ACTIVE",
      adopter: {
        create: {
          document: "12345678901",
          phone: "123456789",
          address: "Rua avaré 10",
          zipcode: "123456",
          state: "SP",
          city: "Itu",
        },
      },
    },
  });

  const adopter2 = await prisma.user.create({
    data: {
      email: "fernandasato@teste.com",
      name: "fernanda",
      lastname: "sato",
      role: "ADOPTER",
      password: (await encode("123456")) || "",
      status: "ACTIVE",
      adopter: {
        create: {
          document: "98765432109",
          phone: "987654321",
          address: "456 Adopter Avenue",
          zipcode: "54321",
          state: "SP",
          city: "Salto",
        },
      },
    },
  });

  // Criando 2 usuários ONG
  const ong1 = await prisma.user.create({
    data: {
      email: "patas@example.com",
      name: "Patas Amigas",
      lastname: "",
      role: "ONG",
      password: await encode("senha123") || "",
      status: "ACTIVE",
      ong: {
        create: {
          cnpj: "12345678000195",
          phone: "1122334455",
          address: "Rua das ONGs, 123",
          zipcode: "12345",
          state: "SP",
          city: "São Paulo",
          name: "Patas Amigas",
          slug: "patas-amigas",
        },
      },
    },
  });

  const ong2 = await prisma.user.create({
    data: {
      email: "petfeliz@example.com",
      name: "Pet Feliz",
      lastname: "",
      role: "ONG",
      password: (await encode("senha123")) || "",
      status: "ACTIVE",
      ong: {
        create: {
          cnpj: "98765432000165",
          phone: "5566778899",
          address: "Avenida dos Pets, 456",
          zipcode: "54321",
          state: "RJ",
          city: "Rio de Janeiro",
          name: "Pet Feliz",
          slug: "pet-feliz",
        },
      },
    },
  });

  

  console.log("Seed execcutado com sucesso!");
  await prisma.$disconnect();
}

seed().catch(e => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
});
