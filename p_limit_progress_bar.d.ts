import { Bar, MultiBar } from "cli-progress";
import { LimitFunction } from "p-limit";

export function createMultibar(): MultiBar;

export class PlimitProgressBar {
  tot: number;
  inProgress: Set<{ title: string; timestamp: number }>;
  bar: Bar;
  limit: LimitFunction;
  barTitle: string;
  multiBar: MultiBar;
  constructor(max: number, barTitle: string, multiBar?: MultiBar);
  updateSteps(): void;
  limitp<R>(fn: () => Promise<R>, title?: string): Promise<R>;
}
export function plimitp(
  max: number,
  barTitle: string,
  multiBar?: MultiBar,
): (fn: () => Promise<unknown>, title?:string) => ReturnType<LimitFunction>;
