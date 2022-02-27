import style from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [buttonConnect, setButtonConnect] = useState("Connect");
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  const [indexPosition, setIndexPostion] = useState("");
  const [contract, setContract] = useState();

  const checkWalletExist = async () => {
    if (!ethereum) {
      alert("Make sure you have Metamask installed!");
    } else {
      console.log("Wallet exists! We're ready to go!");
    }
  };

  const checkIfIsConnected = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length !== 0) {
      setIsConnected(true);
      setButtonConnect("Connected");
    } else {
      setIsConnected(false);
      setButtonConnect("Connect");
    }
  };

  const createContractInterface = async () => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    const contractAddress = "0x46B4af33eF967F11fAfCef5d53B5e79e52cf9cd8";
    const abi = [
      {
        inputs: [
          {
            internalType: "string",
            name: "_name",
            type: "string",
          },
        ],
        name: "addName",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "name",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_index",
            type: "uint256",
          },
        ],
        name: "returnName",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ];
    setContract(new ethers.Contract(contractAddress, abi, signer));
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  };

  const update = async (props) => {
    try {
      await contract.addName(props);
    } catch (err) {
      console.log(err);
    }
  };

  const read = async (props) => {
    try {
      const name = await contract.returnName(props);
      setName(name);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkWalletExist();
  }, []);

  useEffect(() => {
    createContractInterface();
  }, []);

  useEffect(() => {
    checkIfIsConnected();
  });

  return (
    <>
      <div>
        <button
          className={style.universalBtn}
          onClick={() => connectWallet()}
          disabled={isConnected}
        >
          {buttonConnect}
        </button>

        <input
          type="text"
          placeholder="name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        ></input>
        <button
          type="submit"
          className={style.universalBtn}
          onClick={() => update(newName)}
        >
          Write name
        </button>

        <input
          type="number"
          placeholder="Index position"
          value={indexPosition}
          onChange={(e) => setIndexPostion(e.target.value)}
        ></input>

        <button
          className={style.universalBtn}
          onClick={() => read(indexPosition)}
        >
          Read name
        </button>
        <span> You search for following name: {name}</span>
      </div>
    </>
  );
}
