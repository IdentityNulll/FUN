const data = [
  {
    id: 1,
    situation: "Arguing about being wrong",
    roast: "Your ego is the only thing bigger than your mistakes.",
  },
  {
    id: 2,
    situation: "Started the argument",
    roast: "You're a professional at misreading situations.",
  },
  {
    id: 3,
    situation: "Won't admit you're wrong",
    roast: "Your stubbornness needs its own parking spot.",
  },
  {
    id: 4,
    situation: "Brought up the past",
    roast: "You collect old grudges like vintage wine.",
  },
  {
    id: 5,
    situation: "Raised your voice first",
    roast: "Your volume increases as your logic decreases.",
  },
  {
    id: 6,
    situation: "Made an unfair accusation",
    roast: "Your assumptions are bolder than your facts.",
  },
  {
    id: 7,
    situation: "Interrupted repeatedly",
    roast: "Your patience is shorter than your attention span.",
  },
  {
    id: 8,
    situation: "Refused to listen",
    roast: "Your ears are decorative, not functional.",
  },
  {
    id: 9,
    situation: "Made it personal",
    roast: "You attack when you can't defend your position.",
  },
  {
    id: 10,
    situation: "Twisted their words",
    roast: "Your comprehension skills need a software update.",
  },

  {
    id: 11,
    situation: "Played the victim",
    roast: "You've mastered the art of backward accountability.",
  },
  {
    id: 12,
    situation: "Brought up unrelated stuff",
    roast: "You navigate arguments like a GPS with no signal.",
  },
  {
    id: 13,
    situation: "Yelled without thinking",
    roast: "Your mouth moves faster than your brain.",
  },
  {
    id: 14,
    situation: "Refused to compromise",
    roast: "Your way or no way is a terrible road to take.",
  },
  {
    id: 15,
    situation: "Stormed off dramatically",
    roast: "Your dramatic exits deserve a film credit.",
  },
  {
    id: 16,
    situation: "Gave silent treatment",
    roast: "Silence is golden, but on you it's awkward.",
  },
  {
    id: 17,
    situation: "Used kitchen sink logic",
    roast: "You throw everything at the wall to see what sticks.",
  },
  {
    id: 18,
    situation: "Made excuses for yourself",
    roast: "Your excuses have excuses.",
  },
  {
    id: 19,
    situation: "Blamed everyone else",
    roast: "You're never wrong, just everyone else is.",
  },
  {
    id: 20,
    situation: "Brought up a low blow",
    roast: "That hit below the belt of what you know.",
  },

  {
    id: 21,
    situation: "Doubled down on nonsense",
    roast: "Your confidence in wrong ideas is admirable.",
  },
  {
    id: 22,
    situation: "Refused to apologize",
    roast: "Your pride is your most stubborn friend.",
  },
  {
    id: 23,
    situation: "Turned it into your trauma",
    roast: "Everything becomes about you somehow.",
  },
  {
    id: 24,
    situation: "Said something you regret",
    roast: "Your filter stopped working mid-sentence.",
  },
  {
    id: 25,
    situation: "Acted like a know-it-all",
    roast: "Confidence is cute when it's earned.",
  },
  {
    id: 26,
    situation: "Gaslit them",
    roast: "Rewriting history to suit your narrative is creative.",
  },
  {
    id: 27,
    situation: "Brought up their insecurity",
    roast: "You fought dirty when the rules didn't serve you.",
  },
  {
    id: 28,
    situation: "Refused to make eye contact",
    roast: "Your guilt is as obvious as your avoidance.",
  },
  {
    id: 29,
    situation: "Made it about winning",
    roast: "Arguments aren't sports you can dominate.",
  },
  {
    id: 30,
    situation: "Brought up cheating past",
    roast: "You fight with weapons you've already used.",
  },

  {
    id: 31,
    situation: "Cried as an excuse",
    roast: "Your tears are a fantastic distraction technique.",
  },
  {
    id: 32,
    situation: "Called them names",
    roast: "You trade insults when you're out of arguments.",
  },
  {
    id: 33,
    situation: "Threw something in anger",
    roast: "Your anger management is as controlled as your temper.",
  },
  {
    id: 34,
    situation: "Wouldn't let it go",
    roast: "You carry grudges like they're going out of style.",
  },
  {
    id: 35,
    situation: "Misremembered intentionally",
    roast: "Your memory is selective when it's convenient.",
  },
  {
    id: 36,
    situation: "Threatened to leave",
    roast: "Your ultimatums work great until they don't.",
  },
  {
    id: 37,
    situation: "Guilt tripped them",
    roast: "Emotional blackmail is your favorite weapon.",
  },
  {
    id: 38,
    situation: "Ignored them for days",
    roast: "Your silent protests are louder than you think.",
  },
  {
    id: 39,
    situation: "Twisted a joke into a fight",
    roast: "Your humor lands somewhere between awful and offensive.",
  },
  {
    id: 40,
    situation: "Made them feel stupid",
    roast: "Belittling works until people stop caring what you think.",
  },

  {
    id: 41,
    situation: "Brought up your ex",
    roast: "You compare when you can't compete.",
  },
  {
    id: 42,
    situation: "Said they were overreacting",
    roast: "Invalidating their feelings won't make you right.",
  },
  {
    id: 43,
    situation: "Threatened to tell others",
    roast: "You weaponize secrets when cornered.",
  },
  {
    id: 44,
    situation: "Minimized their pain",
    roast: "Your empathy took a sick day today.",
  },
  {
    id: 45,
    situation: "Brought up their weight",
    roast: "You went for the looks when you lost the argument.",
  },
  {
    id: 46,
    situation: "Made sarcastic remarks",
    roast: "Your sarcasm is armor for not saying sorry.",
  },
  {
    id: 47,
    situation: "Used their insecurities",
    roast: "You know exactly how to hurt them, unfortunately.",
  },
  {
    id: 48,
    situation: "Changed the subject",
    roast: "Running from accountability is your superpower.",
  },
  {
    id: 49,
    situation: "Laughed at their pain",
    roast: "Cruelty looks good on nobody.",
  },
  {
    id: 50,
    situation: "Said 'you always' or 'you never'",
    roast: "Absolutes are easier than real conversation.",
  },

  {
    id: 51,
    situation: "Brought up their family",
    roast: "You swing wide when you're losing.",
  },
  {
    id: 52,
    situation: "Complained to others first",
    roast: "You gather allies before you hear them out.",
  },
  {
    id: 53,
    situation: "Mentioned breaking up",
    roast: "You nuke things when you can't win them.",
  },
  {
    id: 54,
    situation: "Made them cry",
    roast: "Mission accomplished in your mind?",
  },
  {
    id: 55,
    situation: "Refused to admit your role",
    roast: "Your denial is powerful but not convincing.",
  },
  {
    id: 56,
    situation: "Used whataboutism",
    roast: "Two wrongs don't make a right or a good argument.",
  },
  {
    id: 57,
    situation: "Brought up their job",
    roast: "You attacked their livelihood when logic failed.",
  },
  {
    id: 58,
    situation: "Said mean things in a 'joke'",
    roast: "Cruelty with a laugh is still cruelty.",
  },
  {
    id: 59,
    situation: "Ignored their apology",
    roast: "Your grudge has overstayed its welcome.",
  },
  {
    id: 60,
    situation: "Made false accusations",
    roast: "Fiction works better in novels than fights.",
  },

  {
    id: 61,
    situation: "Brought up finances",
    roast: "You weaponize money when feelings fail.",
  },
  {
    id: 62,
    situation: "Said they're too sensitive",
    roast: "Gaslighting their emotions is not the move.",
  },
  {
    id: 63,
    situation: "Threw their past in their face",
    roast: "People change, you just won't let them.",
  },
  {
    id: 64,
    situation: "Made up your mind unfairly",
    roast: "Judge, jury, executioner—pick one role.",
  },
  {
    id: 65,
    situation: "Brought up their appearance",
    roast: "Going for looks is the lowest low.",
  },
  {
    id: 66,
    situation: "Said something unforgivable",
    roast: "Some words echo longer than apologies.",
  },
  {
    id: 67,
    situation: "Refused to hear them out",
    roast: "Closed ears, closed heart, closed door.",
  },
  {
    id: 68,
    situation: "Made them feel alone",
    roast: "Isolation is what you chose as a weapon.",
  },
  {
    id: 69,
    situation: "Brought up their family struggles",
    roast: "You kicked them when they were already down.",
  },
  {
    id: 70,
    situation: "Said they were useless",
    roast: "Your words linger longer than you care.",
  },

  {
    id: 71,
    situation: "Refused to change anything",
    roast: "Growth isn't your strongest trait.",
  },
  {
    id: 72,
    situation: "Made empty promises after",
    roast: "Your apologies are as hollow as your arguments.",
  },
  {
    id: 73,
    situation: "Brought up an ex again",
    roast: "You're stuck in a time loop of comparisons.",
  },
  {
    id: 74,
    situation: "Turned friends against them",
    roast: "Team-building at their expense is cowardly.",
  },
  {
    id: 75,
    situation: "Said 'I don't care'",
    roast: "Apathy is the cruelest response.",
  },
  {
    id: 76,
    situation: "Blamed them for your feelings",
    roast: "Your emotions are your responsibility alone.",
  },
  {
    id: 77,
    situation: "Made them feel worthless",
    roast: "Impact matters more than intent.",
  },
  {
    id: 78,
    situation: "Refused to acknowledge hurt",
    roast: "Denial doesn't heal the damage you caused.",
  },
  {
    id: 79,
    situation: "Brought up intimate details",
    roast: "Privacy became your collateral damage.",
  },
  {
    id: 80,
    situation: "Said hurtful truths",
    roast: "Truth without kindness is just cruelty.",
  },

  {
    id: 81,
    situation: "Made them question themselves",
    roast: "Erosion of confidence takes time and skill.",
  },
  {
    id: 82,
    situation: "Refused to validate them",
    roast: "Acknowledgment costs nothing but pride.",
  },
  {
    id: 83,
    situation: "Brought up your accomplishments",
    roast: "Superiority is a terrible defense strategy.",
  },
  {
    id: 84,
    situation: "Made it about scoring points",
    roast: "Relationships aren't battles to win.",
  },
  {
    id: 85,
    situation: "Said you don't respect them",
    roast: "That's a bomb that explodes slowly.",
  },
  {
    id: 86,
    situation: "Made them feel invalidated",
    roast: "Dismissal is the loneliest feeling.",
  },
  {
    id: 87,
    situation: "Refused professional help",
    roast: "Pride prevents growth more than anything.",
  },
  {
    id: 88,
    situation: "Made hollow reconciliation",
    roast: "A band-aid on a wound that needs stitches.",
  },
  {
    id: 89,
    situation: "Brought up their vulnerabilities",
    roast: "You aimed at the softest part on purpose.",
  },
  {
    id: 90,
    situation: "Said they'd regret it",
    roast: "Threats are the last resort of the desperate.",
  },
  {
    id: 91,
    situation: "Made them apologize first",
    roast: "You demand peace without taking responsibility.",
  },
  {
    id: 92,
    situation: "Argued with bad intentions",
    roast: "You've perfected the art of being fashionably cruel.",
  },
];

const situation = document.querySelector(".situation");
const excuse = document.querySelector(".excuse");
const start = document.querySelector(".start");

start.addEventListener("click", () => {
  const randomId = Math.floor(Math.random() * 100);
  console.log(randomId);

  data.forEach((i) => {
    if (i.id === randomId) {
      const item = i;
      excuse.textContent = `Excuse: ${item.roast}`;
      situation.textContent = `Situation: ${item.situation}`;
    }
  });
});
