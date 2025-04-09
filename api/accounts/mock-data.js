const { faker } = require("@faker-js/faker");

module.exports = {
  registerUser: {
    success: {
      success: true,
      message: "注册成功",
      user: {
        id: faker.number.int({ min: 1000, max: 9999 }),
        name: "张三",
        email: "zhangsan@example.com",
        createdAt: new Date().toISOString(),
      },
    },
  },

  getAccessToken: {
    success: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      expiresIn: 3600,
      user: {
        id: 12345,
        email: "user@example.com",
        name: "John Doe",
      },
    },
    invalidCredentials: {
      success: false,
      message: "Invalid credentials",
    },
  },
};
