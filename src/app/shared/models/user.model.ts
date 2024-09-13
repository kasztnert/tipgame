export interface User {
  userId: string;
  userName: string;
  password?: string;
}
export interface LogonData {
  userId: string;
  password: string;
}

export const userList: User[] = [
  { userId: 'user1', userName: 'User 1', password: 'pwd1' },
  { userId: 'user2', userName: 'User 2', password: 'pwd2' },
  { userId: 'user3', userName: 'User 3', password: 'pwd3' },
  { userId: 'user4', userName: 'User 4', password: 'pwd4' },
  { userId: 'user5', userName: 'User 5', password: 'pwd5' },
  { userId: 'user6', userName: 'User 6', password: 'pwd6' },
];
