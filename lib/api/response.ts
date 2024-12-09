import { NextResponse } from "next/server";
import { Pool } from "pg";

//리턴 데이터
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}  


interface IcreateErrorResponse {
    msg: string,
    status?: number,
    errConsole?: { msg: string; err: unknown }
}

//에러 메시지
export const createErrorResponse = ({msg, status = 200, errConsole}:IcreateErrorResponse) => {
    // 서버 로그 출력
    if (errConsole && errConsole.msg && errConsole.err) console.error(`[Error] ${errConsole.msg}:`, errConsole.err);
  
    // 클라이언트 응답
    return NextResponse.json(
      {
        success: false,
        message: msg,
        status, // 상태 코드 포함
      },
      { status }
    );
  };
  

  export async function handleResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }
    return res.json();
  }
  

//db서버 연결 키
export const pool = new Pool({ connectionString: process.env.POSTGRES_URL_URL });