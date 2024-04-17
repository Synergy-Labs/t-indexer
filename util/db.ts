import sqlite3 from "sqlite3";
const { Database } = sqlite3;

const db = new Database("data.db");
db.configure("busyTimeout", 60000);

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS trade (txhash text, msgsender text, "to" text, "amount0In" text, "amount1In" text, "pairAddress" text, chainid bigint, "amount0Out" text, "amount1Out" text, block bigint)');
});

interface TradeData {
  txhash: string;
  msgsender: string;
  to: string;
  amount0In: string;
  amount1In: string;
  pairAddress: string;
  chainid: number;
  amount0Out: string;
  amount1Out: string;
  block: number;
}

export function addTrade({ txhash, msgsender, to, amount0In, amount1In, pairAddress, chainid, amount0Out, amount1Out, block }: TradeData) {
  return new Promise<void>((resolve, reject) => {
    db.run("INSERT INTO trade VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
      txhash,
      msgsender,
      to,
      amount0In,
      amount1In,
      pairAddress,
      chainid,
      amount0Out,
      amount1Out,
      block,
    ], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function getRecentTrades() {
  return new Promise<TradeData[]>((resolve, reject) => {
    db.all<TradeData>("SELECT * FROM trade ORDER BY block DESC LIMIT 5", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export function closeDb() {
  db.close();
}