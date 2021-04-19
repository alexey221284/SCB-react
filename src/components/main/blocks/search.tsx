import React, {useEffect, useState} from "react";
import  { getWordsLocalStore, searchWordLocalStore, searchWordsLocalStore } from "../../../utils";
import axios from "axios";
import  { partOfSpeechCodeList } from "../../../utils";

type IProps = {
    resultCallBack: CallableFunction
    localSearch?: boolean
}
const Search: React.FC<IProps> = ({resultCallBack, localSearch}): JSX.Element => {
    const [search, setSearch] = useState('');
    const [checkPartOfSpeech, setCheckPartOfSpeech] = useState<any[]>([]);

    useEffect(() => {
        if(search.length >= 2 && !localSearch) {
            axios.get(`${process.env.SKYENG_API_URL}/search?search=${search}&page=1&pageSize=10`)
                .then(r => {
                    const res = r.data.map((item: { id: number, save: boolean, partOfSpeech: string, meanings: any }) => {
                        item.save = searchWordLocalStore(item.id);
                        for(const key in partOfSpeechCodeList){
                            if(key === item.meanings[0].partOfSpeechCode) { // @ts-ignore
                                item.partOfSpeech = partOfSpeechCodeList[key]
                            }
                        }
                        return item;
                    });
                    resultCallBack(res);
                });
        } else resultCallBack([])

        if(localSearch) {
            resultCallBack(searchWordsLocalStore(search));
        }
    }, [search]);

    const onChecked = (target: { checked: boolean, value: any }): void => {
        const options: any[] = checkPartOfSpeech
        let index

        if (target.checked) {
          options.push(target.value)
        } else {
          index = options.indexOf(target.value)
          options.splice(index, 1)
        }

        setCheckPartOfSpeech(options)
        resultCallBack(checkPartOfSpeech.length > 0 ? getWordsLocalStore().filter((word: { partOfSpeech: string }) => {
            return checkPartOfSpeech.includes(word.partOfSpeech)
        }) : getWordsLocalStore())
    }

    const partOfSpeechArray = () => {
        const localWords = getWordsLocalStore();
        const parts = localWords.map((word: { partOfSpeech: string; }) => word.partOfSpeech)
        return [...new Set(parts)].sort()
    }

    const listPartOfSpeech = localSearch? partOfSpeechArray().map((item: any) => {
        return (
            <label key={item} htmlFor={item}>
                <input type="checkbox" id={item} value={item} onChange={(e) => onChecked(e.target)} />{item}
            </label>
        )
    }) : null;

    return (
        <aside className='left--aside'>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='search...'/>
            <div className='checkboxs'>
                {listPartOfSpeech}
            </div>
        </aside>
    );
}

export default Search;