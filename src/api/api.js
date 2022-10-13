import axios from "axios";

const apiKey = localStorage.getItem("apiKey".toString())

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": apiKey
    }
})

//USERS
export const apiCaller = {
    getUsers: (currentPage, pageSize, fetching, setUsers) => {
        return (
            instance.get(`users?page=${currentPage}&count=${8}`)
                .then(response => {
                    return response.data
                })
        )
    },
    setUsers: (userId) => {
        return profileApi.setUsersProfile(userId)
    },
    unfollow: (userId) => {
        return (
            instance.delete(`follow/` + userId)
                .then(response => {
                    return response.data
                })
        )
    },
    follow: (userId) => {
        return (
            instance.post(`follow/` + userId, {})
                .then(response => {
                    return response.data
                })
        )
    }
}


//AUTH


export const login = {
    auth: () => {
        return loginApi.auth()

    }
}

//PROFILE

export const profileApi = {
    setUsersProfile: (userId) => {
        return (
            instance.get('profile/' + userId)
                .then(response => {
                    return response.data
                })
        )
    },

    getCurrentUser(userId) {
        return instance.get('profile/' + userId).then(response => {
            return response.data
        })
    },

    getStatus(userId) {
        return instance.get('profile/status/' + userId)

    },

    updateStatus(status) {
        return instance.put('profile/status/', {status}).then(response => {
            return response.data
        })

    },

    updatePhoto(photo) {
        const formData = new FormData()
        formData.append("image", photo)
        return instance.put('profile/photo/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    updateProfile(userid, about, applicant, description,
                  name, git, vk, fb, inst, twit,
                  web, youtube, link) {
        return instance.put('profile/', {
            userid, aboutMe: about, lookingForAJob: applicant,
            LookingForAJobDescription: description, fullName: name, contacts: {
                github: git, vk, facebook: fb, instagram: inst, twitter: twit,
                website: web, youtube, mainLink: link
            }
        })

    },

}

//LOGIN

export const loginApi = {
    auth: () => {
        return instance.get('auth/me').then(response => {
            return response.data
        })

    },

    getCaptcha: () => {
        return instance.get('/security/get-captcha-url')

    },

    login(email, password, rememberMe, antiBotSymbols) {
        return instance.post('auth/login/', {
            email: email,
            password: password,
            rememberMe: rememberMe,
            captcha: antiBotSymbols
        }).then(response => {
            return response.data
        })
    },

    logout() {
        return instance.delete('auth/login/').then(response => {
            return response.data
        })
    }

}