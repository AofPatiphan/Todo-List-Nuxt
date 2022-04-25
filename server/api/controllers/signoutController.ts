import { Request, Response } from 'express';
exports.signout = async (req: Request, res: Response) => {
  return res.json({
    message: "Sign out success",
  });
};
