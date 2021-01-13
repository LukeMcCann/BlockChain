/**
 * ES5 Blockchain
 * 
 * @version 1.0.0
 * 
 * @author Luke McCann
 */

 const sha256 = require('sha256');

function Blockchain() {
    this.chain = []; 
    this.pendingTransactions = []; 

    // Genesis Block
    this.createNewBlock(100, '0', '0');
}

Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash) {
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transactions: this.pendingTransactions,
        nonce: nonce,
        hash: hash,
        previousBlockHash: previousBlockHash,
    };

    // Clear pendingTransactions
    this.pendingTransactions = [];
    this.chain.push(newBlock);

    return newBlock;
}

Blockchain.prototype.getLastBlock = function() {
    return this.chain[this.chain.length -1];
}

Blockchain.prototype.createNewTransaction = function(amount, sender, recipient) {
    const newTransaction = {
        amount: amount,
        sender: sender,
        recipient: recipient,
    }

    this.pendingTransactions.push(newTransaction);

    // id of the block this transaction will be added to
    return this.getLastBlock()['index'] + 1;
}

Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce) {
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    return sha256(dataAsString);
}

Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData) {
    let nonce = 0;
    let hash = '';

    do {
        hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
        nonce++; 
    } while (hash.substr(0, 4) !== '0000');

    return nonce;
}

module.exports = Blockchain;