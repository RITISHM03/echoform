import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";



export const authOptions: NextAuthOptions = {
    // Temporarily disabled for Vercel - MongoDB connection issues
    // adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    session: {
        strategy: "jwt", // Use JWT for session to avoid excessive database lookups, though adapter supports db sessions too
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async session({ session, token }) {
            if (session.user && token.sub) {
                // Attach user ID to session
                // @ts-ignore
                session.user.id = token.sub;
            }
            return session;
        },
    },
};

