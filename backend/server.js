const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");

const { PORT, AGENT_ENDPOINT } = require("./config");
const { parseText } = require("./ai/parser");
const mockJobs = require("./jobs/mockJobs");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/query", async (req, res) => {
  const { text = "" } = req.body || {};
  const { job, sheet, needsCut, needsPacking, needsAssembly } = parseText(text);

  if (!job || !sheet) {
    return res.json({ message: "Missing job or sheet in request.", actions: [] });
  }

  const jobFiles = (mockJobs[job] && mockJobs[job][sheet]) || {};
  const actions = [];

  if (needsCut && jobFiles.cut) {
    actions.push({ type: "open", path: jobFiles.cut });
  }

  if (jobFiles.packing) {
    actions.push({ type: "support", path: jobFiles.packing, label: "packing" });
  }

  if (jobFiles.assembly) {
    actions.push({ type: "support", path: jobFiles.assembly, label: "assembly" });
  }

  // Forward requested actions to the agent; log failures but do not block the response.
  try {
    await axios.post(AGENT_ENDPOINT, { actions, job, sheet, text });
  } catch (err) {
    console.error("Agent dispatch failed:", err.message);
  }

  return res.json({
    message: `Pulled primary drawings for ${job} ${sheet}.`,
    actions
  });
});

app.listen(PORT, () => {
  console.log(`ShopBrain backend running on port ${PORT}`);
});
