import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  try {
    await prisma.user.create({
      data: req.body,
    });
    res.send("User inserted successfully");
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

export const createManyUser = async (req: Request, res: Response) => {
  try {
    await prisma.user.createMany({
      data: [...req.body],
    });
    res.send("Users inserted successfully");
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.send("User updated successfully");
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

export const updateManyUser = async (req: Request, res: Response) => {
  const { where, data } = req.body;
  if (!where || !data) {
    return res.status(400).send("Missing 'where' or 'data' in request body");
  }

  try {
    const result = await prisma.user.updateMany({
      where,
      data,
    });
    res.send(`Users updated successfully: ${result.count} records affected`);
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

export const findFirstUser = async (req: Request, res: Response) => {
  const { where } = req.body;
  if (!where) {
    return res.status(400).send("Missing 'where' in request body");
  }

  try {
    const user = await prisma.user.findFirst({ where });
    res.json(user);
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

export const findManyUser = async (req: Request, res: Response) => {
  const { where } = req.body;
  if (!where) {
    return res.status(400).send("Missing 'where' in request body");
  }

  try {
    const users = await prisma.user.findMany({ where });
    res.json(users);
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

export const findUniqueUser = async (req: Request, res: Response) => {
  const { where } = req.body;
  if (!where) {
    return res.status(400).send("Missing 'where' in request body");
  }

  try {
    const user = await prisma.user.findUnique({ where });
    res.json(user);
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};
