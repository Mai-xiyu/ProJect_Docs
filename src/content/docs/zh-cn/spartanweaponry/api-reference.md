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

> ⚠️ **重要变更**: 从 1.0.3 版本开始，Mod ID 已更改为 `spartan_weaponry_unofficial` (使用下划线)。

### 1. 定义武器材质

您可以直接使用预定义的材质，或者创建自定义材质。

#### 使用预定义材质
```java
import org.xiyu.spartanweaponryunofficial.api.WeaponMaterial;

// 预定义材质: WOOL, STONE, IRON, GOLD, DIAMOND, NETHERITE 等
WeaponMaterial material = WeaponMaterial.IRON;
```

#### 创建自定义材质
```java
import org.xiyu.spartanweaponryunofficial.api.WeaponMaterial;
import org.xiyu.spartanweaponryunofficial.api.SpartanWeaponryAPI;
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
import org.xiyu.spartanweaponryunofficial.api.SpartanWeaponryAPI;

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

| 方法名 | 描述 | 生成Registry Name示例 |
| :--- | :--- | :--- |
| `createDagger` | 匕首 | `dagger_{material}` |
| `createParryingDagger` | 招架匕首 | `parrying_dagger_{material}` |
| `createLongsword` | 长剑 | `longsword_{material}` |
| `createKatana` | 太刀 | `katana_{material}` |
| `createSaber` | 军刀 | `saber_{material}` |
| `createRapier` | 西洋剑 | `rapier_{material}` |
| `createGreatsword` | 巨剑 | `greatsword_{material}` |
| `createBattleHammer` | 战锤 | `battle_hammer_{material}` |
| `createWarhammer` | 大锤 | `warhammer_{material}` |
| `createSpear` | 矛 | `spear_{material}` |
| `createHalberd` | 戟 | `halberd_{material}` |
| `createPike` | 长矛 | `pike_{material}` |
| `createLance` | 骑枪 | `lance_{material}` |
| `createLongbow` | 强化长弓 | `longbow_{material}_strengthened` |
| `createHeavyCrossbow` | 强化重型弩 | `heavy_crossbow_{material}_strengthened` |
| `createThrowingKnife` | 飞刀 | `throwing_knife_{material}` |
| `createTomahawk` | 飞斧 | `tomahawk_{material}` |
| `createJavelin` | 标枪 | `javelin_{material}` |
| `createBoomerang` | 回旋镖 | `boomerang_{material}` |
| `createMace` | 钉头锤 | `mace_{material}` |
| `createQuarterstaff` | 铁头棒 | `quarterstaff_{material}` |
| `createGlaive` | 关刀 | `glaive_{material}` |

---

## 📝 特殊命名规则

### 强化武器 (Strengthened Weapons)

从 1.0.3 版本开始，通过附加 API 创建的长弓和重型十字弓会自动添加 `_strengthened` 后缀：

```java
// 长弓注册示例
public static final DeferredHolder<Item, Item> DIAMOND_LONGBOW = ITEMS.register(
    "longbow_diamond_strengthened",  // 注意 strengthened 后缀
    () -> SpartanWeaponryAPI.createLongbow(WeaponMaterial.DIAMOND)
);

// 本地化键格式
// "item.spartan_weaponry_unofficial.longbow_diamond_strengthened": "Diamond-Strengthened Longbow"
```

这些武器使用相同的纹理文件（无需 `_strengthened` 后缀）：
- 纹理路径: `textures/item/diamond_longbow_standby.png`
- 注册名称: `longbow_diamond_strengthened`

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

> 📝 **注意**: 路径使用下划线 `spartan_weaponry_unofficial`，而非旧版的 `spartanweaponryunofficial`。
