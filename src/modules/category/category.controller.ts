import { Request, Response } from "express";

import { sendResponse } from "../../utils/sendResponse";
import { categoryService } from "./category.service";
import { catchAsync } from "../../utils/catchAysnc";

const createCategory = catchAsync(async (req, res) => {
  const result = await categoryService.createCategory(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Category created successfully",
    data: result,
  });
});

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.getAllCategories();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Categories retrieved successfully",
    data: result,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const categoryId = req.params.id as string;
  const payload = req.body;

  const result = await categoryService.updateCategory(categoryId, payload);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Category updated successfully",
    data: result,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const categoryId = req.params.id as string;

  const result = await categoryService.deleteCategory(categoryId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Category deleted successfully",
    data: result,
  });
});

export const categoryController = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
