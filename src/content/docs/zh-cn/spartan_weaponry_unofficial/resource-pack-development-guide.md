---
title: Spartan Weaponry Unofficial 资源包开发指南
description: 为资源包作者提供的完整纹理、模型和音效替换指南
---

# Spartan Weaponry Unofficial 资源包开发指南

本文档为资源包作者提供了 `Spartan Weaponry Unofficial` 模组的资源结构详解，帮助您创建自定义纹理、模型或音效。


## 📁 资源目录结构概览

> ⚠️ **重要变更**: 从 1.0.2 版本开始，资源路径使用 `spartan_weaponry_unofficial` (下划线)。

```
assets/spartan_weaponry_unofficial/
├── blockstates/          # 方块状态 (头颅类)
├── lang/                 # 语言文件
├── models/
│   └── item/
│       └── base/         # 基础模型模板
├── particles/            # 粒子效果定义
├── sounds.json           # 音效注册
└── textures/
    ├── entity/           # 实体纹理
    │   ├── projectiles/  # 投射物纹理
    │   └── skull/        # 头颅纹理
    ├── gui/              # GUI 纹理
    │   └── tooltip/      # 提示框纹理
    ├── item/             # 物品纹理
    │   └── coating/      # 涂油覆盖层纹理
    ├── mob_effect/       # 状态效果图标
    ├── model/            # 3D 模型纹理 (箭袋)
    ├── particle/         # 粒子纹理
    └── slots/            # 配方槽位图标
```

---

## 🗡️ 武器纹理

### 支持的材质类型

模组内置以下材质，每种材质都有完整的武器套件：

| 材质分类 | 材质名称 | 纹理前缀 |
|:---------|:---------|:---------|
| **原版材质** | 木质 | `wooden_` |
| | 石质 | `stone_` |
| | 铜质 | `copper_` |
| | 铁质 | `iron_` |
| | 金质 | `golden_` |
| | 钻石 | `diamond_` |
| | 下界合金 | `netherite_` |
| | 皮革 (仅弓弩) | `leather_` |
| **模组材质** | 锡 | `tin_` |
| | 青铜 | `bronze_` |
| | 钢 | `steel_` |
| | 银 | `silver_` |
| | 琥珀金 | `electrum_` |
| | 铅 | `lead_` |
| | 镍 | `nickel_` |
| | 殷钢 | `invar_` |
| | 康铜 | `constantan_` |
| | 铂金 | `platinum_` |
| | 铝 | `aluminum_` |

### 武器类型与纹理文件

#### 近战武器 (单纹理)

以下武器类型只需要一个纹理文件：

| 武器类型 | 中文名 | 纹理文件名格式 |
|:---------|:-------|:---------------|
| `dagger` | 匕首 | `{材质}_dagger.png` |
| `parrying_dagger` | 格挡匕首 | `{材质}_parrying_dagger.png` |
| `longsword` | 长剑 | `{材质}_longsword.png` |
| `katana` | 太刀 | `{材质}_katana.png` |
| `saber` | 军刀 | `{材质}_saber.png` |
| `rapier` | 迅捷剑 | `{材质}_rapier.png` |
| `greatsword` | 巨剑 | `{材质}_greatsword.png` |
| `battle_hammer` | 战锤 | `{材质}_battle_hammer.png` |
| `warhammer` | 大锤 | `{材质}_warhammer.png` |
| `spear` | 矛 | `{材质}_spear.png` |
| `halberd` | 戟 | `{材质}_halberd.png` |
| `pike` | 长矛 | `{材质}_pike.png` |
| `lance` | 骑枪 | `{材质}_lance.png` |
| `battleaxe` | 战斧 | `{材质}_battleaxe.png` |
| `flanged_mace` | 钉头锤 | `{材质}_flanged_mace.png` |
| `glaive` | 关刀 | `{材质}_glaive.png` |
| `quarterstaff` | 铁头棒 | `{材质}_quarterstaff.png` |
| `scythe` | 镰刀 | `{材质}_scythe.png` |

**示例路径：**
```
assets/spartan_weaponry_unofficial/textures/item/iron_longsword.png
assets/spartan_weaponry_unofficial/textures/item/diamond_battle_hammer.png
```

#### 投掷武器 (单纹理 + 空状态)

投掷武器除了主纹理外，还有一个通用的"空"状态纹理：

