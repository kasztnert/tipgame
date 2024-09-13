import { User, userList } from "../../shared/models/user.model";

export interface AuthState {
    users: User[];
    currentUser: User | null;
    logonError: string | null;
}

export const initialAuthState: AuthState = {
    users: userList,
    currentUser: null,
    logonError: null,
};