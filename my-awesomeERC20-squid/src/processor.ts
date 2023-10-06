import {lookupArchive} from '@subsquid/archive-registry'
// Import erc20 types generated from  the ABI
import * as erc20 from "./abi/erc20";
import {

    BlockHeader,

    DataHandlerContext,

    EvmBatchProcessor,

    EvmBatchProcessorFields,

    Log as _Log,

    Transaction as _Transaction,

} from '@subsquid/evm-processor'

// Set account address you want to track, vitalik.eth by default optimism
let ACCOUNT_ADDRESS = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";

export const processor = new EvmBatchProcessor()

    .setDataSource({

        // Change the Archive endpoints for run the squid

        // against the other EVM networks

        // For a full list of supported networks and config options

        // see https://docs.subsquid.io/evm-indexing/

        archive: lookupArchive('eth-mainnet'),

        // Must be set for RPC ingestion (https://docs.subsquid.io/evm-indexing/evm-processor/)

        // OR to enable contract state queries (https://docs.subsquid.io/evm-indexing/query-state/)

        chain: 'https://rpc.ankr.com/eth',

    })

    .setFinalityConfirmation(75)

    .setFields({

        transaction: {

        // Address that sent the transaction
            from: true,
        // Address receiving the transaction
            to: true,

        // Transaction value
            value: true,

        // Transaction hash
            hash: true,

        // Transaction input
            input: true,

        },

    })

    

    .addTransaction({
        // Sort transactions by destination address

        to: [ACCOUNT_ADDRESS],

        // Sort transactions by sending address
        from: [ACCOUNT_ADDRESS],
        // Sort transactions by function signature hash
        sighash:[erc20.functions.transfer.sighash]

    })

export type Fields = EvmBatchProcessorFields<typeof processor>

export type Block = BlockHeader<Fields>

export type Log = _Log<Fields>

export type Transaction = _Transaction<Fields>

export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>