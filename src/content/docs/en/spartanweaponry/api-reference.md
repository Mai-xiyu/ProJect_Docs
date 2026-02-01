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
    implementation fg.deobf("curse.maven:spartan-weaponry-unofficial-xxxxx:yyyyy")
}
```

## 🚀 Quick Start

The main API entry point is the `org.xiyu.spartanweaponryunofficial.api.SpartanWeaponryAPI` class.

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

| Method Name | Description | Generated Registry Name Example |
| :--- | :--- | :--- |
| `createDagger` | Dagger | `dagger_{material}` |
| `createParryingDagger` | Parrying Dagger | `parrying_dagger_{material}` |
| `createLongsword` | Longsword | `longsword_{material}` |
| `createKatana` | Katana | `katana_{material}` |
| `createSaber` | Saber | `saber_{material}` |
| `createRapier` | Rapier | `rapier_{material}` |
| `createGreatsword` | Greatsword | `greatsword_{material}` |
| `createBattleHammer` | Battle Hammer | `battle_hammer_{material}` |
| `createWarhammer` | Warhammer | `warhammer_{material}` |
| `createSpear` | Spear | `spear_{material}` |
| `createHalberd` | Halberd | `halberd_{material}` |
| `createPike` | Pike | `pike_{material}` |
| `createLance` | Lance | `lance_{material}` |
| `createLongbow` | Longbow | `longbow_{material}` |
| `createHeavyCrossbow` | Heavy Crossbow | `heavy_crossbow_{material}` |
| `createThrowingKnife` | Throwing Knife | `throwing_knife_{material}` |
| `createTomahawk` | Tomahawk | `tomahawk_{material}` |
| `createJavelin` | Javelin | `javelin_{material}` |
| `createBoomerang` | Boomerang | `boomerang_{material}` |
| `createMace` | Mace | `mace_{material}` |
| `createQuarterstaff` | Quarterstaff | `quarterstaff_{material}` |
| `createGlaive` | Glaive | `glaive_{material}` |

---

## ✨ Weapon Traits

Traits are usually automatically assigned via Tags, but you can also specify them when defining `WeaponMaterial`. Common traits include:

- `WeaponTraits.REACH`: Increases attack range (`reach`)
- `WeaponTraits.SWEEP_DAMAGE`: Increases sweep damage (`sweep_damage`)
- `WeaponTraits.TWO_HANDED`: Two-handed weapon, offhand restricted (`two_handed`)
- `WeaponTraits.ARMOUR_PIERCING`: Pierces a percentage of armor (`armour_piercing`)
- `WeaponTraits.THROWN`: Throwable (`thrown`)

### Adding Traits via Tags (Recommended)

Create a JSON file under `data/spartanweaponry/tags/weapon_traits/`:

```json
{
  "replace": false,
  "values": [
    "mymodid:longsword_my_material"
  ]
}
```
