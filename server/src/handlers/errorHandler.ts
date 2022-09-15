import { Request, Response, NextFunction } from 'express';

interface httpException extends Error {
    status: number,
    message: string,
}

const errorHandler = (err: httpException, req: Request, res: Response, next: NextFunction) => {

    if (!err) return next()

    console.error(err);

    return res.status(err.status ? err.status : 500).send(err);
};

export default errorHandler;