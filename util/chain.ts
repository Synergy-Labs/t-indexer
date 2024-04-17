import { createPublicClient, fallback, http } from "viem";
import { mainnet } from "viem/chains";

const urls = [
  "https://1rpc.io/eth",
];

export const client = createPublicClient({
  chain: mainnet,
  transport: fallback(
    urls.map((url, idx) => http(url, { name: `HTTP Transport ${idx}`, retryCount: 1000 })),
    { rank: false }
  ),
});

export const chainid = await client.getChainId();
