---
title: "Diversification Can Disappear Exactly When You Need It Most"
description: "A quantitative strategy can look diversified, systematic, and statistically robust in normal markets while carrying risks that reveal themselves only when many positions fail together."
date: 2026-09-02
category: "Economic Thinking"
tags: ["Diversification", "Quantitative Investing", "Tail Risk"]
language: "en"
featured: false
draft: false
---

> A quantitative strategy can look diversified, systematic, and statistically robust in normal markets while carrying risks that reveal themselves only when many positions fail together.

Quantitative investing has an obvious appeal. A systematic strategy can process thousands of companies, react to information quickly, remove some emotional biases, preserve knowledge inside a repeatable process, and test ideas across decades of historical data. Compared with relying entirely on one person's judgment, it can look far more disciplined. But that discipline can create its own form of confidence. Once a strategy has survived decades of backtests, contains hundreds of securities, and is supported by a sophisticated model, it becomes easy to believe that its risks are understood.

The most important lesson from this lecture is that they often are not. Momentum provides a useful example. Historically, buying recent winners and shorting recent losers has produced attractive average returns. But averages hide the shape of the losses. After severe market declines, the stocks that performed worst are often distressed companies that were hit hardest during the crisis. If the market suddenly rebounds, those same stocks can rise explosively. A momentum portfolio is positioned in exactly the wrong direction. It is long the previous winners and short the previous losers.

The strategy does not gradually become a little less effective. It can lose an extraordinary amount in a short period. This is strategy failure risk: a relationship that works on average can break precisely in a particular state of the world. The second problem is even more interesting because the strategy itself does not need to be wrong. Suppose many quantitative funds discover similar signals. They own similar value stocks, momentum stocks, or low-risk stocks. One large fund suddenly needs cash and begins liquidating its positions.

Its selling pushes down the securities that other quantitative funds also own. Those funds now report losses. Investors withdraw capital, leverage becomes more difficult to maintain, and margin requirements may rise. They are forced to sell the same positions. The next fund then experiences the same problem. What began as one investor's financing problem becomes a market-wide problem. This is why liquidity cannot be understood only as whether a stock normally trades a large number of shares. The more dangerous question is whether everyone will want to exit the same trade at the same time.

A portfolio can contain hundreds of stocks and still represent one crowded position. The third problem is model risk. Quantitative investing depends on estimated relationships: expected returns, volatilities, default probabilities, and especially correlations. In ordinary periods, correlations may appear low. A model therefore concludes that combining many assets produces enormous diversification. Then a crisis arrives. Assets that historically behaved independently suddenly move together because investors are responding to the same financing shock, economic event, or need for liquidity. The portfolio was diversified statistically.

Economically, it was exposed to the same underlying event. This is what made LTCM's experience so important. A portfolio containing many different trades was supposed to have limited daily risk. Yet during the crisis, correlations changed dramatically and losses became many times larger than the model considered plausible. The problem was not simply that a parameter estimate was slightly wrong. The mistake was treating a parameter estimated from normal history as if it remained stable in the state of the world where it mattered most.

That changes how I think about backtests and risk models. A strong historical Sharpe ratio is evidence that a strategy worked under the environments contained in the sample. It is not proof that the strategy is safe. And owning many securities is not the same thing as owning many independent risks. The broader lesson is that the most dangerous risks are often conditional. A strategy fails when the regime changes. Liquidity disappears when everyone needs it. Correlations rise when diversification is most valuable. Leverage becomes restrictive after losses have already occurred.

So the important question is not only: **How much risk does this portfolio appear to have today?** It is also: **What assumptions about the world have to remain true for that estimate to remain meaningful?** Quantitative investing can remove emotion from execution. It cannot remove uncertainty from the model.
