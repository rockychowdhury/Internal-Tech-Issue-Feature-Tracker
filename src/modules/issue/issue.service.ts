import { pool } from "../../db";
import type { IIssue } from "./issue.interface";


const createIssue = async (payload: IIssue) => {
    const { title, description, type, reporter_id } = payload;
    // console.log(payload);
    const result = await pool.query(
        `
     INSERT INTO issues(title,description,type,reporter_id) VALUES($1,$2,$3,$4) RETURNING *
    `,
        [title, description, type, reporter_id],
    );

    return result;
};
const getAllIssueFromDB = async () => {
    const result = await pool.query(`
      SELECT * FROM issues  
        `);

    const issues = result.rows;

    if (issues.length === 0) return [];

    const reporterIds = [...new Set(issues.map(issue => issue.reporter_id))];

    const userResult = await pool.query(
        `
        SELECT id,name,role
        FROM users
        WHERE id = ANY($1)
        `,
        [reporterIds]
    );

    const reporterMap = new Map();

    userResult.rows.forEach(user => {
        reporterMap.set(user.id, {
            id: user.id,
            name: user.name,
            role: user.role,
        });
    });

    const IssueData = issues.map(issue => ({
        id: issue.id,
        title: issue.title,
        description: issue.description,
        type: issue.type,
        status: issue.status,
        reporter: reporterMap.get(issue.reporter_id) || null,
        created_at: issue.created_at,
        updated_at: issue.updated_at,
    }));

    return IssueData;
};

const getIssueFromDB = async (id: string) => {
    const result = await pool.query(
        `
      SELECT * FROM issues WHERE id=$1  
        `,
        [id],
    );
    if (result.rows.length === 0) {
        return null;
    }
    const issue = result.rows[0];
    const reporter = await pool.query(
        `
        SELECT id,name,role
        FROM users
        WHERE id = $1
        `,
        [issue.reporter_id]
    )
    return {
        id: issue.id,
        title: issue.title,
        description: issue.description,
        type: issue.type,
        status: issue.status,
        reporter: reporter.rows[0] || null,
        created_at: issue.created_at,
        updated_at: issue.updated_at,
    };
};

const updateIssueFromDB = async (payload: IIssue, id: string) => {
    const { title, description, type } = payload;

    const result = await pool.query(
        `
    UPDATE issues 
    SET 
    title=COALESCE($1,title),
    description=COALESCE($2,description),
    type=COALESCE($3,type)

    WHERE id=$4 RETURNING *
    `,
        [title, description, type, id],
    );

    return result;
};

const deleteIssueFromDB = async (id: string) => {
    const result = await pool.query(
        `
        DELETE FROM issues WHERE id=$1  
        `,
        [id],
    );
    return result;
};

export const issueService = {
    createIssue,
    getAllIssueFromDB,
    getIssueFromDB,
    updateIssueFromDB,
    deleteIssueFromDB,
};