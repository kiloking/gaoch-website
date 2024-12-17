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
