'use server';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function generateOperatingManual(userId: string) {
  // Simulate OpenAI API latency (usually 3-5 seconds for complex generation)
  await delay(3500);

  // In a real app, this would be:
  // const response = await openai.chat.completions.create({
  //   model: 'gpt-4o',
  //   messages: [
  //     { role: 'system', content: 'Analyze this user data and generate a peak performance operating manual...' },
  //     { role: 'user', content: JSON.stringify(userData) }
  //   ]
  // });

  return {
    success: true,
    manual: {
      peakFocusWindow: '8:10 AM - 11:40 AM',
      minimumSleep: '6.7 hours',
      distractionThreshold: '>42 min social media → 28% focus drop',
      bestRecovery: '20-minute walking (restores focus in 22 min avg)',
      mostProductiveDay: 'Tuesday',
      worstTrigger: 'Late-night phone use (causes -2h focus next day)',
    }
  };
}

export async function detectBottleneck(userId: string) {
  await delay(2500);

  return {
    success: true,
    bottleneck: {
      primaryIssue: 'Late Night Phone Usage',
      hoursLostPerMonth: 47,
      suggestedFix: 'Block social media routing after 9 PM',
      expectedGainHours: 29,
    }
  };
}
