// import { plimitp } from "nmp:p-limit-cli-progress@0.1.0";
import { plimitp } from "./index.js";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const data = [...Array(100).keys()]
  .map((i) => ({ title: `data ${i}`, value: Math.random() }));

const limitp = plimitp(10);
data.map(({ value, title }) => limitp(() => sleep(100 + value * 1000), title));
