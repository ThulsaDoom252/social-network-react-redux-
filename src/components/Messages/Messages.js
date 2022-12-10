import React, {useEffect, useState} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import authHoc from "../HOC/authHoc";
import {BiMessageAltEdit, FiInfo, FiPhoneCall, FiVideo} from "react-icons/all";
import {clearRandomUsersAC, getRandomUsersTC} from "../../redux/dialogs-reducer";
import testPic from "./1.png"

const Messages = (props) => {
    let [senderId, setSenderId] = useState(0)

    let currentUserName = props.login

    const users = props.randomUsers
    const userAvatars = users.map(user => user.photos.small ? user.photos.small : props.defaultAvatar)
    const userNames = users.map(user => user.name)
    const posts = [
        `Hi ${currentUserName} My name is ${userNames[senderId === 0 && 0]}. Welcome to our community!`,
        `Greeting ${currentUserName}. I am ${userNames[senderId === 1 && 1]}`,
        `Welcome! i am ${userNames[senderId === 2 && 2]}`,
        `Hi there! My name is  ${userNames[3]}`,
        `Lets go for a ride. i am ${userNames[4]}`
    ]

    useEffect(() => {
        props.getRandomUsersTC()
    }, [])


    return <div className={"message-page-container"}>
        <div className={"message-page-left-part"}>
            <div className={"new-message-block"}>
                <p>ThulsaDoom252</p>
                <button className={"new-message-button"}><BiMessageAltEdit/></button>
            </div>
            <div className={"message-page-sender-block"}>
                {props.randomUsers.map((user, index) => <div style={{"background-color": index === senderId ? "gray" : null}} key={index} onClick={() => setSenderId(index)}
                                                             className={"message-page-user"}>
                    <img className={"message-page-user-avatar"}
                         src={user.photos.small ? user.photos.small : props.defaultAvatar}
                         alt="av1"/>
                    <p className={"message-page-user-name"}>{user.name}</p>
                </div>)}
            </div>
        </div>
        <div className={"message-page-right-part"}>
            <div className={"sender-block"}>
                <div>Reciever</div>
                <div>
                    <button className={"sender-block-button"}><FiPhoneCall/></button>
                    <button className={"sender-block-button"}><FiVideo/></button>
                    <button className={"sender-block-button"}><FiInfo/></button>
                </div>
            </div>
            <div className={"messages-container"}>
                <div className={"message-block"}>
                    <img className={"message-block-avatar"} src={userAvatars[senderId]} alt="testPic"/>
                    <p className={"message-block-text"}>{`Hi ${props.login}! My name is ${userNames[senderId]}`}</p>
                </div>
            </div>
            <div className={"message-input-block"}>
                <input className={"message-input"} type="text" placeholder={"Message.."}/>
            </div>
        </div>
    </div>
}

let mapStateToProps = (state) => {
    return {
        randomUsers: state.dialogsPage.randomUsers,
        auth: state.auth.isLogged,
        login: state.auth.login,
        underConstruction: state.app.underConstruction,
        defaultAvatar: state.dialogsPage.defaultAvatar
    }
}

export default compose(connect(mapStateToProps, {getRandomUsersTC, clearRandomUsersAC}), authHoc)(Messages)


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














