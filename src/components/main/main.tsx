import React, {useState} from "react";
import  { Word } from "../../utils";
import List from "./blocks/list"
import Search from "./blocks/search"

export const Main = () => {
    const [wordsList, setWordsList] = useState([]);

    const list = wordsList.map((item:Word) => {
        return <List key={item.text + item.id} _word={item}/>
    });

    return (
        <main className='main'>
            <Search resultCallBack={setWordsList} />
            <div className='content'>
                {
                    wordsList.length > 0 ? <ul className='content--list'>
                        {list}
                    </ul>: 'Start typing an English word and the search will start automatically after the 2nd character. Search in other languages is not available.'
                }
               
            </div>
        </main>
    );
}
