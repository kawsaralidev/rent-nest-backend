import prisma from "../../lib/prisma";

const createCategory = async (payload: { name: string }) => {
  const category = await prisma.category.create({
    data: payload,
  });

  return category;
};

const getAllCategories = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return categories;
};

export const categoryService = {
  getAllCategories,
  createCategory,
};
