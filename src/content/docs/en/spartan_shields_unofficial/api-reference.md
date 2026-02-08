---
title: Spartan Shields API Reference
description: Detailed API documentation and code examples for Spartan Shields Unofficial.
---

# Spartan Shields API Reference

This document provides the complete API development guide for the `Spartan Shields Unofficial` mod. Developers can use this API to create custom shields, register new resource types, and customize tower shield rendering.

> 💡 **Mod ID**: `spartan_shields_unofficial` (with underscores)
>
> 💡 **Java Package**: `org.xiyu.spartanshieldsunofficial` (no underscores)
>
> 💡 **API Package**: `org.xiyu.spartanshieldsunofficial.api`

## 📐 Architecture Overview

The API follows a three-layer architecture. Addon mods only need to import the `api.*` package:

```
┌────────────────────────────────────────────────────┐
│  Addon Mod Layer                                    │
│  Only imports api.*, uses ShieldBuilder to create   │
├────────────────────────────────────────────────────┤
│  API Layer (api/)                                   │
│  Interfaces + Builder + Registry + Abstract classes │
├────────────────────────────────────────────────────┤
│  Internal Implementation (item/, util/, client/)    │
│  Free to refactor without affecting addons          │
└────────────────────────────────────────────────────┘
```

### API Package Structure

```
api/
├── SpartanShieldsAPI.java              // Single entry point
├── shield/
│   ├── IShieldMaterial.java            // Shield material
│   ├── ShieldType.java                 // BASIC / TOWER enum
│   ├── ShieldBuilder.java              // Fluent builder
│   └── IShieldBlockHandler.java        // Block callback
├── resource/
│   ├── IResourceType.java             // Resource type definition
│   ├── IResourceStorage.java          // Resource storage operations
│   ├── ResourceRegistry.java          // Resource type registry
│   ├── SimpleResourceType.java        // General-purpose base class
│   └── AbstractEnergyStorage.java     // FE storage wrapper
├── tag/
│   └── ShieldTags.java                // TagKey constants
└── client/
    └── ITowerShieldRenderer.java      // Tower shield rendering
```

---

## 📦 Dependency Configuration (Gradle)

Add Spartan Shields Unofficial as a dependency in your `build.gradle`:

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
    // Replace xxxxx and yyyyy with the Project ID and File ID from CurseForge
    implementation "curse.maven:spartan-shields-unofficial-xxxxx:yyyyy"
}
```

---

## 🚀 Quick Start

### Entry Point: `SpartanShieldsAPI`

All API operations start from `SpartanShieldsAPI`:

```java
import org.xiyu.spartanshieldsunofficial.api.SpartanShieldsAPI;
```

| Method | Description |
| :--- | :--- |
| `createMaterial(int, int, TagKey<Item>)` | Create a shield material |
| `createMaterial(Tier, TagKey<Item>)` | Create a shield material from a vanilla Tier |
| `registerResourceType(IResourceType)` | Register a new resource type |
| `getResourceType(ResourceLocation)` | Query a registered resource type |
| `getAllResourceTypes()` | Get all registered resource types |
| `registerTowerShieldRenderer(Item, ITowerShieldRenderer)` | Register a custom tower shield renderer (client only) |

---

## 🛡️ Shield Creation

### 1. Define Materials

```java
import org.xiyu.spartanshieldsunofficial.api.SpartanShieldsAPI;
import org.xiyu.spartanshieldsunofficial.api.shield.IShieldMaterial;

// Option 1: Specify values directly
IShieldMaterial mithril = SpartanShieldsAPI.createMaterial(
    800,                    // Base durability
    18,                     // Enchantability
    MyTags.MITHRIL_INGOT    // Repair material Tag
);

// Option 2: Create from vanilla Tier
IShieldMaterial diamond = SpartanShieldsAPI.createMaterial(
    Tiers.DIAMOND,          // Use diamond tier properties
    Tags.Items.GEMS_DIAMOND // Repair material Tag
);
```

#### `IShieldMaterial` Interface

| Method | Return Type | Description |
| :--- | :--- | :--- |
| `getDurability()` | `int` | Base durability (tower shields auto ×1.25) |
| `getEnchantability()` | `int` | Enchantability value |
| `getRepairTag()` | `TagKey<Item>` | Anvil repair material Tag |

### 2. Using ShieldBuilder

`ShieldBuilder` is the core tool for creating shields with a fluent API:

```java
import org.xiyu.spartanshieldsunofficial.api.shield.ShieldBuilder;
import org.xiyu.spartanshieldsunofficial.api.shield.ShieldType;

