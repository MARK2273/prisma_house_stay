import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { postT } from "../types/postType";

const prisma = new PrismaClient();

// Create a post
export const createPost = async (req: Request, res: Response) => {
  try {
    const postData: postT = req.body;
    await prisma.post.create({
      data: postData,
    });
    res.send("Post inserted successfully");
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

export const createManyPosts = async (req: Request, res: Response) => {
  try {
    const postData: postT[] = req.body;

    await prisma.post.createMany({
      data: postData,
    });
    res.send("Posts inserted successfully");
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// Update a post
export const updatePost = async (req: Request, res: Response) => {
  try {
    const validPost = await prisma.post.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });
    if (validPost !== null) {
      await prisma.post.update({
        where: { id: Number(req.params.id) },
        data: req.body,
      });
      res.send("Post updated successfully");
    } else {
      res.send("Post Not Found!!!");
    }
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// Delete a post
export const deletePost = async (req: Request, res: Response) => {
  try {
    const validPost = await prisma.post.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });
    if (validPost !== null) {
      await prisma.post.delete({
        where: { id: Number(req.params.id) },
      });
      res.send("Post deleted successfully");
    } else {
      res.send("Post Not Found!!!");
    }
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// Find many posts
export const findManyPosts = async (req: Request, res: Response) => {
  const { where } = req.body;
  if (!where) {
    return res.status(400).send("Missing 'where' in request body");
  }

  try {
    const posts = await prisma.post.findMany({ where });
    res.json(posts);
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// Update many posts
export const updateManyPosts = async (req: Request, res: Response) => {
  const { where, data } = req.body;
  if (!where || !data) {
    return res.status(400).send("Missing 'where' or 'data' in request body");
  }

  try {
    const result: Prisma.BatchPayload = await prisma.post.updateMany({
      where,
      data,
    });
    res.send(`Posts updated successfully: ${result.count} records affected`);
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// Find first post
export const findFirstPost = async (req: Request, res: Response) => {
  const { where } = req.body;
  if (!where) {
    return res.status(400).send("Missing 'where' in request body");
  }

  try {
    const post = await prisma.post.findFirst({ where });
    res.json(post);
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// Find unique post
export const findUniquePost = async (req: Request, res: Response) => {
  const { where } = req.body;
  if (!where) {
    return res.status(400).send("Missing 'where' in request body");
  }

  try {
    const post = await prisma.post.findUnique({ where });
    res.json(post);
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// Render the create post form
export const renderCreatePost = (req: Request, res: Response) => {
  res.render("create_post", { title: "Create Post" });
};

// Render the update post form
export const renderUpdatePost = async (req: Request, res: Response) => {
  const postId = Number(req.params.id);
  try {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    res.render("update_post", { title: "Update Post", post });
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// Render the first post based on the given criteria
export const renderFindFirstPost = async (req: Request, res: Response) => {
  const { where } = req.body;
  try {
    const post = await prisma.post.findFirst({ where });
    res.render("first_post", { title: "First Post", post });
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// Render multiple posts based on the given criteria
export const renderFindManyPosts = async (req: Request, res: Response) => {
  const { where } = req.body;
  try {
    const posts = await prisma.post.findMany({ where });
    res.render("many_posts", { title: "Many Posts", posts });
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};

// Render a unique post based on the given criteria
export const renderFindUniquePost = async (req: Request, res: Response) => {
  const { where } = req.body;
  try {
    const post = await prisma.post.findUnique({ where });
    res.render("unique_post", { title: "Unique Post", post });
  } catch (err: any) {
    res.status(500).send("Something went wrong: " + err.message);
  }
};
