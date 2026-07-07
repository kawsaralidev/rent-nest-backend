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

export const categoryController = {
  getAllCategories,
  createCategory,
};