| 武器类型 | 中文名 | 主纹理 | 空状态纹理 (通用) |
|:---------|:-------|:-------|:------------------|
| `throwing_knife` | 飞刀 | `{材质}_throwing_knife.png` | `empty_throwing_knife.png` |
| `tomahawk` | 飞斧 | `{材质}_tomahawk.png` | `empty_tomahawk.png` |
| `javelin` | 标枪 | `{材质}_javelin.png` | `empty_javelin.png` |
| `boomerang` | 回旋镖 | `{材质}_boomerang.png` | `empty_boomerang.png` |

#### 长弓 (4 纹理)

长弓需要 4 个纹理文件来表示不同的拉弓阶段：

| 状态 | 文件名格式 |
|:-----|:-----------|
| 待机 | `{材质}_longbow_standby.png` |
| 拉弓 0 | `{材质}_longbow_pulling_0.png` |
| 拉弓 1 | `{材质}_longbow_pulling_1.png` |
| 拉弓 2 | `{材质}_longbow_pulling_2.png` |

> 📝 **注意**: 长弓的注册名包含 `_strengthened` 后缀（如 `longbow_iron_strengthened`），但纹理文件名不包含此后缀。

**示例：**
```
assets/spartan_weaponry_unofficial/textures/item/iron_longbow_standby.png
assets/spartan_weaponry_unofficial/textures/item/iron_longbow_pulling_0.png
assets/spartan_weaponry_unofficial/textures/item/iron_longbow_pulling_1.png
assets/spartan_weaponry_unofficial/textures/item/iron_longbow_pulling_2.png
```

#### 重型弩 (5 纹理)

重型弩需要 5 个纹理文件：

| 状态 | 文件名格式 |
|:-----|:-----------|
| 待机 | `{材质}_heavy_crossbow_standby.png` |
| 上弦 0 | `{材质}_heavy_crossbow_pulling_0.png` |
| 上弦 1 | `{材质}_heavy_crossbow_pulling_1.png` |
| 上弦 2 | `{材质}_heavy_crossbow_pulling_2.png` |
| 已装填 | `{材质}_heavy_crossbow_loaded.png` |

> 📝 **注意**: 重型弩的注册名包含 `_strengthened` 后缀（如 `heavy_crossbow_iron_strengthened`），但纹理文件名不包含此后缀。

---

## 🎯 涂油覆盖层纹理

武器涂油后会显示一个覆盖层纹理。这些纹理位于 `textures/item/coating/` 目录：

| 武器类型 | 覆盖层文件 |
|:---------|:-----------|
| 匕首 | `coating/dagger.png` |
| 格挡匕首 | `coating/parrying_dagger.png` |
| 长剑 | `coating/longsword.png` |
| 太刀 | `coating/katana.png` |
| 军刀 | `coating/saber.png` |
| 迅捷剑 | `coating/rapier.png` |
| 巨剑 | `coating/greatsword.png` |
| 战锤 | `coating/battle_hammer.png` |
| 大锤 | `coating/warhammer.png` |
| 矛 | `coating/spear.png` |
| 戟 | `coating/halberd.png` |
| 长矛 | `coating/pike.png` |
| 骑枪 | `coating/lance.png` |
| 战斧 | `coating/battleaxe.png` |
| 钉头锤 | `coating/flanged_mace.png` |
| 关刀 | `coating/glaive.png` |
| 铁头棒 | `coating/quarterstaff.png` |
| 镰刀 | `coating/scythe.png` |
| 拳套 | `coating/cestus.png` |
| 木棍 | `coating/club.png` |
| 原版剑 | `coating/vanilla_sword.png` |

> 💡 **提示**：覆盖层纹理使用模型的自定义加载器 `spartanweaponryunofficial:oil_coated_item` 来渲染。

---

## 🏹 弹药纹理

### 箭矢

| 物品 | 物品纹理 | 实体纹理 |
|:-----|:---------|:---------|
| 木箭 | `wooden_arrow.png` | `entity/projectiles/wooden_arrow.png` |
| 铜箭 | `copper_arrow.png` | `entity/projectiles/copper_arrow.png` |
| 铁箭 | `iron_arrow.png` | `entity/projectiles/iron_arrow.png` |
| 钻石箭 | `diamond_arrow.png` | `entity/projectiles/diamond_arrow.png` |
| 下界合金箭 | `netherite_arrow.png` | `entity/projectiles/netherite_arrow.png` |
| 爆炸箭 | `explosive_arrow.png` | `entity/projectiles/explosive_arrow.png` |
| 青铜箭 | `bronze_arrow.png` | `entity/projectiles/bronze_arrow.png` |
| 锡箭 | `tin_arrow.png` | `entity/projectiles/tin_arrow.png` |
| 钢箭 | `steel_arrow.png` | `entity/projectiles/steel_arrow.png` |
| 银箭 | `silver_arrow.png` | `entity/projectiles/silver_arrow.png` |
| 琥珀金箭 | `electrum_arrow.png` | `entity/projectiles/electrum_arrow.png` |
| 铅箭 | `lead_arrow.png` | `entity/projectiles/lead_arrow.png` |
| 镍箭 | `nickel_arrow.png` | `entity/projectiles/nickel_arrow.png` |
| 殷钢箭 | `invar_arrow.png` | `entity/projectiles/invar_arrow.png` |
| 铂金箭 | `platinum_arrow.png` | `entity/projectiles/platinum_arrow.png` |

