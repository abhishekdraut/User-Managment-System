import InsetDividers from '../components/divider';
import {useParams} from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios'
import{useNavigate} from 'react-router-dom'

function HomeScreen() {
 const[userDetails,setUserDetails]=useState({});
 const params=useParams();
 const id=params.id;
 const navigate=useNavigate()
 useEffect(()=>{
  if(!localStorage.getItem('usm_user')){
    navigate('/')
  }
 },[navigate])
 useEffect(()=>{
   async function fetchUsersDetailsHandler() {
     const userDetailsResponse = await axios.get(
       `https://60d5a2c2943aa60017768b01.mockapi.io/candidate${id}`
     );
     if (userDetailsResponse.statusText == "OK") {
       const userDetails = userDetailsResponse.data;
       setUserDetails(userDetails);
     }
   }
   fetchUsersDetailsHandler();
 },[setUserDetails])
 return(
   <>
   <div className="userDetailsContainer">
   <InsetDividers />
   <div className="userDetailsContainers homeScreenRightSide">
    Please Select The User
   </div>
   </div>
   
   

   </>
 ) 
}
export default  HomeScreen;