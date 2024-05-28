import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Create a rule
export const createRule = async (req: Request, res: Response) => {
  try {
    await prisma.rules.create({
      data: req.body,
    });
    res.send("Rule inserted successfully");
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// {
//   "rule": "No smoking inside the property.",
//   "propertyId": 1 // Replace with the actual propertyId you want to associate with this rule
// }

// Update a rule
export const updateRule = async (req: Request, res: Response) => {
  try {
    await prisma.rules.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.send("Rule updated successfully");
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// {
//   "rule": "No loud music after 10 PM.",
//   "propertyId": 2 // Replace with the actual propertyId you want to associate with this rule
// }

// Delete a rule
export const deleteRule = async (req: Request, res: Response) => {
  try {
    await prisma.rules.delete({
      where: { id: Number(req.params.id) },
    });
    res.send("Rule deleted successfully");
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};
