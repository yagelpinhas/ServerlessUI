export type ContextStructure = {   
    isLoggedIn: boolean,
    nameOfUser: string,
    token: string,
    logout: Function,
    login: Function
};