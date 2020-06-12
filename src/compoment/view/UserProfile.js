import React, {useEffect, useState, useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'

const Profile = () => {
    const [userProfile, setProfile] = useState(null)
    const [showFollow, setFollow] = useState(true)
    const {state, dispatch} = useContext(UserContext)
    const {userid} = useParams()
    // check info
    //console.log(userid)
    useEffect(()=>{
        fetch(`/user/${userid}`, {
            headers:{
                "Authorization": "" + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            // check for result
            //console.log(result)
            //
            
            setProfile(result)
        })

    },[])

    //make a follower user
    const followUser = () => {
        fetch('/follow', {
            method:"put",
            headers:{
                "Content-Type":"application/json", 
                "Authorization": "" + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data => {
            //console.log(data)
            dispatch({type:"UPDATE", 
                    payload:{
                        following:data.following, 
                        followers:data.followers
                    }
            })
            localStorage.setItem("user", JSON.stringify(data))
            setProfile((prevState) => {
                return {
                    ...prevState,
                    user: {
                        ...prevState.user,
                        followers:[...prevState.user.followers, data._id]
                    }
                }
            }) 
            setFollow(false) 
        })
    }

    //make a unfollower user
    const unfollowUser = () => {
        fetch('/unfollow', {
            method:"put",
            headers:{
                "Content-Type":"application/json", 
                "Authorization": "" + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data => {
            //console.log(data)
            dispatch({type:"UPDATE", 
                    payload:{
                        following:data.following, 
                        followers:data.followers
                    }
            })
            localStorage.setItem("user", JSON.stringify(data))
            
            setProfile((prevState) => {
                const newFollower = prevState.user.followers.filter(item => item != data._id)
                return {
                    ...prevState,
                    user: {
                        ...prevState.user,
                        followers:newFollower
                    }
                }
            })
            setFollow(true)
        })
    }

    return(
        <>
        {
            userProfile ?
            // loading  
            <div style={{maxWidth:"700px", margin:"0px auto"}}>
            <div style ={{
                display:"flex",
                justifyContent: "space-around",
                margin: "38px 0px"
            }}>
                <div>
                    <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
                    src="https://scontent.fvca1-1.fna.fbcdn.net/v/t1.0-9/90324588_2610390239100298_57370085785862144_n.jpg?_nc_cat=111&_nc_sid=85a577&_nc_ohc=Z2Cf8w5GSTMAX-Iqmey&_nc_ht=scontent.fvca1-1.fna&oh=fa9a12c87dab6ed01f9e0bdab206621f&oe=5EF5ED8D&dl=1"/>
                </div>
                <div>
                    <h4>
                        {userProfile.user.name}
                    </h4>
                    {/* <h5>
                        {userProfile.user.email}
                    </h5> */}
                    <div style={{display:"flex", justifyContent:"space-between", width:"100%",marginLeft:"20px"}}>
                        <h6>{userProfile.posts.length} post</h6>
                        <h6>{userProfile.user.followers.length} followers</h6>
                        <h6>{userProfile.user.following.length} following</h6>
                    </div>
                    {
                        showFollow 
                            ? 
                            <button style={{margin:"10px"}} className="btn waves-effect waves-light grey"
                            onClick={() => followUser()}>
                                Follow
                            </button>
                            :
                            <button style={{margin:"10px"}} className="btn waves-effect waves-light grey"
                            onClick={() => unfollowUser()}>
                                Unfollow
                            </button>
                    }
                </div>
            </div>
            <div className="gallery">
                {
                    userProfile.posts.map(item => {
                        return(
                            <img key={item._id} className="item" src={item.picture} alt={item.title}/>
                        )
                    })
                }
            </div>
        </div>
        // before loading
            : <h2>Loading ... </h2>
        }
        
        </>
    )
}

export default Profile;