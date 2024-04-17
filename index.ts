import { swapEvent } from "./util/abi.js";
import { chainid, client } from "./util/chain.js";
import { addTrade, closeDb } from "./util/db.js";

let total = 0;
let total_last = 0;

const stop = client.watchEvent({
  event: swapEvent,
  // only fetch logs that exactly conform to the event signature
  strict: true,
  onLogs: (logs) => {
    for (const log of logs) {
      if (log.removed) continue;

      total += 1;

      const { sender, amount0In, amount1In, amount0Out, amount1Out, to } =
        log.args;

      addTrade({
        amount0In: amount0In.toString(),
        amount0Out: amount0Out.toString(),
        amount1In: amount1In.toString(),
        amount1Out: amount1Out.toString(),
        chainid,
        pairAddress: log.address.toLowerCase(),
        block: Number(log.blockNumber),
        txhash: log.transactionHash.toLowerCase(),
        msgsender: sender.toLowerCase(),
        to: to.toLowerCase(),
      });
    }
  },
  onError: (e) => {
    console.error("Error while watching event", e);
  },
  poll: true,
});

process.on("SIGINT", () => {
  console.log("Ctrl-C was pressed");
  stop();
  closeDb();
  process.exit(0);
});

console.log(" [x] Running. Press Ctrl-C to exit.");

async function displayTPS() {
  console.log("Total swaps indexed:", total, "swaps since last log:", total - total_last);
  total_last = total;
}

setInterval(displayTPS, 12_000);
