---
title: Spartan Weaponry Unofficial Resource Pack Development Guide
description: Complete guide for resource pack authors on texture, model, and sound replacement
---

# Spartan Weaponry Unofficial Resource Pack Development Guide

This document provides a detailed resource structure guide for the `Spartan Weaponry Unofficial` mod, helping you create custom textures, models, or sounds.

## 📁 Resource Directory Structure Overview

> ⚠️ **Important Change**: Starting from version 1.0.2, resource paths use `spartan_weaponry_unofficial` (with underscores).

```
assets/spartan_weaponry_unofficial/
├── blockstates/          # Block states (skulls)
├── lang/                 # Language files
├── models/
│   └── item/
│       └── base/         # Base model templates
├── particles/            # Particle effect definitions
├── sounds.json           # Sound registration
└── textures/
    ├── entity/           # Entity textures
    │   ├── projectiles/  # Projectile textures
    │   └── skull/        # Skull textures
    ├── gui/              # GUI textures
    │   └── tooltip/      # Tooltip textures
    ├── item/             # Item textures
    │   └── coating/      # Oil coating overlay textures
    ├── mob_effect/       # Status effect icons
    ├── model/            # 3D model textures (quivers)
    ├── particle/         # Particle textures
    └── slots/            # Recipe slot icons
```

---

## 🗡️ Weapon Textures

### Supported Material Types

The mod includes the following materials, each with a complete weapon set:

| Material Category | Material Name | Texture Prefix |
|:------------------|:--------------|:---------------|
| **Vanilla Materials** | Wooden | `wooden_` |
| | Stone | `stone_` |
| | Copper | `copper_` |
| | Iron | `iron_` |
| | Golden | `golden_` |
| | Diamond | `diamond_` |
| | Netherite | `netherite_` |
| | Leather (bows/crossbows only) | `leather_` |
| **Modded Materials** | Tin | `tin_` |
| | Bronze | `bronze_` |
| | Steel | `steel_` |
| | Silver | `silver_` |
| | Electrum | `electrum_` |
| | Lead | `lead_` |
| | Nickel | `nickel_` |
| | Invar | `invar_` |
| | Constantan | `constantan_` |
| | Platinum | `platinum_` |
| | Aluminum | `aluminum_` |

### Weapon Types and Texture Files

#### Melee Weapons (Single Texture)

The following weapon types require only one texture file:

| Weapon Type | Name | Texture File Format |
|:------------|:-----|:-------------------|
| `dagger` | Dagger | `{material}_dagger.png` |
| `parrying_dagger` | Parrying Dagger | `{material}_parrying_dagger.png` |
| `longsword` | Longsword | `{material}_longsword.png` |
| `katana` | Katana | `{material}_katana.png` |
| `saber` | Saber | `{material}_saber.png` |
| `rapier` | Rapier | `{material}_rapier.png` |
| `greatsword` | Greatsword | `{material}_greatsword.png` |
| `battle_hammer` | Battle Hammer | `{material}_battle_hammer.png` |
| `warhammer` | Warhammer | `{material}_warhammer.png` |
| `spear` | Spear | `{material}_spear.png` |
| `halberd` | Halberd | `{material}_halberd.png` |
| `pike` | Pike | `{material}_pike.png` |
| `lance` | Lance | `{material}_lance.png` |
| `battleaxe` | Battleaxe | `{material}_battleaxe.png` |
| `flanged_mace` | Flanged Mace | `{material}_flanged_mace.png` |
| `glaive` | Glaive | `{material}_glaive.png` |
| `quarterstaff` | Quarterstaff | `{material}_quarterstaff.png` |
| `scythe` | Scythe | `{material}_scythe.png` |

**Example Paths:**
```
assets/spartan_weaponry_unofficial/textures/item/iron_longsword.png
assets/spartan_weaponry_unofficial/textures/item/diamond_battle_hammer.png
```

#### Throwing Weapons (Single Texture + Empty State)

