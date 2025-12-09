import { ExpoConfig } from "expo";

const config: ExpoConfig = {
  name: "AI Workflow Assistant",
  slug: "ai-workflow-assistant",
  scheme: "aiassistant",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/splash.png",
    backgroundColor: "#0f172a"
  },
  assetBundlePatterns: ["**/*"],
  experiments: {
    typedRoutes: true
  }
};

export default config;
