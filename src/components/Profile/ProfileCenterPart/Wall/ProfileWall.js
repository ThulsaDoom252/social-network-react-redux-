import React from 'react';
import WallNavbar from "./WallNavbar";
import Posts from "./Posts";
import Media from "./Media";
import Likes from "./Likes";
import Replies from "./Replies";
import {useState} from "react";

function ProfileWall(props) {
    let [activeBlock, setActiveBlock] = useState('Posts')
    const handleClick = (number) => {
        setActiveBlock(number)
    }
    return (
        <div className={"profile-page-center-wall"}>
            <WallNavbar activeBlock={activeBlock} handleClick={handleClick}/>
            {activeBlock === "Posts" && <Posts name={props.profile.fullName}
                                               secondPost={`You can not add more posts, cause this func isn't released by the back-end developer`}
                                               firstPost={`Hi! I am ${props.profile.fullName}. This is my first post`}
                                               avatar={props.profile.photos.large}/>}
            {activeBlock === "Media" && <Media/>}
            {activeBlock === "Likes" && <Likes/>}
            {activeBlock === "Replies" && <Replies/>}

        </div>
    );
}

export default ProfileWall;