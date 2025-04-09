let users = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `用户 ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: "user",
  createdAt: new Date().toISOString(),
}));

module.exports = {
  listUsers: (query) => {
    const { page = 1, pageSize = 20 } = query;
    const start = (page - 1) * pageSize;
    return users.slice(start, start + parseInt(pageSize));
  },

  getUserById: (id) => users.find((u) => u.id === parseInt(id)),

  createUser: (data) => {
    const newUser = {
      id: Date.now(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    return {
      success: true,
      message: "操作成功",
      user: newUser,
    };
  },

  updateUser: (id, data) => {
    const index = users.findIndex((u) => u.id === parseInt(id));
    if (index === -1) return null;

    const updatedUser = {
      ...users[index],
      ...data,
      id: parseInt(id), // 保持ID不变
    };
    users[index] = updatedUser;

    return {
      success: true,
      message: "更新成功",
      user: updatedUser,
    };
  },

  deleteUser: (id) => {
    const index = users.findIndex((u) => u.id === parseInt(id));
    if (index === -1) return null;

    const [deletedUser] = users.splice(index, 1);
    return {
      success: true,
      message: "删除成功",
      user: deletedUser,
    };
  },

  getCurrentUser: () => ({
    username: "测试用户",
    avatar: "assets/images/users/avatar-1.jpg",
  }),

  listNotifications: (limit = 5) => ({
    items: Array.from({ length: limit }, (_, i) => ({
      type: "message",
      title: `通知 ${i + 1}`,
      content: `您有${i + 1}条新消息`,
      created_at: new Date().toISOString(),
    })),
    unread_count: Math.floor(Math.random() * 5) + 1,
  }),
};
