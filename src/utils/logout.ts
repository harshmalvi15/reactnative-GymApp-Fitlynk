// src/utils/logout.ts
import { account } from "../services/appwrite";

export const logoutUser = async () => {
  try {
    await account.deleteSession('current');
    return true;
  } catch (error) {
    console.error('Logout failed:', error);
    return false;
  }
};
