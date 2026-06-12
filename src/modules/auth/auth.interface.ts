export interface User {
    id: number;
    name: string;
    email: string;
    password: string; 
    role: 'contributor' | 'maintainer';
    created_at: Date;
    updated_at: Date;
}

export type RawUser = Omit<User, 'id' | 'created_at' | 'updated_at'>;
