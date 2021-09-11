/*Import des méthodes et modules */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";

/*Import pour outilsweb react js*/
import Navbar from "./compenents/Navbar.js";
import Footer from "./compenents/Footer.js";
import BtnMint from "./compenents/BtnMint.js";
import BtnInfo from "./compenents/BtnInfo.js";
import CardSupply from "./compenents/CardSupply.js";


/*Assets*/ 
import Wallpaper from "./assets/images/Wallpaper.jpg";


export const StyledButton = styled.button`
  border-radius: 50px;
  border: none;
  background-color: #1e9abd;
  padding: 75px;
  font-weight: bold;
  color: #fff;
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(0, 0, 0, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledImg = styled.img`
  width: 100px;
  height: 100px;
`;

export const LogoImg = styled.img`
  width: 200px;
  height: 200px;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("Maybe it's your lucky day.");
  const [claimingNft, setClaimingNft] = useState(false);

  const claimNFTs = (_amount) => {
    if (_amount <= 0) {
      return;
    }
    setFeedback("Minting your Verticals...");
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(blockchain.account, _amount)
      .send({
        gasLimit: "285000",
        to: "0x6020371b0e8a2fc259a6b111d178bba9c966a4a4",
        from: blockchain.account,
        value: blockchain.web3.utils.toWei(
          ((Number(data.cost) / 1e18) * _amount).toString(),
          "ether"
        ),
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "WOW, you now own a Verticals. go visit Opensea.io to view it."
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  useEffect(() => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain.smartContract, dispatch]);

  return (
    <s.Screen style={{ backgroundImage : `url(${Wallpaper})` }}>
      <Navbar/>
      {blockchain.account === "" || blockchain.smartContract === null ? (
        <s.Container flex={1} ai={"center"} jc={"center"}>
          <s.SpacerSmall />
          <s.TextTitle style={{ textAlign: "center" }}>
            To Mint a Verticals
          </s.TextTitle>
          <s.SpacerSmall />
          <s.TextDescription style={{ textAlign: "center" }}>
            Connect to the Polygon network
          </s.TextDescription>
          <s.SpacerSmall />
          <StyledButton
            onClick={(e) => {
              e.preventDefault();
              dispatch(connect());
            }}
          >
            CONNECT
          </StyledButton>
          <s.SpacerSmall />
          {blockchain.errorMsg !== "" ? (
            <s.TextDescription style={{ textAlign: "center" }}>
              {blockchain.errorMsg}
            </s.TextDescription>
          ) : null}
        </s.Container>
      ) : (
        <s.Container flex={1}>
        <s.SpacerLarge />
        <s.SpacerLarge />

          <s.Container flex={1} ai={"center"} jc={"center"}>
          <s.TextTitle>
          BRINGING THE VERTICALS NFTS 
          </s.TextTitle>
          <s.TextTitle>
          TO THE 
          </s.TextTitle>
          <s.TextTitle>
          POLYGON COMMUNITY
          </s.TextTitle>
          </s.Container>
          <s.SpacerLarge />
          

          <s.Container  flex={1} ai={"center"} jc={"center"}>
          <BtnMint/>
          <s.SpacerMedium />
          <s.SpacerMedium />

            {Number(data.totalSupply) == 10000 ? (
              <>
                <s.TextTitle style={{ textAlign: "center" }}>
                  The sale has ended.
                </s.TextTitle>
                <s.SpacerSmall />
                <s.TextDescription style={{ textAlign: "center" }}>
                  You can still find The Verticals on
                    Opensea.io
                </s.TextDescription>
              </>
            ) : (
              <>
              <CardSupply/>
                <s.Container ai={"center"} jc={"center"} fd={"row"}>

                </s.Container>

                <s.SpacerLarge />
                <s.SpacerLarge />

                <s.Container jc={"center"} ai={"center"}>
                <BtnInfo/>
                </s.Container>
                <s.SpacerLarge />
                <s.SpacerLarge />
                <Footer/>
                <s.SpacerSmall />
              </>
            )}
          </s.Container>
        </s.Container>
      )}
    </s.Screen>
  );
}

export default App;
