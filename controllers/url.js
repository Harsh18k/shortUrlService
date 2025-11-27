const { nanoid } = require("nanoid");
const URL = require("../models/url");

const handleGenerateNewShortURL = async (req, res) => {
  const body = req.body;

  if (!body || !body.url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortId = nanoid(8);

  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,   
    visitHistory: [],
    createdBy:req.user._id ,
  });
  return res.redirect(`/?id=${shortId}`);
  
};

const handleGetURLInfo = async (req, res) => {
    const shortId = req.params.shortId;
    const urlEntry = await URL.findOne({ shortId: shortId });
    if (!urlEntry) {
      return res.status(404).json({ error: "URL not found" });
    }
    urlEntry.visitHistory.push({ timestamp: Date.now() });
    await urlEntry.save();
    
    return res.redirect(urlEntry.redirectUrl);
};

const handleUrlAnalytics = async (req, res) => {
    const shortId = req.params.shortId;
    const urlEntry = await URL.findOne({ shortId: shortId });
    if (!urlEntry) {
      return res.status(404).json({ error: "URL not found" });
    }
    return res.status(200).json({totalClicks:urlEntry.visitHistory.length ,  analytics: urlEntry.visitHistory });
};
    


module.exports = { handleGenerateNewShortURL,handleGetURLInfo,handleUrlAnalytics };