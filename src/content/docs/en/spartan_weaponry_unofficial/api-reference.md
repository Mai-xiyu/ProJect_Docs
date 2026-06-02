---
title: Spartan Weaponry Unofficial API Reference
description: Detailed API documentation and code examples for Spartan Weaponry Unofficial.
---

# Spartan Weaponry Unofficial API Reference

This document provides the API development guide for the `Spartan Weaponry Unofficial` mod. Developers can use this API to register new Spartan weapons for materials added by other mods.

## 📦 Dependency Configuration (Gradle)

First, you need to add Spartan Weaponry Unofficial as a dependency in your `build.gradle`.

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
    // Replace xxxxx with the specific Project ID and File ID
    // Example: implementation fg.deobf("curse.maven:spartan-weaponry-unofficial-12345:67890")
    // Note: Mod ID uses underscores spartan_weaponry_unofficial
    implementation fg.deobf("curse.maven:spartan-weaponry-unofficial-xxxxx:yyyyy")
}
```

## 🚀 Quick Start

The main API entry point is the `org.xiyu.spartanweaponryunofficial.api.SpartanWeaponryAPI` class.

> ⚠️ **Important Change**: Starting from version 1.0.2, the Mod ID has been changed to `spartan_weaponry_unofficial`.  
> 💡 **Note**: The Java package name remains `spartanweaponryunofficial` (without underscores), while the Mod ID and resource paths use `spartan_weaponry_unofficial` (with underscores).

### 1. Define Weapon Material

You can use predefined materials or create custom ones.

#### Using Predefined Materials
```java
import org.xiyu.spartanweaponryunofficial.api.WeaponMaterial;

// Predefined materials: WOOD, STONE, IRON, GOLD, DIAMOND, NETHERITE, etc.
WeaponMaterial material = WeaponMaterial.IRON;
```

#### Creating Custom Materials
```java
import net.minecraft.resources.ResourceLocation;
import net.minecraft.tags.ItemTags;
import net.minecraft.tags.TagKey;
import net.minecraft.world.item.Item;
import org.xiyu.spartanweaponryunofficial.api.WeaponMaterial;
import org.xiyu.spartanweaponryunofficial.api.SpartanWeaponryAPI;
import org.xiyu.spartanweaponryunofficial.api.tags.ModWeaponTraitTags;
import org.xiyu.spartanweaponryunofficial.api.trait.WeaponTrait;
import net.minecraft.world.item.Tiers;

public static final TagKey<Item> MY_INGOT = ItemTags.create(
    ResourceLocation.fromNamespaceAndPath("mydepmod", "ingots/my_material")
);

public static final TagKey<WeaponTrait> MY_MATERIAL_TRAITS = ModWeaponTraitTags.create(
    "mydepmod",
    "materials/my_material"
);

// Create using a vanilla Tier
WeaponMaterial myMaterial = new WeaponMaterial(
    "my_material",          // Material name, used by material translation and custom display names
    "mydepmod",             // Your mod ID
    Tiers.DIAMOND,          // Base Tier properties
    MY_INGOT,               // Repair item Tag
    MY_MATERIAL_TRAITS      // Material trait Tag
);

// Equivalent builder form, useful when numeric constructor arguments would be hard to audit
WeaponMaterial myBuiltMaterial = WeaponMaterial.builder("my_material", "mydepmod")
    .tier(Tiers.DIAMOND)
    .repairTag(MY_INGOT)
    .traitsTag(MY_MATERIAL_TRAITS)
    .build();
```

### 2. Register Weapons

It is recommended to use NeoForge/Forge's `DeferredRegister` to register items.

```java
import net.minecraft.world.item.Item;
import net.minecraft.core.registries.Registries;
import net.neoforged.neoforge.registries.DeferredRegister;
import net.neoforged.neoforge.registries.DeferredHolder;
import org.xiyu.spartanweaponryunofficial.api.SpartanWeaponryAPI;
import org.xiyu.spartanweaponryunofficial.api.SpartanWeaponryAPI.WeaponItemType;

public class MyModItems {
    public static final DeferredRegister<Item> ITEMS = DeferredRegister.create(Registries.ITEM, "mymodid");

    // Register a Longsword
    public static final DeferredHolder<Item, Item> MY_LONGSWORD = ITEMS.register("longsword_my_material", () -> 
        SpartanWeaponryAPI.createLongsword(MyModMaterials.MY_MATERIAL)
    );
    
    // Register a Warhammer
    public static final DeferredHolder<Item, Item> MY_WARHAMMER = ITEMS.register("warhammer_my_material", () -> 
        SpartanWeaponryAPI.createWarhammer(MyModMaterials.MY_MATERIAL)
    );

