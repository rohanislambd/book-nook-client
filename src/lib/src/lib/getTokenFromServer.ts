import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export const getTokenFromServer = async () => {
    try {
        const jwtToken = await auth.api.getToken({
            headers: await headers()
        });
        return jwtToken?.token || null;
    } catch {
        return null;
    }
};