// Register a basic shield
DeferredHolder<Item, ?> MITHRIL_SHIELD = ITEMS.register("mithril_shield",
    ShieldBuilder.create()
        .material(mithril)
        .build()
);

// Register a tower shield
DeferredHolder<Item, ?> MITHRIL_TOWER = ITEMS.register("mithril_tower_shield",
    ShieldBuilder.create()
        .material(mithril)
        .type(ShieldType.TOWER)
        .build()
);
```

#### ShieldBuilder Method Reference

| Method | Description | Required/Optional |
| :--- | :--- | :--- |
| `create()` | Create a new Builder instance | — |
| `material(IShieldMaterial)` | Set material (durability-based shield) | Either this or `poweredBy` |
| `type(ShieldType)` | Set shield type, default `BASIC` | Optional |
| `blockEffect(Holder<MobEffect>, int, int)` | Apply status effect on block (stackable) | Optional |
| `blockHandler(IShieldBlockHandler)` | Execute custom logic on block (stackable) | Optional |
| `poweredBy(IResourceType, int, int)` | Power shield with a resource | Either this or `material` |
| `build()` | Build into `Supplier<? extends ShieldBaseItem>` | Required |

#### `ShieldType` Enum

| Value | Description |
| :--- | :--- |
| `BASIC` | Basic shield |
| `TOWER` | Tower shield — larger coverage, durability/capacity ×1.25, BEWLR 3D rendering |

### 3. Block Effects (Stackable)

`blockEffect` and `blockHandler` support multiple calls with sequential stacking:

```java
DeferredHolder<Item, ?> CURSED_SHIELD = ITEMS.register("cursed_shield",
    ShieldBuilder.create()
        .material(mithril)
        .blockEffect(MobEffects.WITHER, 60, 1)             // Wither II, 3 seconds
        .blockEffect(MobEffects.MOVEMENT_SLOWDOWN, 100, 2)  // Slowness III, 5 seconds
        .blockHandler((shield, player, attacker, dmg) -> {
            // Play custom sound
            player.level().playSound(null, player.blockPosition(),
                SoundEvents.WITHER_SPAWN, SoundSource.PLAYERS, 0.5f, 1.0f);
        })
        .build()
);
```

#### `IShieldBlockHandler` Interface

```java
@FunctionalInterface
public interface IShieldBlockHandler {
    /**
     * Called when a shield successfully blocks an attack (triggered when damage ≥ 3.0).
     *
     * @param shield   The shield ItemStack
     * @param player   The player holding the shield
     * @param attacker The attacker (always a LivingEntity)
     * @param damage   The original damage value
     */
    void onBlock(ItemStack shield, Player player, LivingEntity attacker, float damage);
}
```

Supports Lambda expressions:
```java
.blockHandler((shield, player, attacker, dmg) -> attacker.igniteForSeconds(3))
```

### 4. Builder Safety Validation

The `build()` method includes a built-in `validate()` check. Invalid configurations throw `IllegalStateException` immediately during mod startup:

| Error Scenario | Exception Message |
| :--- | :--- |
| Neither `material` nor `poweredBy` set | "Shield must have either a material or a resource type" |
| Both `material` and `poweredBy` set | "Shield cannot have both material AND resource type" |
| `poweredBy` with `capacity ≤ 0` | "poweredBy capacity must be > 0" |
| `poweredBy` with `maxReceive ≤ 0` | "poweredBy maxReceive must be > 0" |

```java
// ❌ Error: empty shell shield
ShieldBuilder.create().build();
// → IllegalStateException

// ❌ Error: both material and resource set
ShieldBuilder.create().material(mat).poweredBy(ResourceRegistry.ENERGY, 100000, 500).build();
// → IllegalStateException

