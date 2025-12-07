function parseText(text = "") {
  const lower = text.toLowerCase();

  const job = /ucla\s*23017/i.test(text) ? "UCLA 23017" : null;
  const sheet = /r21/i.test(text) ? "R21" : null;

  const needsCut = lower.includes("cut");
  const needsPacking = lower.includes("pack");
  const needsAssembly = lower.includes("assembly");

  return { job, sheet, needsCut, needsPacking, needsAssembly };
}

module.exports = { parseText };
