export interface User {
    createdAt: number;
    userId: string;
    username: string;
    profileImage: string | null;
    password: string;
    email: string;
    profileDescription: string | null;
    role: "Admin" | "User";
}
