import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { userT } from "../types/userType";
const prisma = new PrismaClient();

// Render create user form
export const renderCreateUser = (req: Request, res: Response) => {
  res.render("users/createUser");
};

// Render update user form
export const renderUpdateUser = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(req.params.id) },
  });
  res.render("users/updateUser", { user });
};

// Render find first user result
export const renderFindFirstUser = async (req: Request, res: Response) => {
  const user = await prisma.user.findFirst();
  res.render("users/findFirstUser", { user });
};

// Render find many users result
export const renderFindManyUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.render("users/findManyUsers", { users });
};

// Render find unique user result
export const renderFindUniqueUser = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
  });
  res.render("users/findUniqueUser", { user });
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData: userT = req.body;
    await prisma.user.create({
      data: userData,
    });
    res.send("User inserted successfully");
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

export const createManyUser = async (req: Request, res: Response) => {
  try {
    const multiUserdata: userT[] = req.body;
    await prisma.user.createMany({
      data: [...multiUserdata],
    });
    res.send("Users inserted successfully");
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const validId = await prisma.user.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });
    if (validId !== null) {
      await prisma.user.update({
        where: { id: Number(req.params.id) },
        data: req.body,
      });
      res.send("User updated successfully");
    } else {
      res.send("User Not Found!!!");
    }
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

export const UserUpsert = async (req: Request, res: Response) => {
  try {
    await prisma.user.upsert({
      where: { id: Number(req.params.id) },
      update: req.body,
      create: req.body,
    });
    res.send("User updated successfully");
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};
