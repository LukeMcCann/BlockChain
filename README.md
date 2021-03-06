# Blockchain

## Dependencies

- Express
    - Routing framework
- sha256
    - Encryption Algorithm
- Nodemon
    - Node watcher
- BodyParser
    - Body parsing middleware
- Uuid/v1
    - Random unique string generation

These dependencies have been included with the package.json via the node package manager.
Simply run npm install to acquire all dependencies.

## Nodemon

<code>
<pre>
    nodemon --watch dev -e js dev/api.js
</pre>
</code>

This command runs athe watch command, telling node to begin watching when the start command is ran. The second argument is the folder to be watched, in this case <code>"dev"</code> kepeing watch of the third argument filetype/extension i.e. <code>.js</code> . The final argument is the script to run if any changes occur in the js files.

## Running The Application

To run the application first clone this repository:
<code>
<pre>
        git clone {repo}
</pre>
</code>

Then install dependencies via the node package manager. (for an introduction to installing npm on your local machine see the NPM docs, [here](https://www.npmjs.com/get-npm)) :

<code>
<pre>
        npm install
</pre>
</code>

Finally, open up a terminal and run: 

<code>
<pre>
        npm start
</pre>
</code>

This will start a node server on your local machine listening on port: <code>3000</code> by default. Nodemon will automatically restart the server
whenever changes are made to files within the dev directory. 

You can now interact with this API by visiting your localhost URL in the browser
and making a request to any of the endpoints defined in <code>api.js</code>

Example Routes:

- Get entire blockchain
<code>
<pre>
    http://localhost:3000/blockchain
</pre>
</code>

- Make a new transaction
<code>
<pre>
    http://localhost:3000/transaction
</pre>
</code>

- Mine a new block
<code>
<pre>
    http://localhost:3000/mine
</pre>
</code>

Please note, it is recommended to use a tool such as [Postman](https://www.postman.com/downloads/)
to call the API endpoints, this will allow you to provide JSON data along with GET/POST headers to invoke the different interactions within the API.

## Current State

This project is currently a shell for creating a BlockChain. The BlockChain class and methods have been defined
and can be played with by calling them from the test.js file. 
The basic API may be extended and rebuilt. Please see the notes
on the usahe of the API.

please feel free to use this as a learning tool to understand the workings of BlockChain.

## Versions

There are two versions of this project. One using ES5 prototypes and another using ES6 classes.
Both contain the exact same functionality and will be kept in this project to showcase the difference
between class and prototypical syntax. These will be extracted into separate versioned projects upon completion.
Feel free to use whichever suites your preference best, ES6 is often referred to as cleaner due to keeping
all related functionality in a singular class. If you have come from an object oritented background, using a 
language like C++, PHP, Java etc... you will probably be better suited to using ES6 syntax, but understand
ES6 and ES5 both work the same under the hood, you can see this by inspecting the objects, a class simply
creates objects and prototypes in the same way as the prototypical approach, it is effectively just a 
"vanity" change, i.e. the only real difference is how the code looks.

I am aware this could be improved through the use of dependency injection. Coming from a C++/Java/PHP
background I am not sure how this works in JS as of this moment, however, I will update
the ES6 version with any improvements I learn in the future.

## Author

Luke McCann

# Documentation

## Blockchain API

The API packaged in this project is built using node.js.

To utilise the API you must first run the node server using <code>npms start</code>.

There are several endpoints within the API, these endpoints can
be called at will through port <code>3000</code> using the URL declared.

### Blockchain Endpoint

This endpoint expects a <code>get</code> request and returns the entire Blockchain object and it's contents. 

The blockchain endpoint can be called as below: 

<code>
<pre>
        http://localhost:3000/blockchain
</pre>
</code>

The response returnd from the endpoint is in a readable JSON format. 
If no transactions have yet occurred, nor any mining has been conducted,
the only data contained within the Block is the Genesis block which is created
upon Blockchain instatiation. This puts 50 coins into circulation, in a real
use case a recipient and sender should be defined for this block. 

You should expect the following JSON response:

<code>
<pre>
    {
        "chain": [
            {
                "index": 1,
                "timestamp": 1610922490228,
                "transactions": [],
                "nonce": 50,
                "hash": "0",
                "previousBlockHash": "0"
            }
        ],
        "pendingTransactions": [
            {
                "amount": 20,
                "sender": "ANS7628DHSDFD",
                "recipient": "YUIO628DHSYDH"
            }
        ]
    }
</pre>
</code>

## Transaction Endpoint

This endpoint expects a <code>post</code> request along with the following body data:

<code>
<pre>
    {
        "amount": 20,
        "sender": "ANS7628DHSDFD",
        "recipient": "YUIO628DHSYDH"
    }
</pre>
</code>

The endpoint can be called with:

<code>
<pre>
        http://localhost:3000/transaction
</pre>
</code>

Any transaction created will be placed into the PendingTransactions,
in which they will remain until a new block is mined and added to the chain. 
At which point all pending transactions will be processed and added to that block in the chain. 

You should expect the following JSON response providing the block index the transaction has been added to:

<code>
<pre>
    {
        "note": "Transaction will be added in block 2."
    }
</pre>
</code>

## Mine Endpoint

The mine endpoint deals with most of the heavy lifting for the API. The endpoint creates a new Block which then contains all of the transactions which were pending. 

This occurs through attaining the hash of the previous block (i.e. currently the last block) in the chain.Once this hash is attained, the currentBlockData is retrieved as <code>transaction</code> and <code>index</code> wihtin it's own object. With this data a nonce is generated using the proofOfWork, passing in the previous blocks hash, the current block data. After this, the block is hashed using the acquired nonce, previous blocks hash, and current blocks data. a new transaction is then created rewarding the current mining node with currency. 

You can call this endpoint via:

<code>
<pre>
        http://localhost:3000/mine
</pre>
</code>

You should expect a response as such:

<code>
<pre>
    {
        "note": "New block mined successfully!",
        "block": {
            "index": 3,
            "timestamp": 1610927141972,
            "transactions": [
                {
                    "amount": 10,
                    "sender": "ANS7628DHSDFD",
                    "recipient": "YUIO628DHSYDH"
                },
                {
                    "amount": 13,
                    "sender": "ANS7628DHSDFD",
                    "recipient": "YUIO628DHSYDH"
                },
                {
                    "amount": 7,
                    "sender": "00",
                    "recipient": "b07e8f60591d11eb832cd5b850c8a621"
                }
            ],
            "nonce": 42073,
            "hash": "00008a7884d41bd61e2846b9ee7edc3e9943712de3af280aa38696701ef62fc7",
            "previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
        }
    }
</pre>
</code>


### Api Notes

A usual workflow of a blockchain would be that a Blockchain is instantiated. Transactions are then carried out accross the network, on multiple nodes, these transactions remain pending until a miner mines a block adding it to the chain. When this occurs a new transaction is created awarding the miner, and the other nodes transactions can be processed and are added into the mined block.

If you are calling the endpoints bear this in mind as this is the intended order of execution.

# Research Documentation

## What is a Blockchain?

Blockchain is a modern technology based around recording information in such a way that makes it difficult, beleived to be impossible, to tamper with records. Blockchain creates a permanent immutable ledger of records in a chain where any tampering of a single block breaks the rest of the items in the chain. 

The beauty of Blockchain lies in it's simplicity. Blocks are created which enable transactions to be processed. However, in order for blocks to be created miners must create the blocks through the mining process. Each of the blocks has a hash value which must begin with a number of leading 0's in order to be valid. This is calculated through the use of a Nonce, which is calculated using processing power. Once a correct Nonce is discovered enabling the hashing algorithm (SHA-256) to create a hash with n leading zeros the block is added to the chain.

Each block in the chain has a reference to the previous block (much like a linked list). This means that each block in the chain is reliant on the unique hash of every pre-existing block. If an item is tampered with, the blocks coming after that block no longer match and the chain is broken (no longer valid). Blockchain is also distributed, this means that multiple copies of the ledger are saved accross multiple servers, when miners mine these blocks this validates that not only the hash generated is valid, but that the ledger hash of the blocks are the same as those saved to other versions. This means that any form of tampering with the ledger can quickly be detected even if someone managed to take the inordinate amount of time to mine every block after a tamper the blocks would still not match their other versions. 

# Concepts

## The Chain Array

The chain is represented by an array. This array, contains all of the "blocks" that are created/mined as a "chain". While this may seem conceptually to the "Linked List" data structure, it is not a true Linked List, instead of nodes being linked using pointers, the data is stored within blocks via a Merkle Tree.

## Merkle Tree

In cryptography and computer science, a Merkle Tree (a.k.a Hash Tree). Each "leaf" (node) of the Merkle Tree is labelled with the cryptographic hash of a data block. Every non-leaf node of the Merkle Tree is also labelled with the concatenated cryptographic hash of the of it's child nodes. 

Merkle Trees allow for efficient and secure verification of the contents of large data structures, and are generalisation of hash lists and hash chains.
Demonstrating that a leaf node is a part of a given binary hash tree requires computing a number of hashes proportional to the logarithm of the number of leaf nodes in the tree, whereas a hash list is proportional to the number of leaf nodes in the tree.

## The New Transactions Array

The new transactions are held in this array, before they
are placed into a new block and mined. These are the pending transactions.
After creating our new blocks it is important to clear our newTransactions
array to make way for the next load of data for the next block. 

## Blocks

When we create a new block we want to have an index "id" to identify the block, not only this but we need a timestamp to tell us the time this block was created, the pending transactions are then saved into the new block.
we also want a nonce within our block (number used only once). Finally we want a hash stored in the block, this is the hash is a hashed version of the data wihtin the block. New transactions are passed through a ahshing function, all of the trnasactions are "compressed" into this single string.
Finally, a previous hash is also stored in the block, this acts as a "pointer" to the previous block in the chain, this is the data from the previous block hashed into a string. Once the block has been created we 
must then push the new block onto the chain. 

## Nonce

Nonce stands for "number used only once". A nonce is a number (any number) which works as a mathematical proof that we have generated our block in a legitimate way by using a proof-of-work method.

## Hashing

In this project a SHA256 hashing algorithm is used.
Hashing is the act of converiting a value to a compressed numerical value. Each hash in SHA256 is proven to be unique, therefore there is a unique representation of any possible value. It takes in data of arbitrary lengths and produces a fixed length hash value.

In our hash method we take the previous blocks hash, the data for the current block, 
and the nonce and stringify these items to pass in to the sha256 hash function. Since the previous hash is already a string, we only need to convert our integer nonce using toString()
and our current block object, as an object this requires the use of JSON.stringify().

## Proof Of Work

The proof of work method is essential to blockchain technology. It is one of the driving factors that result in tight security within blockchain applications such as bitcoin. A proof of work is essentially a method of validating blocks in the blockchain, ensuring the legitimacy of the block, including that it contains the correct transactions/data stored within. Without proof of work it would be possible to fake cryptocurrency amounts, and even change the content of a block, it would therefore no longer be immutable and have it's integrity easily breachable. Every block that is created must be validated as a legitimate block, this is done via mining it through the proof of work method. 

### How Proof of Work... Works?

This method takes in the current blocks data, and the hash of the previous block in the chain. From this provided data a specific hash is generated. This specific hash is a hash which begins with 'n' zeros, in this case it will be four leading zeros. 

SHA256 hashes are pseudo-random, to generate a hash which begins with four zeros we run a trial and error calculation. In this, we run the hash block method many times, essentially conducting a brute force scenario, until we happen to generate a hash with the 'n' number of leading zeros.

Since our hash is representing data, we must do this in such a way that we get our leading zeros, without compramising (changing) the data stored within the block, or the previous blocks hash. To do this, we constantly change the value of the passed in nonce. 

Essentially, in our proof of work we are repeatedly hashing our block until we find the correct hash, this is any hash which begins with the 'n' leading zeros. We can do this by constantly changing the input to our hashBlock method, by constantly fluctuating or incrementing the nonce value. 

In this case an incremental method is used, in which everytime the hashBlock method is run the nonce is incremented. The first time running this method the initial nonce value will be zero. If that resulting hash does not contain the four leading values the hashBlock method is run with a nonce which has been incremented by one. This will run recursively until the hash value contains the 'n' leading zeros at the start of the hash. 

This calculation utilises a lot of computing power, if the block is tampered with the future blocks will be compromised due to a change of the previous hash's value and need to also be re-mined.

At the end of our proof of work we return our proof. This is the nonce which acts as a mathematical proof, this nonce represents the correct nonce which will generate the string with 'n' leading zeros when applied to the block provided.
