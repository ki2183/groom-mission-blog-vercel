import { Iblog } from "@/type/blog";

const BASE_URL = '/api/blogs';

//리턴 데이터
interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
}  

//에러 처리 함수
async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.statusText}`);
  }
  return res.json();
}

// 모든 블로그 데이터 가져오기
export async function getBlogs():Promise<ApiResponse<Iblog[]>> {
  const res = await fetch(BASE_URL);
  return handleResponse(res);
}

// 새로운 블로그 데이터 생성
export async function createBlog(title: string, contents: string) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify({ title, contents }),
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse(res);
}

// 단일 블로그 데이터 가져오기
export async function getBlog(id: string): Promise<ApiResponse<Iblog>> {
  const res = await fetch(`${BASE_URL}/${id}`);
  return handleResponse(res);
}

// 블로그 데이터 수정
export async function updateBlog(id: string, title: string, contents: string) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, contents }),
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse(res);
}

// 블로그 데이터 삭제
export async function deleteBlog(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  
  return handleResponse(res);
}

// 블로그 글 총 개수
// export async function deleteBlog(id: string) {
//   const res = await fetch(`${BASE_URL}/${id}`, {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json' },
//   });
  
//   return handleResponse(res);
// }