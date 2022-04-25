exports.getme = async (req, res) => {
  console.log("User");
  const user = req.user;
  console.log(user);
  return res.status(200).json({ user });
};
