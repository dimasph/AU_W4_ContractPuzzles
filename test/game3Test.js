const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("Game3", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game3");
    const game = await Game.deploy();

    //Instance of a Signer object from the ethers.js library. A Signer represents an Ethereum account and is capable of performing actions like signing messages or transactions and sending transactions:

    const [addr1, addr2, addr3] = await ethers.getSigners();

    await game.connect(addr1).buy({ value: "2" });
    await game.connect(addr2).buy({ value: "3" });
    await game.connect(addr3).buy({ value: "1" });

    return { game, addr1, addr2, addr3 };
  }

  it("should be a winner", async function () {
    const { game, addr1, addr2, addr3 } = await loadFixture(
      deployContractAndSetVariables
    );

    // TODO: win expects three arguments

    //addr1.address refers to the Ethereum address associated with the addr1 Signer object. The Ethereum address is a string representation (in hexadecimal format) of the account's public identifier on the Ethereum network.

    await game.win(addr1.address, addr2.address, addr3.address);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
