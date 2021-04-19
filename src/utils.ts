import store from 'store';

export const getWordsLocalStore = () => {
    return store.get('words') || []
}
export const saveWordLocalStore = (word: { save: boolean}) => {
    const words = store.get('words') || [];
    words.unshift(word);
    store.set('words', words);
}
export const searchWordLocalStore = (id: number) => {
    const words = store.get('words') || [];
    return words.some((word: { id: number}) => word.id === id)
}
export const deletehWordLocalStore = (id: number, callback?: CallableFunction) => {
    const words = store.get('words') || [];
    const index = words.findIndex((word: { id: number}) => word.id === id)
    words.splice(index, 1)
    store.set('words', words);

    if(callback) callback(getWordsLocalStore())
}

export const searchWordsLocalStore = (search: string) => {
    const words = store.get('words') || [];
    return words.filter((word: { text : string})=> {
        const lc = word.text.toLowerCase();
        const filter = search.toLowerCase();
        return lc.includes(filter);
    })
}
export const partOfSpeechCodeList = {
    n: 'noun',
    v: 'verb',
    j: 'adjective',
    r: 'adverb',
    prp: 'preposition',
    prn: 'pronoun',
    crd: 'cardinal number',
    cjc: 'conjunction',
    exc: 'interjection',
    det: 'article',
    abb: 'abbreviation',
    x: 'particle',
    ord: 'ordinal number',
    md: 'modal verb',
    ph: 'phrase',
    phi: 'idiom'
};

export const detailsWord = [
    {key: 'definition', value: 'Definitions', description: 'The meaning of the word, including its part of speech.'},
    {key: 'synonyms', value: 'Synonyms', description: 'Words that can be interchanged for the original word in the same context.'},
    {key: 'antonyms', value: 'Antonyms', description: 'Words that have the opposite context of the original word.'},
    {key: 'examples', value: 'Examples', description: 'Example sentences using the word.'},
    {key: 'typeOf', value: 'Hypernyms', description: 'Words that are more generic than the original word. For example, a hatchback is a type of car.'},
    {key: 'hasTypes', value: 'Hyponyms', description: 'Words that are more specific than the original word. For example, purple has types violet, lavender, mauve, etc.'},
    {key: 'partOf', value: 'Holonyms', description: 'The larger whole to which this word belongs. For example, a finger is part of a hand, a glove, a paw, etc.'},
    {key: 'hasParts', value: 'Meronyms', description: 'Words that are part of the original word. For example, a building has parts such as roofing, plumbing etc.'},
    {key: 'instanceOf', value: 'Examples of the word', description: 'Words that are examples of the original word. For example, president has instances such as theodore roosevelt, van buren, etc'},
    {key: 'similarTo', value: 'Phrases', description: 'Phrases to which the original word belongs. For example, bump is used in the phrase bump off.'},
    {key: 'entails', value: 'Definitions', description: 'The meaning of the word, including its part of speech.'},
    {key: 'substanceOf', value: 'Substances', description: 'Substances to which the original word is a part of. For example, water is a substance of sweat.'},
    {key: 'hasSubstances', value: 'Has Substances', description: 'Substances that are part of the original word. For example, wood has a substance called lignin.'}
]

export type Word = {
    id: number | any
    text: string | any
    save: boolean | any
    partOfSpeech: string | any
    meanings: {
        transcription: string
        previewUrl: string
        soundUrl: string
        translation: {
            text: string
        }
    }[]
    [key: string]: any
}

