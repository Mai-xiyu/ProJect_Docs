---
title: Spartan Weaponry Unofficial API 参考
description: Spartan Weaponry Unofficial 模组的详细 API 文档与示例代码。
---

# Spartan Weaponry Unofficial API 参考

本文档提供了 `Spartan Weaponry Unofficial` 模组的 API 开发指南。开发者可以使用此 API 为从其他模组添加的材质注册新的斯巴达武器。

## 📦 依赖配置 (Gradle)

首先，您需要在 `build.gradle` 中添加 Spartan Weaponry Unofficial 作为依赖项。

```groovy
repositories {
    maven {
        url "https://cursemaven.com"
        content {
            includeGroup "curse.maven"
        }
    }
}

dependencies {
    // 替换 xxxxx 为具体的 Project ID 和 File ID
    // 示例: implementation fg.deobf("curse.maven:spartan-weaponry-unofficial-12345:67890")
    // 注意: Mod ID 使用下划线 spartan_weaponry_unofficial
    implementation fg.deobf("curse.maven:spartan-weaponry-unofficial-xxxxx:yyyyy")
}
```

## 🚀 快速入门

主要的 API 入口点是 `org.xiyu.spartan_weaponry_unofficial.api.SpartanWeaponryAPI` 类。

> ⚠️ **重要变更**: 从 1.0.2 版本开始，Mod ID 已更改为 `spartan_weaponry_unofficial`。

### 1. 定义武器材质

您可以直接使用预定义的材质，或者创建自定义材质。

#### 使用预定义材质
```java
import org.xiyu.spartan_weaponry_unofficial.api.WeaponMaterial;

// 预定义材质: WOOL, STONE, IRON, GOLD, DIAMOND, NETHERITE 等
WeaponMaterial material = WeaponMaterial.IRON;
```

#### 创建自定义材质
```java
import org.xiyu.spartan_weaponry_unofficial.api.WeaponMaterial;
import org.xiyu.spartan_weaponry_unofficial.api.SpartanWeaponryAPI;
import net.minecraft.world.item.Tiers;

// 使用 Vanilla Tier 创建
WeaponMaterial myMaterial = new WeaponMaterial(
    "my_material",          // 材质名称 (用于注册名，如 dagger_my_material)
    "mydepmod",             // 您的模组 ID
    Tiers.DIAMOND,          // 基础 Tier 属性
    ModItemTags.MY_INGOT,   // 修复物品 Tag
    ModWeaponTraitTags.MY_TRAIT // 特性 Tag (可选)
);
```

### 2. 注册武器

建议使用 NeoForge/Forge 的 `DeferredRegister` 来注册物品。

```java
import net.minecraft.world.item.Item;
import net.neoforged.neoforge.registries.DeferredRegister;
import net.neoforged.neoforge.registries.DeferredHolder;
import org.xiyu.spartan_weaponry_unofficial.api.SpartanWeaponryAPI;

public class MyModItems {
    public static final DeferredRegister<Item> ITEMS = DeferredRegister.create(Registries.ITEM, "mymodid");

    // 注册一把长剑
    public static final DeferredHolder<Item, Item> MY_LONGSWORD = ITEMS.register("longsword_my_material", () -> 
        SpartanWeaponryAPI.createLongsword(MyModMaterials.MY_MATERIAL)
    );
    
    // 注册一把大锤
    public static final DeferredHolder<Item, Item> MY_WARHAMMER = ITEMS.register("warhammer_my_material", () -> 
        SpartanWeaponryAPI.createWarhammer(MyModMaterials.MY_MATERIAL)
    );
}
```

### 3. 版本检查

为了确保兼容性，建议在您的模组构造函数中检查 API 版本：

```java
public MyMod() {
    // 确保 API 版本至少为 12
    SpartanWeaponryAPI.assertAPIVersion("mymodid", 12);
}
```

---

## 🛠️ 武器创建方法表

所有方法均位于 `SpartanWeaponryAPI` 类中，且需要一个 `WeaponMaterial` 参数。

