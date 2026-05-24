export interface BaseScript {
  id: string
  name: string
  tagline: string
  characters: string[]
}

export const baseScripts: BaseScript[] = [
  {
    id: 'trouble-brewing',
    name: 'Trouble Brewing',
    tagline: 'The classic introductory script',
    characters: [
      'Washerwoman', 'Librarian', 'Investigator', 'Chef', 'Empath',
      'Fortune Teller', 'Undertaker', 'Monk', 'Ravenkeeper', 'Virgin',
      'Slayer', 'Soldier', 'Mayor',
      'Butler', 'Drunk', 'Recluse', 'Saint',
      'Poisoner', 'Spy', 'Scarlet Woman', 'Baron',
      'Imp',
    ],
  },
  {
    id: 'bad-moon-rising',
    name: 'Bad Moon Rising',
    tagline: 'Dangerous outsiders and powerful demons',
    characters: [
      'Grandmother', 'Sailor', 'Chambermaid', 'Exorcist', 'Innkeeper',
      'Gambler', 'Gossip', 'Courtier', 'Professor', 'Minstrel',
      'Tea Lady', 'Pacifist', 'Fool',
      'Goon', 'Lunatic', 'Tinker', 'Moonchild',
      'Godfather', "Devil's Advocate", 'Assassin', 'Mastermind',
      'Zombuul', 'Pukka', 'Shabaloth', 'Po',
    ],
  },
  {
    id: 'sects-and-violets',
    name: 'Sects & Violets',
    tagline: 'High-information chaos for experienced players',
    characters: [
      'Clockmaker', 'Dreamer', 'Snake Charmer', 'Mathematician', 'Flowergirl',
      'Town Crier', 'Oracle', 'Savant', 'Seamstress', 'Philosopher',
      'Artist', 'Juggler', 'Sage',
      'Mutant', 'Sweetheart', 'Barber', 'Klutz',
      'Evil Twin', 'Witch', 'Cerenovus', 'Pit-Hag',
      'Fang Gu', 'Vigormortis', 'No Dashii', 'Vortox',
    ],
  },
]
