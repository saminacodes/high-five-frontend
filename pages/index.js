import {
  useAddress,
  useDisconnect,
  useMetamask,
  useContract,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

export default function Home() {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();

  const { contract } = useContract(
    "0x5224ee241BAAb54913Fb4d6aAd789f7a04F0D428"
  );

  const [waves, setWaves] = useState([]);

  useEffect(() => {
    async function getAllWaves() {
      const myWaves = await contract?.functions.getAllWaves();
      setWaves(myWaves);
    }

    getAllWaves();
  }, [contract]);

  function truncateAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  return (
    <div>
      {address ? (
        <>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
          <p>Your address: {address}</p>
          <button
            onClick={() =>
              contract?.functions.wave("gave Samina a high five ✋")
            }
          >
            Wave
          </button>
          {waves?.map((myWaves, i) => (
            <div key={i}>
              {truncateAddress(myWaves.waver)} {myWaves.message} on{" "}
              {new Date(
                myWaves.timestamp.toNumber() * 1000
              ).toLocaleDateString()}
            </div>
          ))}
        </>
      ) : (
        <button onClick={connectWithMetamask}>Connect with Metamask</button>
      )}
    </div>
  );
}
