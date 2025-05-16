import { WORKS } from "../constants/works";
import { PrismaClient } from "@prisma/client";
import * as jose from "jose";

const prisma = new PrismaClient();

async function main() {
  // const image1 = await prisma.image.create({
  //   data: {
  //     url: "https://web.forestdev.work/gaoch/works/w01_bg.png",
  //   },
  // });
  // await prisma.work.createMany({
  //   data: WORKS,
  // });

  // 創建管理員帳號
  const adminPassword = await new jose.EncryptJWT({ password: "admin123" })
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .encrypt(new TextEncoder().encode(process.env.JWT_SECRET!));
  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: adminPassword,
      role: "admin",
    },
  });

  // 創建第二個帳號
  const userPassword = await new jose.EncryptJWT({ password: "user123" })
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .encrypt(new TextEncoder().encode(process.env.JWT_SECRET!));
  await prisma.user.upsert({
    where: { username: "user" },
    update: {},
    create: {
      username: "user",
      password: userPassword,
      role: "user",
    },
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