Throwing weapons have a main texture plus a universal "empty" state texture:

| Weapon Type | Name | Main Texture | Empty State Texture (Universal) |
|:------------|:-----|:-------------|:-------------------------------|
| `throwing_knife` | Throwing Knife | `{material}_throwing_knife.png` | `empty_throwing_knife.png` |
| `tomahawk` | Tomahawk | `{material}_tomahawk.png` | `empty_tomahawk.png` |
| `javelin` | Javelin | `{material}_javelin.png` | `empty_javelin.png` |
| `boomerang` | Boomerang | `{material}_boomerang.png` | `empty_boomerang.png` |

#### Longbow (4 Textures)

Longbows require 4 texture files to represent different drawing stages:

| State | File Format |
|:------|:-----------|
| Standby | `{material}_longbow_standby.png` |
| Pulling 0 | `{material}_longbow_pulling_0.png` |
| Pulling 1 | `{material}_longbow_pulling_1.png` |
| Pulling 2 | `{material}_longbow_pulling_2.png` |

**Example:**
```
assets/spartan_weaponry_unofficial/textures/item/iron_longbow_standby.png
assets/spartan_weaponry_unofficial/textures/item/iron_longbow_pulling_0.png
assets/spartan_weaponry_unofficial/textures/item/iron_longbow_pulling_1.png
assets/spartan_weaponry_unofficial/textures/item/iron_longbow_pulling_2.png
```

#### Heavy Crossbow (5 Textures)

Heavy crossbows require 5 texture files:

| State | File Format |
|:------|:-----------|
| Standby | `{material}_heavy_crossbow_standby.png` |
| Pulling 0 | `{material}_heavy_crossbow_pulling_0.png` |
| Pulling 1 | `{material}_heavy_crossbow_pulling_1.png` |
| Pulling 2 | `{material}_heavy_crossbow_pulling_2.png` |
| Loaded | `{material}_heavy_crossbow_loaded.png` |

---

## 🎯 Oil Coating Overlay Textures

Oiled weapons display an overlay texture. These textures are located in the `textures/item/coating/` directory:

| Weapon Type | Overlay File |
|:------------|:------------|
| Dagger | `coating/dagger.png` |
| Parrying Dagger | `coating/parrying_dagger.png` |
| Longsword | `coating/longsword.png` |
| Katana | `coating/katana.png` |
| Saber | `coating/saber.png` |
| Rapier | `coating/rapier.png` |
| Greatsword | `coating/greatsword.png` |
| Battle Hammer | `coating/battle_hammer.png` |
| Warhammer | `coating/warhammer.png` |
| Spear | `coating/spear.png` |
| Halberd | `coating/halberd.png` |
| Pike | `coating/pike.png` |
| Lance | `coating/lance.png` |
| Battleaxe | `coating/battleaxe.png` |
| Flanged Mace | `coating/flanged_mace.png` |
| Glaive | `coating/glaive.png` |
| Quarterstaff | `coating/quarterstaff.png` |
| Scythe | `coating/scythe.png` |
| Cestus | `coating/cestus.png` |
| Club | `coating/club.png` |
| Vanilla Sword | `coating/vanilla_sword.png` |

> 💡 **Tip**: Overlay textures use the model's custom loader `spartan_weaponry_unofficial:oil_coated_item` for rendering.

---

## 🏹 Ammunition Textures

### Arrows

