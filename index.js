const natural = require('natural')
const Tagger = natural.BrillPOSTagger
const baseFolder = './node_modules/natural/lib/natural/brill_pos_tagger'
const rulesFilename = baseFolder + '/data/English/tr_from_posjs.txt'
const lexiconFilename = baseFolder + '/data/English/lexicon_from_posjs.json'

const defaultCategory = 'N'

function classifyWords (string) {
  const lexicon = new natural.Lexicon(lexiconFilename, defaultCategory)
  const rules = new natural.RuleSet(rulesFilename)
  const tagger = new Tagger(lexicon, rules)
  const myString = string.split(' ')
  return JSON.stringify(tagger.tag(myString))
}

// Distance algorithm between words
// ***** JaroWinkler Distance *****
// Result range goes from 0 to 1, where 0 means different and 1 means deep equality
// Good at: short words and detect duplicate words
// Use: distanceBetweenWords('code', 'coder', 'JaroWinklerDistance')
// ***** Levenshtein Distance *****
// Minimun of edits needed to turn one word into the other,
// where edit means delete, create or replace
// distanceBetweenWords('code', 'coder', 'LevenshteinDistance')

function distanceBetweenWords (string1, string2, algorithm) {
  return natural[algorithm](string1, string2)
}

console.log(
  'JaroWinklerDistance (code, coder):',
  distanceBetweenWords('code', 'coder', 'JaroWinklerDistance')
)
console.log(
  'LevenshteinDistance (code, coder):',
distanceBetweenWords('code', 'coder', 'LevenshteinDistance')
)
