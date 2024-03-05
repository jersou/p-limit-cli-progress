# p-limit-cli-progress

a simple example of usage of p-limit & cli-progress :

```javascript
import { plimitp } from "p-limit-cli-progress";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const data = [...Array(100).keys()]
  .map((i) => ({ title: `data ${i}`, value: Math.random() }));

const limitp = plimitp(10);
data.map(({ value, title }) => limitp(() => sleep(100 + value * 1000), title));
```