    // Equivalent generic entry point, useful when code selects weapon types dynamically
    public static final DeferredHolder<Item, Item> MY_GLAIVE = ITEMS.register("glaive_my_material", () ->
        SpartanWeaponryAPI.createWeapon(WeaponItemType.GLAIVE, MyModMaterials.MY_MATERIAL)
    );
}
```

### 3. Version Check

To ensure compatibility, it is recommended to check the API version in your mod constructor:

```java
public MyMod() {
    // Ensure API version is at least 14
    SpartanWeaponryAPI.assertAPIVersion("mymodid", 14);
}
```

Use version `14` when relying on weapon classification metadata, grouped tag helpers, `createWeapon(...)`, `WeaponItemType`, or `WeaponMaterial.builder(...)`. Existing addons that only use the older `createXxx(WeaponMaterial)` methods remain compatible with their previous version check.

---

## 🛠️ Weapon Creation Methods

All methods are located in the `SpartanWeaponryAPI` class and return an unregistered `Item`. The caller chooses the registry id in its own `DeferredRegister`.

API version 13 added the generic entry point:

```java
Item item = SpartanWeaponryAPI.createWeapon(
    SpartanWeaponryAPI.WeaponItemType.LONGSWORD,
    MyModMaterials.MY_MATERIAL
);
```

All existing `createXxx(WeaponMaterial)` methods remain compatible and delegate to the same internal factories.

API version 14 automatically records classification metadata for every item created through `createWeapon(...)` or any legacy `createXxx(WeaponMaterial)` method.

The classification APIs and grouped tags are covered in the "Weapon Classification and Tag Helpers" section below.

| Legacy Method | Generic Descriptor | Trait Category | Custom Display Key |
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

The custom display keys above are used only when the material has `setUseCustomDisplayName()` enabled. Otherwise Minecraft uses the normal item translation key derived from the registry id chosen by your addon.

---

## 📝 Naming Convention Details

The API factory methods do not assign registry ids. The id is the string passed to your `DeferredRegister`.

Recommended addon ids should be stable and lowercase. The examples below use `<weapon>_<material>` for melee and throwing weapons:

```java
public static final DeferredHolder<Item, Item> MY_LONGSWORD = ITEMS.register(
    "longsword_my_material",
    () -> SpartanWeaponryAPI.createLongsword(MyModMaterials.MY_MATERIAL)
);

public static final DeferredHolder<Item, Item> MY_THROWING_KNIFE = ITEMS.register(
    "throwing_knife_my_material",
    () -> SpartanWeaponryAPI.createThrowingKnife(MyModMaterials.MY_MATERIAL)
);

// Normal localization key format is based on your addon registry namespace and id:
// "item.mymodid.longsword_my_material": "My Material Longsword"
// "item.mymodid.throwing_knife_my_material": "My Material Throwing Knife"
```

If a material enables `setUseCustomDisplayName()`, the created item uses the built-in custom display key listed in the table above and passes the material display name as the `%s` argument. The default material display key is:

```json
{
  "material.mydepmod.my_material": "My Material",
  "item.spartan_weaponry_unofficial.custom_longsword": "%s Longsword"
}
```

### Strengthened Weapons

For addon longbows and heavy crossbows, using the built-in strengthened naming pattern keeps resource-pack paths predictable:

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

Texture file naming for strengthened weapons does not include the `_strengthened` suffix:
- Registry id example: `longbow_my_material_strengthened`
- Texture path: `textures/item/my_material_longbow_standby.png`
- Texture path: `textures/item/my_material_heavy_crossbow_standby.png`

---

## ✨ Weapon Traits

Traits are loaded through tags on the `spartan_weaponry_unofficial:weapon_traits` registry. Common built-in holders include:

- `WeaponTraits.REACH_1`, `WeaponTraits.REACH_1_5`, `WeaponTraits.REACH_2`, `WeaponTraits.REACH_2_5`: increases attack range (`reach`)
- `WeaponTraits.SWEEP_1`, `WeaponTraits.SWEEP_2`, `WeaponTraits.SWEEP_3`: increases sweep damage (`sweep_damage`)
- `WeaponTraits.ARMOR_PIERCING`: pierces a percentage of armor (`armor_piercing`)
- `WeaponTraits.THROWABLE`: makes a melee weapon throwable (`throwable`)
- `WeaponTraits.HAMMER_SLAM`: hammer slam action trait (`hammer_slam`)

### Adding Traits via Tags (Recommended)

Create a JSON file under `data/<namespace>/tags/spartan_weaponry_unofficial/weapon_traits/`. Material trait tags usually live under `materials/`:

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

---

## Weapon Classification and Tag Helpers

API-created weapons are automatically classified by weapon type and material. Addons that create compatible items without the Spartan Weaponry factories can opt in manually:

```java
public static final DeferredHolder<Item, Item> MY_CUSTOM_SPEAR = ITEMS.register("custom_spear", () ->
    SpartanWeaponryAPI.classifyWeapon(
        new Item(new Item.Properties()),
        WeaponItemType.SPEAR,
        MyModMaterials.MY_MATERIAL
    )
);
```

Classification can be queried after the item is registered:

```java
SpartanWeaponryAPI.getWeaponClassification(MyModItems.MY_LONGSWORD.get())
    .ifPresent(classification -> {
        WeaponItemType weaponType = classification.weaponItemType();
        WeaponMaterial material = classification.material();
    });
```

Standard tag keys are exposed for datapack and modpack integration:

```java
TagKey<Item> longswords = SpartanWeaponryAPI.getWeaponTag(WeaponItemType.LONGSWORD);
TagKey<Item> steelWeapons = SpartanWeaponryAPI.getMaterialTag("steel");
TagKey<Item> myModWeapons = SpartanWeaponryAPI.getNamespaceTag("mymodid");
```

The canonical grouped item tags use these paths:

```text
#spartan_weaponry_unofficial:weapons
#spartan_weaponry_unofficial:weapons/longswords
#spartan_weaponry_unofficial:weapons/spears
#spartan_weaponry_unofficial:materials/steel
#spartan_weaponry_unofficial:materials/diamond
#spartan_weaponry_unofficial:mods/mymodid
```

Built-in weapon tags are generated by Spartan Weaponry. Addon weapons created through the API receive classification metadata automatically, but physical datapack tag JSON still belongs to the addon, datapack, or KubeJS script that contributes those tags. A data provider can reuse the API metadata:

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

Use the legacy `createLongsword(material)` style for simple one-off registrations. Use `createWeapon(WeaponItemType, material)` when selecting weapon types dynamically. Use `classifyWeapon(...)` only for custom compatible items that are not created by the Spartan Weaponry factories.