// ✅ Correct
ShieldBuilder.create().material(mat).build();
ShieldBuilder.create().poweredBy(ResourceRegistry.ENERGY, 500000, 2000).build();
```

---

## ⚡ Resource System

The resource system is the core extension point of the API, allowing addon mods to register any type of energy/mana/stress as a shield power source.

### Core Interface: `IResourceType`

Each resource type is an `IResourceType` instance that defines storage, display, and Capability registration behavior.

| Method | Description |
| :--- | :--- |
| `getId()` | Globally unique ID, e.g. `neoforge:energy` |
| `getDisplayName()` | Display name in tooltips, e.g. `FE` |
| `getDataComponent()` | Associated `DataComponentType` (critical for 1.21+ sync) |
| `getStored(ItemStack)` | Read current stored amount |
| `setStored(ItemStack, int)` | Write stored amount |
| `formatCapacityTooltip(int, int)` | Format capacity display |
| `formatChargeRateTooltip(int)` | Format charge rate display |
| `formatPerDamageTooltip(int)` | Format per-damage cost display |
| `getBarColor()` | Item durability bar color (RGB) |
| `onRegisterCapabilities(...)` | Register NeoForge Capability (optional, default empty) |

:::caution[About DataComponent]
In Minecraft 1.21+, the client **cannot directly read server-side NBT**. Data must go through the `DataComponent` system for proper client synchronization.

If `getStored()` uses a storage method that doesn't sync, the client tooltip will display incorrect values (e.g., "0 / 100,000 FE").

Therefore, every `IResourceType` **must** declare its associated `DataComponentType<?>`, and the registration must include the `networkSynchronized()` call:

```java
// ✅ Correct
builder.persistent(Codec.INT).networkSynchronized(ByteBufCodecs.INT)

// ❌ Wrong — client cannot sync
builder.persistent(Codec.INT)  // missing networkSynchronized
```
:::

### Built-in Resource Types

`ResourceRegistry` comes with 2 pre-registered resource types:

| Constant | ID | Display Name | Bar Color | Description |
| :--- | :--- | :--- | :--- | :--- |
| `ResourceRegistry.ENERGY` | `neoforge:energy` | FE | Blue `0x69B3FF` | NeoForge standard energy unit |
| `ResourceRegistry.MICRO_INFINITY` | `enderio:micro_infinity` | µI | Green `0x4DA24B` | EnderIO energy unit (reuses FE internally) |

### Creating Energy Shields with Built-in Types

```java
import org.xiyu.spartanshieldsunofficial.api.resource.ResourceRegistry;

DeferredHolder<Item, ?> FLUX_SHIELD = ITEMS.register("flux_shield",
    ShieldBuilder.create()
        .type(ShieldType.TOWER)
        .poweredBy(ResourceRegistry.ENERGY, 500000, 2000)
        .build()
);

// ✅ No need to manually register Capabilities!
// The main mod automatically handles it during RegisterCapabilitiesEvent:
// 1. Scans all shields created via ShieldBuilder.poweredBy()
// 2. Calls resourceType.onRegisterCapabilities()
// 3. AbstractEnergyStorage auto-registers Capabilities.EnergyStorage.ITEM
```

### Registering Custom Resource Types

#### Using `SimpleResourceType` (Recommended, only 4 parameters)

`SimpleResourceType` provides a ready-to-use implementation of `IResourceType` with automatic `getStored`/`setStored`/`format*Tooltip` handling:

```java
import org.xiyu.spartanshieldsunofficial.api.resource.SimpleResourceType;
import org.xiyu.spartanshieldsunofficial.api.SpartanShieldsAPI;

// Step 1: Register your own DataComponent (must include networkSynchronized!)
public class MyDataComponents {
    public static final DeferredRegister.DataComponents COMPONENTS =
        DeferredRegister.createDataComponents("my_addon_mod");

    public static final DeferredHolder<DataComponentType<?>, DataComponentType<Integer>> STORED_MANA =
        COMPONENTS.registerComponentType("stored_mana", builder ->
            builder.persistent(Codec.INT).networkSynchronized(ByteBufCodecs.INT)
        );
}

// Step 2: Register the resource type in your mod constructor
SpartanShieldsAPI.registerResourceType(new SimpleResourceType(
    ResourceLocation.fromNamespaceAndPath("botania", "mana"),   // Globally unique ID
    Component.literal("Mana"),                                   // Display name
    MyDataComponents.STORED_MANA.get(),                          // DataComponent
    0x00C6FF                                                     // Bar color
));

// Step 3: Create shields using the resource type
IResourceType mana = ResourceRegistry.get(
    ResourceLocation.fromNamespaceAndPath("botania", "mana")
).orElseThrow();

