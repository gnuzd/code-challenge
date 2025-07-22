interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);

        // FIXME: can group conditions - missing lhsPriority
        // if (lhsPriority > -99) {
        //   if (balance.amount <= 0) {
        //     return true;
        //   }
        // }

        if (balancePriority > -99 && balance.amount <= 0) {
          return true;
        }

        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);

        // FIXME: can use else conditions or ternary operator
        // if (leftPriority > rightPriority) {
        //   return -1;
        // } else if (rightPriority > leftPriority) {
        //   return 1;
        // }

        return rightPriority > leftPriority ? 1 : -1;
      });
  }, [balances]); // remove unnecessary dependencies 

  // const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  //   return {
  //     ...balance,
  //     formatted: balance.amount.toFixed(),
  //   };
  // });
  //
  // const rows = sortedBalances.map(
  //   (balance: FormattedWalletBalance, index: number) => {
  //     const usdValue = prices[balance.currency] * balance.amount;
  //     return (
  //       <WalletRow
  //         className={classes.row}
  //         key={index}
  //         amount={balance.amount}
  //         usdValue={usdValue}
  //         formattedAmount={balance.formatted}
  //       />
  //     );
  //   },
  // );
  //
  // return <div {...rest}>{rows}</div>;

  return (
    <div {...rest}>
      {sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
          <WalletRow
            className={classes.row}
            key={index}
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.formatted}
          />
        );
      })}
    </div>
  );
};