### 药水箭 (Tipped Arrows)

药水箭使用分层纹理：

| 纹理层 | 文件名 |
|:-------|:-------|
| 箭头着色层 | `tipped_arrow_head.png` |
| 木箭基底 | `tipped_wooden_arrow_base.png` |
| 铜箭基底 | `tipped_copper_arrow_base.png` |
| 铁箭基底 | `tipped_iron_arrow_base.png` |
| 钻石箭基底 | `tipped_diamond_arrow_base.png` |
| 下界合金箭基底 | `tipped_netherite_arrow_base.png` |

### 弩矢

| 物品 | 物品纹理 | 实体纹理 |
|:-----|:---------|:---------|
| 弩矢 | `bolt.png` | `entity/projectiles/bolt.png` |
| 铜弩矢 | `copper_bolt.png` | `entity/projectiles/copper_bolt.png` |
| 钻石弩矢 | `diamond_bolt.png` | `entity/projectiles/diamond_bolt.png` |
| 下界合金弩矢 | `netherite_bolt.png` | `entity/projectiles/netherite_bolt.png` |
| 光灵弩矢 | `spectral_bolt.png` | `entity/projectiles/spectral_bolt.png` |

### 药水弩矢 (Tipped Bolts)

| 纹理层 | 文件名 |
|:-------|:-------|
| 弩矢头着色层 | `tipped_bolt_head.png` |
| 弩矢基底 | `tipped_bolt_base.png` |
| 铜弩矢基底 | `tipped_copper_bolt_base.png` |
| 钻石弩矢基底 | `tipped_diamond_bolt_base.png` |
| 下界合金弩矢基底 | `tipped_netherite_bolt_base.png` |

---

## 🎒 箭袋纹理

箭袋有多个尺寸和填充状态，需要多个纹理文件：

### 物品纹理 (textures/item/)

| 尺寸 | 基础纹理 | 填充状态纹理 | 支架纹理 |
|:-----|:---------|:-------------|:---------|
| 小 | `small_arrow_quiver_base.png` | `small_arrow_quiver_1/2/3.png` | - |
| 中 | `medium_arrow_quiver_base.png` | `medium_arrow_quiver_1/2/3.png` | `medium_quiver_brace.png` |
| 大 | `large_arrow_quiver_base.png` | `large_arrow_quiver_1/2/3/4/5.png` | `large_quiver_brace.png` |
| 巨大 | `huge_arrow_quiver_base.png` | `huge_arrow_quiver_1/2/3/4/5.png` | `huge_quiver_brace.png` |

> 📝 **注意**：弩矢箭袋 (`bolt_quiver`) 使用相同的命名模式，只需将 `arrow` 替换为 `bolt`。

### 3D 模型纹理 (textures/model/)

箭袋的 3D 模型（背部装饰）使用以下纹理：

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

### GUI 纹理

```
textures/gui/quiver_small.png   # 小箭袋 GUI 背景
textures/gui/quiver_medium.png  # 中箭袋 GUI 背景
textures/gui/quiver_large.png   # 大箭袋 GUI 背景
textures/gui/quiver_huge.png    # 巨大箭袋 GUI 背景
textures/gui/tooltip/quiver.png # 箭袋提示框背景
```

### 配方槽位图标 (textures/slots/)

这些纹理用于配方界面的空槽位提示：

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

## 💀 头颅纹理

模组添加了多种怪物头颅，纹理位于 `textures/entity/skull/`：

| 头颅 | 纹理文件 |
|:-----|:---------|
| 溺尸头 | `drowned_head.png` |
| 末影人头 | `enderman_head.png` |
| 流浪者头骨 | `stray_skull.png` |

> 📝 **注意**：其他头颅（烈焰人、蜘蛛、洞穴蜘蛛、尸壳、女巫、灾厄村民、僵尸猪灵）使用原版纹理或其他来源。

---

## 🎨 GUI 与 HUD 纹理

### 准星 (Crosshairs)

