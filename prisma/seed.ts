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
import { pivotRatingT } from "../types/pivotRating";
import { pivotRatingdata } from "../seeders/pivotRating";
const prisma = new PrismaClient();

async function main(): Promise<void> {
  await prisma.user.createMany({
    data: userData,
  });
  await prisma.property.createMany({
    data: propertyData,
  });
  await prisma.rules.createMany({
    data: ruleData,
  });
  await prisma.post.createMany({
    data: postData,
  });
  await prisma.rating.createMany({
    data: ratingData,
  });
  await prisma.pivotRating.createMany({
    data: pivotRatingdata,
  });
}

main()
  .catch((e: Error): void => console.log(e))
  .finally((): void => {
    prisma.$disconnect();
  });

//npx prisma db seed --preview-feature
