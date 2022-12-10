import React from 'react';
import WallNavbar from "./WallNavbar";
import Posts from "./Posts";
import Media from "./Media";
import Likes from "./Likes";
import Replies from "./Replies";
import {useState} from "react";

function ProfileWall(props) {
    const {0 : name, 1 : {large : largePhoto},  2: defaultAvatar} = props
    const [activeBlock, setActiveBlock] = useState('Posts')
    const handleClick = (number) => {
        setActiveBlock(number)
    }
    const firstPost = `Hi! i am ${name}, This is my first post`
    const secondPost = `You can't add more posts, because this func isn't released by the back-end developer`
    return (
        <div className={"profile-page-center-wall"}>
            <WallNavbar activeBlock={activeBlock} handleClick={handleClick}/>
            {activeBlock === "Posts" && <Posts {...[name, firstPost, secondPost, largePhoto, defaultAvatar]}/>}
            {activeBlock === "Media" && <Media/>}
            {activeBlock === "Likes" && <Likes/>}
            {activeBlock === "Replies" && <Replies/>}
        </div>
    );
}

export default ProfileWall;