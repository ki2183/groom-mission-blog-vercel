import { pool } from "@/lib/api/response";
import { Iblog } from "@/type/blog";
import { NextRequest, NextResponse } from "next/server";

export interface Ipagenite {
  result: Iblog[],
  pageSize:number,
  totalRows:number,
  currentPage:number,
  hasPrevPage:boolean,
  hasNextPage:boolean,
}

export async function GET(req: NextRequest): Promise<NextResponse> {

  const url = req.nextUrl;
  const page = parseInt(url.searchParams.get("page") || "1", 10); 
  const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10); 

  //isNaN or out of Range is return
  if (isNaN(page) || page <= 0 || isNaN(pageSize) || pageSize <= 0) {
    return NextResponse.json(
      { success: false, message: "Invalid page or pageSize" },
      { status: 400 }
    );
  }

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT COUNT(*) AS row_count FROM blogs');

    const totalRows = result.rows[0].row_count;
    const offset = (page - 1) * pageSize;

    //최신 순 데이터 (가져올 데이터 개수, 건너뛰는 데이터 개수)
    const dataResult = await client.query(`
      SELECT * 
      FROM blogs 
      ORDER BY date DESC LIMIT $1 OFFSET $2
      `,[pageSize, offset]
    );

    client.release();

    const totalPages = Math.ceil(totalRows / pageSize);

    return NextResponse.json({
      success: true,
      message:"Database get Success",
      data: {
        result: dataResult.rows,
        pageSize,
        totalRows,
        totalPages,
        currentPage: page,
        hasPrevPage: page > 1,
        hasNextPage: page < totalPages,
      },

    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Database connection error:', errorMessage);

    return NextResponse.json(
      {
        success: false,
        message: 'Database connection failed.',
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
