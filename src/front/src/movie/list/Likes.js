import React, {useEffect, useState} from 'react';
import {Favorite, FavoriteBorderOutlined} from "@material-ui/icons";
import {Button} from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";

function Likes(props) {
    const [likes,setLikes] =  useState();

    useEffect(() => {
        setLikes(props.getLikes(props.pk))
    }, []);

    const handleMWish=(e)=>{
        if (sessionStorage.login_status==null) {
            Swal.fire({
                icon:"warning",
                text:"로그인후 이용해주세요"
            });
            return;
        }
        console.log("pk",e.target.value);
        if(props.MWishList.includes(Number(e.target.value))){
            axios.post(`${localStorage.url}/user/deleteMWish`,{movie_pk:e.target.value,user_pk:sessionStorage.user_pk})
                .then((res)=>{
                    alert(props.getLikes(props.pk));
                    setLikes(props.getLikes(props.pk));
                    props.getMwishList();
                })
        }else{
            axios.post(`${localStorage.url}/user/insertMWish`,{movie_pk:e.target.value,user_pk:sessionStorage.user_pk})
                .then((res)=>{
                    alert(props.getLikes(props.pk));
                    setLikes(props.getLikes(props.pk));
                    props.getMwishList();
                })
        }
    }

    return (
        <Button variant="outlined"
                startIcon={props.MWishList.includes(props.pk)?<Favorite value={props.pk}/>:<FavoriteBorderOutlined value={props.pk}/>}
                style={{width:"100px"}}
                onClick={handleMWish}
                value={props.pk}
        >
            {likes}
        </Button>
    );
}

export default Likes;