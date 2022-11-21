 import InsetDividers from '../components/divider';
 import {useParams} from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';


function CandidateDetailsScreen() {
  const[userDetails,setUserDetails]=useState({});
 
  const params=useParams();
  let id=params.id;
  const navigate=useNavigate();
  const [deletedMessage,setDeletedMessage]=useState("");

  useEffect(()=>{
    if(!localStorage.getItem('usm_user')){
      navigate('/')
    }
  },[navigate])
  
  useEffect(()=>{
    async function fetchUsersDetailsHandler() {
      const userDetailsResponse = await axios.get(
        `https://60d5a2c2943aa60017768b01.mockapi.io/candidate/${id}`
      );
      if (userDetailsResponse.statusText ==="OK") {
        const userDetails = userDetailsResponse.data;
        setUserDetails(userDetails);
      }
    }
    fetchUsersDetailsHandler();
  },[setUserDetails,id]);
  function toggleDialogDeleeBox() {
    const rightSideWrapper=document.querySelector('.rightSideWrapper');
    const rightSideDialogBox=document.querySelector('.rightSideDialogBox');
    
    rightSideWrapper.classList.toggle('hidden');
    rightSideDialogBox.classList.toggle('show');

    
  }
  async function handleDeleteUser() {
    
    const response=await axios.delete(`https://60d5a2c2943aa60017768b01.mockapi.io/candidate/${id}`);
    

    if(response.status === 200) {
      setTimeout(() =>{
        navigate('/home')
      },200)
      
      
    }
    
  }
  function LoadUserDetails(params) {
    if(userDetails?.id){
      return (
        <div className="userDetailsContainers"> 
        <div className="rightSideDialogBox">
          { deletedMessage !="" ? <div className="dialogboxInner">
            <div className="dialogHeader">
            {deletedMessage}
            </div> 
          </div> : <div className="dialogboxInner">
            <div className="dialogHeader">
            You sure you want to delete user {userDetails.name}?
            </div>
            <div className="dialogBtn">
              <CheckIcon className="hover_pointer" onClick={()=>handleDeleteUser()}/> <CloseIcon className="hover_pointer" onClick={()=>toggleDialogDeleeBox()}/>
            </div>
            
          </div>}
          
        </div>
        <div className="rightSideWrapper">
        <div className="rightSideBtn">
        <EditIcon/>
        <DeleteIcon className="hover_pointer" onClick={()=>toggleDialogDeleeBox()}/>
        </div>
        <div className="subContainer">
          <div className="header">Personal Details</div>
          <div className="subtextContainer pd15">
            <div className="sub">
            <div className="subtextHeading">Name</div>
            <div className="subtextInput">{userDetails.name}</div>
            </div>
            <div className="sub">
            <div className="subtextHeading">phone</div>
            <div className="subtextInput">{userDetails.phone}</div>
            </div>
            <div className="sub">
            <div className="subtextHeading">email</div>
            <div className="subtextInput">{userDetails.email}</div>
            </div>
            <div className="sub">
            <div className="subtextHeading">address</div>
            <div className="subtextInput">{userDetails.address}</div>
            
            </div>
            <div className="sub">
            <div className="subtextHeading">Gender</div>
            <div className="subtextInput">{userDetails.gender}</div>
            
            </div>
            
          </div>
        </div>
        <div className="subContainer">
        <div className="header">Skills</div>
          <div className="subtext skillsubtext pd15">
            {userDetails?.skills?userDetails.skills.map((item) =>{return(
              <div className="skillsContainer">
                <div className="skills capsule">{item.name?item.name:<div></div>}</div>
                {/* <div className="experiance">{item.experience.length?item.experience.reduce((acc,item)=>{
                  acc=acc+parseInt(item.duration_to)-parseInt(item.duration_from);
                  console.log(acc)
                  return acc
                },0)+"years":null}</div> */}
              </div>
            )}):<div></div>}<div className="bullets"></div>
          </div>
        </div>
        <div className="subContainer">
        <div className="header">Experience</div>
          <div className="subtext experiance pd15">
            {
              userDetails?.experience?.map((item)=>{
                return (
                  <div className="exsubtextContainer">
                    <div className="expContainer">
                      <div className="expHeader">Company Name</div>
                      <div className="exsubtextNameHeader">{item.company}</div>
                    </div>
                    <div className="expContainer">
                      <div className="expHeader">Project</div>
                      <div className="exsubtextProject">{item.project}</div>
                    </div>
                    <div className="expContainer">
                      <div className="expHeader">Role</div>
                      <div className="exsubtextRole">{item.role}</div>
                    </div>
                    <div className="expContainer">
                      <div className="expHeader">Duration</div>
                      <div className="exsubtextDuration">From {item.duration_from} to {item.duration_to}</div>
                    </div>
                    
                    
                   
                    
                  </div>
                );
              })
            }
            
          </div>
        </div>
        <div className="subContainer">
        <div className="header">Education</div>
          <div className="subtext education pd15">
            {userDetails.education? userDetails.education.map((item)=>{
              return (
                <div className="edsubtextContainer">
                <div className="eduheader">Institute Name</div>
                <div className="eduResponse">{item.institute}</div>
                </div>
              )
            }):null}
           
            

          </div>
        </div>
        </div>
        
        
        </div>
      )
    }
    else{
      return (<div></div>)
    }
  }
  
  return(
    <>
    <div className="userDetailsContainer">
    <InsetDividers />
    <LoadUserDetails/>

    </div>
    
    </>
  ) 
}
export default  CandidateDetailsScreen;