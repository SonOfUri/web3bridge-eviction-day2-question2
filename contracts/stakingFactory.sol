// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./IERC20.sol";

contract StakingContract {
    MYIERC20 public stakingToken;

    uint256 public constant APY = 10;  // 10% Annual Percentage Yield

    mapping(address => uint256) public stakedBalances;
    mapping(address => uint256) public stakingStartTime;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);

    constructor(address _stakingToken) {
        stakingToken = MYIERC20(_stakingToken);
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Cannot stake 0");
        stakedBalances[msg.sender] += amount;
        stakingStartTime[msg.sender] = block.timestamp;  // Set the staking start time

        // Transfer the staked tokens to this contract
        require(stakingToken.transferFrom(msg.sender, address(this), amount), "Stake transfer failed");

        emit Staked(msg.sender, amount);
    }

    function unstake() external {
        uint256 stakedAmount = stakedBalances[msg.sender];
        require(stakedAmount > 0, "Nothing to unstake");

        // Calculate the reward
        uint256 reward = calculateReward(msg.sender);

        // Reset staked balance and staking start time
        stakedBalances[msg.sender] = 0;
        stakingStartTime[msg.sender] = 0;

        // Transfer the staked tokens and reward back to the user
        require(stakingToken.transfer(msg.sender, stakedAmount), "Unstake transfer failed");
        if (reward > 0) {
            require(stakingToken.transfer(msg.sender, reward), "Reward transfer failed");
            emit RewardPaid(msg.sender, reward);
        }

        emit Unstaked(msg.sender, stakedAmount);
    }


    function calculateReward(address user) public view returns (uint256) {
        uint256 stakedAmount = stakedBalances[user];
        if (stakedAmount == 0) return 0;

        uint256 stakingDuration = block.timestamp - stakingStartTime[user];
        uint256 reward = (stakedAmount * APY * stakingDuration) / (365 days * 100);
        return reward;
    }

}


contract StakingFactory {
    // Event to emit when a new StakingContract is created
    event StakingContractCreated(address indexed stakingContract, address indexed token);

    // Keep track of all deployed staking contracts
    address[] public deployedStakingContracts;

    function createStakingContract(address _stakingToken) external {
        StakingContract newStakingContract = new StakingContract(_stakingToken);
        deployedStakingContracts.push(address(newStakingContract));
        emit StakingContractCreated(address(newStakingContract), _stakingToken);
    }

    function getDeployedStakingContracts() external view returns (address[] memory) {
        return deployedStakingContracts;
    }
}
