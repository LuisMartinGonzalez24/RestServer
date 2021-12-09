import { Request } from "express";

export interface IGetTokenRequest extends Request {
    uid?: string;
}