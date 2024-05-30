import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { userT } from "../types/userType";
import { postT } from "../types/postType";

const prisma = new PrismaClient();

// Create a post
export const createPost = async (req: Request, res: Response) => {
  try {
    await prisma.post.create({
      data: {
        property_id: Number(req.body.property_id),
        title: req.body.title,
        price: Number(req.body.price),
        description: req.body.description,
        capacity: Number(req.body.capacity),
      },
    });
    res.send("Post inserted successfully");
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// {
//   "propertyId": 1,
//   "title": "Beautiful House for Sale",
//   "price": 250000,
//   "description": "A spacious and well-maintained house located in a peaceful neighborhood. It features 3 bedrooms, 2 bathrooms, a modern kitchen, and a backyard garden.",
//   "capacity": 6
// }

// Create many posts
// export const createManyPosts = async (req: Request, res: Response) => {
//   try {
//     const postData: postT[] = req.body;
//     await prisma.post.createMany({
//       data: [...postData],
//     });
//     res.send("Posts inserted successfully");
//   } catch (err: any) {
//     res.status(500).send("Something went wrong: " + err.message);
//   }
// };

// [
//   {
//     propertyId: 3,
//     title: "Beautiful House for Sale",
//     price: 250000,
//     description:
//       "A spacious and well-maintained house located in a peaceful neighborhood. It features 3 bedrooms, 2 bathrooms, a modern kitchen, and a backyard garden.",
//     capacity: 6,
//   },
//   {
//     propertyId: 2,
//     title: "Luxury Apartment with City View",
//     price: 350000,
//     description:
//       "A luxurious apartment located in the heart of the city. It offers stunning views of the skyline and comes fully furnished with top-of-the-line amenities.",
//     capacity: 4,
//   },
// ];

// Update a post
export const updatePost = async (req: Request, res: Response) => {
  try {
    const validId = await prisma.user.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });
    if (validId !== null) {
      await prisma.post.update({
        where: { id: Number(req.params.id) },
        data: {
          property_id: Number(req.body.property_id),
          title: req.body.title,
          price: Number(req.body.price),
          description: req.body.description,
          capacity: Number(req.body.capacity),
        },
      });
      res.send("Post updated successfully");
    } else {
      res.send("Data Not Found!!!");
    }
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// {
//   "propertyId": 1,
//   "title": "Updated House for Sale",
//   "price": 280000,
//   "description": "An updated description of the property.",
//   "capacity": 8
// }

// Update many posts
// export const updateManyPosts = async (req: Request, res: Response) => {
//   const { where, data } = req.body;
//   if (!where || !data) {
//     return res.status(400).send("Missing 'where' or 'data' in request body");
//   }

//   try {
//     const result: Prisma.BatchPayload = await prisma.post.updateMany({
//       where,
//       data,
//     });
//     res.send(`Posts updated successfully: ${result.count} records affected`);
//   } catch (err: any) {
//     res.status(500).send("Something went wrong: " + err.message);
//   }
// };

// {
//   "where": {
//     "propertyId": 1
//   },
//   "data": {
//     "price": 300000
//   }
// }

// Find first post
export const findFirstPost = async (req: Request, res: Response) => {
  const title: string | undefined = req.query.title?.toString();
  if (!title) {
    return res.status(400).send("Missing 'title' in request ");
  }

  try {
    const post = await prisma.post.findFirst({
      where: {
        title: title,
      },
    });
    res.json(post);
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// {
//   "where": {
//     "propertyId": 1
//   }
// }

// Find many posts
export const findManyPosts = async (req: Request, res: Response) => {
  const price: number = Number(req.query.price);
  if (!price) {
    return res.status(400).send("Missing 'price' in request ");
  }

  try {
    const posts = await prisma.post.findMany({
      where: { price: { gte: price } },
    });
    res.json(posts);
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// {
//   "where": {
//     "price": {
//       "gte": 300000
//     }
//   }
// }

// Find unique post
// export const findUniquePost = async (req: Request, res: Response) => {
//   const { where } = req.body;
//   if (!where) {
//     return res.status(400).send("Missing 'where' in request body");
//   }

//   try {
//     const post = await prisma.post.findUnique({ where });
//     res.json(post);
//   } catch (err: any) {
//     res.status(500).send("Something went wrong: " + err.message);
//   }
// };

// {
//   "where": {
//     "title": "Beautiful House for Sale"
//   }
// }
