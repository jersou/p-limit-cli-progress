import { MultiBar } from "cli-progress";
import { LimitFunction } from "p-limit";

export class PlimitProgressBar {
  constructor(max: number, multiBar?: MultiBar);
  limitp(fn: () => Promise<unknown>, title?: string): ReturnType<LimitFunction>;
}

export function plimitp(
  max: number,
  multiBar?: MultiBar,
): ReturnType<LimitFunction>;
