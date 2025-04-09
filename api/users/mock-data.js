const { faker } = require("@faker-js/faker");

const generateUser = () => ({
  id: faker.number.int({ min: 1000, max: 9999 }),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  createdAt: faker.date.past().toISOString(),
});

module.exports = {
  users: Array.from({ length: 50 }, generateUser),

  userOperation: {
    success: {
      success: true,
      message: "操作成功",
      user: generateUser(),
    },
  },
};
