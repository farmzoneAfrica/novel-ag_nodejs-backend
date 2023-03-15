import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";


export interface IRecord  {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  userName: string,
  phone: string,
  avatar: string,
  password: string,
  address: string
}

export interface agentwhereuniqueinput {
  id: number;
  // other properties
}

const input: agentwhereuniqueinput = {
  id: parseInt('123'), // convert the string '123' to a number using parseInt()
  // other properties
};

export interface user_ extends Request {
  user?: string | JwtPayload
}

export interface TokenInterface {
  decoded: string | JwtPayload
}

export interface loginInterface{
  id: string;
  email: string;
  password: string;
   userName: string;
}