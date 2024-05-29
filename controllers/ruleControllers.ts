import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { ruleT } from "../types/ruleType";

const prisma = new PrismaClient();

// Create a rule
export const createRule = async (req: Request, res: Response) => {
  try {
    const ruleData: ruleT = req.body;

    await prisma.rules.create({
      data: ruleData,
    });
    res.send("Rule inserted successfully");
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// Update a rule
export const updateRule = async (req: Request, res: Response) => {
  try {
    const validRule = await prisma.rules.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });
    if (validRule !== null) {
      await prisma.rules.update({
        where: { id: Number(req.params.id) },
        data: req.body,
      });
      res.send("Rule updated successfully");
    } else {
      res.send("Rule Not Found!!!");
    }
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// Delete a rule
export const deleteRule = async (req: Request, res: Response) => {
  try {
    const validRule = await prisma.rules.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });
    if (validRule !== null) {
      await prisma.rules.delete({
        where: { id: Number(req.params.id) },
      });
      res.send("Rule deleted successfully");
    } else {
      res.send("Rule Not Found!!!");
    }
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// Find many rules
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

export const renderCreateRule = (req: Request, res: Response) => {
  res.render("create_rule", { title: "Create Rule" });
};

// Render the update rule form
export const renderUpdateRule = async (req: Request, res: Response) => {
  const ruleId = Number(req.params.id);
  try {
    const rule = await prisma.rules.findUnique({ where: { id: ruleId } });
    res.render("update_rule", { title: "Update Rule", rule });
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};
