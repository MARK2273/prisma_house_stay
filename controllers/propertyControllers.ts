import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { propertyT } from "../types/propertyType";
import { number } from "joi";

const prisma = new PrismaClient();

// Create a property
export const createProperty = async (req: Request, res: Response) => {
  try {
    const {
      floor,
      bedroom,
      kitchen,
      living_room,
      bathroom,
      furnished,
      address,
      user_id,
    } = req.body;
    const result = await prisma.property.create({
      data: {
        floor: Number(floor),
        bedroom: Number(bedroom),
        kitchen: Number(kitchen),
        living_room: Number(living_room),
        bathroom: Number(bathroom),
        furnished: Boolean(furnished),
        address: address,
        user_id: Number(user_id),
      },
    });
    console.log(result);
    res.send("Property inserted successfully");
  } catch (err: any) {
    console.log(err);
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
// export const createManyProperties = async (req: Request, res: Response) => {
//   try {
//     const propertData: propertyT[] = req.body;

//     await prisma.property.createMany({
//       data: [...propertData],
//     });
//     res.send("Properties inserted successfully");
//   } catch (err: any) {
//     res.status(500).send("Something went wrong: " + err.message);
//   }
// };

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
    const {
      floor,
      bedroom,
      kitchen,
      living_room,
      bathroom,
      furnished,
      address,
      user_id,
    } = req.body;
    const validId = await prisma.user.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });
    if (validId !== null) {
      await prisma.property.update({
        where: { id: Number(req.params.id) },
        data: {
          floor: Number(floor),
          bedroom: Number(bedroom),
          kitchen: Number(kitchen),
          living_room: Number(living_room),
          bathroom: Number(bathroom),
          furnished: Boolean(furnished),
          address: address,
          user_id: Number(user_id),
        },
      });
      res.send("Property updated successfully");
    } else {
      res.send("Data Not Found!!!");
    }
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
// export const updateManyProperties = async (req: Request, res: Response) => {
//   const { where, data } = req.body;
//   if (!where || !data) {
//     return res.status(400).send("Missing 'where' or 'data' in request body");
//   }

//   try {
//     const result = await prisma.property.updateMany({
//       where,
//       data,
//     });
//     res.send(
//       `Properties updated successfully: ${result.count} records affected`
//     );
//   } catch (err: any) {
//     res.status(500).send("Something went wrong: " + err.message);
//   }
// };

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
  const floor: number = Number(req.query.floor);
  if (!floor) {
    return res.status(400).send("Missing 'floor' in request");
  }

  try {
    const property = await prisma.property.findFirst({
      where: {
        floor: {
          equals: floor,
        },
      },
    });
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
  const floor: number = Number(req.query.floor);
  if (!floor) {
    return res.status(400).send("Missing 'where' in request body");
  }

  try {
    const properties = await prisma.property.findMany({
      where: {
        floor: {
          equals: floor,
        },
      },
    });
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
// export const findUniqueProperty = async (req: Request, res: Response) => {
//   const address: string | undefined = req.query.address?.toString();
//   if (!address) {
//     return res.status(400).send("Missing 'address' in request ");
//   }

//   try {
//     const property = await prisma.property.findUnique({
//       where: {
//         address: address,
//       },
//     });
//     res.json(property);
//   } catch (err: any) {
//     res.status(500).send("Something went wrong: " + err.message);
//   }
// };

// {
//   "where": {
//     "address": "123 Main Street, City, Country"
//   }
// }
