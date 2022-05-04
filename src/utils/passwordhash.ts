import { hash, compare } from "bcrypt";
import { SALT_ROUNDS } from "../constants";

export async function passwordHash(data: string): Promise<string> {
    const hashedString = <string> await hash(data, SALT_ROUNDS);
    return hashedString;
}

export async function passwordCompare(password: string ,hashedPassword: string){
    return await compare(password, hashedPassword);
}
