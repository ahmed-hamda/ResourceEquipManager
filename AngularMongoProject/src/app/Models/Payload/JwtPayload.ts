export interface JwtPayload {
    id:string;
    sub: string; 
    role: string; 
    exp?: number;
  }