import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { ratingT } from "../types/ratingType";

const prisma = new PrismaClient();

// Create a rating
export const createRating = async (req: Request, res: Response) => {
  try {
    const ratingData: ratingT = req.body;
    await prisma.rating.create({
      data: ratingData,
    });
    res.send("Rating inserted successfully");
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// Update a rating
export const updateRating = async (req: Request, res: Response) => {
  try {
    const validRating = await prisma.rating.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });
    if (validRating !== null) {
      await prisma.rating.update({
        where: { id: Number(req.params.id) },
        data: req.body,
      });
      res.send("Rating updated successfully");
    } else {
      res.send("Rating Not Found!!!");
    }
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// Delete a rating
export const deleteRating = async (req: Request, res: Response) => {
  try {
    const validRating = await prisma.rating.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });
    if (validRating !== null) {
      await prisma.rating.delete({
        where: { id: Number(req.params.id) },
      });
      res.send("Rating deleted successfully");
    } else {
      res.send("Rating Not Found!!!");
    }
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// Find many ratings
export const findManyRatings = async (req: Request, res: Response) => {
  const { where } = req.body;
  if (!where) {
    return res.status(400).send("Missing 'where' in request body");
  }

  try {
    const ratings = await prisma.rating.findMany({ where });
    res.json(ratings);
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

export const renderCreateRating = (req: Request, res: Response) => {
  res.render("create_rating", { title: "Create Rating" });
};

// Render the update rating form
export const renderUpdateRating = async (req: Request, res: Response) => {
  const ratingId = Number(req.params.id);
  try {
    const rating = await prisma.rating.findUnique({ where: { id: ratingId } });
    res.render("update_rating", { title: "Update Rating", rating });
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};
