export interface User {
    createdAt: Date;
    userId: string;
    username: string;
    profileImage: string | null;
    password: string;
    email: string;
    profileDescription: string | null;
    role: "Admin" | "User";
}
