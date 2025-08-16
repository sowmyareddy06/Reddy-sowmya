# ForeverMessage on Aptos - Timelocked Messaging DApp

## 📌 Project Title
*ForeverMessage: Decentralized TimeLock Messaging on Aptos*

---

## 📝 Project Description

*ForeverMessage* is a decentralized application (DApp) built on the Aptos blockchain that enables users to send encrypted messages to other wallet addresses with unlock conditions.

This smart contract allows messages to be stored on-chain and accessed only after a specific *unlock time* or after *2 years of inactivity*. It brings the concept of delayed or timed messaging to Web3 with full transparency and censorship resistance.

---

## 🌟 Project Vision

The vision of ForeverMessage is to enable:

- *Delayed delivery of important messages or secrets* (like will/testament-style messaging)
- *Time-based communication* where messages can be retrieved only after a future point
- *Unstoppable message delivery* — once sent, no one (not even the sender) can delete or edit the message
- *Privacy-first, sender-verifiable messages* with simple retrieval conditions

This concept supports applications in:
- Legacy planning
- Memory vaults
- Trust-based systems
- Timelocked coordination (like future event reminders)

---

## 🚀 Key Features

- ✅ *Send messages with unlock conditions*
  - Set a specific unlock_time (in UNIX timestamp)
  - Messages auto-unlock after 2 years of inactivity

- 🧠 *On-chain MessageStore*
  - Each recipient address has its own secure storage (vector of Message structs)
  - Delivery is guaranteed and timestamp-locked

- 🧾 *Smart Contract Security*
  - Built-in checks for future time conditions
  - Prevents premature access
  - assert validations ensure only logical transactions go through

- 🔐 *Fully On-chain*
  - Messages are stored directly on-chain under recipient accounts
  - No reliance on external storage or off-chain APIs

---

## 🔭 Future Scope

- 💬 *Frontend DApp UI*
  - Integrate with Aptos wallet (Petra/Martian) to send and read messages
  - Allow users to check locked/unlocked messages in a friendly interface

- 🔒 *Encrypted Messages*
  - Add client-side encryption so messages are only decrypted by the recipient

- ⏳ *Auto Notifications*
  - Notify users when a message is ready to be viewed

- 👪 *Multi-recipient messages*
  - Support for sending the same message to multiple addresses

- 📦 *Gas fee optimization*
  - Explore vector pruning or pagination to handle large message volumes

---

CONTRACT DETAILS:-

0xe0ac47a470d80240c9a64e691ce67fb045f175949a6873e6fe538c20a95dad4e


<img width="1918" height="966" alt="forevertransaction" src="https://github.com/user-attachments/assets/30f2f542-a860-4a5d-87f6-a0739250b9ea" />



<img width="1912" height="956" alt="forever frontpage" src="https://github.com/user-attachments/assets/b84ae35f-a04d-4a1d-9151-4ebf52ac9472" />






