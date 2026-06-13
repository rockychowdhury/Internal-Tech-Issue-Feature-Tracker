import { ResponseMessages } from "../../constants";
import { pool } from "../../db";
import bcrypt from "bcrypt"
import type { RawUser, User } from "./auth.interface";
import config from "../../config";
import jwt from "jsonwebtoken"


const loginUserIntoDB = async (payload: { email: string, password: string }) => {
    const { email, password } = payload;

    const userData = await pool.query(
        `
        SELECT * FROM users WHERE email=$1
        `,
        [email],
    );

    if (userData.rows.length == 0) {
        throw new Error(ResponseMessages.INVALID_CREDENTIALS);
    }

    const user = userData.rows[0];
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
        throw new Error(ResponseMessages.INVALID_CREDENTIALS);
    }

    const jwtpayload = {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
    }

    const accessToken = jwt.sign(jwtpayload, config.secret as string, { expiresIn: '1d', });

    const refreshToken = jwt.sign(jwtpayload, config.re_secret as string, {
        expiresIn: "10d",
    });
    delete user.password;
    return { accessToken, refreshToken, user };
}

const createUser = async (payload: RawUser) => {
    const { name, email, password, role } = payload;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
        `
     INSERT INTO users(name,email,password,role) 
     VALUES($1,$2,$3,$4) 
     RETURNING *
    `,
        [name, email, hashedPassword, role],
    );
    // console.log("Db:", result);
    delete result.rows[0].password;

    return result;

}


export const authService = {
    loginUserIntoDB,
    createUser
}