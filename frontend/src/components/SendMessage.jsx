import { useState } from "react";
import { Aptos } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const aptos = new Aptos();

export default function SendMessage() {
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [unlockTime, setUnlockTime] = useState("");
  const { account, signAndSubmitTransaction } = useWallet();

  const handleSend = async () => {
    if (!account) return alert("Connect your wallet first!");
    const unixTimestamp = Math.floor(new Date(unlockTime).getTime() / 1000);

    const payload = {
      type: "entry_function_payload",
      function: "0xYOUR_MODULE_ADDRESS::forever_message::send_message",
      type_arguments: [],
      arguments: [receiver, message, unixTimestamp],
    };

    try {
      const tx = await signAndSubmitTransaction({ sender: account.address, data: payload });
      await aptos.waitForTransaction({ transactionHash: tx.hash });
      alert("Message sent successfully!");
    } catch (error) {
      console.error(error);
      alert("Transaction failed.");
    }
  };

  return (
    <div>
      <h3>Send a Message</h3>
      <input placeholder="Receiver Address" onChange={(e) => setReceiver(e.target.value)} />
      <br />
      <textarea placeholder="Your message" onChange={(e) => setMessage(e.target.value)} />
      <br />
      <input type="datetime-local" onChange={(e) => setUnlockTime(e.target.value)} />
      <br />
      <button onClick={handleSend}>Send Forever Message</button>
    </div>
  );
}
