import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { propertyT } from "../types/propertyType";

const prisma = new PrismaClient();

// Render create property form
export const renderCreateProperty = (req: Request, res: Response) => {
  res.render("properties/createProperty");
};

// Render update property form
export const renderUpdateProperty = async (req: Request, res: Response) => {
  const property = await prisma.property.findUnique({
    where: { id: Number(req.params.id) },
  });
  res.render("properties/updateProperty", { property });
};

// Render find first property result
export const renderFindFirstProperty = async (req: Request, res: Response) => {
  const property = await prisma.property.findFirst();
  res.render("properties/findFirstProperty", { property });
};

// Render find many properties result
export const renderFindManyProperties = async (req: Request, res: Response) => {
  const properties = await prisma.property.findMany();
  res.render("properties/findManyProperties", { properties });
};

// Render find unique property result
export const renderFindUniqueProperty = async (req: Request, res: Response) => {
  const property = await prisma.property.findUnique({
    where: { id: Number(req.params.id) },
  });
  res.render("properties/findUniqueProperty", { property });
};

// Create a property
export const createProperty = async (req: Request, res: Response) => {
  try {
    const propertData: propertyT = req.body;

    await prisma.property.create({
      data: propertData,
    });
    res.send("Property inserted successfully");
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// Create many properties
export const createManyProperties = async (req: Request, res: Response) => {
  try {
    const propertData: propertyT[] = req.body;

    await prisma.property.createMany({
      data: [...propertData],
    });
    res.send("Properties inserted successfully");
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// Update a property
export const updateProperty = async (req: Request, res: Response) => {
  try {
    const validId = await prisma.property.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });
    if (validId !== null) {
      await prisma.property.update({
        where: { id: Number(req.params.id) },
        data: req.body,
      });
      res.send("Property updated successfully");
    } else {
      res.send("Data Not Found!!!");
    }
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

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

// Find unique property
export const findUniqueProperty = async (req: Request, res: Response) => {
  const { where } = req.body;
  if (!where) {
    return;
    res.status(400).send("Missing 'where' in request body");
  }

  try {
    const property = await prisma.property.findUnique({ where });
    res.json(property);
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// Delete a property
export const deleteProperty = async (req: Request, res: Response) => {
  try {
    const validId = await prisma.property.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });
    if (validId !== null) {
      await prisma.property.delete({
        where: { id: Number(req.params.id) },
      });
      res.send("Property deleted successfully");
    } else {
      res.send("Data Not Found!!!");
    }
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};