DeferredHolder<Item, ?> MANA_SHIELD = ITEMS.register("mana_shield",
    ShieldBuilder.create()
        .poweredBy(mana, 10000, 100)
        .blockEffect(MobEffects.REGENERATION, 40, 0)  // Can also add healing effect
        .build()
);
```

Want to customize the tooltip format? Simply override:

```java
IResourceType customMana = new SimpleResourceType(...) {
    @Override
    public Component formatCapacityTooltip(int stored, int capacity) {
        return Component.literal("✦ " + stored + " / " + capacity + " Mana")
            .withStyle(ChatFormatting.AQUA);
    }
};
```

#### Using `AbstractEnergyStorage` (FE-compatible resources)

If your resource type is based on NeoForge Energy (like RF), use `AbstractEnergyStorage` for automatic `Capabilities.EnergyStorage.ITEM` registration:

```java
import org.xiyu.spartanshieldsunofficial.api.resource.AbstractEnergyStorage;

// Create an energy type displayed as "RF" (still FE under the hood)
SpartanShieldsAPI.registerResourceType(new AbstractEnergyStorage(
    ResourceLocation.fromNamespaceAndPath("thermal", "redstone_flux"),
    Component.literal("RF"),
    ModDataComponents.STORED_ENERGY.get(),  // Reuses FE DataComponent
    0xCC4C4C                                 // Red bar color
));
```

### Class Hierarchy

```
IResourceType (interface)
  └── SimpleResourceType (general base class, 4 params)
        └── AbstractEnergyStorage (FE adapter, auto-registers Capability)
```

| Class | Use Case |
| :--- | :--- |
| `IResourceType` | Fully custom resource types (e.g., complex mana systems) |
| `SimpleResourceType` | Most scenarios — only 4 params, built-in tooltip formatting |
| `AbstractEnergyStorage` | FE-based resource types — auto-registers NeoForge Energy Capability |

### `IResourceStorage` Interface

Addon mods can use `instanceof IResourceStorage` to check if a shield is resource-powered and perform read/write operations:

```java
if (shieldItem instanceof IResourceStorage storage) {
    IResourceType type = storage.getResourceType();
    int capacity = storage.getCapacity();
    int maxReceive = storage.getMaxReceive();

    // Receive resource
    int received = storage.receive(stack, 1000, false);

    // Extract resource (shields return 0 by default)
    int extracted = storage.extract(stack, 1000, false);
}
```

| Method | Return Type | Description |
| :--- | :--- | :--- |
| `getResourceType()` | `IResourceType` | Get the resource type used by this shield |
| `getCapacity()` | `int` | Get maximum capacity |
| `getMaxReceive()` | `int` | Get maximum receive rate |
| `receive(ItemStack, int, boolean)` | `int` | Receive resource, returns actual amount received |
| `extract(ItemStack, int, boolean)` | `int` | Extract resource, returns actual amount extracted |

### `ResourceRegistry` Conflict Prevention

`ResourceRegistry` immediately throws `IllegalArgumentException` on duplicate ID registration:

```java
// First registration — success
SpartanShieldsAPI.registerResourceType(myMana);

// Second registration with same ID — throws exception
SpartanShieldsAPI.registerResourceType(anotherMana);
// → IllegalArgumentException: Resource type 'botania:mana' is already registered!

// Recommended: check existence first
ResourceRegistry.get(ResourceLocation.fromNamespaceAndPath("botania", "mana"))
    .ifPresentOrElse(
        existing -> { /* Already registered by another addon, use it */ },
        () -> { /* Not yet registered, proceed */ }
    );
