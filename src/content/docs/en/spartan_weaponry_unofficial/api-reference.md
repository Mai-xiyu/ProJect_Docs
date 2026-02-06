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

// Predefined materials: WOOL, STONE, IRON, GOLD, DIAMOND, NETHERITE, etc.
WeaponMaterial material = WeaponMaterial.IRON;
```

#### Creating Custom Materials
```java
import org.xiyu.spartanweaponryunofficial.api.WeaponMaterial;
import org.xiyu.spartanweaponryunofficial.api.SpartanWeaponryAPI;
import net.minecraft.world.item.Tiers;

// Create using Vanilla Tier
WeaponMaterial myMaterial = new WeaponMaterial(
    "my_material",          // Material name (used for registry name, e.g., dagger_my_material)
    "mydepmod",             // Your mod ID
    Tiers.DIAMOND,          // Base Tier properties
    ModItemTags.MY_INGOT,   // Repair item Tag
    ModWeaponTraitTags.MY_TRAIT // Trait Tag (Optional)
);
```

### 2. Register Weapons

It is recommended to use NeoForge/Forge's `DeferredRegister` to register items.

```java
import net.minecraft.world.item.Item;
import net.neoforged.neoforge.registries.DeferredRegister;
import net.neoforged.neoforge.registries.DeferredHolder;
import org.xiyu.spartanweaponryunofficial.api.SpartanWeaponryAPI;

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
}
```

### 3. Version Check

To ensure compatibility, it is recommended to check the API version in your mod constructor:

```java
public MyMod() {
    // Ensure API version is at least 12
    SpartanWeaponryAPI.assertAPIVersion("mymodid", 12);
}
```

---

## 🛠️ Weapon Creation Methods

All methods are located in the `SpartanWeaponryAPI` class and require a `WeaponMaterial` parameter.

| Method Name | Description | Registry Name Format | Localization Key Format |
| :--- | :--- | :--- | :--- |
| `createDagger` | Dagger | `{material}_dagger` | `item.spartan_weaponry_unofficial.{material}_dagger` |
| `createParryingDagger` | Parrying Dagger | `{material}_parrying_dagger` | `item.spartan_weaponry_unofficial.{material}_parrying_dagger` |
| `createLongsword` | Longsword | `{material}_longsword` | `item.spartan_weaponry_unofficial.{material}_longsword` |
| `createKatana` | Katana | `{material}_katana` | `item.spartan_weaponry_unofficial.{material}_katana` |
| `createSaber` | Saber | `{material}_saber` | `item.spartan_weaponry_unofficial.{material}_saber` |
| `createRapier` | Rapier | `{material}_rapier` | `item.spartan_weaponry_unofficial.{material}_rapier` |
| `createGreatsword` | Greatsword | `{material}_greatsword` | `item.spartan_weaponry_unofficial.{material}_greatsword` |
| `createBattleHammer` | Battle Hammer | `{material}_battle_hammer` | `item.spartan_weaponry_unofficial.{material}_battle_hammer` |
| `createWarhammer` | Warhammer | `{material}_warhammer` | `item.spartan_weaponry_unofficial.{material}_warhammer` |
| `createSpear` | Spear | `{material}_spear` | `item.spartan_weaponry_unofficial.{material}_spear` |
| `createHalberd` | Halberd | `{material}_halberd` | `item.spartan_weaponry_unofficial.{material}_halberd` |
| `createPike` | Pike | `{material}_pike` | `item.spartan_weaponry_unofficial.{material}_pike` |
| `createLance` | Lance | `{material}_lance` | `item.spartan_weaponry_unofficial.{material}_lance` |
| `createLongbow` | Strengthened Longbow | `longbow_{material}_strengthened` | `item.spartan_weaponry_unofficial.longbow_{material}_strengthened` |
| `createHeavyCrossbow` | Strengthened Heavy Crossbow | `heavy_crossbow_{material}_strengthened` | `item.spartan_weaponry_unofficial.heavy_crossbow_{material}_strengthened` |
| `createThrowingKnife` | Throwing Knife | `{material}_throwing_knife` | `item.spartan_weaponry_unofficial.{material}_throwing_knife` |
| `createTomahawk` | Tomahawk | `{material}_tomahawk` | `item.spartan_weaponry_unofficial.{material}_tomahawk` |
| `createJavelin` | Javelin | `{material}_javelin` | `item.spartan_weaponry_unofficial.{material}_javelin` |
| `createBoomerang` | Boomerang | `{material}_boomerang` | `item.spartan_weaponry_unofficial.{material}_boomerang` |
| `createMace` | Mace | `{material}_mace` | `item.spartan_weaponry_unofficial.{material}_mace` |
| `createQuarterstaff` | Quarterstaff | `{material}_quarterstaff` | `item.spartan_weaponry_unofficial.{material}_quarterstaff` |
| `createGlaive` | Glaive | `{material}_glaive` | `item.spartan_weaponry_unofficial.{material}_glaive` |

---

## 📝 Naming Convention Details

### Melee and Throwing Weapons

Melee and throwing weapons use the `{material}_{weapon}` format:

```java
// Melee weapon registration example
public static final DeferredHolder<Item, Item> IRON_LONGSWORD = ITEMS.register(
    "iron_longsword",  // {material}_{weapon} format
    () -> SpartanWeaponryAPI.createLongsword(MyModMaterials.IRON)
);

