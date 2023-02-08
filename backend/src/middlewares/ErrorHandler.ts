import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes/build/cjs/status-codes';
import ApiError from '../models/ApiError';

export default function ErrorHandler(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {

   console.log(err)

   if (err instanceof ApiError) {
      return res.status(err.status).send({
         message: err.message,
         description: err.description
      })
   }
   
   return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: 'Server Hatası',
      description: 'Kaynağı bilinemeyen bir hatayla karşılaşıldı'
   })

}
