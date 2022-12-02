import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import authHoc from "../HOC/authHoc";
import {BiMessageAltEdit, FiInfo, FiPhoneCall, FiVideo} from "react-icons/all";


const Messages = () => {
    return <div className={"message-page-container"}>
        <div className={"message-page-top"}>
            <div className={"new-message-block"}>
                <p>ThulsaDoom252</p>
                <button className={"new-message-button"}><BiMessageAltEdit/></button>
            </div>
            <div className={"sender-block"}>
                <div>Reciever</div>
                <div>
                    <button className={"sender-block-button"}><FiPhoneCall/></button>
                    <button className={"sender-block-button"}><FiVideo/></button>
                    <button className={"sender-block-button"}><FiInfo/></button>
                </div>
            </div>
        </div>
        <div className={"message-page-users"}>

        </div>
        <div className={"message-page-messages"}>

        </div>
    </div>
}

let mapStateToProps = (state) => {
    return {
        auth: state.auth.isLogged,
        underConstruction: state.app.underConstruction
    }
}

export default compose(connect(mapStateToProps, null), authHoc)(Messages)


//
//
// import React from "react";
// import MessageItem from "./DialogItem/MessageItem";
// import Message from "./Message/Message";
// import {useFormik} from "formik";
// import {compose} from "redux";
// import {connect} from "react-redux";
// import {addMessageCreator} from "../../redux/dialogs-reducer";
// import authHoc from "../HOC/authHoc";
// import UnderConstruction from "../common/Under-construction";
//
//
// const Messages = React.memo(props => {
//     let {values, handleSubmit, handleChange} = useFormik({
//         initialValues: {
//             newMessage: ''
//         },
//
//         onSubmit: ({newMessage}, {resetForm}) => {
//             newMessage === '' ? alert('please enter a message') :
//                 props.addMessageCreator(newMessage)
//             resetForm(values.newMessage)
//         }
//     })
//
//     const dialogsElements = props.state.dialogs.map(dialog => <MessageItem name={dialog.name} id={dialog.id}/>)
//     const messagesElements = props.state.messages.map(message => <Message content={message.content}/>)
//
//     return (
//         <div>
//             {!props.underConstruction ? <div className={"messages-page"}>
//                 <div className={"sender-items"}>{dialogsElements}</div>
//                 <div>
//                     {messagesElements}
//                     <form onSubmit={handleSubmit}>
//                 <textarea className="message-page-textarea" onChange={handleChange("newMessage")} value={values.newMessage}
//                           placeholder={'enter your message'}/>
//                         <div>
//                             <button className="message-page-button" type={"submit"}>Add Message</button>
//                         </div>
//                     </form>
//                 </div>
//             </div> : <UnderConstruction/>}
//         </div>)
// })
//
// let mapStateToProps = (state) => {
//     return {
//         state: state.dialogsPage,
//         auth: state.auth.isLogged,
//         underConstruction: state.app.underConstruction
//     }
// }
//
// export default compose(connect(mapStateToProps, {addMessageCreator}), authHoc)(Messages)
//
//
//
//
//
//














