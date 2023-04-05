const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("Game4", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game4");
    const game = await Game.deploy();

    const [x, y] = await ethers.getSigners();

    return { game, x, y };
  }
  it("should be a winner", async function () {
    const { game, x, y } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}

    await game.connect(x).write(y.address);
    await game.connect(y).win(x.address);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
