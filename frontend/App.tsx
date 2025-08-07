import SendMessage from './components/SendMessage';
import WalletConnector from './components/WalletConnector';

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Forever Message DApp</h1>
      <WalletConnector />
      <SendMessage />
    </div>
  );
}

export default App;
