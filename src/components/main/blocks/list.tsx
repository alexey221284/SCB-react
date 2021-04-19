import React, {useRef, useState} from "react";
import { Word, detailsWord, saveWordLocalStore, deletehWordLocalStore } from "../../../utils";
import Modal from "./modal"
import axios from "axios";

type IProps = {
    _word: Word
    delLocal?: CallableFunction
}

const List: React.FC<IProps> = ({ _word, delLocal }) => {
    const [word, setWord] = useState(_word);
    const {transcription, previewUrl, soundUrl, translation} = word.meanings[0];
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(false);

    const audio = useRef({} as HTMLAudioElement);

    const playAudio = () => {
        if (audio.current !== null) {
            audio.current.play()
        }
    }
    const loadDescription = async (search: string) => {
        await axios.get(`${process.env.WORDS_API_URL+search}`, {
            headers: {
                'x-rapidapi-key': `${process.env.WORDS_API_KEY}`,
                'x-rapidapi-host': `${process.env.WORDS_API_HOST}`
            }
        }).then((r: { data: { results: object[]; }; }) => {
            setWord(Object.assign(word, r.data.results[0]))
            console.log(word);
        }).catch(error => {
            setError(true)
        });

        setShowModal(true)
    };

    const getListDetailsForModal = () => {
        let details = [];
        for(let detail of detailsWord) {
            if (word.hasOwnProperty(detail.key)) {
                if(typeof word[detail.key] === 'string') {
                    details.push(
                        <li key={detail.value}>
                            <h3 className='title'>{detail.value}:</h3> {word[detail.key]}
                        </li>)
                } else {
                    const list = word[detail.key].map((item: string) => {
                        return (
                            <span key={item}>
                                {word[detail.key][word[detail.key].length - 1] === item ? item : item+', '}
                            </span>

                        )
                    })
                    details.push(
                        <li key={detail.value}>
                            <h3 className='title'>{detail.value}:</h3> {list}
                        </li>
                    );
                }
            }
        }
        return details;
    }

    const listDetailsWord = getListDetailsForModal();

    const modal = showModal ? (
        <Modal>
            <div  className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <h2>General information about the word: {word.text}</h2>
                    </div>
                    <div className="modal-body">
                        { error ? <div className='error'>Information on the word was not found!</div> :
                            <>
                                <ul>
                                    {listDetailsWord}
                                </ul>
                                <div className='files'>
                                    <img src={previewUrl ? 'https:'+previewUrl : './img/no-img.jpg'} alt={word.text} />
                                    <span>ru: {translation.text}</span>
                                    <audio ref={audio} src={soundUrl}></audio><br/>
                                    <button onClick={playAudio}> Play sound </button>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </Modal>
    ) : null;

    const saveOrRemoveWordLocal = () => {
        setWord({ ...word, save: !word.save})
        if(!word.save) saveWordLocalStore({ ...word, save: true })
        else deletehWordLocalStore(word.id, delLocal)
    }

    return (
        <li>
            <div className='wrap' onClick={() => loadDescription(word.text)}>
                <h3>{word.text}</h3>
                <span>{word.partOfSpeech !== '' ? word.partOfSpeech: 'none'}</span>
                <span>{transcription !== '' ? `[${transcription}]`: 'none'}</span>
                <img src={previewUrl ? 'https:'+previewUrl : './img/no-img.jpg' } alt={word.text}/>
            </div>
            <i onClick={() => saveOrRemoveWordLocal()}
               className={ word.save ? 'favourite': 'not-favourite'}
            >
                &#9734;
            </i>
            {modal}
        </li>
    );
};
export default List;
