import cliProgress from "cli-progress";
import pLimit from "p-limit";
export { cliProgress, pLimit };

export function createMultibar() {
  return new cliProgress.MultiBar({
    hideCursor: true,
    stopOnComplete: true,
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
    barGlue: "\u001b[33m",
  });
}

export class PlimitProgressBar {
  tot = 0;
  inProgress = new Set();
  bar;
  limit;
  barTitle;
  multiBar;
  constructor(
    max,
    barTitle,
    multiBar = createMultibar(),
  ) {
    this.multiBar = multiBar;
    this.barTitle = barTitle;
    this.bar = this.multiBar.create(0, 0, { title: this.barTitle }, {
      format:
        " \u001b[92m{bar}\u001b[0m | {title} | {value}/{total} | {duration_formatted} | {steps}",
    });
    this.bar.update({ steps: "" });
    this.limit = pLimit(max);
    this.bar.stop();
  }
  updateSteps() {
    const steps = Array.from(this.inProgress.values())
      .sort((a, b) => a.timestamp - b.timestamp)
      .map((value) => value.title).join(", ");
    this.bar.update({ steps });
  }
  limitp(fn, title = "") {
    this.bar.start();
    this.tot++;
    this.bar.setTotal(this.tot);
    this.bar.update({ title: this.barTitle });
    return this.limit(async () => {
      const curr = { title, timestamp: Date.now() };
      this.inProgress.add(curr);
      this.updateSteps();
      const ret = await fn();
      this.bar.increment();
      this.inProgress.delete(curr);
      this.updateSteps();
      return ret;
    });
  }
}
export function plimitp(max, barTitle, multiBar) {
  const plimitProgressBar = new PlimitProgressBar(max, barTitle, multiBar);
  return (fn, title = "") => plimitProgressBar.limitp(fn, title);
}
