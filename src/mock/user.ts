import { faker } from "@faker-js/faker";

export type userType = {
  id: string;
  fullName: string;
  bio: string;
  avatar: string;
};

function createRandomUser(): userType {
  return {
    id: faker.string.uuid(),
    fullName: faker.person.fullName(),
    bio: faker.person.bio(),
    avatar: faker.image.avatar(),
  };
}

export function createRandomUsers() {
  const count = faker.number.int({ min: 20, max: 120 });
  return faker.helpers.multiple(createRandomUser, { count });
}
