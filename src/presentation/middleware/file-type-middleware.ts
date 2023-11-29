import { NextFunction, Request, Response } from "express";

/**
 * Middleware for validating the type of a request.
 */
export class TypeMiddleware {
    /**
     * Validates the type of a request against a list of valid types.
     * @param ValidType - An array of valid types.
     * @returns A middleware function that validates the type of a request.
     */
    static validateType(ValidType: string[]) {
        return (req: Request, res: Response, next: NextFunction) => {
            const type = req.url.split("/").at(2) ?? "";

            if (!ValidType.includes(type))
                return res.status(400).json({ msg: `The type ${type} is not valid` });
            next();
        };
    }
}
