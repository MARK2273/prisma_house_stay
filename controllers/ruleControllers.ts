import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { ruleT } from "../types/ruleType";

const prisma = new PrismaClient();

// Create a rule
export const createRule = async (req: Request, res: Response) => {
  try {
    const { rule, property_id }: ruleT = req.body;

    await prisma.rules.create({
      data: { rule: rule, property_id: Number(property_id) },
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
    const { rule, property_id }: ruleT = req.body;

    const validId = await prisma.user.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });
    if (validId !== null) {
      await prisma.rules.update({
        where: { id: Number(req.params.id) },
        data: { rule: rule, property_id: Number(property_id) },
      });
      res.send("Rule updated successfully");
    } else {
      res.send("Data Not Found!!!");
    }
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
    const validId = await prisma.user.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });
    if (validId !== null) {
      await prisma.rules.update({
        where: { id: Number(req.params.id) },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });
      res.send("Rule deleted successfully");
    } else {
      res.send("Data Not Found!!!");
    }
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

//Find Many Rules

export const findManyRules = async (req: Request, res: Response) => {
  const { where } = req.body;
  if (!where) {
    return res.status(400).send("Missing 'where' in request body");
  }

  try {
    const rules = await prisma.rules.findMany({ where });
    res.json(rules);
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};
