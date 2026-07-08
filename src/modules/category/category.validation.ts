const validateCategoryPayload = (payload: { name: string }) => {
  const { name } = payload;

  if (typeof name !== "string" || name.trim() === "") {
    throw new Error("Category name is required");
  }

  if (name.trim().length < 2) {
    throw new Error("Category name must be at least 2 characters");
  }

  if (name.trim().length > 50) {
    throw new Error("Category name cannot exceed 50 characters");
  }
};

export const categoryValidation = {
  validateCategoryPayload,
};
