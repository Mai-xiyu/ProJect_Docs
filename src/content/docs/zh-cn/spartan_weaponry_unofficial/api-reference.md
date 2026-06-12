---
title: Spartan Weaponry Unofficial API 参考
description: Spartan Weaponry Unofficial 模组的详细 API 文档与示例代码。
---

本文档说明 `Spartan Weaponry Unofficial` 面向附属模组的公开 API。你可以用它为其他模组提供的材质注册斯巴达风格武器、声明兼容武器分类，并写入对应的数据包 tag。

## 依赖配置 (Gradle)

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

## 快速入门

主要的 API 入口点是 `org.xiyu.spartanweaponryunofficial.api.SpartanWeaponryAPI` 类。

> **Mod ID 说明**：从 1.0.2 开始，Mod ID 是 `spartan_weaponry_unofficial`。Java 包名仍然使用无下划线的 `spartanweaponryunofficial`，Mod ID 与资源路径使用带下划线的 `spartan_weaponry_unofficial`。

### 1. 定义武器材质

您可以直接使用预定义的材质，或者创建自定义材质。

#### 使用预定义材质
```java
import org.xiyu.spartanweaponryunofficial.api.WeaponMaterial;

// 预定义材质: WOOD, STONE, IRON, GOLD, DIAMOND, NETHERITE 等
WeaponMaterial material = WeaponMaterial.IRON;
```

#### 创建自定义材质
```java
import net.minecraft.resources.ResourceLocation;
import net.minecraft.tags.ItemTags;
import net.minecraft.tags.TagKey;
import net.minecraft.world.item.Item;
import net.minecraft.world.item.Tiers;
import org.xiyu.spartanweaponryunofficial.api.WeaponMaterial;
import org.xiyu.spartanweaponryunofficial.api.tags.ModWeaponTraitTags;
import org.xiyu.spartanweaponryunofficial.api.trait.WeaponTrait;

public static final TagKey<Item> MY_INGOT = ItemTags.create(
    ResourceLocation.fromNamespaceAndPath("mydepmod", "ingots/my_material")
);

public static final TagKey<WeaponTrait> MY_MATERIAL_TRAITS = ModWeaponTraitTags.create(
    "mydepmod",
    "materials/my_material"
);

// 使用 Vanilla Tier 创建。
WeaponMaterial myMaterial = new WeaponMaterial(
    "my_material",          // 材质名称，用于材质翻译和自定义显示名
    "mydepmod",             // 您的模组 ID
    Tiers.DIAMOND,          // 基础 Tier 属性
    MY_INGOT,               // 修复物品 Tag
    MY_MATERIAL_TRAITS      // 材质特性 Tag
);

// 等价 builder 写法，适合避免长参数构造函数误用。
WeaponMaterial builtMaterial = WeaponMaterial.builder("my_material", "mydepmod")
    .tier(Tiers.DIAMOND)
    .repairTag(MY_INGOT)
    .traitsTag(MY_MATERIAL_TRAITS)
    .build();
```

挖掘等级行为（1.2.1 起）：通过原版 `Tier`（构造函数或 `Builder.tier(...)`）创建的材质会继承该 Tier 的 `getIncorrectBlocksForDrops()` 标签，多用途武器（战斧、战锤等）的采集判定使用该标签。仅用裸数值创建的材质默认 `BlockTags.INCORRECT_FOR_WOODEN_TOOL`，需要时可显式覆盖：

```java
WeaponMaterial myMaterial = WeaponMaterial.builder("my_material", "mydepmod")
    .durability(900)
    .speed(7.0f)
    .baseDamage(3.0f)
    .enchantability(18)
    .incorrectBlocksForDrops(BlockTags.INCORRECT_FOR_IRON_TOOL) // API 15
    .repairTag(MY_INGOT)
    .traitsTag(MY_MATERIAL_TRAITS)
    .build();
```

材质颜色可用 `WeaponMaterial.colorRGB(int r, int g, int b)`（API 15）从 RGB 分量合成，分量自动钳制到 0-255；旧的 `colorRGB(byte, byte, byte)` 重载现按无符号字节处理参数。

### 2. 注册武器

建议使用 NeoForge/Forge 的 `DeferredRegister` 来注册物品。

