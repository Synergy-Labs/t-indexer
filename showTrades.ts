import { closeDb, getRecentTrades } from "./util/db.js";

async function showRecentTrades() {
  const data = await getRecentTrades();
  data.forEach(({ txhash, block }, index) => {
    console.log(`Recent trade #${index}, tx: https://etherscan.io/tx/${txhash}, block: ${block}`);
  });
}

showRecentTrades();
closeDb();