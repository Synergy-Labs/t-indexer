# Coding Take-Home Task: Indexer

## Introduction

This is a very simplified version of a piece of software that we run - the indexer.
Its task is to fetch data from the blockchain and append it to a database. This data is later used by other parts of the system to provide users with information about trades, liquidity, etc.

In this task, the indexer only fetches the data about trades on the Uniswap exchange (in the form of [Swap events](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/pair#swap)) and appends them to an SQLite database. Database performance, high availability, deployment strategies, etc. are ignored on purpose.

## Your instructions

This task consists of a series of sub-tasks exploring different ways to expand the code.

You should try to do the sub-tasks in the same order in which they are listed, but feel free to jump around if you feel stuck on any particular one.

The entire task should not take you more than 2.5 hours. **It will not be counted against you if you don't complete everything.** We care more about your thought process and problem-solving than getting the perfect code and completing everything.

1. [ ] **Prepare your environment.**
   1. [ ] Create your own PRIVATE repository based on this template.
   2. [ ] Allow @akiszka to access your repository.
   3. [ ] Start the indexer on your machine.
2. [ ] **Add trade timestamps.** Right now, each trade is stored with a block number, indicating which block it was mined in. Add a timestamp to each trade, indicating when it was mined. [Hint](https://v1.viem.sh/docs/actions/public/getBlock.html)
3. [ ] **Add a way to index historical data.** Right now, the indexer only listens for new trades. If it crashes, we can lose data from blocks that were mined while it was down.
   1. [ ] Create a way to detect which blocks were missed while the indexer was down on startup. 
   2. [ ] Add a way to fetch historical trades for these blocks. [Hint](https://v1.viem.sh/docs/actions/public/getLogs.html)
   3. [ ] Spread requests for historical data over time to avoid hitting rate limits.

Once you are done with the task, please send us an email with a link to your repository.

## Running the code

You will need to have [Bun](https://bun.sh/) installed.

To install the dependencies, run:

```bash
bun i
```

To start the indexer, run:

```bash
bun run index.ts
```

We included a simple utility to look at the 5 most recent trades in the database. To run it, use:

```bash
bun run showTrades.ts
```