export const usersData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    role: "admin",
    status: "active",
    joined: "2023-01-15"
  },
  {
    id: 2,
    name: "Emily Watson",
    email: "emily.watson@email.com",
    role: "user",
    status: "active",
    joined: "2023-02-10"
  },
  {
    id: 3,
    name: "Alex Chen",
    email: "alex.chen@email.com",
    role: "user",
    status: "inactive",
    joined: "2023-03-05"
  }
];

export const getAllUsers = () => usersData; 