| Item | Item Texture | Entity Texture |
|:-----|:-------------|:--------------|
| Wooden Arrow | `wooden_arrow.png` | `entity/projectiles/wooden_arrow.png` |
| Copper Arrow | `copper_arrow.png` | `entity/projectiles/copper_arrow.png` |
| Iron Arrow | `iron_arrow.png` | `entity/projectiles/iron_arrow.png` |
| Diamond Arrow | `diamond_arrow.png` | `entity/projectiles/diamond_arrow.png` |
| Netherite Arrow | `netherite_arrow.png` | `entity/projectiles/netherite_arrow.png` |
| Explosive Arrow | `explosive_arrow.png` | `entity/projectiles/explosive_arrow.png` |
| Bronze Arrow | `bronze_arrow.png` | `entity/projectiles/bronze_arrow.png` |
| Tin Arrow | `tin_arrow.png` | `entity/projectiles/tin_arrow.png` |
| Steel Arrow | `steel_arrow.png` | `entity/projectiles/steel_arrow.png` |
| Silver Arrow | `silver_arrow.png` | `entity/projectiles/silver_arrow.png` |
| Electrum Arrow | `electrum_arrow.png` | `entity/projectiles/electrum_arrow.png` |
| Lead Arrow | `lead_arrow.png` | `entity/projectiles/lead_arrow.png` |
| Nickel Arrow | `nickel_arrow.png` | `entity/projectiles/nickel_arrow.png` |
| Invar Arrow | `invar_arrow.png` | `entity/projectiles/invar_arrow.png` |
| Platinum Arrow | `platinum_arrow.png` | `entity/projectiles/platinum_arrow.png` |

### Tipped Arrows

Tipped arrows use layered textures:

| Texture Layer | File Name |
|:--------------|:----------|
| Arrow Head Tint | `tipped_arrow_head.png` |
| Wooden Arrow Base | `tipped_wooden_arrow_base.png` |
| Copper Arrow Base | `tipped_copper_arrow_base.png` |
| Iron Arrow Base | `tipped_iron_arrow_base.png` |
| Diamond Arrow Base | `tipped_diamond_arrow_base.png` |
| Netherite Arrow Base | `tipped_netherite_arrow_base.png` |

### Bolts

| Item | Item Texture | Entity Texture |
|:-----|:-------------|:--------------|
| Bolt | `bolt.png` | `entity/projectiles/bolt.png` |
| Copper Bolt | `copper_bolt.png` | `entity/projectiles/copper_bolt.png` |
| Diamond Bolt | `diamond_bolt.png` | `entity/projectiles/diamond_bolt.png` |
| Netherite Bolt | `netherite_bolt.png` | `entity/projectiles/netherite_bolt.png` |
| Spectral Bolt | `spectral_bolt.png` | `entity/projectiles/spectral_bolt.png` |

### Tipped Bolts

| Texture Layer | File Name |
|:--------------|:----------|
| Bolt Head Tint | `tipped_bolt_head.png` |
| Bolt Base | `tipped_bolt_base.png` |
| Copper Bolt Base | `tipped_copper_bolt_base.png` |
| Diamond Bolt Base | `tipped_diamond_bolt_base.png` |
| Netherite Bolt Base | `tipped_netherite_bolt_base.png` |

---

## 🎒 Quiver Textures

Quivers have multiple sizes and fill states, requiring multiple texture files:

### Item Textures (textures/item/)

| Size | Base Texture | Fill State Textures | Brace Texture |
|:-----|:------------|:--------------------|:--------------|
| Small | `small_arrow_quiver_base.png` | `small_arrow_quiver_1/2/3.png` | - |
| Medium | `medium_arrow_quiver_base.png` | `medium_arrow_quiver_1/2/3.png` | `medium_quiver_brace.png` |
| Large | `large_arrow_quiver_base.png` | `large_arrow_quiver_1/2/3/4/5.png` | `large_quiver_brace.png` |
| Huge | `huge_arrow_quiver_base.png` | `huge_arrow_quiver_1/2/3/4/5.png` | `huge_quiver_brace.png` |

> 📝 **Note**: Bolt quivers (`bolt_quiver`) use the same naming pattern, just replace `arrow` with `bolt`.

### 3D Model Textures (textures/model/)

Quiver 3D models (back decorations) use the following textures:

```
textures/model/quiver_arrow_small.png
textures/model/quiver_arrow_medium.png
textures/model/quiver_arrow_large.png
textures/model/quiver_arrow_huge.png
textures/model/quiver_bolt_small.png
textures/model/quiver_bolt_medium.png
textures/model/quiver_bolt_large.png
textures/model/quiver_bolt_huge.png
```

