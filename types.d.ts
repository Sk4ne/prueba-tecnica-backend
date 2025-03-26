// Extendemos la interaz Request
declare namespace Express {
  export interface Request {
    user: string 
  }
}