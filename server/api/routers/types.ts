import { z } from "zod";

export const createWorkSchema = z.object({
  title: z.string(),
  year: z.string(),
  location: z.string(),
  description: z.string(),
  address: z.string(),
  area: z.string(),
  units: z.string(),
  floors: z.string(),
  houseTypes: z.string(),
  architect: z.string(),
  company: z.string(),
  ytVideoUrl: z.string().optional().default(""),
  coverImageId: z.number().nullable().optional(),
  bgimgId: z.number().nullable().optional(),
});

export type createWorkType = z.infer<typeof createWorkSchema>;

export const repairSchema = z.object({
  type: z.string(),
  unit: z.string(),
  contactName: z.string(),
  phone: z.string(),
  content: z.string(),
  images: z.array(z.number()),
  date: z.string(),
});

// model Project {
//   id        Int      @id @default(autoincrement())
//   title     String
//   location  String
//   status    String
//   coverImageId Int?
//   coverImage  Image?   @relation(fields: [coverImageId], references: [id], name: "ProjectCoverImage")
//   price     String
//   link      String
//   base  String //基地位置
//   area String //基地面積
//   size String //建物坪數
//   floors String //樓層
//   household String //戶數
//   design_company String //設計公司
//   construction_company String //施工公司
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
// }
export const createProjectSchema = z.object({
  title: z.string(),
  location: z.string(),
  status: z.enum(["熱銷中", "即將完工", "即將開案"]),
  coverImageId: z.number().nullable().optional(),
  price: z.string(),
  link: z.string(),
  base: z.string(),
  area: z.string(),
  size: z.string(),
  floors: z.string(),
  household: z.string(),
  design_company: z.string(),
  construction_company: z.string(),
});

export type createProjectType = z.infer<typeof createProjectSchema>;
