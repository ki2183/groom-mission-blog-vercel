import { pool } from "@/lib/api/response";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
    try{
      const client = await pool.connect();
      const result = await client.query('SELECT COUNT(*) AS row_count FROM blogs');
  
      // DB disconnect
      client.release();
  
      return NextResponse.json({
        message: 'Database connected successfully!',
        data: result.rows
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