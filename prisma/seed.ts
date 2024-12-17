import { WORKS } from "../constants/works";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const image1 = await prisma.image.create({
    data: {
      url: "https://web.forestdev.work/gaoch/works/w01_bg.png",
    },
  });
  await prisma.work.createMany({
    data: WORKS,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
