let lastUserId = 1000;

module.exports = {
  register: (data) => {
    lastUserId++;
    return {
      success: true,
      message: "注册成功",
      user: {
        id: lastUserId,
        ...data,
        createdAt: new Date().toISOString(),
      },
    };
  },

  login: (credentials) => ({
    token: "mock-jwt-token",
    expiresIn: 3600,
    user: {
      id: 1,
      email: credentials.email,
      name: "测试用户",
    },
  }),
};
