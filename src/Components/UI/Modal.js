import classes from './Modal.module.css'
import ReactDom from 'react-dom'

const Backdrop = (props) => {
    return(
     <div onClick={props.onClick} className={classes.backdrop}/>
    )
}


const ModalOverlay = (props) => {
    return(
    <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
    )
}


const Modal = (props) => {
    const portalElement = document.getElementById('overlays')
    return(
    <>
    {ReactDom.createPortal(<Backdrop onClick={props.onClick}/>,portalElement)}
    {ReactDom.createPortal(<ModalOverlay >{props.children}</ModalOverlay>,portalElement)}
    </>
    )
}

export default Modal