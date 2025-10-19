
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './components/AppNavbar';
import Swap from './components/Swap';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function App() {
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum)
            await provider.send("eth_requestAccounts", []);
            const signer =await provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address);
            const network = await provider.getNetwork();
            setNetwork(network.name);
            localStorage.setItem('isWalletConnected', 'true');
        } catch (error) {
            console.error("Error connecting to wallet:", error);
        }
    } else {
        alert("Please install MetaMask!");
    }
  };

  const disconnectWallet = () => {
      setAccount(null);
      setNetwork(null);
      localStorage.removeItem('isWalletConnected');
  };

  useEffect(() => {
      if (localStorage.getItem('isWalletConnected') === 'true') {
          connectWallet();
      }
  }, []);

  return (
    <div className="App">
      <AppNavbar account={account} network={network} connectWallet={connectWallet} disconnectWallet={disconnectWallet} />
      <Swap account={account} network={network} /> 
    </div>
  );
}

export default App;