```

---

## 🏷️ Tag System

`ShieldTags` provides public `TagKey<Item>` constants. Add your custom shields to these tags for corresponding functionality:

| Constant | Tag Path | Function |
| :--- | :--- | :--- |
| `ShieldTags.BASIC_SHIELDS` | `spartan_shields_unofficial:basic_shields` | Basic shield enchantment support |
| `ShieldTags.TOWER_SHIELDS` | `spartan_shields_unofficial:tower_shields` | Tower shield enchantment support |
| `ShieldTags.SHIELDS_WITH_BASH` | `spartan_shields_unofficial:shields_with_bash` | Shield bash functionality |

Add your shields in datapack Tag JSON files:

```json
// data/spartan_shields_unofficial/tags/item/basic_shields.json
{
  "replace": false,
  "values": [
    "mymod:mithril_shield"
  ]
}
```

---

## 🎨 Tower Shield Rendering

### `ITowerShieldRenderer` Interface

Provides complete rendering control for custom tower shields, combining model, texture, and tinting into a single interface:

| Method | Return Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `createLayerDefinition()` | `LayerDefinition` | Model definition | Must implement |
| `createModel(ModelPart)` | `ShieldBaseModel` | Create model instance | Must implement |
| `getTextureNoPattern()` | `ResourceLocation` | Texture without banner pattern | Must implement |
| `getTexturePattern()` | `ResourceLocation` | Texture with banner pattern | Must implement |
| `hasExtraLayers()` | `boolean` | Has extra render layers | `false` |
| `getExtraLayerRenderType(ItemStack)` | `RenderType` | Extra layer RenderType | `RenderType.solid()` |
| `tintRed()` | `float` | Tint red channel (0.0~1.0) | `1.0f` |
| `tintGreen()` | `float` | Tint green channel (0.0~1.0) | `1.0f` |
| `tintBlue()` | `float` | Tint blue channel (0.0~1.0) | `1.0f` |

### Registering a Renderer

:::danger[Client Lifecycle]
**Do NOT** create renderer instances in Item constructors, `DeferredRegister.register()` Suppliers, or any code that may execute on the server side!

`ITowerShieldRenderer` implementations reference `ModelPart`, `LayerDefinition` and other **client-only classes**, which will cause `ClassNotFoundException` crashes on dedicated servers.
:::

Correct registration approach:

```java
// In your mod constructor
public MyMod(IEventBus modBus, Dist dist) {
    if (dist == Dist.CLIENT) {
        modBus.addListener(this::onClientSetup);
    }
}

private void onClientSetup(FMLClientSetupEvent event) {
    event.enqueueWork(() -> {
        SpartanShieldsAPI.registerTowerShieldRenderer(
            MY_TOWER_SHIELD.get(),
            new ITowerShieldRenderer() {
                @Override
                public LayerDefinition createLayerDefinition() { /* ... */ }

                @Override
                public ShieldBaseModel createModel(ModelPart root) { /* ... */ }

                @Override
                public ResourceLocation getTextureNoPattern() {
                    return ResourceLocation.fromNamespaceAndPath("mymod", "textures/entity/shield/my_tower.png");
                }

                @Override
                public ResourceLocation getTexturePattern() {
                    return ResourceLocation.fromNamespaceAndPath("mymod", "textures/entity/shield/my_tower_pattern.png");
                }

                @Override
                public float tintRed() { return 0.8f; }    // Custom tinting
                @Override
                public float tintGreen() { return 0.9f; }
                @Override
                public float tintBlue() { return 1.0f; }
            }
        );
    });
}
```

---

## 📋 Complete Examples

### Example 1: Simple New Material Shield

```java
public class MyShieldAddon {
    public static final DeferredRegister<Item> ITEMS =
        DeferredRegister.create(Registries.ITEM, "my_addon");

    static final IShieldMaterial MITHRIL =
        SpartanShieldsAPI.createMaterial(800, 18, MyTags.MITHRIL_INGOT);

    public static final DeferredHolder<Item, ?> MITHRIL_SHIELD =
        ITEMS.register("mithril_shield",
            ShieldBuilder.create().material(MITHRIL).build()
        );

    public static final DeferredHolder<Item, ?> MITHRIL_TOWER =
        ITEMS.register("mithril_tower_shield",
            ShieldBuilder.create().material(MITHRIL).type(ShieldType.TOWER).build()
        );
}
```

### Example 2: Energy Shield (Using Built-in FE)

```java
public static final DeferredHolder<Item, ?> FLUX_SHIELD =
    ITEMS.register("flux_shield",
        ShieldBuilder.create()
            .type(ShieldType.TOWER)
            .poweredBy(ResourceRegistry.ENERGY, 500000, 2000)
            .build()
    );
// Capability auto-registered ✅ — recognized by Mekanism/Thermal chargers
```

### Example 3: Custom Mana Resource Shield

```java
// === In mod constructor ===
public MyMod(IEventBus modBus) {
    MyDataComponents.COMPONENTS.register(modBus);

    // Register Mana resource type (only 4 parameters!)
    SpartanShieldsAPI.registerResourceType(new SimpleResourceType(
        ResourceLocation.fromNamespaceAndPath("botania", "mana"),
        Component.literal("Mana"),
        MyDataComponents.STORED_MANA.get(),
        0x00C6FF
    ));
}

// === Item registration ===
IResourceType mana = ResourceRegistry.get(
    ResourceLocation.fromNamespaceAndPath("botania", "mana")
).orElseThrow();

