import { TypeormDatabase } from "@subsquid/typeorm-store";
import { processor } from "./processor";
import { Transaction } from "./model";
import * as erc20 from "./abi/erc20";


processor.run(new TypeormDatabase({ supportHotBlocks: true }), async (ctx) => {
  let transactions: Transaction[] = [];

  for (let block of ctx.blocks) {

    for (let transaction of block.transactions) {
        let { _to, _value} = erc20.functions.transfer.decode(transaction.input);
        

        transactions.push(
          new Transaction({
            id: transaction.id,
            amount: _value, 
            from: transaction.from || "0x",
            recipient: _to,
            token: transaction.to,
          })
        );

      
      
    }
  }

  await ctx.store.insert(transactions);
});
