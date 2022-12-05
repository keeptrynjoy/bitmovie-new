import React, {useEffect, useState} from 'react';
import {Favorite, FavoriteBorderOutlined} from "@material-ui/icons";
import {Button} from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";

function Likes(props) {
    const [likes,setLikes] =  useState();

    const pk = props.pk;
    
    const getLikes=(movie_pk)=>{
        let count=0;
        console.log("pk는",movie_pk);
        axios.get(`${localStorage.url}/movie/selectLikes?movie_pk=${movie_pk}`)
            .then((res)=>{
                console.log("count는",res.data);
                setLikes(res.data);
                count=res.data;
            });
        return count;
    }

    useEffect(() => {
        setLikes(getLikes(pk))
    }, []);

   
    
    const handleMWish=(e)=>{
        if (sessionStorage.login_status==null) {
            Swal.fire({
                icon:"warning",
                text:"로그인후 이용해주세요"
            });
            return;
        }
        console.log("pk",pk);
        if(props.MWishList.includes(Number(pk))){
            axios.post(`${localStorage.url}/user/deleteMWish`,{movie_pk:pk,user_pk:sessionStorage.user_pk})
                .then((res)=>{
                    getLikes(pk);
                    props.getMwishList();
                })
        }else{
            axios.post(`${localStorage.url}/user/insertMWish`,{movie_pk:pk,user_pk:sessionStorage.user_pk})
                .then((res)=>{
                    getLikes(pk);
                    props.getMwishList();
                })
        }
    }

   

    return (
        <Button variant="outlined"
                startIcon={props.MWishList.includes(pk)?<Favorite value={pk}/>:<FavoriteBorderOutlined value={pk}/>}
                style={{width:"100px"}}
                onClick={handleMWish}
                value={pk}
        >
            {likes}
        </Button>
    );
}

export default Likes;