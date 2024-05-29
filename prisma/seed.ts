import { postData } from "../seeders/postData";
import { propertyData } from "../seeders/propertyData";
import { ratingData } from "../seeders/ratingData";
import { ruleData } from "../seeders/ruleData";
import { userData } from "../seeders/userData";

import { PrismaClient } from "@prisma/client";
import { userT } from "../types/userType";
import { propertyT } from "../types/propertyType";
import { ruleT } from "../types/ruleType";
import { postT } from "../types/postType";
import { ratingT } from "../types/ratingType";
const prisma = new PrismaClient();

async function main(): Promise<void> {
  userData.forEach(async (user: userT): Promise<void> => {
    await prisma.user.create({
      data: user,
    });
  });

  propertyData.forEach(async (property: propertyT): Promise<void> => {
    await prisma.property.create({
      data: property,
    });
  });

  ruleData.forEach(async (rule: ruleT): Promise<void> => {
    await prisma.rules.create({
      data: rule,
    });
  });

  postData.forEach(async (post: postT): Promise<void> => {
    await prisma.post.create({
      data: post,
    });
  });

  ratingData.forEach(async (rating: ratingT): Promise<void> => {
    await prisma.rating.create({
      data: rating,
    });
  });
}

main()
  .catch((e: Error): void => console.log(e))
  .finally((): void => {
    prisma.$disconnect();
  });

//npx prisma db seed --preview-feature