public static final DeferredHolder<Item, ?> MANA_SHIELD =
    ITEMS.register("mana_shield",
        ShieldBuilder.create()
            .poweredBy(mana, 10000, 100)
            .blockEffect(MobEffects.REGENERATION, 40, 0)
            .build()
    );
```

### Example 4: Create Stress Units Shield

```java
SpartanShieldsAPI.registerResourceType(new SimpleResourceType(
    ResourceLocation.fromNamespaceAndPath("create", "stress_units"),
    Component.literal("SU"),
    MyDataComponents.STORED_STRESS.get(),
    0xFFED50
));

public static final DeferredHolder<Item, ?> BRASS_SHIELD =
    ITEMS.register("brass_mechanical_shield",
        ShieldBuilder.create()
            .type(ShieldType.TOWER)
            .poweredBy(
                ResourceRegistry.get(ResourceLocation.fromNamespaceAndPath("create", "stress_units")).orElseThrow(),
                256, 32
            )
            .build()
    );
```

### Example 5: Knockback Shield + Tower Rendering

```java
public static final DeferredHolder<Item, ?> MIRROR_SHIELD =
    ITEMS.register("mirror_shield",
        ShieldBuilder.create()
            .material(SpartanShieldsAPI.createMaterial(Tiers.DIAMOND, Tags.Items.GEMS_DIAMOND))
            .type(ShieldType.TOWER)
            .blockHandler((shield, player, attacker, dmg) -> {
                attacker.knockback(1.5,
                    player.getX() - attacker.getX(),
                    player.getZ() - attacker.getZ());
            })
            .build()
    );

// Client rendering — register in FMLClientSetupEvent
private void onClientSetup(FMLClientSetupEvent event) {
    event.enqueueWork(() -> {
        SpartanShieldsAPI.registerTowerShieldRenderer(MIRROR_SHIELD.get(), new MyMirrorRenderer());
    });
}
```

---

## ⚠️ Important Notes

### 1. ARGB Color Format

Minecraft 1.21+ `ItemColor.getColor()` must return `0xFFRRGGBB` format (including alpha channel), otherwise items will appear transparent in the inventory.

### 2. DataComponent Synchronization

Custom `DataComponentType` definitions **must include** the `networkSynchronized()` call:
```java
// ✅ Correct
builder.persistent(Codec.INT).networkSynchronized(ByteBufCodecs.INT)

// ❌ Wrong — client tooltip will display 0
builder.persistent(Codec.INT)
```

The main mod's `ModDataComponents.STORED_ENERGY` is already properly configured for sync. Using `ResourceRegistry.ENERGY` or `ResourceRegistry.MICRO_INFINITY` requires no additional setup.

### 3. Resource Type Registration Timing

Must call `SpartanShieldsAPI.registerResourceType()` in **your mod constructor**. NeoForge's mod loading order doesn't guarantee `FMLCommonSetupEvent` ordering, and late registration will cause other mods' `ResourceRegistry.get()` to return empty.

### 4. Registration Conflict Prevention

If two addon mods both register `"botania:mana"` as a resource type, the second registration will throw `IllegalArgumentException`. It's recommended that cross-mod addons check with `ResourceRegistry.get()` first.

### 5. Client Isolation

Interfaces in the `api.client` package are marked with `@OnlyIn(Dist.CLIENT)` and must not be referenced on the server side. **Never** instantiate renderers in Item constructors or DeferredRegister Suppliers.

### 6. Renderer Registration Timing

Must register in `FMLClientSetupEvent`'s `enqueueWork()`, or in the mod constructor after checking `dist == Dist.CLIENT`. Instantiating renderers in static fields will crash dedicated servers.

### 7. Tower Shield Multiplier

`ShieldType.TOWER` automatically applies the configured multiplier (currently ×1.25). The `poweredBy` capacity is also automatically multiplied by this factor.

### 8. Fully Automatic Capability Registration

Shields created via `ShieldBuilder.poweredBy()` are automatically scanned by the main mod during `RegisterCapabilitiesEvent`, which calls `IResourceType.onRegisterCapabilities()`. **Addon mods don't need to write any Capability event listener code.**

### 9. Builder Safety Validation

`ShieldBuilder.build()` runs `validate()` before returning the Supplier. Invalid configurations (empty shell, mutual exclusion, zero capacity, etc.) will immediately throw `IllegalStateException` with clear error messages.