// Throwing weapon registration example
public static final DeferredHolder<Item, Item> DIAMOND_THROWING_KNIFE = ITEMS.register(
    "diamond_throwing_knife",  // {material}_{weapon} format
    () -> SpartanWeaponryAPI.createThrowingKnife(MyModMaterials.DIAMOND)
);

// Localization key format
// "item.spartan_weaponry_unofficial.iron_longsword": "Iron Longsword"
// "item.spartan_weaponry_unofficial.diamond_throwing_knife": "Diamond Throwing Knife"
```

### Strengthened Weapons

Starting from version 1.0.3, **longbows and heavy crossbows** created via the extension API use a special format `{weapontype}_{material}_strengthened`:

```java
// Longbow registration example
public static final DeferredHolder<Item, Item> DIAMOND_LONGBOW = ITEMS.register(
    "longbow_diamond_strengthened",  // Note format: longbow_{material}_strengthened
    () -> SpartanWeaponryAPI.createLongbow(WeaponMaterial.DIAMOND)
);

// Heavy crossbow registration example  
public static final DeferredHolder<Item, Item> IRON_HEAVY_CROSSBOW = ITEMS.register(
    "heavy_crossbow_iron_strengthened",  // Format: heavy_crossbow_{material}_strengthened
    () -> SpartanWeaponryAPI.createHeavyCrossbow(WeaponMaterial.IRON)
);

// Localization key format
// "item.spartan_weaponry_unofficial.longbow_diamond_strengthened": "Diamond-Strengthened Longbow"
// "item.spartan_weaponry_unofficial.heavy_crossbow_iron_strengthened": "Iron-Strengthened Heavy Crossbow"
```

**Texture file naming**: Strengthened weapon texture files **do not include** the `_strengthened` suffix:
- Registry name: `longbow_diamond_strengthened`
- Texture path: `textures/item/diamond_longbow_standby.png` (no strengthened)
- Texture path: `textures/item/iron_heavy_crossbow_standby.png` (no strengthened)

---

## ✨ Weapon Traits

Traits are usually automatically assigned via Tags, but you can also specify them when defining `WeaponMaterial`. Common traits include:

- `WeaponTraits.REACH`: Increases attack range (`reach`)
- `WeaponTraits.SWEEP_DAMAGE`: Increases sweep damage (`sweep_damage`)
- `WeaponTraits.TWO_HANDED`: Two-handed weapon, offhand restricted (`two_handed`)
- `WeaponTraits.ARMOUR_PIERCING`: Pierces a percentage of armor (`armour_piercing`)
- `WeaponTraits.THROWN`: Throwable (`thrown`)

### Adding Traits via Tags (Recommended)

Create a JSON file under `data/spartan_weaponry_unofficial/tags/weapon_traits/`:

```json
{
  "replace": false,
  "values": [
    "mymodid:longsword_my_material"
  ]
}
```
