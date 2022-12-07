import React from 'react';
import defaultAvatar from "../../common/default-avatar.jfif";
import {connect} from "react-redux";
import {updatePhotoTC} from "../../../redux/profile-reducer/profile-reducer";
import Status from "./Status";
import {CgWebsite, SiFacebook, SiGithub, SiInstagram, SiTwitter, SiVk, SiYoutube} from "react-icons/all";
import {Link} from "react-router-dom";

function ProfileAvatarBlock(props) {
    const isUserPage = props.currentUser.toString() === props.userId.toString()
    const hiddenFileInput = React.useRef(null);
    window.s1 = props.profile.aboutMe

    let uploadPhoto = (e) => {
        props.updatePhotoTC(e.target.files[0])
    }

    const handleClick = event => isUserPage ? hiddenFileInput.current.click() : null;
    const contactClass = "profile-page-left-contact"
    const contact = props.profile.contacts

    return (
        <div className="profile-page-center-avatarBlockContainer">
            <div>
                <input ref={hiddenFileInput}
                       hidden={true} type={"file"}
                       onChange={uploadPhoto}/>
                <img className="profile-page-avatar"
                     onClick={handleClick}
                     src={props.profile.photos.large ? props.profile.photos.large : defaultAvatar}
                     alt="large photo"/>
                <p className={"profile-page-left-part-name"}>{props.profile.fullName}</p>
                <Status userId={props.userId} currentUser={props.currentUser}/>
                <div className={"profile-page-left-contacts-block"}>
                    <span style={{"color": !contact.youtube && "gray"}}
                          className={`${contactClass} ${contactClass}-youtubeIcon`}>
                        {contact.youtube ? <Link
                                to={`${props.profile.contacts.youtube.toString()}`} target={"_blank"}><SiYoutube
                                title={props.profile.contacts.youtube}/></Link> :
                            <SiYoutube title={"No youtube address"}/>}</span>
                    <span style={{"color": !contact.instagram && "gray"}}
                          className={`${contactClass} ${contactClass}-instagramIcon`}>
                         {contact.instagram ? <Link
                                 to={`//${props.profile.contacts.instagram.toString()}`} target={"_blank"}><SiInstagram
                                 title={props.profile.contacts.instagram}/></Link> :
                             <SiInstagram title={"No instagram address"}/>}
                        </span>
                    <span style={{"color": !contact.facebook && "gray"}}
                          className={`${contactClass} ${contactClass}-facebookIcon`}>
                         {contact.facebook ? <Link
                                 to={`//${props.profile.contacts.facebook}`} target={"_blank"}>
                                 <SiFacebook
                                     title={props.profile.contacts.facebook}/></Link> :
                             <SiFacebook title={"No facebook address"}/>}
                       </span>
                    <span style={{"color": !contact.twitter && "gray"}}
                          className={`${contactClass} ${contactClass}-twitterIcon`}>
                            {contact.twitter ? <Link
                                    to={`//${props.profile.contacts.twitter}`} target={"_blank"}><SiTwitter
                                    title={props.profile.contacts.twitter}/></Link> :
                                <SiTwitter title={"No twitter address"}/>}
                        </span>
                    <span style={{"color": !contact.website && "gray"}}
                          className={`${contactClass} ${contactClass}-websiteIcon`}>
                            {contact.website ? <Link
                                to={`//${props.profile.contacts.website}`} target={"_blank"}><CgWebsite
                                title={props.profile.contacts.website}/></Link> : <CgWebsite title={"No website"}/>}
                           </span>
                    <span style={{"color": !contact.vk && "gray"}} className={`${contactClass} ${contactClass}-vkIcon`}>
                            {contact.vk ? <Link
                                to={`//${props.profile.contacts.vk}`}
                                target={"_blank"}><SiVk
                                title={props.profile.contacts.vk}/></Link> : <SiVk title={"No website link"}/>}
                           </span>
                    <span style={{"color": !contact.github && "gray"}}
                          className={`${contactClass} ${contactClass}-gitHubIcon`}>
                            {contact.github ? <Link
                                    to={`//${props.profile.contacts.github}`} target={"_blank"}><SiGithub
                                    title={props.profile.contacts.github}/></Link> :
                                <SiGithub title={"No github repositories link"}/>}
                        </span>
                </div>
            </div>
        </div>
    );
}

export default connect(null, {updatePhotoTC})(ProfileAvatarBlock);