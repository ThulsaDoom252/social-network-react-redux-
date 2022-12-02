import React, {useState} from 'react';

function ProfileNavbar(props) {
    let [active, setActive] = useState(0)
    const handleClick = (number) => {
        setActive(number)
    }
    return (
        <div className={"profile-page-navBar-container"}>
            <button onClick={() => handleClick(1)}
                    className={active === 1 ? "profile-page-navBar-item-active" : "profile-page-navBar-item"}>Posts
            </button>
            <button onClick={() => handleClick(2)}
                    className={active === 2 ? "profile-page-navBar-item-active" : "profile-page-navBar-item"}>Media
            </button>
            <button onClick={() => handleClick(3)}
                    className={active === 3 ? "profile-page-navBar-item-active" : "profile-page-navBar-item"}>Likes
            </button>
            <button onClick={() => handleClick(4)}
                    className={active === 4 ? "profile-page-navBar-item-active" : "profile-page-navBar-item"}>Replies
            </button>
        </div>
    );
}

export default ProfileNavbar;