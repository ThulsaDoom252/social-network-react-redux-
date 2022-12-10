import React from 'react';

function WallNavbar(props) {
    return (
        <div className={"profile-page-navBar-container"}>
            <button onClick={() => props.handleClick("Posts")}
                    className={props.activeBlock === "Posts" ? "profile-page-navBar-item-active" : "profile-page-navBar-item"}>Posts
            </button>
            <button onClick={() => props.handleClick("Media")}
                    className={props.activeBlock === "Media" ? "profile-page-navBar-item-active" : "profile-page-navBar-item"}>Media
            </button>
            <button onClick={() => props.handleClick("Likes")}
                    className={props.activeBlock === "Likes" ? "profile-page-navBar-item-active" : "profile-page-navBar-item"}>Likes
            </button>
            <button onClick={() => props.handleClick("Replies")}
                    className={props.activeBlock === "Replies" ? "profile-page-navBar-item-active" : "profile-page-navBar-item"}>Replies
            </button>
        </div>
    );
}

export default WallNavbar;