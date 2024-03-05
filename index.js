import cliProgress from "cli-progress";
import pLimit from "p-limit";

export class PlimitProgressBar {
  tot = 0;

  inProgress = new Set();

  constructor(
    max,
    multiBar = new cliProgress.MultiBar({
      clearOnComplete: false,
      hideCursor: true,
      stopOnComplete: true,
      barCompleteChar: "\u2588",
      barIncompleteChar: "\u2591",
    }),
  ) {
    this.multiBar = multiBar;
    this.bar = this.multiBar.create(100, 0, { title: "toto" }, {
      format:
        " \u001b[92m{bar}\u001b[0m | {title} | {value}/{total} | {duration}s | {steps}",
    });
    this.limit = pLimit(max);
  }
  #updateSteps() {
    const steps = Array.from(this.inProgress.values()).sort((a, b) =>
      a.timestamp - b.timestamp
    ).map((value) => value.title).join(", ");
    this.bar.update({ steps });
  }
  limitp(fn, title = "") {
    this.tot++;
    this.bar.setTotal(this.tot);
    return this.limit(async () => {
      const curr = { title, timestamp: Date.now() };
      this.inProgress.add(curr);
      this.#updateSteps();
      await fn();
      this.bar.increment();
      this.inProgress.delete(curr);
      this.#updateSteps();
    });
  }
}
export function plimitp(max, multiBar) {
  const plimitProgressBar = new PlimitProgressBar(max, multiBar);
  return (fn, title = "") => plimitProgressBar.limitp(fn, title);
}
