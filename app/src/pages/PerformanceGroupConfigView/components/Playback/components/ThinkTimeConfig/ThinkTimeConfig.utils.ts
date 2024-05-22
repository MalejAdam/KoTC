import {Scenario} from "../../../../../../../../electron/src/types/scenario";

export const thinkTimeDescriptionString = (thinkTimeMode: Scenario["thinkTimeMode"]) => {
  switch (thinkTimeMode) {
    case "recorded":
      return "Use the same time that was originally recorded for playback of your test scripts.";
    case "fixed":
      return "Use a time that's fixed across all steps for playback of your test scripts.";
    case "minimum":
      return "Use the minimum time whenever possible, the lowest being 100 ms.";
    default:
      return "";
  }
};