```java
import net.minecraft.world.item.Item;
import net.minecraft.core.registries.Registries;
import net.neoforged.neoforge.registries.DeferredRegister;
import net.neoforged.neoforge.registries.DeferredHolder;
import org.xiyu.spartanweaponryunofficial.api.SpartanWeaponryAPI;
import org.xiyu.spartanweaponryunofficial.api.SpartanWeaponryAPI.WeaponItemType;

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

    // 通用入口，适合根据配置或描述符动态选择武器类型。
    public static final DeferredHolder<Item, Item> MY_GLAIVE = ITEMS.register("glaive_my_material", () ->
        SpartanWeaponryAPI.createWeapon(WeaponItemType.GLAIVE, MyModMaterials.MY_MATERIAL)
    );
}
```

### 3. 版本检查

为了确保兼容性，建议在您的模组构造函数中检查 API 版本：

```java
public MyMod() {
    // 需要 registry 访问器、colorRGB(int,int,int) 或挖掘等级控制时使用 15。
    SpartanWeaponryAPI.assertAPIVersion("mymodid", 15);
}
```

如果附属模组只使用旧的 `createXxx(WeaponMaterial)` 方法，可以继续请求旧版本；只有使用新 API 时才需要提高到对应版本。API 14 会为所有通过 API 创建的武器记录分类元数据；API 15 新增 `WeaponTraits.registry()` / `OilEffects.registry()` 访问器、`WeaponMaterial.colorRGB(int, int, int)`、挖掘等级标签控制以及 `WeaponTrait.getModId()` / `getQuality()`。

> `SpartanWeaponryAPI.init(...)` 与 `IInternalMethodHandler` 已标注 `@ApiStatus.Internal`，仅供模组自身引导使用，附属请勿调用或实现。

---

## 武器创建方法

所有方法均位于 `SpartanWeaponryAPI`，返回值是**尚未注册的** `Item`。调用方仍然需要在自己的 `DeferredRegister` 中决定 registry id。

API 13 增加了通用入口：

```java
Item item = SpartanWeaponryAPI.createWeapon(
    SpartanWeaponryAPI.WeaponItemType.LONGSWORD,
    MyModMaterials.MY_MATERIAL
);
```

所有旧的 `createXxx(WeaponMaterial)` 方法仍然保留，并委派到同一套内部工厂。API 14 会自动为这些 API 创建的武器记录分类元数据。

| 旧方法 | 通用描述符 | Trait 类别 | 自定义显示 key |
| :--- | :--- | :--- | :--- |
| `createDagger` | `WeaponItemType.DAGGER` | `MELEE` | `item.spartan_weaponry_unofficial.custom_dagger` |
| `createParryingDagger` | `WeaponItemType.PARRYING_DAGGER` | `MELEE` | `item.spartan_weaponry_unofficial.custom_parrying_dagger` |
| `createLongsword` | `WeaponItemType.LONGSWORD` | `MELEE` | `item.spartan_weaponry_unofficial.custom_longsword` |
| `createKatana` | `WeaponItemType.KATANA` | `MELEE` | `item.spartan_weaponry_unofficial.custom_katana` |
| `createSaber` | `WeaponItemType.SABER` | `MELEE` | `item.spartan_weaponry_unofficial.custom_saber` |
| `createRapier` | `WeaponItemType.RAPIER` | `MELEE` | `item.spartan_weaponry_unofficial.custom_rapier` |
| `createGreatsword` | `WeaponItemType.GREATSWORD` | `MELEE` | `item.spartan_weaponry_unofficial.custom_greatsword` |
| `createBattleHammer` | `WeaponItemType.BATTLE_HAMMER` | `MELEE` | `item.spartan_weaponry_unofficial.custom_hammer` |
| `createWarhammer` | `WeaponItemType.WARHAMMER` | `MELEE` | `item.spartan_weaponry_unofficial.custom_warhammer` |
| `createSpear` | `WeaponItemType.SPEAR` | `MELEE` | `item.spartan_weaponry_unofficial.custom_spear` |
| `createHalberd` | `WeaponItemType.HALBERD` | `MELEE` | `item.spartan_weaponry_unofficial.custom_halberd` |
| `createPike` | `WeaponItemType.PIKE` | `MELEE` | `item.spartan_weaponry_unofficial.custom_pike` |
| `createLance` | `WeaponItemType.LANCE` | `MELEE` | `item.spartan_weaponry_unofficial.custom_lance` |
| `createLongbow` | `WeaponItemType.LONGBOW` | `RANGED` | `item.spartan_weaponry_unofficial.custom_longbow` |
| `createHeavyCrossbow` | `WeaponItemType.HEAVY_CROSSBOW` | `RANGED` | `item.spartan_weaponry_unofficial.custom_heavy_crossbow` |
| `createThrowingKnife` | `WeaponItemType.THROWING_KNIFE` | `THROWING` | `item.spartan_weaponry_unofficial.custom_throwing_knife` |
| `createTomahawk` | `WeaponItemType.TOMAHAWK` | `THROWING` | `item.spartan_weaponry_unofficial.custom_tomahawk` |
| `createJavelin` | `WeaponItemType.JAVELIN` | `THROWING` | `item.spartan_weaponry_unofficial.custom_javelin` |
| `createBoomerang` | `WeaponItemType.BOOMERANG` | `THROWING` | `item.spartan_weaponry_unofficial.custom_boomerang` |
| `createBattleaxe` | `WeaponItemType.BATTLEAXE` | `MELEE` | `item.spartan_weaponry_unofficial.custom_battleaxe` |
| `createFlangedMace` | `WeaponItemType.FLANGED_MACE` | `MELEE` | `item.spartan_weaponry_unofficial.custom_flanged_mace` |
| `createGlaive` | `WeaponItemType.GLAIVE` | `MELEE` | `item.spartan_weaponry_unofficial.custom_glaive` |
| `createQuarterstaff` | `WeaponItemType.QUARTERSTAFF` | `MELEE` | `item.spartan_weaponry_unofficial.custom_quarterstaff` |
| `createScythe` | `WeaponItemType.SCYTHE` | `MELEE` | `item.spartan_weaponry_unofficial.custom_scythe` |

