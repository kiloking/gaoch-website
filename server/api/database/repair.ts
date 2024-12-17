import db from "@/lib/server/db";

export const getRepairById = async (id: number) => {
  return await db.repair.findUnique({
    where: { id },
    include: {
      images: true,
    },
  });
};

// get all repair
export const getAllRepair = async () => {
  return await db.repair.findMany({
    include: {
      images: true,
    },
    orderBy: { createdAt: "desc" },
  });
};
