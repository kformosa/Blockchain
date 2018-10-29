const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const { Blockchain, Transaction } = require("./blockchain");

// Some account setup - got them using running 'keyGenerator.js'.
myPrivateKey = "2b9d0c6738a0def776704967d14855bd7caf98c0e4f93aceada1de72d6f11e8a";
acc2_PublicKey = "042c9d266fb423afe547da775c4718f418b867a3d7b392e53b9b48ed79382d1b6905f7a9af8f7ff9ac76153d912870bc8932ae1728aeb1e17e61bc31fbeedfb7e0";

const myKey = ec.keyFromPrivate(myPrivateKey);
const myWalletAddress = myKey.getPublic("hex");

let myChain = new Blockchain();

const tx1 = new Transaction(myWalletAddress, acc2_PublicKey, 10);
tx1.signTransaction(myKey);
myChain.addTransaction(tx1);

console.log("\nStarting the miner...");
myChain.minePendingTransactions(myWalletAddress);
console.log(`\nBalance of my Wallet: ${myChain.getBalanceOfAddress(myWalletAddress)}`);

// Display blockchain contents.
console.log(JSON.stringify(myChain, null, 4));
console.log("Is blockchain valid?", myChain.isChainValid());
