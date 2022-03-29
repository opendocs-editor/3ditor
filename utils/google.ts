import axios from "axios";

export interface OAuth2Credentials {
    client_secret: string;
    client_id: string;
    redirect_uri: string;
}

export const authorize = async (credentials: OAuth2Credentials) => {
    const d = await axios.post("/api/v1/editor/google/auth", credentials);
    return d.data;
};

export const getNewToken = async () => {
    const d = await axios.post("/api/v1/editor/google/token");
    return d.data;
};
