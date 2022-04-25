import { Request, Response } from "express";

exports.getme = async (req: Request, res: Response) => {
  console.log("User");
  const user = req.user;
  console.log(user);
  return res.status(200).json({ user });
};

// [                                                                                                                                                                                                       14:53:30
//   {
//     id: 48,
//     username: 'Patiphan'
//   }
// ]
