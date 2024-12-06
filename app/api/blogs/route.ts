import { NextRequest, NextResponse } from 'next/server';
import { createErrorResponse, pool } from '@/lib/api/response'; 

/* 
  블로그 API

  1. /api/blogs
     - GET  : 모든 블로그 데이터 조회
     - POST : 블로그 데이터 생성

  2. /api/blogs/[id]
    - GET : 특정 블로그 데이터 조회 (id 기반)
    - PUT : 특정 블로그 데이터 업데이트
       Body : { title: string, contents: string }

    - DELETE : 특정 블로그 데이터 삭제

  3. /api/blogs/pages
    - GET: 블로그 글 전체 개수

*/

//블로그 데이터 가져오기
export async function GET(): Promise<NextResponse> {
  try{
    const client = await pool.connect();
    const result = await client.query('SELECT id, date, title, contents FROM blogs');

    // DB disconnect
    client.release();

    return NextResponse.json({
      message: 'Database connected successfully!',
      data:result.rows
    })
  }
  catch(err: unknown){
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Database connection error:', errorMessage);

    return NextResponse.json({
      data:[],
      success: true,
      message: 'Database connection failed.',
    })
  }
}


/* CREATE (제목, 내용) */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
      // 요청 데이터 파싱
      const {title, contents} = await req.json();

      // 데이터베이스 연결
      const client = await pool.connect();
      const result = await client.query(
          'INSERT INTO blogs (title, contents) VALUES ($1, $2) RETURNING id',
          [title, contents]
      );
      // DB disconnect
      client.release();

      // 성공 응답 반환
      return NextResponse.json({
              success: true,
              message: "Blog created successfully",
              data: {
                id: result.rows[0].id, 
              },
      });
  } 
  
  catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      return createErrorResponse({msg:"Failed to create blog", status:500, errConsole:{ msg, err }});
  }
}