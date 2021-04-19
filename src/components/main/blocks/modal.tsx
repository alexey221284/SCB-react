import {useEffect} from "react";
import { createPortal } from 'react-dom';

const Modal = (props: any) => {
    const el = document.createElement('div');
    const modal = document.getElementById('modal') as HTMLHtmlElement;

    useEffect(():any => {
        modal.appendChild(el);
        return () => modal.removeChild(el);
    });

    return createPortal(
        props.children,
        el,
    );
}
export default Modal;
