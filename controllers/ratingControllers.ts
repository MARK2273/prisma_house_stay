import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { date } from "joi";
import { ratingT } from "../types/ratingType";

const prisma = new PrismaClient();

// Create a rating
export const createRating = async (req: Request, res: Response) => {
  try {
    const RatingData: ratingT = req.body;
    await prisma.rating.create({
      data: RatingData,
    });
    res.send("Rating inserted successfully");
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// {
//   "comment": "Great experience!",
//   "cleanliness_rating": 4.5,
//   "accuracy_rating": 4.0,
//   "check_in_rating": 5.0,
//   "communication_rating": 4.8,
//   "location_rating": 4.2,
//   "value_rating": 4.5,
//   "postId": 1
// }

// Update a rating
export const updateRating = async (req: Request, res: Response) => {
  try {
    const validId = await prisma.user.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });
    if (validId !== null) {
      await prisma.rating.update({
        where: { id: Number(req.params.id) },
        data: req.body,
      });
      res.send("Rating updated successfully");
    } else {
      res.send("Data Not Found!!!");
    }
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// {
//   "comment": "Updated review: Great experience!",
//   "cleanliness_rating": 4.7,
//   "accuracy_rating": 4.2,
//   "check_in_rating": 4.8,
//   "communication_rating": 4.9,
//   "location_rating": 4.5,
//   "value_rating": 4.6
// }

// Delete a rating
export const deleteRating = async (req: Request, res: Response) => {
  try {
    const validId = await prisma.user.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });
    if (validId !== null) {
      await prisma.rating.update({
        where: { id: Number(req.params.id) },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });
      res.send("Rating deleted successfully");
    } else {
      res.send("Data Not Found!!!");
    }
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

//Find Rating
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

//userRatings
export const userRatings = async (req: Request, res: Response) => {
  try {
    const validId = await prisma.user.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });
    if (validId !== null) {
     const data =  await prisma.rating.findMany({
        where: { id: Number(req.params.id) },
      });
      res.send(data);
    } else {
      res.send("Data Not Found!!!");
    }
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};
