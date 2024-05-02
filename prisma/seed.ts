import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Categoria {
  id: string;
  nome: string;
  imageUrl: string;
}
interface Loja {
  id: string;
  nome: string;
  imageUrl: string;
}

async function main() {
  const lojas = [
    {
      nome: "ModaCool",
      imagemUrl:
        "https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      nome: "Zapato",
      imagemUrl:
        "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      nome: "TechMart",
      imagemUrl:
        "https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      nome: "StyleCraze",
      imagemUrl:
        "https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      nome: "ShoeSpot",
      imagemUrl:
        "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  const lojasCriadas = [];
  for (const loja of lojas) {
    const lojaCriada = await prisma.loja.create({
      data: loja,
    });

    lojasCriadas.push(lojaCriada);
  }

  const categorias = [
    {
      nome: "Roupas",
      imageUrl:
        "https://images.pexels.com/photos/4066292/pexels-photo-4066292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      nome: "Calçados",
      imageUrl:
        "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      nome: "Eletrônicos",
      imageUrl:
        "https://images.pexels.com/photos/5081398/pexels-photo-5081398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      nome: "Acessórios",
      imageUrl:
        "https://images.pexels.com/photos/19871489/pexels-photo-19871489/free-photo-of-exibicao-visor-display-vitrine.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      nome: "Cosméticos",
      imageUrl:
        "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      nome: "Livros",
      imageUrl:
        "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  const categoriasCriadas = [];
  for (const categoria of categorias) {
    const categoriaCriada = await prisma.categoria.create({
      data: categoria,
    });

    categoriasCriadas.push(categoriaCriada);
  }

  console.log({ lojasCriadas, categoriasCriadas});
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
