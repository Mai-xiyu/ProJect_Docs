---
title: User Guide
description: Installation and usage instructions
---

# OneKeyMiner User Guide

<p align="center">
  <img src="https://raw.githubusercontent.com/Mai-xiyu/OneKeyMiner_Docs/refs/heads/master/public/img/okm_logo.png" alt="OneKeyMiner Logo" width="720" height="393">
</p>

<p align="center">
  <strong>OneKeyMiner</strong> - Making mining, farming, and planting easy and efficient!
</p>

---

## 📖 Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Three Core Features](#three-core-features)
- [Usage](#usage)
- [Configuration](#configuration)
- [Tag System](#tag-system)
- [Compatibility](#compatibility)
- [FAQ](#faq)

---

## Introduction
**OneKeyMiner** is a powerful Minecraft mod that goes beyond just chain mining! It offers three core features:

### ✨ Key Features

- ⛏️ **Chain Mining**: Mine large connected clusters of similar blocks (ores, logs, etc.) at once
- ✂️ **Chain Interaction**: Batch shear sheep, till soil, strip bark, create paths, and more
- 🌱 **Chain Planting**: Automatically plant crops on adjacent farmland
- ⚙️ **Highly Configurable**: Customize max block count, search distance, activation mode, and more
- 🏷️ **Tag Support**: Use tags like `#minecraft:logs` and `#c:shears` for configuration
- 🛡️ **Safety Features**: Automatically protect tool durability and hunger levels
- 🎮 **Multi-Platform Support**: Compatible with Fabric, NeoForge, and Forge
- 🔧 **Mod Compatibility**: Works seamlessly with items and blocks from other mods
---

## Installation

### Requirements

- Minecraft 1.21.9
- Java 21 or higher
- Corresponding platform loaders:
  - **Fabric**: Fabric Loader 0.15.0+ and Fabric API
  - **NeoForge**: NeoForge 21.0+
  - **Forge**: Forge 51.0+

### Installation Steps

1. Download the mod file for your platform
2. Place the `.jar` file into the `.minecraft/mods` folder
3. Launch the game

### Optional Dependencies
- **Mod Menu** (Fabric): Displays a configuration button in the mod list
- **Cloth Config** (Fabric): Provides a better configuration interface

---

## Quick Start

### Chain Mining
1. Hold a pickaxe or axe
2. **Hold the sneak key (Shift)**
3. Mine an ore or log
4. Watch connected similar blocks being mined together!

### Chain Interaction
1. Hold a hoe, axe, shovel, or shears
2. **Hold the sneak key (Shift)**
3. Right-click a block to interact
4. Adjacent interactable blocks will also be processed!

### Chain Planting
1. Hold seeds or crops
2. **Hold the sneak key (Shift)**
3. Right-click farmland
4. Adjacent empty farmland will also be planted!

> 💡 **Tip**: By default, you need to hold the sneak key to activate chain operations. You can change the activation mode in the configuration.

---

## Three Core Features

### ⛏️ Chain Mining

When you break a block, adjacent blocks of the same type are automatically broken.

**Supported Blocks**:
- All ores (including deep variants and nether ores)
- All logs and wood
- All leaves
- Custom whitelist blocks

**Tool Requirements**:
- Pickaxe: Ores
- Axe: Logs/Wood
- Any tool: Whitelisted blocks

### ✂️ Chain Interaction

When you use a tool on a block, the same action is automatically performed on adjacent blocks.

| Tool | Interaction Type | Target Blocks | Result |
|------|------------------|---------------|--------|
| 🪓 Axe | Stripping | Logs/Wood | Stripped Logs/Wood |
| 🌾 Hoe | Tilling | Grass/Dirt | Farmland |
| ⛏️ Shovel | Pathing | Grass/Dirt | Grass Path |
| ✂️ Shears | Shearing | Sheep/Vines etc. | Dropped Wool/Vines |
| 🖌️ Brush | Scraping | Suspicious Sand/Gravel | Archaeological Excavation |

### 🌱 Chain Planting

When planting crops, adjacent empty farmland blocks are automatically planted.

**Supported Items**:
- Wheat Seeds
- Beetroot Seeds
- Carrots, Potatoes
- Melon Seeds, Pumpkin Seeds
- Mod-added seeds (configured via tags)

**Target Blocks**:
- Empty farmland blocks
- Plantable blocks matching the seed type

---

## Usage 

### Activation Modes

The mod supports multiple activation modes, which can be selected in the configuration:

| Mode | Description |
|------|-------------|
| **Hold Sneak Key** | Activate while holding Shift (default) |
| **No Sneak Key** | Activate without holding Shift |
| **Always On** | Always active |
| **Toggle Key** | Use a dedicated key to toggle on/off |

### Key Bindings
| Key | Function | Default Key |
|------|------|----------|
| Toggle Chain Mode | Enable/Disable all chain features | ` (Tilde) |
| Open Configuration | Open the mod configuration interface | Unbound |
> 📝 In-game, press `Esc` → `Options` → `Controls` → `Key Bindings` to change key bindings

---

## Configuration Options

### Opening the Configuration Interface

**Fabric (requires Mod Menu)**:
1. Press `Esc` → `Mods`
2. Find OneKeyMiner → Click the gear icon

**NeoForge / Forge**：
1. Press `Esc` → `Mods`
2. Find OneKeyMiner → Click `Configuration`

**Manual Editing**:
Edit `.minecraft/config/onekeyminer.json`

### Configuration Options Detailed

#### Basic Settings

| Option | Default | Description |
|------|--------|------|
| `enabled` | ✅ true | Whether the mod is enabled |
| `enableInteraction` | ✅ true | Whether chain interaction is enabled |
| `enablePlanting` | ✅ true | Whether chain planting is enabled |

#### Mining Restrictions
| Option | Default | Range | Description |
|------|--------|------|------|
| `maxBlocks` | 64 | 1-1000 | Maximum number of blocks processed in a single chain operation |
| `maxBlocksCreative` | 256 | 1-10000 | Maximum number of blocks processed in creative mode |
| `maxDistance` | 16 | 1-64 | Maximum search distance for chain operations |
| `allowDiagonal` | ✅ true | - | Whether to include diagonally adjacent blocks |
| `strictBlockMatching` | ❌ false | - | Whether to require blocks to be exactly the same |

#### Protection Settings
| Option | Default | Description |
|------|--------|------|
| `toolProtectionThreshold` | 1 | Minimum tool durability to retain |
| `hungerProtectionThreshold` | 2 | Minimum hunger level to retain |
| `consumeDurability` | ✅ true | Whether to consume tool durability |
| `consumeHunger` | ✅ true | Whether to consume hunger |
| `hungerMultiplier` | 1.0 | Hunger consumption multiplier (0.0-10.0) |
#### Whitelists and Blacklists

| Option | Description |
|------|------|
| `blockWhitelist` | Block whitelist (supports tags) |
| `blockBlacklist` | Block blacklist (supports tags) |
| `toolWhitelist` | Mining tool whitelist |
| `toolBlacklist` | Mining tool blacklist |
| `interactionToolWhitelist` | Interaction tool whitelist |
| `interactionToolBlacklist` | Interaction tool blacklist |
| `plantableWhitelist` | Plantable item whitelist |
| `plantableBlacklist` | Plantable item blacklist |

### Configuration File Example

```json
{
  "enabled": true,
  "enableInteraction": true,
  "enablePlanting": true,
  "maxBlocks": 64,
  "maxBlocksCreative": 256,
  "maxDistance": 16,
  "allowDiagonal": true,
  "strictBlockMatching": false,
  "toolProtection": true,
  "toolProtectionThreshold": 1,
  "hungerProtection": true,
  "hungerProtectionThreshold": 2,
  "consumeDurability": true,
  "consumeHunger": true,
  "hungerMultiplier": 1.0,
  "blockWhitelist": [
    "#minecraft:coal_ores",
    "#minecraft:iron_ores",
    "#minecraft:logs"
  ],
  "blockBlacklist": [],
  "toolWhitelist": [],
  "toolBlacklist": [],
  "interactionToolWhitelist": [
    "#c:shears",
    "#minecraft:hoes",
    "#minecraft:axes"
  ],
  "interactionToolBlacklist": [],
  "plantableWhitelist": [
    "#c:seeds"
  ],
  "plantableBlacklist": []
}
```

---

## Tag System

OneKeyMiner supports using Minecraft and mod tags to configure blocks and items.

### Tag Formats

| Format | Description | Example |
|------|------|------|
| `#namespace:tag` | Tag reference | `#minecraft:logs` |
| `namespace:id` | Direct ID | `minecraft:diamond_ore` |
| `*pattern*` | Wildcard match | `*_ore` |
### Common Tags

#### Block Tags

| Tag | Description |
|------|------|
| `#minecraft:logs` | All logs |
| `#minecraft:coal_ores` | Coal ores |
| `#minecraft:iron_ores` | Iron ores |
| `#minecraft:gold_ores` | Gold ores |
| `#minecraft:diamond_ores` | Diamond ores |
| `#minecraft:emerald_ores` | Emerald ores |
| `#minecraft:lapis_ores` | Lapis ores |
| `#minecraft:redstone_ores` | Redstone ores |
| `#minecraft:copper_ores` | Copper ores |
| `#c:ores` | Common ores tag (Fabric/Forge) |

#### Item Tags

| Tag | Description |
|------|------|
| `#minecraft:pickaxes` | All pickaxes |
| `#minecraft:axes` | All axes |
| `#minecraft:shovels` | All shovels |
| `#minecraft:hoes` | All hoes |
| `#c:shears` | All shears |
| `#c:seeds` | All seeds |

### Adding Mod Items
```json
{
  "blockWhitelist": [
    "#mymod:custom_ores",
    "mymod:magic_crystal_ore"
  ],
  "interactionToolWhitelist": [
    "mymod:magical_shears"
  ]
}
```

---

## Compatibility

### Tools and Enchantments

- ✅ **Efficiency**: Speeds up mining
- ✅ **Unbreaking**: Reduces durability consumption
- ✅ **Fortune/Silk Touch**: Applies normally to all blocks
- ✅ **Mending**: Experience is gained normally

### Protection Plugin Compatibility

The mod is compatible with the following protection systems:
- ✅ FTB Chunks
- ✅ Claim Chunk
- ✅ Residence
- ✅ Other protection systems using standard events

> Blocks in protected areas will not be affected by chain operations

### Mod Compatibility

OneKeyMiner uses universal item interaction events to automatically support:
- ✅ Ores and logs from other mods
- ✅ Tools from other mods (pickaxes, axes, shears, etc.)
- ✅ Seeds and crops from other mods

### Server Support

- ✅ Fully supports multiplayer servers
- ✅ Configuration can be managed by server administrators
- ✅ Player personal settings are saved on the client

---

## Frequently Asked Questions

### Q: Chain operations are not working?

**Check the following points**:
1. Make sure the mod is enabled (`enabled: true`)
2. Make sure you are using the correct activation method (default is holding Shift)
3. Make sure the corresponding features are enabled (`enableInteraction`, `enablePlanting`)
4. Make sure blocks/tools are in the whitelist and not in the blacklist

### Q: How to add mod blocks to the whitelist?
Edit `.minecraft/config/onekeyminer.json`:
```json
{
  "blockWhitelist": [
    "#mymod:custom_ores",
    "mymod:special_ore"
  ]
}
```

### Q: How to reduce hunger consumption?

Adjust the configuration:
- Set `consumeHunger` to `false` to disable hunger consumption
- Or reduce the value of `hungerMultiplier` (e.g., 0.5)

### Q: How to protect my tools?

Tool protection is enabled by default:
- `toolProtection: true`
- `toolProtectionThreshold: 1`

Tools will stop operating when they have 1 durability point left.

### Q: Why doesn't chain planting plant on all farmland?

Possible reasons:
1. Farmland is out of search range (exceeds `maxDistance`)
2. Maximum number of blocks reached (`maxBlocks`)
3. Not enough seeds in hand
4. Farmland already has crops

### Q: How to completely disable a feature?
In the configuration:
- Disable chain interaction: `"enableInteraction": false`
- Disable chain planting: `"enablePlanting": false`
- Disable the entire mod: `"enabled": false`

---

## Feedback and Support

Having issues or suggestions?

- **GitHub Issues**: Report bugs or request features
- **Discord**: Join the community discussion

---

<p align="center">
  <strong>Enjoy mining, farming, and planting! ⛏️🌾🌱</strong>
</p>

*User Guide Version: 1.6.0 | For Minecraft 1.21.9*