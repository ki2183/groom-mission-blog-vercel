import { NextRequest, NextResponse } from "next/server";
import { createErrorResponse, pool } from "@/lib/api/response"; 


/* READ (식별 아이디) */
export async function GET( req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
    try {
      const { id } = params;
  
      // ID가 없으면 오류 반환
      if (!id) return createErrorResponse({ msg:"ID is required", status:400 });
  
      const client = await pool.connect();
      const result = await client.query(`
        SELECT * FROM blogs WHERE id = $1
        `,[id]
      );

      client.release();
  
      // 결과가 없으면 오류 반환
      if (result.rowCount === 0) return createErrorResponse({msg: "Blog not found for the given ID", status: 404});
      
  
      // 성공 응답
      return NextResponse.json({
        success: true,
        data: result.rows[0],
        message: "Blog fetched successfully",
      });
    } 
    
    catch (err: unknown) { return createErrorResponse({msg: "Internal server error", status:500, errConsole:{ msg:"Error fetching blog :", err }})}
  }
  


/* UPDATE (식별 아이디, 제목, 내용) */
export async function PUT(req: NextRequest, { params }: { params: { id: string } }):Promise<NextResponse> {
    try {
        const { id } = params;
        const {title, contents} = await req.json();

        // 데이터가 없음 오류 반환
        if(!id || !contents || !title) return createErrorResponse({ msg: "id or contents or title is null" });


        const client = await pool.connect();
        const result = await client.query(`
            UPDATE blogs 
            SET title = $2, contents = $3, date = NOW()
            WHERE id = $1
            RETURNING * 
            `, [id, title ,contents]
        );

        // DB disconnect
        client.release();

        // ID의 레코드가 없을 때 오류 반환
        if (result.rowCount === 0) return createErrorResponse({msg: "Blog not found"});

        // 성공 음답    
        return NextResponse.json({ 
            success: true, 
            data:result.rows[0],
            message: "Blog updated successfully" 
        })
    }

    //실패
    catch (err: unknown) { return createErrorResponse({msg: "Internal server error", status:500, errConsole:{ msg:"Error fetching blog :", err }})}
    
}


/* DELETE (식별 아이디) */
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }):Promise<NextResponse> {
    try {
        const { id } = params;

        // 아이디가 없다면 오류 반환
        if(!id) return createErrorResponse({msg: "id is null"});
        //db connect
        const client = await pool.connect();
        const result = await client.query(`
            DELETE FROM blogs 
            WHERE id = $1
            RETURNING * 
            `,[id]
        );

        // DB disconnect
        client.release();

        // ID의 레코드가 없을 때 오류 반환
        if (result.rowCount === 0) return createErrorResponse({msg: "Blog not found"});

        // 성공 음답    
        return NextResponse.json({ 
            success: true, 
            data:result.rows[0],
            message: "Blog DTO DELETED successfully" 
        })
    }

    //실패
    catch (err: unknown) { return createErrorResponse({msg: "Internal server error", status:500, errConsole:{ msg:"Error fetching blog :", err }})}
    
}