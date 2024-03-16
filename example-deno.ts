#!/usr/bin/env -S deno run

// import { plimitp } from "nmp:p-limit-cli-progress@0.1.1";
// @deno-types="./p_limit_progress_bar.d.ts"
import { plimitp } from "./p_limit_progress_bar.js";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const data = [...Array(100).keys()]
  .map((i) => ({ title: `data ${i}`, value: Math.random() }));

const limitp = plimitp(10, "demo");
data.map(({ value, title }) => limitp(() => sleep(100 + value * 1000), title));