### GUI Textures

```
textures/gui/quiver_small.png   # Small quiver GUI background
textures/gui/quiver_medium.png  # Medium quiver GUI background
textures/gui/quiver_large.png   # Large quiver GUI background
textures/gui/quiver_huge.png    # Huge quiver GUI background
textures/gui/tooltip/quiver.png # Quiver tooltip background
```

### Recipe Slot Icons (textures/slots/)

These textures are used for empty slot hints in recipe interfaces:

```
empty_arrow_slot.png
empty_bolt_slot.png
empty_small_arrow_quiver_slot.png
empty_small_bolt_quiver_slot.png
empty_medium_arrow_quiver_slot.png
empty_medium_bolt_quiver_slot.png
empty_medium_quiver_brace_slot.png
empty_large_arrow_quiver_slot.png
empty_large_bolt_quiver_slot.png
empty_large_quiver_brace_slot.png
```

---

## 💀 Skull Textures

The mod adds various mob skulls, with textures located in `textures/entity/skull/`:

| Skull | Texture File |
|:------|:------------|
| Drowned Head | `drowned_head.png` |
| Enderman Head | `enderman_head.png` |
| Stray Skull | `stray_skull.png` |

> 📝 **Note**: Other skulls (Blaze, Spider, Cave Spider, Husk, Witch, Illager, Zombie Piglin) use vanilla textures or other sources.

---

## 🎨 GUI and HUD Textures

### Crosshairs

```
textures/gui/crosshairs.png
```

This is a sprite sheet containing custom crosshairs for throwing weapons and heavy crossbows.

### Status Effect Icons

```
textures/mob_effect/ender_disruption.png  # Ender Disruption effect icon
```

---

## ✨ Particle Effects

### Particle Definition Files (particles/)

```json
// particles/damage_boosted.json
{ 
  "textures": ["spartan_weaponry_unofficial:damage_boosted"]
}

// particles/damage_reduced.json
{ 
  "textures": ["spartan_weaponry_unofficial:damage_reduced"]
}

// particles/oil_damage_boosted.json
{ 
  "textures": ["spartan_weaponry_unofficial:damage_boosted"]
}
```

### Particle Textures (textures/particle/)

```
damage_boosted.png   # Damage boost particle
damage_reduced.png   # Damage reduction particle
```

---

## 🔊 Sounds

The mod uses the following sound events, which you can replace via resource pack:

| Sound Event ID | Description | Default Sound Source |
|:---------------|:------------|:--------------------|
| `boomerang_bounce` | Boomerang bounce | `entity/player/attack/weak*` |
| `boomerang_fly` | Boomerang flying | `random/bow` |
| `boomerang_hit_ground` | Boomerang ground impact | `item/trident/ground_impact*` |
| `boomerang_hit_mob` | Boomerang hits mob | `item/trident/pierce*` |
| `boomerang_throw` | Boomerang throw | `item/trident/throw*` |
| `javelin_hit_ground` | Javelin ground impact | `item/trident/ground_impact*` |
| `javelin_hit_mob` | Javelin hits mob | `item/trident/pierce*` |
| `javelin_throw` | Javelin throw | `item/trident/throw*` |
| `throwing_knife_hit_ground` | Throwing knife ground impact | `item/trident/ground_impact*` |
| `throwing_knife_hit_mob` | Throwing knife hits mob | `item/trident/pierce*` |
| `throwing_knife_throw` | Throwing knife throw | `item/trident/throw*` |
| `tomahawk_hit_ground` | Tomahawk ground impact | `item/trident/ground_impact*` |
| `tomahawk_hit_mob` | Tomahawk hits mob | `item/trident/pierce*` |
| `tomahawk_throw` | Tomahawk throw | `item/trident/throw*` |
| `throwing_weapon_hit_ground` | Generic throwing weapon ground | `item/trident/ground_impact*` |
| `throwing_weapon_hit_mob` | Generic throwing weapon hit | `item/trident/pierce*` |
| `throwing_weapon_throw` | Generic throwing weapon throw | `item/trident/throw*` |
| `throwing_weapon_loyalty_return` | Loyalty return sound | `item/trident/return*` |
| `hammer_slams_into_ground` | Hammer slams ground | `random/explode*` |
| `oil_applied` | Oil applied sound | `block/brewing_stand/brew*` |

