const getProfile = async (req, res, next) => {
  const profileId = Number(req.get("profile_id"));

  if (!profileId) {
    return res.status(400).json({ error: "Missing profile_id header" });
  }
  req.profile = { profileId };

  next();
};
module.exports = { getProfile };
