import { faker } from "@faker-js/faker";

export function createRandomTitle() {
  return faker.word.noun();
}

export function createRandomContent({ min, max }: { max?: number; min?: number }) {
  return faker.lorem.paragraphs({ min: min || 5, max: max || 20 });
}

export function createRandomImage() {
  return faker.image.url();
}
