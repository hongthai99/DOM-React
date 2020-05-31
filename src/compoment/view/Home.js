import React,{useState, useEffect} from 'react'

const Home = () => {

    const [data, setData] = useState([])
    useEffect(()=>{
        fetch('/newsfeed',{
            headers:{
                "Authorization": "" + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result => {
            setData(result.posts)
        })
    },[])

    return(
        <div className="home">
            {
                data.map(item => {
                    return(
                        <div className="card home-card" key={item._id}>
                            <h6>{item.postedBy.name}</h6>
                        <div className="card-image">
                            <img src={item.picture}/>
                        </div>
                        <div className="card-content">
                            <i className="material-icons" style={{color:"red"}}>favorite</i>
                            <h6>{item.title}</h6>
                            <p>{item.body}</p>
                            <input type="text" placeholder="comment"/>
                        </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Home;