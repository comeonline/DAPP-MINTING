/*Import des méthodes et modules */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";

/*Import pour outilsweb react js*/
import Navbar from "./compenents/Navbar.js"


/*Assets*/ 
import i1 from "./assets/images/1.png";
import i2 from "./assets/images/20.png";
import i3 from "./assets/images/25.png";
import i4 from "./assets/images/36.png";
import i6 from "./assets/images/90.png";
import i7 from "./assets/images/89.png";
import i8 from "./assets/images/94.png";
import i9 from "./assets/images/135.png";
import i10 from "./assets/images/227.png";
import i11 from "./assets/images/310.png";
import i12 from "./assets/images/3975.png";
import i13 from "./assets/images/3976.png";
import i14 from "./assets/images/3978.png";
import i15 from "./assets/images/3980.png";
import i16 from "./assets/images/4026.png";
import icon from "./assets/images/AvalancheLogo.png.png";
import Fond from "./assets/images/ChibavaxFond.png";
import Homegif from "./assets/images/HomePage-gif-Presentation.gif";
import Wallpaper from "./assets/images/Wallpaper.jpg";
import Chibavax from "./assets/images/Chibavax.png";

export const StyledButton = styled.button`
  padding: 8px;
  border-radius: 50px;
  border: none;
  background-color: #1e9abd;
  padding: 10px;
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
    setFeedback("Minting your Chibivax...");
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
          "WOW, you now own a LunaLander. go visit Opensea.io to view it."
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
    <s.Screen style={{ backgroundColor: "var(--white)" }}>
      <Navbar/>
      {blockchain.account === "" || blockchain.smartContract === null ? (
        <s.Container flex={1} ai={"center"} jc={"center"}>
          <s.SpacerSmall />
          <s.TextTitle style={{ textAlign: "center" }}>
            To Mint a Chibavax
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
          <s.SpacerSmall />
          <s.SpacerSmall />
          <s.SpacerSmall />

          <s.Container style={{ backgroundColor : 'var(--light-grey)' }} flex={1} ai={"center"} jc={"center"}>
          <s.TextTitle>
          BRINGING THE VERTICALS NFTS 
          </s.TextTitle>
          <s.TextTitle>
          TO THE 
          </s.TextTitle>
          <s.TextTitle>
          POLYGON COMMUNITY
          </s.TextTitle>
          <LogoImg alt={"logo"} src={Homegif} />
          </s.Container>
          
          <s.Container
            ai={"center"}
            jc={"center"}
            fd={"row"}
            style={{
              flexWrap: "wrap",
              overflow: "hidden",
              maxHeight: "200px",
              minHeight: "200px",
            }}
          >
          <s.TextTitle>
          Roadmap
          </s.TextTitle>

          </s.Container>


          <s.Container style={{ backgroundColor : 'var(--light-grey)' }} flex={1} ai={"center"} jc={"center"}>
            <s.TextTitle
              style={{ textAlign: "center", fontSize: 45, fontWeight: "bold" }}
            >
              {data.totalSupply}/1000
            </s.TextTitle>
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
                <s.TextTitle style={{ textAlign: "center" }}>
                  1 Chibavax costs {data.cost / 1e18} ETH.
                </s.TextTitle>
                <s.SpacerXSmall />
                <s.TextDescription style={{ textAlign: "center" }}>
                  Excluding gas fee.
                </s.TextDescription>
                <s.SpacerSmall />
                <s.TextDescription style={{ textAlign: "center" }}>
                  {feedback}
                </s.TextDescription>
                <s.SpacerMedium />
                <s.Container ai={"center"} jc={"center"} fd={"row"}>
                  <StyledButton
                    disabled={claimingNft ? 1 : 0}
                    onClick={(e) => {
                      e.preventDefault();
                      claimNFTs(1);
                    }}
                  >
                    {claimingNft ? "BUSY" : "BUY 1"}
                  </StyledButton>
                </s.Container>

                <s.SpacerLarge />
                <s.SpacerLarge />
                
                <s.Container
                  jc={"center"}
                  ai={"center"}
                  style={{ width: "70%" }}
                >
                  <s.TextDescription
                    style={{ textAlign: "center", fontSize: 9 }}
                  >
                    ABOUT 
                    Please make sure you are connected to the right network
                    (Polygon Mainnet) and the correct address. Please note:
                    Once you make the purchase, you cannot undo this action.
                  </s.TextDescription>
                  <s.SpacerSmall />
                  <s.TextDescription
                    style={{ textAlign: "center", fontSize: 9 }}
                  >
                    We have set the gas limit to 285000 for the contract to
                    successfully mint your NFT. We recommend that you don't
                    change the gas limit.
                  </s.TextDescription>
                </s.Container>
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
