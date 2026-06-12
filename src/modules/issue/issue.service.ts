import { pool } from "../../db";
import type { IIssue } from "./issue.interface";


const createIssue = async (payload: IIssue) => {
    const {title, description, type} = payload;

    console.log(payload);
    const result = await pool.query(
        `
     INSERT INTO issues(title,description,type) VALUES($1,$2,$3) RETURNING *
    `,
        [title, description, type],
    );

    return result;
};
// const getAllIssueFromDB = async () => {
//     const result = await pool.query(`
//       SELECT * FROM users  
//         `);
//     return result;
// };

// const getIssueFromDB = async (id: string) => {
//     const result = await pool.query(
//         `
//       SELECT * FROM users WHERE id=$1  
//         `,
//         [id],
//     );
//     return result;
// };

// const updateIssueFromDB = async (payload: IUser, id: string) => {
//     const { name, password, age, is_active } = payload;

//     const result = await pool.query(
//         `
//     UPDATE users 
//     SET 
//     name=COALESCE($1,name),
//     password=COALESCE($2,password),
//     age=COALESCE($3,age),
//     is_active=COALESCE($4,is_active) 

//     WHERE id=$5 RETURNING *
//     `,
//         [name, password, age, is_active, id],
//     );

//     return result;
// };

// const deleteIssueFromDB = async (id: string) => {
//     const result = await pool.query(
//         `
//     DELETE FROM users WHERE id=$1  
//       `,
//         [id],
//     );
//     return result;
// };

export const issueService = {
    createIssue,
    // getAllIssueFromDB,
    // getIssueFromDB,
    // updateIssueFromDB,
    // deleteIssueFromDB,
};