### Custom Sound Example

```json
// assets/spartan_weaponry_unofficial/sounds.json
{
  "boomerang_throw": {
    "sounds": [
      "spartan_weaponry_unofficial:custom/boomerang_throw"
    ],
    "subtitle": "subtitle.spartan_weaponry_unofficial.boomerang_throw"
  }
}
```

Sound files should be placed at:
```
assets/spartan_weaponry_unofficial/sounds/custom/boomerang_throw.ogg
```

---

## 📐 Model System

### Base Models (models/item/base/)

The mod defines a set of base models that all specific weapon models inherit from:

| Base Model | Usage | Special Display Transforms |
|:-----------|:------|:--------------------------|
| `longsword.json` | One-handed sword weapons | Extended third-person grip |
| `greatsword.json` | Two-handed sword weapons | Larger display scale |
| `battle_hammer.json` | Hammer weapons | Special grip angle |
| `halberd.json` | Polearm weapons | Extended third-person display |
| `longbow.json` | Bow weapons | Bow drawing pose |
| `heavy_crossbow.json` | Crossbow weapons | Crossbow loading/aiming pose |
| `throwing_knife.json` | Throwing weapons | Throwing pose transforms |

### Model Overrides (Item Properties)

The mod uses custom item properties to control model changes:

| Property ID | Usage | Values |
|:------------|:------|:-------|
| `spartan_weaponry_unofficial:blocking` | Blocking state | 0.0 / 1.0 |
| `spartan_weaponry_unofficial:throwing` | Throwing charge state | 0.0 / 1.0 |
| `spartan_weaponry_unofficial:pulling` | Drawing/loading state | 0.0 / 1.0 |
| `spartan_weaponry_unofficial:pull` | Drawing/loading progress | 0.0 ~ 1.0 |
| `spartan_weaponry_unofficial:charged` | Crossbow loaded | 0.0 / 1.0 |
| `spartan_weaponry_unofficial:empty` | Throwing weapon depleted | 0.0 / 1.0 |
| `spartan_weaponry_unofficial:arrow` | Quiver fill level | 0 ~ 5 |

### Complete Model Example

Here's a complete model file example for a longsword:

```json
// models/item/iron_longsword.json
{
  "parent": "spartan_weaponry_unofficial:item/base/longsword",
  "loader": "spartan_weaponry_unofficial:oil_coated_item",
  "overrides": [
    {
      "model": "spartan_weaponry_unofficial:item/iron_longsword_blocking",
      "predicate": {
        "spartan_weaponry_unofficial:blocking": 1.0
      }
    },
    {
      "model": "spartan_weaponry_unofficial:item/iron_longsword_throwing",
      "predicate": {
        "spartan_weaponry_unofficial:throwing": 1.0
      }
    }
  ],
  "textures": {
    "coating": "spartan_weaponry_unofficial:item/coating/longsword",
    "layer0": "spartan_weaponry_unofficial:item/iron_longsword"
  }
}
```

---

## 🌐 Language Files

The mod supports the following languages:

| Language | File Name |
|:---------|:----------|
| English (US) | `en_us.json` |
| Simplified Chinese | `zh_cn.json` |
| Español (España) | `es_es.json` |
| Español (México) | `es_mx.json` |
| Français | `fr_fr.json` |
| Português (Brasil) | `pt_br.json` |
| Русский | `ru_ru.json` |

### Translation Key Format

