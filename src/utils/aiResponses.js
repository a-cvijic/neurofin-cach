export const getAIResponse = (
  userMessage,
  categoryData,
  totalSpent,
  savingGoal
) => {
  const msg = userMessage.toLowerCase();

  // Breakdown questions
  if (
    msg.includes("breakdown") ||
    msg.includes("spending") ||
    msg.includes("analysis")
  ) {
    return `📊 **Spending Breakdown:**

Your total spending this month is **€${totalSpent.toFixed(
      2
    )}** across transactions.

Top categories:
${categoryData
  .slice(0, 3)
  .map(
    (c, i) =>
      `${i + 1}. ${c.emoji} ${c.name}: €${c.value.toFixed(2)} (${(
        (c.value / totalSpent) *
        100
      ).toFixed(0)}%)`
  )
  .join("\n")}

💡 **Insight:** ${
      categoryData[0].name
    } is your biggest expense category. Consider setting a budget limit here!`;
  }

  // Food delivery questions
  if (
    msg.includes("food") ||
    msg.includes("delivery") ||
    msg.includes("restaurant")
  ) {
    const foodSpending =
      categoryData.find((c) => c.name === "Food Delivery")?.value || 0;
    return `🍕 **Food Delivery Analysis:**

You've spent **€${foodSpending.toFixed(2)}** on food delivery this month.

If you cooked at home instead:
• Potential savings: **€${(foodSpending * 0.6).toFixed(2)}**
• That's enough for ${Math.floor(
      (foodSpending * 0.6) / 20
    )} extra grocery trips!

🎯 **Challenge:** Try reducing delivery orders by 2 per week. You could save €40-50/month!`;
  }

  // Goal questions
  if (msg.includes("goal") || msg.includes("save") || msg.includes("saving")) {
    const remaining = savingGoal.target - savingGoal.current;
    return `🎯 **Your Saving Goal:**

Current progress: **€${savingGoal.current} / €${savingGoal.target}**
That's **${((savingGoal.current / savingGoal.target) * 100).toFixed(
      0
    )}%** complete! 🚀

Remaining: **€${remaining.toFixed(2)}**

You're on track! Here's how to reach it faster:
• Cut 2 food deliveries = Save €60
• Use public transport twice = Save €10
• Skip one shopping trip = Save €45

You got this! 💪`;
  }

  // Tips questions
  if (msg.includes("tip") || msg.includes("advice") || msg.includes("help")) {
    return `💡 **Smart Money Tips for You:**

Based on your spending patterns:

1️⃣ **Meal Prep Sundays:** Cook in bulk to avoid delivery temptation
2️⃣ **30-Day Rule:** Wait 30 days before big purchases (Shopping: €${categoryData
      .find((c) => c.name === "Shopping")
      ?.value.toFixed(2)})
3️⃣ **Round-Up Savings:** Round transactions to nearest €5 and save the difference
4️⃣ **Weekly Budget:** Set €${(totalSpent / 4).toFixed(2)}/week limit

Pick one to start with! 🎯`;
  }

  // Transport questions
  if (
    msg.includes("transport") ||
    msg.includes("car") ||
    msg.includes("uber")
  ) {
    const transport =
      categoryData.find((c) => c.name === "Transport")?.value || 0;
    return `🚗 **Transport Spending:**

You've spent **€${transport.toFixed(2)}** on transport.

💡 **Ways to save:**
• Monthly public transport pass ≈ €50 (vs your €${transport.toFixed(2)})
• Bike for short trips = **FREE** + healthy! 🚴
• Carpool with colleagues = Save 50%

Small changes add up! 🌱`;
  }

  // Default responses
  const responses = [
    `I analyzed your data! Your spending is concentrated in ${
      categoryData[0].name
    } (${((categoryData[0].value / totalSpent) * 100).toFixed(
      0
    )}%). Want specific tips for this category?`,
    `Great question! Your average transaction is €${(
      totalSpent / categoryData.length
    ).toFixed(2)}. You're ${(
      (savingGoal.current / savingGoal.target) *
      100
    ).toFixed(0)}% toward your goal. Need help optimizing?`,
    `Looking at your patterns, you could save €${(
      (categoryData.find((c) => c.name === "Food Delivery")?.value || 0) * 0.4
    ).toFixed(2)}/month by meal prepping! Want a breakdown?`,
  ];
  return responses[Math.floor(Math.random() * responses.length)];
};
