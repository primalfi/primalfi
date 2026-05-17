export const PRIMAL_PROTOCOL_ADDRESS =
    process.env.NEXT_PUBLIC_PRIMAL_PROTOCOL_ADDRESS ||
    "0x19A4790E37C1F9B74388CAD0bf256CDD819eAaac";

export const PRIMAL_APE_ADDRESS =
    process.env.NEXT_PUBLIC_PRIMAL_APE_ADDRESS ||
    "0xD1f948479a8D1A3374C1e0dDd5D5F49aC9821AC2";

// =====================================================
// CONSTANTS
// =====================================================

export const PERIODS = {
    30: 30 * 24 * 60 * 60,
    60: 60 * 24 * 60 * 60,
    90: 90 * 24 * 60 * 60,
};

export const PRECISION = 1e18;

export const FEE_DENOM = 10000;

export const MIN_QUEUE_TIME = 7 * 24 * 60 * 60;

// =====================================================
// PROTOCOL MODE ENUM
// =====================================================

export enum ProtocolMode {
    Live = 0,
    DepositsPaused = 1,
    WithdrawalsPaused = 2,
    EmergencyOnly = 3,
}

// =====================================================
// PRAPE ABI
// =====================================================

export const PRIMAL_APE_ABI = [
  // =========================
  // ERC20
  // =========================
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function allowance(address,address) view returns(uint256)",
  "function approve(address,uint256) returns(bool)",
  "function transfer(address,uint256) returns(bool)",
  "function transferFrom(address,address,uint256) returns(bool)",

  // =========================
  // SCALED SYSTEM
  // =========================
  "function scaledBalanceOf(address) view returns (uint256)",
  "function scaledTotalSupply() view returns (uint256)",

  // =========================
  // INDEX
  // =========================
  "function getIndex() view returns (uint256)",

  // =========================
  // CONFIG
  // =========================
  "function protocol() view returns (address)",
  "function setProtocol(address)",
  "function paused() view returns (bool)",
  "function setPaused(bool)",

  // =========================
  // EVENTS
  // =========================
  "event Transfer(address indexed from,address indexed to,uint256 value)",
  "event Approval(address indexed owner,address indexed spender,uint256 value)",
  "event ProtocolUpdated(address indexed protocol)",
  "event Paused(bool state)"
];

// =====================================================
// PRIMAL PROTOCOL ABI (ACTUALIZADO)
// =====================================================

export const PRIMAL_PROTOCOL_ABI = [
  // =========================
  // USER ACTIONS
  // =========================
  "function stake(uint256 period) payable",
  "function requestWithdraw(uint256 stakeIndex)",
  "function claimWithdraw(uint256 index, uint256 requestId)",
  "function emergencyWithdraw(uint256 stakeIndex)",

  // =========================
  // INDEX / CORE
  // =========================
  "function getCurrentIndex() view returns (uint256)",
  "function exchangeRate() view returns (uint256)",
  "function totalUnderlying() view returns (uint256)",
  "function rewardReserve() view returns (uint256)",
  "function liquidityIndex() view returns (uint256)",

  // =========================
  // STAKES
  // =========================
  "function stakes(uint256) view returns (address owner, uint256 deposited, uint256 scaledAmount, uint256 unlockTime, uint256 period, bool active)",
  "function getStakeInfo(uint256) view returns (address owner, uint256 deposited, uint256 scaledAmount, uint256 unlockTime, uint256 period, bool active)",
  "function getStakeValue(uint256) view returns (uint256)",
  "function getUserStakeCount(address) view returns (uint256)",
  "function getUserStakeIndexes(address) view returns (uint256[])",

  // =========================
  // WITHDRAW QUEUE
  // =========================
  "function withdrawQueue(uint256) view returns (uint256 id, address user, uint256 amount, uint256 requestTime, bool claimed)",
  "function getWithdrawQueueRealLength() view returns (uint256)",
  "function canClaimWithdraw(uint256) view returns (bool)",
  "function MIN_QUEUE_TIME() view returns (uint256)",

  // =========================
  // REWARDS
  // =========================
  "function injectRewards() payable",
  "function distributeRewards()",
  "function distributeAllRewards()",
  "function getRewardsHistoryLength() view returns (uint256)",
  "function getRewardAt(uint256) view returns (tuple(uint256 rewards, uint256 oldIndex, uint256 newIndex, uint256 timestamp))",

  // =========================
  // CONFIG
  // =========================
  "function protocolFee() view returns (uint256)",
  "function earlyPenalty() view returns (uint256)",
  "function treasurySplit() view returns (uint256)",
  "function distributionBps() view returns (uint256)",
  "function treasury() view returns (address)",
  
  "function setDistributionBps(uint256)",
  "function setFee(uint256)",
  "function setPenalty(uint256)",
  "function setTreasury(address)",

  // =========================
  // SYSTEM MODE (NUEVO - REEMPLAZA A PAUSED)
  // =========================
  "function protocolMode() view returns (uint8)",
  "function setProtocolMode(uint8)",

  // =========================
  // ADMIN
  // =========================
  "function owner() view returns (address)",

  // =========================
  // HELPERS
  // =========================
  "function wa0x0000()",

  // =========================
  // EVENTS ACTUALIZADOS
  // =========================
  "event Staked(address indexed user, uint256 amount, uint256 period)",
  "event WithdrawRequested(address indexed user, uint256 amount)",
  "event WithdrawClaimed(address indexed user, uint256 amount)",
  "event EmergencyWithdraw(address indexed user, uint256 indexed stakeIndex, uint256 amount)",
  "event RewardsInjected(address indexed from, uint256 amount, uint256 timestamp)",
  "event RewardsDistributed(uint256 rewards, uint256 oldIndex, uint256 newIndex, uint256 timestamp)",
  "event LiquidityIndexUpdated(uint256 oldIndex, uint256 newIndex, uint256 rewardsAdded)",
  "event StakeUpdated(address indexed user, uint256 indexed stakeId, uint256 deposited, uint256 scaledAmount, bool isSplit)",
  "event StakePositionTransferred(address indexed from, address indexed to, uint256 indexed stakeIndex, uint256 scaledAmount)",
  "event ProtocolModeUpdated(uint8 mode)",
  "event FeeUpdated(uint256 fee)",
  "event PenaltyUpdated(uint256 penalty)",
  "event TreasuryUpdated(address treasury)",
  "event DistributionBpsUpdated(uint256 bps)"
];