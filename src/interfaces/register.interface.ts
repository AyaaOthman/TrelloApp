export interface ILogin {
    email: string;
    password: string;
}
export interface IRegister extends ILogin {
    username: string;
    confirmPassword: string;
    age: number;
    gender: string;
    phone: string;
}
export type IUser = Pick<IRegister, "username" | "age" | "gender" | "phone">;