```
textures/gui/crosshairs.png
```

这是一个精灵图（Sprite Sheet），包含投掷武器和重型弩的自定义准星。

### 状态效果图标

```
textures/mob_effect/ender_disruption.png  # 末影扰乱效果图标
```

---

## ✨ 粒子效果

### 粒子定义文件 (particles/)

```json
// particles/damage_boosted.json
{ 
  "textures": ["spartanweaponryunofficial:damage_boosted"]
}

// particles/damage_reduced.json
{ 
  "textures": ["spartanweaponryunofficial:damage_reduced"]
}

// particles/oil_damage_boosted.json
{ 
  "textures": ["spartanweaponryunofficial:damage_boosted"]
}
```

### 粒子纹理 (textures/particle/)

```
damage_boosted.png   # 伤害增益粒子
damage_reduced.png   # 伤害减免粒子
```

---

## 🔊 音效

模组使用以下音效事件，您可以通过资源包替换：

| 音效事件 ID | 描述 | 默认音效来源 |
|:------------|:-----|:-------------|
| `boomerang_bounce` | 回旋镖反弹 | `entity/player/attack/weak*` |
| `boomerang_fly` | 回旋镖飞行 | `random/bow` |
| `boomerang_hit_ground` | 回旋镖落地 | `item/trident/ground_impact*` |
| `boomerang_hit_mob` | 回旋镖击中生物 | `item/trident/pierce*` |
| `boomerang_throw` | 回旋镖投掷 | `item/trident/throw*` |
| `javelin_hit_ground` | 标枪落地 | `item/trident/ground_impact*` |
| `javelin_hit_mob` | 标枪击中生物 | `item/trident/pierce*` |
| `javelin_throw` | 标枪投掷 | `item/trident/throw*` |
| `throwing_knife_hit_ground` | 飞刀落地 | `item/trident/ground_impact*` |
| `throwing_knife_hit_mob` | 飞刀击中生物 | `item/trident/pierce*` |
| `throwing_knife_throw` | 飞刀投掷 | `item/trident/throw*` |
| `tomahawk_hit_ground` | 飞斧落地 | `item/trident/ground_impact*` |
| `tomahawk_hit_mob` | 飞斧击中生物 | `item/trident/pierce*` |
| `tomahawk_throw` | 飞斧投掷 | `item/trident/throw*` |
| `throwing_weapon_hit_ground` | 通用投掷武器落地 | `item/trident/ground_impact*` |
| `throwing_weapon_hit_mob` | 通用投掷武器击中 | `item/trident/pierce*` |
| `throwing_weapon_throw` | 通用投掷武器投掷 | `item/trident/throw*` |
| `throwing_weapon_loyalty_return` | 忠诚返回音效 | `item/trident/return*` |
| `hammer_slams_into_ground` | 战锤砸地 | `random/explode*` |
| `oil_applied` | 涂油音效 | `block/brewing_stand/brew*` |

### 自定义音效示例

```json
// assets/spartanweaponryunofficial/sounds.json
{
  "boomerang_throw": {
    "sounds": [
      "spartanweaponryunofficial:custom/boomerang_throw"
    ],
    "subtitle": "subtitle.spartanweaponryunofficial.boomerang_throw"
  }
}
```

音效文件放置于：
```
assets/spartanweaponryunofficial/sounds/custom/boomerang_throw.ogg
```

---

## 📐 模型系统

### 基础模型 (models/item/base/)

模组定义了一套基础模型，所有具体武器模型都继承自这些基础模型：

| 基础模型 | 用途 | 特殊显示变换 |
|:---------|:-----|:-------------|
| `longsword.json` | 单手剑类武器 | 加长的第三人称握持 |
| `greatsword.json` | 双手剑类武器 | 更大的显示比例 |
| `battle_hammer.json` | 锤类武器 | 特殊的握持角度 |
| `halberd.json` | 长柄武器 | 延长的第三人称显示 |
| `longbow.json` | 弓类武器 | 弓的拉弓姿势 |
| `heavy_crossbow.json` | 弩类武器 | 弩的装填/瞄准姿势 |
| `throwing_knife.json` | 投掷武器 | 投掷姿势变换 |

### 模型 Overrides (物品属性)

模组使用自定义物品属性来控制模型变化：

