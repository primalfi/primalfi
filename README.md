# Primal Fi Protocol

Liquid Staking Infrastructure on ApeChain

**Primal Fi** is a non-custodial liquid staking protocol deployed on ApeChain, designed to enable capital-efficient staking of native ApeCoin while preserving liquidity and composability across DeFi ecosystems.

---

## Overview

Primal Fi introduces a liquid staking architecture where users stake native ApeCoin and receive a transferable yield-bearing ERC-20 token (**prAPE**) representing proportional ownership of the staking pool and accrued rewards.

Yield is distributed through a **liquidity index accounting system**, avoiding rebasing mechanics and ensuring seamless integration with external DeFi protocols.

---

## Core Design Principles

### Capital Efficiency
Users retain liquidity through prAPE while underlying assets remain staked within the protocol.

### Non-Rebasing Yield Model
Rewards accrue via an index-based system rather than balance rebasing, improving composability.

### Deterministic Accounting
All balances are derived from scaled representations adjusted by a global liquidity index.

### Composability
prAPE is fully transferable and designed for integration with external DeFi systems.

### Controlled Exit Mechanism
Withdrawals are processed through a queue-based system to ensure protocol stability under variable liquidity conditions.

---

## System Architecture

The protocol is composed of two core smart contracts:

### PrimalProtocol.sol
Core staking and liquidity engine.

Responsibilities:
- Native ApeCoin staking logic
- Minting and burning of prAPE
- Liquidity index updates
- Reward distribution engine
- Stake lifecycle management
- Withdraw queue system
- Emergency mode controls
- Fee and penalty accounting

### PrimalApe.sol (prAPE)
ERC-20 liquid staking token representing staked position exposure.

Features:
- Scaled balance accounting model
- Non-rebasing supply mechanics
- Protocol-controlled mint/burn
- Transfer-aware stake synchronization
- Pause functionality

---

## Tokenomics

- Protocol Fee: 2.00%
- Treasury Allocation: 25% of fees
- Reward Reserve: 75% of fees
- Early Withdrawal Penalty: up to 15%

---

## Smart Contracts

- PrimalProtocol.sol
- PrimalApe.sol

---

## Disclaimer

Primal Fi is a production-grade decentralized protocol deployed on ApeChain. Interaction with smart contracts involves financial risk.
