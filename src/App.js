import React, { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const TEST_MESSAGES = [
    {message: "We're here on the wall!", user: "7pMkSLYezxLe5zPPR9bW7gU3FrDEpXSbP4ouMj1gqHak"},
    {message: "Yup, it's totally not test data", user: "7pMkSLYezxLe5zPPR9bW7gU3FrDEpXSbP4ouMj1gqHak"},
    {message: "Aroma single origin fair trade, to go ristretto black siphon espresso. That single shot, café au lait that medium espresso, froth, at single shot americano single shot mocha.", user: "7pMkSLYezxLe5zPPR9bW7gU3FrDEpXSbP4ouMj1gqHak"},
    {message: "Acerbic extraction variety dripper mazagran carajillo white siphon ristretto white. Milk sweet, aromatic sugar, a pumpkin spice strong id lungo.", user: "7pMkSLYezxLe5zPPR9bW7gU3FrDEpXSbP4ouMj1gqHak"},
    {message: "Robust, sit carajillo white, skinny cultivar medium white skinny half and half.", user: "7pMkSLYezxLe5zPPR9bW7gU3FrDEpXSbP4ouMj1gqHak"},
  ]

  // Phantom Wallet connection check
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window

      if(solana) {
        if(solana.isPhantom) {
          const response = await solana.connect({ onlyIfTrusted: true });

          setWalletAddress(response.publicKey.toString())
        } else {
          alert("Solana object not found! Get a Phantom Wallet 👻");
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const connectWallet = async () => {
    const { solana } = window;

    if(solana) {
      const response = await solana.connect();
      setWalletAddress(response.publicKey.toString());
    }
  }

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  }

  const sendMessage = async () => {
    if(inputValue.length) {
      console.log("Message:", inputValue);
    } else {
      console.log("Empty input. Try again.")
    }
  }

  const renderNotConectedButton = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  const renderConnectedContainer = () => (
    <div className="connected-container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          sendMessage();
        }}
      >
        <input
          type="text"
          placeholder="Enter your message!"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit" className="cta-button submit-gif-button">Submit</button>
      </form>
      <div className="message-listing">
        {TEST_MESSAGES.map( ({message, user}) => (
          <div className="message-item" key={message + user}>
            {message} - {user}
          </div>
        ))}
      </div>
    </div>
  );

  // Check if wallet is conected on first mount
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };

    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div className="App">
      <div className={walletAddress ? "authed-container" : "container"}>
        <div className="header-container">
          <p className="header">Solcial Wall</p>
          <p className="sub-text">
            View your conversations in the metaverse ✨
          </p>
          {!walletAddress && renderNotConectedButton()}
          {walletAddress && renderConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