| 属性 ID | 用途 | 取值 |
|:--------|:-----|:-----|
| `spartan_weaponry_unofficial:blocking` | 格挡状态 | 0.0 / 1.0 |
| `spartan_weaponry_unofficial:throwing` | 投掷蓄力状态 | 0.0 / 1.0 |
| `spartan_weaponry_unofficial:pulling` | 拉弓/上弦状态 | 0.0 / 1.0 |
| `spartan_weaponry_unofficial:pull` | 拉弓/上弦进度 | 0.0 ~ 1.0 |
| `spartan_weaponry_unofficial:charged` | 弩已装填 | 0.0 / 1.0 |
| `spartan_weaponry_unofficial:empty` | 投掷武器耗尽 | 0.0 / 1.0 |
| `spartan_weaponry_unofficial:arrow` | 箭袋填充等级 | 0 ~ 5 |

### 完整模型示例

以下是一个长剑的完整模型文件示例：

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

## 🌐 语言文件

模组支持以下语言：

| 语言 | 文件名 |
|:-----|:-------|
| English (US) | `en_us.json` |
| 简体中文 | `zh_cn.json` |
| Español (España) | `es_es.json` |
| Español (México) | `es_mx.json` |
| Français | `fr_fr.json` |
| Português (Brasil) | `pt_br.json` |
| Русский | `ru_ru.json` |

### 翻译键格式

```json
{
  // 物品名
  "item.spartan_weaponry_unofficial.{武器类型}_{材质}": "武器名称",
  
  // 强化武器 (长弓/重型弩)
  "item.spartan_weaponry_unofficial.longbow_{材质}_strengthened": "强化长弓名称",
  "item.spartan_weaponry_unofficial.heavy_crossbow_{材质}_strengthened": "强化重型弩名称",
  
  // 自定义材质物品 (使用 %s 占位符)
  "item.spartan_weaponry_unofficial.custom_{武器类型}": "%s 武器名称",
  
  // 音效字幕
  "subtitle.spartan_weaponry_unofficial.{音效事件}": "字幕文本",
  
  // 武器特性
  "trait.spartan_weaponry_unofficial.{特性名}": "特性显示名",
  "trait.spartan_weaponry_unofficial.{特性名}.desc": "特性描述",
  
  // 状态效果
  "effect.spartan_weaponry_unofficial.{效果名}": "效果名称",
  
  // 创造模式物品组
  "itemGroup.spartan_weaponry_unofficial.basic": "Spartan Weaponry: 原版材质",
  "itemGroup.spartan_weaponry_unofficial.modded": "Spartan Weaponry: 模组材质",
  "itemGroup.spartan_weaponry_unofficial.arrows_bolts": "Spartan Weaponry: 箭矢与弩矢"
}
```

---

## 📦 资源包示例结构

以下是一个替换铁质武器纹理的资源包结构示例：

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
    "description": "Spartan Weaponry 自定义纹理包"
  }
}
```

> 📝 **pack_format** 版本对照：
> - Minecraft 1.21.x: `pack_format: 34`
> - Minecraft 1.20.x: `pack_format: 15-22`

---

## 💡 提示与技巧

### 1. 纹理尺寸

- 大多数武器纹理为 **16x16** 或 **32x32** 像素
- 长柄武器（戟、长矛等）通常使用 **16x32** 或更大的纹理
- 弓和弩纹理通常为 **16x16**

### 2. 涂油覆盖层

涂油覆盖层纹理应该是半透明的，只覆盖武器的刃部区域。

### 3. 动画纹理

如果您想为武器添加动画效果，可以创建 `.mcmeta` 文件：

```json
// iron_longsword.png.mcmeta
{
  "animation": {
    "frametime": 4
  }
}
```

### 4. 模型修改

如果只是替换纹理，不需要修改模型文件。模型文件会自动使用您提供的纹理。

### 5. 实体纹理

投射物实体纹理（箭矢、弩矢）位于 `textures/entity/projectiles/`，与物品纹理分开。

---

## 📚 附录：完整纹理清单

### 武器纹理数量统计

| 武器类型 | 每种材质所需纹理数 | 说明 |
|:---------|:-------------------|:-----|
| 近战武器 (18种) | 1 | 单纹理 |
| 投掷武器 (4种) | 1 + 1通用空状态 | 主纹理 + 空状态 |
| 长弓 | 4 | standby + pulling_0/1/2 |
| 重型弩 | 5 | standby + pulling_0/1/2 + loaded |

### 材质 × 武器组合总数

- 原版材质 (8种) × 武器类型 ≈ 200+ 个纹理文件
- 模组材质 (11种) × 武器类型 ≈ 275+ 个纹理文件
- **总计约 500+ 个武器纹理文件**

---

*文档版本: 1.0.2 | 适用于 Spartan Weaponry Unofficial for NeoForge 1.21.1*  
*更新日期: 2026-02-07*
