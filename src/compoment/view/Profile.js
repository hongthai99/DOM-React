import React, {useEffect, useState, useContext} from 'react'
import {UserContext} from '../../App'

const Profile = () => {
    const [mypic, setMypic] = useState([])
    const {state, dispatch} = useContext(UserContext)
    useEffect(()=>{
        fetch('/mynewsfeed', {
            headers:{
                "Authorization": "" + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            setMypic(result.mynewsfeed)
        })
    },[])
    return(
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
                        {state?state.name:"loading"}
                    </h4>
                    <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                        <h6>40 post</h6>
                        <h6>1 followers</h6>
                        <h6>1 following</h6>
                    </div>

                </div>
            </div>
            <div className="gallery">
                {
                    mypic.map(item => {
                        return(
                            <img key={item._id} className="item" src={item.picture} alt={item.title}/>
                        )
                    })
                }
                
                
            </div>
        </div>
    )
}

export default Profile;