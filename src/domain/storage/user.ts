import {AuthUser} from "@/domain/models/AuthUser.ts";

export const getUser = () => {
    const user = sessionStorage.getItem('loggedUser');
   return  user ? JSON.parse(user) : null;
}

export const setUser = (user: AuthUser|null) =>
     user ? sessionStorage.setItem('loggedUser', JSON.stringify(user)) : sessionStorage.removeItem('loggedUser');