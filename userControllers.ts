import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { userT } from "../types/userType";
const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  try {
    await prisma.user.create({
      data: {
        username: req.body.username,
        age: Number(req.body.age),
        email: req.body.email,
        contact: req.body.contact,
        role: req.body.role,
      },
    });
    res.send("User inserted successfully");
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// export const createManyUser = async (req: Request, res: Response) => {
//   try {
//     const multiUserdata: userT[] = req.body;
//     await prisma.user.createMany({
//       data: [...multiUserdata],
//     });
//     res.send("Users inserted successfully");
//   } catch (err: any) {
//     res.status(500).send("Something went wrong: " + err.message);
//   }
// };

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
        data: {
          username: req.body.username,
          age: Number(req.body.age),
          email: req.body.email,
          contact: req.body.contact,
          role: req.body.role,
        },
      });
      res.send("User updated successfully");
    } else {
      res.send("User Not Found!!!");
    }
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// export const updateManyUser = async (req: Request, res: Response) => {
//   const { where, data } = req.body;
//   if (!where || !data) {
//     return res.status(400).send("Missing 'where' or 'data' in request body");
//   }

//   try {
//     const result = await prisma.user.updateMany({
//       where,
//       data,
//     });
//     res.send(`Users updated successfully: ${result.count} records affected`);
//   } catch (err: any) {
//     res.status(500).send("Something went wrong: " + err.message);
//   }
// };

export const findFirstUser = async (req: Request, res: Response) => {
  const username: string = req.params.username;
  if (!username) {
    return res.status(400).send("Missing 'username' in request ");
  }

  try {
    const user = await prisma.user.findFirst({ where: { username: username } });
    res.json(user);
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

export const findManyUser = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

export const findUniqueUser = async (req: Request, res: Response) => {
  const email: string = req.params.email;
  if (!email) {
    return res.status(400).send("Missing 'email' in request ");
  }
  try {
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (user) res.json(user);
    else res.send("No user Found!!!");
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

export const UserUpsert = async (req: Request, res: Response) => {
  try {
    await prisma.user.upsert({
      where: { id: Number(req.params.id) },
      update: {
        username: req.body.username,
        age: Number(req.body.age),
        email: req.body.email,
        contact: req.body.contact,
        role: req.body.role,
      },
      create: {
        username: req.body.username,
        age: Number(req.body.age),
        email: req.body.email,
        contact: req.body.contact,
        role: req.body.role,
      },
    });
    res.send("User updated successfully");
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};