```json
{
  // Item names
  "item.spartan_weaponry_unofficial.{material}_{weapon_type}": "Weapon Name",
  
  // Strengthened weapons
  "item.spartan_weaponry_unofficial.longbow_{material}_strengthened": "Material-Strengthened Longbow",
  "item.spartan_weaponry_unofficial.heavy_crossbow_{material}_strengthened": "Material-Strengthened Heavy Crossbow",
  
  // Custom material items (using %s placeholder)
  "item.spartan_weaponry_unofficial.custom_{weapon_type}": "%s Weapon Name",
  
  // Sound subtitles
  "subtitle.spartan_weaponry_unofficial.{sound_event}": "Subtitle Text",
  
  // Weapon traits
  "trait.spartan_weaponry_unofficial.{trait_name}": "Trait Display Name",
  "trait.spartan_weaponry_unofficial.{trait_name}.desc": "Trait Description",
  
  // Status effects
  "effect.spartan_weaponry_unofficial.{effect_name}": "Effect Name",
  
  // Creative mode item groups
  "itemGroup.spartan_weaponry_unofficial.basic": "Spartan Weaponry: Vanilla Materials",
  "itemGroup.spartan_weaponry_unofficial.modded": "Spartan Weaponry: Modded Materials",
  "itemGroup.spartan_weaponry_unofficial.arrows_bolts": "Spartan Weaponry: Arrows & Bolts"
}
```

---

## 📦 Resource Pack Example Structure

Here's an example resource pack structure for replacing iron weapon textures:

```
MyResourcePack/
├── pack.mcmeta
└── assets/
    └── spartan_weaponry_unofficial/
        └── textures/
            └── item/
                ├── iron_longsword.png
                ├── iron_dagger.png
                ├── iron_battle_hammer.png
                ├── iron_longbow_standby.png
                ├── iron_longbow_pulling_0.png
                ├── iron_longbow_pulling_1.png
                ├── iron_longbow_pulling_2.png
                └── coating/
                    └── longsword.png
```

### pack.mcmeta

```json
{
  "pack": {
    "pack_format": 34,
    "description": "Spartan Weaponry Custom Textures"
  }
}
```

> 📝 **pack_format** version reference:
> - Minecraft 1.21.x: `pack_format: 34`
> - Minecraft 1.20.x: `pack_format: 15-22`

---

## 💡 Tips and Tricks

### 1. Texture Dimensions

- Most weapon textures are **16x16** or **32x32** pixels
- Polearm weapons (halberds, pikes, etc.) typically use **16x32** or larger textures
- Bow and crossbow textures are typically **16x16**

### 2. Oil Coating Overlays

Oil coating overlay textures should be semi-transparent, covering only the blade area of the weapon.

### 3. Animated Textures

If you want to add animated effects to weapons, you can create `.mcmeta` files:

```json
// iron_longsword.png.mcmeta
{
  "animation": {
    "frametime": 4
  }
}
```

### 4. Model Modifications

If you're only replacing textures, you don't need to modify model files. Models will automatically use your provided textures.

### 5. Entity Textures

Projectile entity textures (arrows, bolts) are located in `textures/entity/projectiles/`, separate from item textures.

---

## 📚 Appendix: Complete Texture Checklist

### Weapon Texture Count Statistics

| Weapon Type | Textures per Material | Notes |
|:------------|:---------------------|:------|
| Melee weapons (18 types) | 1 | Single texture |
| Throwing weapons (4 types) | 1 + 1 universal empty | Main + empty state |
| Longbow | 4 | standby + pulling_0/1/2 |
| Heavy Crossbow | 5 | standby + pulling_0/1/2 + loaded |

### Material × Weapon Combination Total

- Vanilla materials (8 types) × Weapon types ≈ 200+ texture files
- Modded materials (11 types) × Weapon types ≈ 275+ texture files
- **Total approximately 500+ weapon texture files**

---

*Document Version: 1.0.2 | Updated 2026-02-07 | For Spartan Weaponry Unofficial for NeoForge 1.21.1*
