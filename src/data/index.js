const CategoriesList = [
  "Cat A",
  "Cat B",
  "Cat C",
  "Cat D",
  "Cat E",
  "Cat F",
  "Cat G",
  "Cat H",
];

const DeckList = [
  {
    name: "Deck A",
    numberOfCards: 3,
    percentCompleted: 82,
    isScheduled: false,
    revisedTimes: 3,
    deckId: "0",
  },
  {
    name: "Deck B",
    numberOfCards: 3,
    percentCompleted: 52,
    isScheduled: true,
    revisedTimes: 7,
    deckId: "0",
  },
  {
    name: "Deck C",
    numberOfCards: 5,
    percentCompleted: 22,
    isScheduled: true,
    revisedTimes: 3,
    deckId: "0",
  },
  {
    name: "Deck D",
    numberOfCards: 11,
    percentCompleted: 72,
    isScheduled: false,
    revisedTimes: 8,
    deckId: "0",
  },
  {
    name: "Deck E",
    numberOfCards: 12,
    percentCompleted: 2,
    isScheduled: false,
    revisedTimes: 0,
    deckId: "0",
  },
];

const SampleDeck = {
  name: "Deck A",
  numberOfCards: 3,
  percentCompleted: 82,
  isScheduled: false,
  revisedTimes: 3,
  deckId: "0",
};

const FlashCards = [
  {
    face: "Benevolent",
    rear: "Well meaning and kindly.",
    tag: "1",
    categories: ["Cat A"],
  },
  {
    face: "Accord",
    rear: "Concurrence of opinion",
    tag: "0",
    categories: [],
  },
  {
    face: "Constitute",
    rear: "Compose or represent",
    tag: "-1",
    categories: ["Cat H"],
  },
];

export { CategoriesList, DeckList, FlashCards, SampleDeck };
