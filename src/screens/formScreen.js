import InsetDividers from '../components/divider';
import Form from '../components/form';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate,useParams} from 'react-router-dom';
import {useEffect} from 'react'
function FormScreen() {
    const navigate=useNavigate();
    const params=useParams();
    let id=params.id;
    useEffect(()=>{
    if(!localStorage.getItem('usm_user')){
        navigate('/')
    }
    },[navigate])
    return (
    <>
    <div className="userDetailsContainer">
    <InsetDividers />
    <div className="userDetailsContainers"> 
    <div className="rightSideBtn">
        {id?<>
            <EditIcon/>
        <DeleteIcon/></>:<div></div>}
        
    </div>
    <Form/>
    </div>
    
    </div>
    </>
    )
}
export default FormScreen;