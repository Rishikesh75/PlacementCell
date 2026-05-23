export interface StudentUser {
  id: string;
  name: string;
  email: string;
  major?: string;
  graduationYear?: number;
}

export interface StudentApiResponse {
  id: string;
  password?: string;
  name: string;
  email: string;
  major?: string;
  graduationYear?: number;
}