| 方法名 | 描述 | 注册名格式 | 本地化键格式 |
| :--- | :--- | :--- | :--- |
| `createDagger` | 匕首 | `{material}_dagger` | `item.spartan_weaponry_unofficial.{material}_dagger` |
| `createParryingDagger` | 招架匕首 | `{material}_parrying_dagger` | `item.spartan_weaponry_unofficial.{material}_parrying_dagger` |
| `createLongsword` | 长剑 | `{material}_longsword` | `item.spartan_weaponry_unofficial.{material}_longsword` |
| `createKatana` | 太刀 | `{material}_katana` | `item.spartan_weaponry_unofficial.{material}_katana` |
| `createSaber` | 军刀 | `{material}_saber` | `item.spartan_weaponry_unofficial.{material}_saber` |
| `createRapier` | 西洋剑 | `{material}_rapier` | `item.spartan_weaponry_unofficial.{material}_rapier` |
| `createGreatsword` | 巨剑 | `{material}_greatsword` | `item.spartan_weaponry_unofficial.{material}_greatsword` |
| `createBattleHammer` | 战锤 | `{material}_battle_hammer` | `item.spartan_weaponry_unofficial.{material}_battle_hammer` |
| `createWarhammer` | 大锤 | `{material}_warhammer` | `item.spartan_weaponry_unofficial.{material}_warhammer` |
| `createSpear` | 矛 | `{material}_spear` | `item.spartan_weaponry_unofficial.{material}_spear` |
| `createHalberd` | 戟 | `{material}_halberd` | `item.spartan_weaponry_unofficial.{material}_halberd` |
| `createPike` | 长矛 | `{material}_pike` | `item.spartan_weaponry_unofficial.{material}_pike` |
| `createLance` | 骑枪 | `{material}_lance` | `item.spartan_weaponry_unofficial.{material}_lance` |
| `createLongbow` | 强化长弓 | `longbow_{material}_strengthened` | `item.spartan_weaponry_unofficial.longbow_{material}_strengthened` |
| `createHeavyCrossbow` | 强化重型弩 | `heavy_crossbow_{material}_strengthened` | `item.spartan_weaponry_unofficial.heavy_crossbow_{material}_strengthened` |
| `createThrowingKnife` | 飞刀 | `{material}_throwing_knife` | `item.spartan_weaponry_unofficial.{material}_throwing_knife` |
| `createTomahawk` | 飞斧 | `{material}_tomahawk` | `item.spartan_weaponry_unofficial.{material}_tomahawk` |
| `createJavelin` | 标枪 | `{material}_javelin` | `item.spartan_weaponry_unofficial.{material}_javelin` |
| `createBoomerang` | 回旋镖 | `{material}_boomerang` | `item.spartan_weaponry_unofficial.{material}_boomerang` |
| `createMace` | 钉头锤 | `{material}_mace` | `item.spartan_weaponry_unofficial.{material}_mace` |
| `createQuarterstaff` | 铁头棒 | `{material}_quarterstaff` | `item.spartan_weaponry_unofficial.{material}_quarterstaff` |
| `createGlaive` | 关刀 | `{material}_glaive` | `item.spartan_weaponry_unofficial.{material}_glaive` |

---

## 📝 命名规则说明

### 近战武器和投掷武器

近战武器和投掷武器使用 `{material}_{weapon}` 格式：

```java
// 近战武器注册示例
public static final DeferredHolder<Item, Item> IRON_LONGSWORD = ITEMS.register(
    "iron_longsword",  // {material}_{weapon} 格式
    () -> SpartanWeaponryAPI.createLongsword(MyModMaterials.IRON)
);

// 投掷武器注册示例
public static final DeferredHolder<Item, Item> DIAMOND_THROWING_KNIFE = ITEMS.register(
    "diamond_throwing_knife",  // {material}_{weapon} 格式
    () -> SpartanWeaponryAPI.createThrowingKnife(MyModMaterials.DIAMOND)
);

// 本地化键格式
// "item.spartan_weaponry_unofficial.iron_longsword": "Iron Longsword"
// "item.spartan_weaponry_unofficial.diamond_throwing_knife": "Diamond Throwing Knife"
```

### 强化武器 (Strengthened Weapons)

从 1.0.3 版本开始，通过附加 API 创建的**长弓和重型十字弓**使用特殊格式 `{weapontype}_{material}_strengthened`：

```java
// 长弓注册示例
public static final DeferredHolder<Item, Item> DIAMOND_LONGBOW = ITEMS.register(
    "longbow_diamond_strengthened",  // 注意格式: longbow_{material}_strengthened
    () -> SpartanWeaponryAPI.createLongbow(WeaponMaterial.DIAMOND)
);

// 重型十字弓注册示例  
public static final DeferredHolder<Item, Item> IRON_HEAVY_CROSSBOW = ITEMS.register(
    "heavy_crossbow_iron_strengthened",  // 格式: heavy_crossbow_{material}_strengthened
    () -> SpartanWeaponryAPI.createHeavyCrossbow(WeaponMaterial.IRON)
);

// 本地化键格式
// "item.spartan_weaponry_unofficial.longbow_diamond_strengthened": "Diamond-Strengthened Longbow"
// "item.spartan_weaponry_unofficial.heavy_crossbow_iron_strengthened": "Iron-Strengthened Heavy Crossbow"
```

**纹理文件命名**：强化武器的纹理文件名**不包含** `_strengthened` 后缀：
- 注册名称: `longbow_diamond_strengthened`
- 纹理路径: `textures/item/diamond_longbow_standby.png` (无 strengthened)
- 纹理路径: `textures/item/iron_heavy_crossbow_standby.png` (无 strengthened)

---

## ✨ 武器特性 (Weapon Traits)

特性通常通过 Tag 自动分配，但您也可以在定义 `WeaponMaterial` 时指定。常用特性包括：

- `WeaponTraits.REACH`: 增加攻击距离 (`reach`)
- `WeaponTraits.SWEEP_DAMAGE`: 增加横扫伤害 (`sweep_damage`)
- `WeaponTraits.TWO_HANDED`: 双手武器，副手受限 (`two_handed`)
- `WeaponTraits.ARMOUR_PIERCING`: 穿透部分护甲 (`armour_piercing`)
- `WeaponTraits.THROWN`: 可投掷 (`thrown`)

### 通过 Tag 添加特性 (推荐)

在 `data/spartan_weaponry_unofficial/tags/weapon_traits/` 下创建 JSON 文件：

```json
{
  "replace": false,
  "values": [
    "mymodid:longsword_my_material"
  ]
}
```
