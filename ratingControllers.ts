import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Create a rating
export const createRating = async (req: Request, res: Response) => {
  try {
    await prisma.rating.create({
      data: req.body,
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
    await prisma.rating.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.send("Rating updated successfully");
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
    await prisma.rating.delete({
      where: { id: Number(req.params.id) },
    });
    res.send("Rating deleted successfully");
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};
