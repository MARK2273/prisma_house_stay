import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Create a property
export const createProperty = async (req: Request, res: Response) => {
  try {
    await prisma.property.create({
      data: req.body,
    });
    res.send("Property inserted successfully");
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// {
//   "floor": 2,
//   "bedroom": 3,
//   "kitchen": 1,
//   "living_room": 1,
//   "bathroom": 2,
//   "furnished": true,
//   "address": "123 Main Street, City, Country"
// }

// Create many properties
export const createManyProperties = async (req: Request, res: Response) => {
  try {
    await prisma.property.createMany({
      data: [...req.body],
    });
    res.send("Properties inserted successfully");
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// [
//   {
//     floor: 2,
//     bedroom: 3,
//     kitchen: 1,
//     living_room: 1,
//     bathroom: 2,
//     furnished: true,
//     address: "123 Main Street, City, Country",
//   },
//   {
//     floor: 1,
//     bedroom: 2,
//     kitchen: 1,
//     living_room: 1,
//     bathroom: 1,
//     furnished: false,
//     address: "456 Elm Street, City, Country",
//   },
// ];

// Update a property
export const updateProperty = async (req: Request, res: Response) => {
  try {
    await prisma.property.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.send("Property updated successfully");
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// {
//   "floor": 3,
//   "bedroom": 4,
//   "kitchen": 2,
//   "living_room": 1,
//   "bathroom": 3,
//   "furnished": true,
//   "address": "789 Oak Street, City, Country"
// }

// Update many properties
export const updateManyProperties = async (req: Request, res: Response) => {
  const { where, data } = req.body;
  if (!where || !data) {
    return res.status(400).send("Missing 'where' or 'data' in request body");
  }

  try {
    const result = await prisma.property.updateMany({
      where,
      data,
    });
    res.send(
      `Properties updated successfully: ${result.count} records affected`
    );
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// {
//   "where": {
//     "furnished": false
//   },
//   "data": {
//     "furnished": true
//   }
// }

// Find first property
export const findFirstProperty = async (req: Request, res: Response) => {
  const { where } = req.body;
  if (!where) {
    return res.status(400).send("Missing 'where' in request body");
  }

  try {
    const property = await prisma.property.findFirst({ where });
    res.json(property);
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// {
//   "where": {
//     "floor": 2
//   }
// }

// Find many properties
export const findManyProperties = async (req: Request, res: Response) => {
  const { where } = req.body;
  if (!where) {
    return res.status(400).send("Missing 'where' in request body");
  }

  try {
    const properties = await prisma.property.findMany({ where });
    res.json(properties);
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// {
//   "where": {
//     "floor": 2
//   }
// }

// Find unique property
export const findUniqueProperty = async (req: Request, res: Response) => {
  const { where } = req.body;
  if (!where) {
    return res.status(400).send("Missing 'where' in request body");
  }

  try {
    const property = await prisma.property.findUnique({ where });
    res.json(property);
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// {
//   "where": {
//     "address": "123 Main Street, City, Country"
//   }
// }
