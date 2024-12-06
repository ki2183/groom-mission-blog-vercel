import { NextResponse } from "next/server";
import { Pool } from "pg";

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
  

//db서버 연결 키
export const pool = new Pool({ connectionString: process.env.POSTGRES_URL_URL });