上表中的自定义显示 key 只在材质启用 `setUseCustomDisplayName()` 时使用。否则物品名称仍由调用方注册 id 生成的普通翻译 key 决定。

---

## 命名规则说明

API 工厂方法不会分配 registry id；id 就是您传给 `DeferredRegister` 的字符串。

推荐附属模组使用稳定、小写的 id。下面示例使用 `<weapon>_<material>`：

```java
public static final DeferredHolder<Item, Item> MY_LONGSWORD = ITEMS.register(
    "longsword_my_material",
    () -> SpartanWeaponryAPI.createLongsword(MyModMaterials.MY_MATERIAL)
);

public static final DeferredHolder<Item, Item> MY_THROWING_KNIFE = ITEMS.register(
    "throwing_knife_my_material",
    () -> SpartanWeaponryAPI.createThrowingKnife(MyModMaterials.MY_MATERIAL)
);

// 普通翻译 key 来自附属模组自己的 namespace 和 registry id：
// "item.mymodid.longsword_my_material": "My Material Longsword"
// "item.mymodid.throwing_knife_my_material": "My Material Throwing Knife"
```

如果材质启用了 `setUseCustomDisplayName()`，创建出的物品会使用内置自定义显示 key，并把材质显示名作为 `%s` 参数。默认材质显示 key 格式如下：

```json
{
  "material.mydepmod.my_material": "My Material",
  "item.spartan_weaponry_unofficial.custom_longsword": "%s Longsword"
}
```

### 强化长弓和重型弩

附属长弓和重型弩建议沿用内置强化命名模式，方便资源包路径保持可预测：

```java
public static final DeferredHolder<Item, Item> MY_LONGBOW = ITEMS.register(
    "longbow_my_material_strengthened",
    () -> SpartanWeaponryAPI.createLongbow(MyModMaterials.MY_MATERIAL)
);

public static final DeferredHolder<Item, Item> MY_HEAVY_CROSSBOW = ITEMS.register(
    "heavy_crossbow_my_material_strengthened",
    () -> SpartanWeaponryAPI.createHeavyCrossbow(MyModMaterials.MY_MATERIAL)
);
```

强化武器的纹理文件名不包含 `_strengthened` 后缀：

- Registry id: `longbow_my_material_strengthened`
- Texture path: `textures/item/my_material_longbow_standby.png`
- Texture path: `textures/item/my_material_heavy_crossbow_standby.png`

---

## 武器特性 (Weapon Traits)

Weapon traits 通过 `spartan_weaponry_unofficial:weapon_traits` 注册表上的 tag 加载。常见内置 holder 包括：

- `WeaponTraits.REACH_1`, `WeaponTraits.REACH_1_5`, `WeaponTraits.REACH_2`, `WeaponTraits.REACH_2_5`: 增加攻击距离 (`reach`)
- `WeaponTraits.SWEEP_1`, `WeaponTraits.SWEEP_2`, `WeaponTraits.SWEEP_3`: 增加横扫伤害 (`sweep_damage`)
- `WeaponTraits.ARMOR_PIERCING`: 穿透一定比例护甲 (`armor_piercing`)
- `WeaponTraits.THROWABLE`: 让近战武器具备投掷 action trait (`throwable`)
- `WeaponTraits.HAMMER_SLAM`: 战锤下砸 action trait (`hammer_slam`)

