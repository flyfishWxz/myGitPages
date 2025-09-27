import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const address = new PublicKey("7GgLwWxi6a5XGRdzDwTUatdwWySSmeEwDshTqJ8Jbrh4");
const balance = await connection.getBalance(address);
const balanceInSOL = balance / LAMPORTS_PER_SOL;

console.log(`The balance of the account at ${address} is ${balanceInSOL} lamports`);
console.log(connection, `✅ Connected!`);