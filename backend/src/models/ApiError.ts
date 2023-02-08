import { StatusCodes } from 'http-status-codes';

interface IError {
	message: string;
	status: StatusCodes;
	description?: string;
}

class ApiError extends Error implements IError {
	message: string;
	status: StatusCodes;
	description?: string;

	constructor(message: string, status = StatusCodes.BAD_REQUEST, description?: string) {
      super(message);

      this.message = message;
      this.status = status;
      this.description = description
   }
}

export default ApiError