行为说明（1.2.1 起）：横扫特性通过原版 `SWEEPING_DAMAGE_RATIO` 属性生效，与 Minecraft 1.21 计算横扫伤害的方式一致。自定义横扫类特性应继承 `SweepWeaponTrait`，或以相同方式添加属性修饰符。

### 通过 Tag 添加特性 (推荐)

在 `data/<namespace>/tags/spartan_weaponry_unofficial/weapon_traits/` 下创建 JSON 文件。材质特性通常放在 `materials/` 下：

```json
// data/mydepmod/tags/spartan_weaponry_unofficial/weapon_traits/materials/my_material.json
{
  "replace": false,
  "values": [
    "spartan_weaponry_unofficial:reach_1",
    "spartan_weaponry_unofficial:fireproof"
  ]
}
```

### 注册自定义特性与武器油 (API 15)

武器特性与油效果存放在真实注册表中。附属可对暴露的注册表 key 创建自己的 `DeferredRegister`：

```java
import net.neoforged.neoforge.registries.DeferredRegister;
import org.xiyu.spartanweaponryunofficial.api.OilEffects;
import org.xiyu.spartanweaponryunofficial.api.WeaponTraits;
import org.xiyu.spartanweaponryunofficial.api.oil.OilEffect;
import org.xiyu.spartanweaponryunofficial.api.trait.WeaponTrait;

public static final DeferredRegister<WeaponTrait> TRAITS =
        DeferredRegister.create(WeaponTraits.REGISTRY_KEY, "mymodid");
public static final DeferredRegister<OilEffect> OILS =
        DeferredRegister.create(OilEffects.REGISTRY_KEY, "mymodid");

// 模组构造函数中：
// TRAITS.register(modBus);
// OILS.register(modBus);
```

注册表构建完成后，可用 `WeaponTraits.registry()` 与 `OilEffects.registry()` 查询。`WeaponTrait` 提供 `getType()`、`getModId()`、`getQuality()`、`getLevel()`、`getMagnitude()` 用于自省。

---

## 武器分类和 Tag Helper

通过 API 创建的武器会自动按武器类型和材质分类。如果附属模组创建了兼容物品，但没有使用斯巴达武器工厂，可以手动接入分类系统：

```java
public static final DeferredHolder<Item, Item> MY_CUSTOM_SPEAR = ITEMS.register("custom_spear", () ->
    SpartanWeaponryAPI.classifyWeapon(
        new Item(new Item.Properties()),
        WeaponItemType.SPEAR,
        MyModMaterials.MY_MATERIAL
    )
);
```

物品注册完成后可以查询分类：

```java
SpartanWeaponryAPI.getWeaponClassification(MyModItems.MY_LONGSWORD.get())
    .ifPresent(classification -> {
        WeaponItemType weaponType = classification.weaponItemType();
        WeaponMaterial material = classification.material();
    });
```

标准 item tag helper：

```java
TagKey<Item> longswords = SpartanWeaponryAPI.getWeaponTag(WeaponItemType.LONGSWORD);
TagKey<Item> steelWeapons = SpartanWeaponryAPI.getMaterialTag("steel");
TagKey<Item> myModWeapons = SpartanWeaponryAPI.getNamespaceTag("mymodid");
```

标准分组 tag 路径：

```text
#spartan_weaponry_unofficial:weapons
#spartan_weaponry_unofficial:weapons/longswords
#spartan_weaponry_unofficial:weapons/spears
#spartan_weaponry_unofficial:materials/steel
#spartan_weaponry_unofficial:materials/diamond
#spartan_weaponry_unofficial:mods/mymodid
```

内置武器 tag 由 Spartan Weaponry 生成。通过 API 创建的附属武器会自动获得运行时分类元数据，但真实 datapack tag JSON 仍应由附属模组 datagen、数据包或 KubeJS 脚本写入。

```java
public class MyItemTagsProvider extends ItemTagsProvider {
    @Override
    protected void addTags(HolderLookup.Provider registries) {
        SpartanWeaponryAPI.forEachKnownWeaponTag("mymodid", (tag, item) ->
            this.tag(tag).add(item)
        );
    }
}
```

简单注册单把武器时继续使用旧 `createLongsword(material)` 风格。需要动态选择武器类型时使用 `createWeapon(WeaponItemType, material)`。只有自定义兼容物品没有使用斯巴达武器工厂时，才需要使用 `classifyWeapon(...)`。
