import { ApiResponse, handleResponse } from "./response";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/api";

export async function getPrevPage():Promise<ApiResponse<number>> {
    const data = await fetch(`${BASE_URL}/pageCookie`,{
        method:"GET",
        credentials:"include"
    });
    
    return handleResponse(data);
}

