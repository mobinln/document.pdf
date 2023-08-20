import { faker } from "@faker-js/faker";

export function createRandomContent() {
  return faker.lorem.paragraphs(12);
}

export function createRandomImage() {
  return faker.image.url();
}
