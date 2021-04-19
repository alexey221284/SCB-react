import React, {useEffect, useState} from "react";
import  { Word, getWordsLocalStore } from "../../utils";
import List from "./blocks/list"
import Search from "./blocks/search"

const Favorites = () => {
    const [wordsList, setWordsList] = useState([]);

    useEffect(() => {
       setWordsList(getWordsLocalStore())
    }, []);

    const list = wordsList.map((item:Word) => {
        return <List key={item.text + 'favorites'} delLocal={setWordsList} _word={item}/>
    });

    return (
        <main className='main'>
            <Search resultCallBack={setWordsList} localSearch={true} />
            <div className='content'>
                {
                    wordsList.length > 0 ? <ul className='content--list'>
                        {list}
                    </ul>: 'No added words found'
                }
            </div>
        </main>
    );
}
export default Favorites;