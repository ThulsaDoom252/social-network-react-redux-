import React from 'react';

const ProfileData = (props) => {
    const {0: {lookingForAJob: applicant, lookingForAJobDescription: description}, 1: isCurrentUser} = props
    return (
        <div>
            <div className={"test-job-info"}>
                {applicant && isCurrentUser ? "You are looking for a job" : applicant && !isCurrentUser ? "Looking for a job" : "Not looking for a job"}
            </div>
            {applicant ? <div className={"test-job-info"}>{description}</div> : null}
        </div>
    )
}

export default ProfileData;
