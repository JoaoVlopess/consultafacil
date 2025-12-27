// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// interface FetchOptions extends RequestInit {
//   token?: string;
// }

// export async function fetchAPI<T>(
//   endpoint: string,
//   options: FetchOptions = {}
// ): Promise<T> {
//   const { token, ...fetchOptions } = options;

//   const headers: HeadersInit = {
//     'Content-Type': 'application/json',
//     ...fetchOptions.headers,
//   };

//   // Adiciona o token JWT se existir
//   if (token) {
//     headers['Authorization'] = `Bearer ${token}`;
//   }

//   const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//     ...fetchOptions,
//     headers,
//   });

//   if (!response.ok) {
//     throw new Error(`API Error: ${response.status} ${response.statusText}`);
//   }

//   return response.json();
// }