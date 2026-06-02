---
title: 斯巴达武器 (非官方版)
description: 斯巴达武器非官方版模组介绍
---

<p align="center">
  <img src="https://raw.githubusercontent.com/Mai-xiyu/ProJect_Docs/refs/heads/master/public/img/sp_logo.png" alt="SPLogo" width="720" height="393">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Minecraft-1.21.1-green?style=flat-square" alt="Minecraft Version">
  <img src="https://img.shields.io/badge/Loader-NeoForge-orange?style=flat-square" alt="Loader">
  <img src="https://img.shields.io/badge/Java-21-blue?style=flat-square" alt="Java 21">
  <img src="https://img.shields.io/badge/API-v14-purple?style=flat-square" alt="API Version">
  <img src="https://img.shields.io/github/license/Mai-xiyu/SpartanWeaponry-NeoForge?style=flat-square" alt="License">
</p>

## 特性

- **多样化的武器库**: 增加了大量源自历史和奇幻题材的全新武器。
- **丰富的 API**: 保留旧版 `createXxx(WeaponMaterial)` 方法，同时提供通用 `createWeapon(...)`、材质 builder、武器分类元数据和 tag helper。
- **更好的兼容性**: 针对现代 Minecraft 版本进行了移植和优化。
- **数据包友好 Tag**: 按武器类型、材质和来源 namespace 提供分组物品 tag，方便数据包、整合包和 KubeJS 使用。
- **可选武器油**: 武器油机制存在，但默认通过 `enable_weapon_oil=false` 关闭，需要整合包主动开启。
- **回归测试指引**: 维护文档覆盖 action trait、投掷武器拾取、ammo 状态和专用服务端行为检查。

## 下载与安装

支持的版本：**Minecraft 1.21.1 (NeoForge)**

<a href="https://www.curseforge.com/minecraft/mc-mods/spartan-weaponry-unofficial"><img src="https://img.shields.io/badge/CurseForge-下载-f16436?style=for-the-badge&logo=curseforge" alt="CurseForge"></a>
<a href="https://modrinth.com/mod/spartan-weaponry-unofficial"><img src="https://img.shields.io/badge/Modrinth-下载-1bd96a?style=for-the-badge&logo=modrinth" alt="Modrinth"></a>
<a href="https://github.com/Mai-xiyu/SpartanWeaponry-NeoForge"><img src="https://img.shields.io/badge/GitHub-源码-181717?style=for-the-badge&logo=github" alt="GitHub"></a>

1. **下载模组**：点击上方按钮下载最新版本。
2. **放入文件夹**：将下载的 `.jar` 文件放入 `.minecraft/mods` 文件夹中。
3. **启动游戏**：确保已安装 NeoForge 加载器。

:::note
这是一个非官方的移植版本，旨在为新版本 Minecraft 提供支持。
:::

## 开发者链接

- [API 参考](./api-reference/)
- [资源包与数据包指南](./resource-pack-development-guide/)
- [源码仓库](https://github.com/Mai-xiyu/SpartanWeaponry-NeoForge)
