import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { date } from "joi";
import { ratingT } from "../types/ratingType";

const prisma = new PrismaClient();

// Create a rating
export const createRating = async (req: Request, res: Response) => {
  try {
    await prisma.rating.create({
      data: {
        comment: req.body.comment,
        cleanliness_rating: Number(req.body.cleanliness_rating),
        accuracy_rating: Number(req.body.accuracy_rating),
        check_in_rating: Number(req.body.check_in_rating),
        communication_rating: Number(req.body.communication_rating),
        location_rating: Number(req.body.location_rating),
        value_rating: Number(req.body.value_rating),
        pivotRating: {
          create: {
            property_id: Number(req.body.property_id),
            user_id: Number(req.body.user_id),
          },
        },
      },
    });
    res.send("Rating and pivotRating inserted successfully");
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
// }

// Update a rating
export const updateRating = async (req: Request, res: Response) => {
  try {
    const ratingId = Number(req.params.id);
    const {
      comment,
      cleanliness_rating,
      accuracy_rating,
      check_in_rating,
      communication_rating,
      location_rating,
      value_rating,
      property_id,
      user_id,
    } = req.body;

    // Find the rating to ensure it exists
    const existingRating = await prisma.rating.findUnique({
      where: { id: ratingId },
      include: { pivotRating: true },
    });

    if (!existingRating) {
      return res.status(404).send("Rating not found");
    }

    // Update the rating
    await prisma.rating.update({
      where: { id: ratingId },
      data: {
        comment,
        cleanliness_rating: Number(cleanliness_rating),
        accuracy_rating: Number(accuracy_rating),
        check_in_rating: Number(check_in_rating),
        communication_rating: Number(communication_rating),
        location_rating: Number(location_rating),
        value_rating: Number(value_rating),
        pivotRating: {
          update: {
            property_id: Number(property_id),
            user_id: Number(user_id),
          },
        },
      },
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
    const ratingId = Number(req.params.id);

    // Find the rating to ensure it exists
    const validRating = await prisma.rating.findUnique({
      where: {
        id: ratingId,
      },
    });

    if (validRating !== null) {
      // Soft delete the rating
      await prisma.rating.update({
        where: { id: ratingId },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      res.send("Rating deleted successfully");
    } else {
      res.send("Rating not found");
    }
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

//Find Rating
export const findManyRatings = async (req: Request, res: Response) => {
  const propertyId = Number(req.params.id);

  if (isNaN(propertyId)) {
    return res.status(400).send("Invalid property ID");
  }

  try {
    const ratings = await prisma.rating.findMany({
      where: {
        pivotRating: {
          property_id: propertyId,
        },
      },
    });
    res.json(ratings);
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

export const averageRating = async (req: Request, res: Response) => {
  try {
    const propertyId = Number(req.params.id);

    // Find the rating to ensure it exists
    const validRating = await prisma.rating.findUnique({
      where: {
        id: propertyId,
      },
    });

    if (validRating !== null) {
      // Soft delete the rating
      const averageRatings = await prisma.rating.aggregate({
        _avg: {
          cleanliness_rating: true,
          accuracy_rating: true,
          check_in_rating: true,
          communication_rating: true,
          location_rating: true,
          value_rating: true,
        },
        where: {
          pivotRating: {
            property_id: Number(propertyId),
          },
        },
      });
      res.json(averageRatings);
    } else {
      res.send("Rating not found");
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
