---
title: "衍生品与 Delta 对冲"
description: "理解期权敏感度如何连接价格变化、对冲比例与风险控制"
date: 2026-05-13
category: "衍生品"
tags: ["衍生品", "期权", "对冲"]
language: "zh"
translationKey: "derivatives-and-delta-hedging"
draft: false
---

Delta 衡量的是标的资产变化一个单位时，期权价格预期会变化多少

## 对冲逻辑

Delta 对冲试图通过持有标的资产头寸来抵消方向性暴露

这个对冲不是永久的，因为价格、时间和波动率变化都会改变 Delta

## 风险提醒

Delta 对冲降低了一类风险暴露，但并不会消除 Gamma、波动率、流动性或模型风险
