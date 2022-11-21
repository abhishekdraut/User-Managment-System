import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import NearMeIcon from "@mui/icons-material/NearMe";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
function Form(params) {
  const navigate=useNavigate();
  const [exp, setExp] = useState([
    { companyName: "", projectName: "", role: "", startDate: "", endDate: "" },
  ]);
  const [skills, setSkills] = useState([{ skillName: "", experience: "" }]);
  const [education, setEducation] = useState([
    { nameOfSchool: "", yearOfGraduation: "" },
  ]);
  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    email: "",
    gender: "",
    hobbies: [],
  });
  const [isLoading,setIsLoading]=useState(false);
  const[message,setMessage]=useState(null);

  //function for managing dynamic experience section.
  function AddExperianceInput() {
    setExp([
      ...exp,
      {
        companyName: "",
        projectName: "",
        role: "",
        startDate: "",
        endDate: "",
      },
    ]);
  }
  function RemoveExperianceInput(index) {
    const currentArr = [...exp];
    currentArr.splice(index, 1);
    setExp(currentArr);
  }
  function addExperianceInState(e) {
    let id = e.target.getAttribute("id");
    let inputName = e.target.getAttribute("inputName");
    console.log(inputName);
    let currentArr = [...exp];
    let currentObj = exp[id];
    currentObj[inputName] = e.target.value;

    currentArr.splice(id, 1, currentObj);
    setExp(currentArr);
  }
  //function for managing dynamic skills.
  function AddSkillsInput() {
    setSkills([...skills, { skillName: "", experience: "" }]);
  }
  function RemoveSkillsInput(index) {
    const currentArr = [...skills];
    currentArr.splice(index, 1);
    setSkills(currentArr);
  }
  function addSkillsInState(e) {
    let id = e.target.getAttribute("id");
    let inputName = e.target.getAttribute("inputName");

    let currentArr = [...skills];
    let currentObj = skills[id];
    currentObj[inputName] = e.target.value;

    currentArr.splice(id, 1, currentObj);
    setSkills(currentArr);
  }
  //function for managing dynamic education.
  function AddEducationInput() {
    setEducation([...education, { nameOfSchool: "", yearOfGraduation: "" }]);
  }
  function RemoveEducationInput(index) {
    const currentArr = [...education];
    currentArr.splice(index, 1);
    setEducation(currentArr);
  }
  function addEducationInState(e) {
    let id = e.target.getAttribute("id");
    let inputName = e.target.getAttribute("inputName");

    let currentArr = [...education];
    let currentObj = education[id];
    currentObj[inputName] = e.target.value;

    currentArr.splice(id, 1, currentObj);
    setEducation(currentArr);
  }
  //fucntions for managing personla info.
  function addPersonalInfoInState(e) {
    let inputName = e.target.getAttribute("inputName");
    let currentObj = { ...personalDetails };
    currentObj[inputName] = e.target.value;
    setPersonalDetails(currentObj);
  }
  function selectGender(e) {
    let currentObj = { ...personalDetails };
    currentObj["gender"] = e.target.value;
    setPersonalDetails(currentObj);
  }
  function selectHobbbies(e) {
    let currentObj = { ...personalDetails };
    currentObj["hobbies"].push(e.target.value);
    setPersonalDetails(currentObj);
  }
  //function for handling the submite form

  async function handleSubmit() {
    const MassagedEducationObj=education.map((item)=>{
       return({institute:item.nameOfSchool,pass_out_year:item.yearOfGraduation})
    })
    const MassagedExperinaceObj=exp.map((item)=>{
        return(
            {company:item.companyName,project:item.projectName,role:item.role,duration_from:item.startDate,duration_to:item.endDate}
        )
    })
    const MassagedSkillsObj=skills.map((item)=>{
        return(
            {name:item.skillName,experience:item.experience}
        )
    })
    const responseObj=
        {
            "profile_picture": "string url of image",
            "name": personalDetails.name,
            "email": personalDetails.email,
            "gender": personalDetails.gender,
            "hobbies": personalDetails.hobbies,
            "education": MassagedEducationObj,
            "skills": MassagedSkillsObj,
            "experience":MassagedExperinaceObj
            }
     
     
     const response=await axios.post(`https://60d5a2c2943aa60017768b01.mockapi.io/candidate`,responseObj);
     setIsLoading(true);
     if(response.status==201){
         
         setTimeout(()=>{
             setIsLoading(false);
             setMessage("User Created Successfully");
         },2000)
        
     }
     
    

  } 
  
  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : message ? (
        <div className="messageContainerOuter">
          <div className="messageContainer">{message}</div>
          <div className="messageContainerBtn"><CloseIcon onClick={()=>{setMessage(null);navigate('/home')}}/></div>
        </div>
      ) : (
        <>
          <div className="formContainer">
            <div className="personalInfoContainer">
              <div className="formPersonalHeader formheader">Personal Info</div>
              <div className="formpersonalInputes formInput">
                <input
                  type="text"
                  inputName="name"
                  onChange={(e) => addPersonalInfoInState(e)}
                  value={personalDetails.name}
                  placeholder="Enter your name"
                />

                <input
                  type="email"
                  inputName="email"
                  onChange={(e) => addPersonalInfoInState(e)}
                  value={personalDetails.email}
                  placeholder="Enter email"
                />
                <>
                  <label for="gender">Gender:</label>
                  <select
                    name="genders"
                    id="gender"
                    onClick={(e) => selectGender(e)}
                  >
                    <option value="male" inputName="gender">
                      Male
                    </option>
                    <option
                      value="female"
                      inputName="gender" /* onClick={(e)=>addPersonalInfoInState(e)} */
                    >
                      Female
                    </option>
                  </select>
                </>
                <>
                  <label for="gender">Hobbies:</label>
                  <select
                    name="genders"
                    id="gender"
                    onClick={(e) => selectHobbbies(e)}
                  >
                    <option value="reading" inputName="gender">
                      Reading
                    </option>
                    <option value="writing" inputName="gender">
                      Writing
                    </option>
                    <option value="Playing" inputName="gender">
                      Playing
                    </option>
                    <option value="WatchingMovies" inputName="gender">
                      Watching Movie
                    </option>
                  </select>
                </>
              </div>
            </div>
            <div className="educationContainer">
              <div className="formPersonalHeader formheader">Education</div>
              <div className="formpersonalInputes formInput">
                {education.map((item, index) => {
                  return (
                    <div className="experianceInnerContainer">
                      <div className="experianceContainerLeft">
                        <input
                          type="text"
                          key={`${index}`}
                          id={`${index}`}
                          inputName="nameOfSchool"
                          onChange={(e) => addEducationInState(e)}
                          value={item.nameOfSchool}
                          placeholder="Name Of School"
                        />
                        <input
                          type="number"
                          key={`${index}`}
                          id={`${index}`}
                          inputName="yearOfGraduation"
                          onChange={(e) => addEducationInState(e)}
                          value={item.yearOfGraduation}
                          placeholder="Graduation Year"
                        />
                      </div>
                      <div className="experianceContainerRight">
                        {education.length > 1 ? (
                          <div className="removeButtonForFrom">
                            <HighlightOffIcon
                              onClick={() => RemoveEducationInput(index)}
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
                {education.length < 10 ? (
                  <div className="addbuttonForForm">
                    <AddCircleIcon onClick={() => AddEducationInput()} />
                  </div>
                ) : null}
              </div>
            </div>
            <div className="skillContainer">
              <div className="formPersonalHeader formheader">Skills</div>
              <div className="formpersonalInputes formInput">
                {skills.map((item, index) => {
                  return (
                    <div className="experianceInnerContainer">
                      <div className="experianceContainerLeft">
                        <input
                          type="text"
                          key={`${index}`}
                          id={`${index}`}
                          inputName="skillName"
                          onChange={(e) => addSkillsInState(e)}
                          value={item.skillName}
                          placeholder="skill name"
                        />
                        <input
                          type="number"
                          key={`${index}`}
                          id={`${index}`}
                          inputName="experience"
                          onChange={(e) => addSkillsInState(e)}
                          value={item.experience}
                          placeholder="Experiance in months"
                        />
                      </div>
                      <div className="experianceContainerRight">
                        {skills.length > 1 ? (
                          <div className="removeButtonForFrom">
                            <HighlightOffIcon
                              onClick={() => RemoveSkillsInput(index)}
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
                {skills.length < 10 ? (
                  <div className="addbuttonForForm">
                    <AddCircleIcon onClick={() => AddSkillsInput()} />
                  </div>
                ) : null}
              </div>
            </div>

            <div className="experianceContainer">
              <div className="formExperianceHeader formheader">Experiance</div>
              <div className="formpExperianceInputes formInput">
                {exp.map((item, index) => {
                  return (
                    <div className="experianceInnerContainer">
                      <div className="experianceContainerLeft">
                        <textarea
                          key={`${index}`}
                          id={`${index}`}
                          inputName="companyName"
                          onChange={(e) => addExperianceInState(e)}
                          value={item.companyName}
                          placeholder="Enter Company Name"
                        />
                        <textarea
                          key={`${index}`}
                          id={`${index}`}
                          inputName="projectName"
                          onChange={(e) => addExperianceInState(e)}
                          value={item.projectName}
                          placeholder="Enter Project Name"
                        />
                        <input
                          type="text"
                          key={`${index}`}
                          id={`${index}`}
                          inputName="role"
                          onChange={(e) => addExperianceInState(e)}
                          value={item.role}
                          placeholder="Enter Your Role"
                        />
                        <>
                          <div>Enter Start Date</div>
                          <input
                            type="date"
                            key={`${index}`}
                            id={`${index}`}
                            inputName="startDate"
                            onChange={(e) => addExperianceInState(e)}
                          />
                        </>
                        <>
                          <div>Enter End Date</div>
                          <input
                            type="date"
                            key={`${index}`}
                            id={`${index}`}
                            inputName="endDate"
                            onChange={(e) => addExperianceInState(e)}
                          />
                        </>
                      </div>
                      <div className="experianceContainerRight">
                        {exp.length > 1 ? (
                          <div className="removeButtonForFrom">
                            <HighlightOffIcon
                              onClick={() => RemoveExperianceInput(index)}
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
                {exp.length < 10 ? (
                  <div className="addbuttonForForm">
                    <AddCircleIcon onClick={() => AddExperianceInput()} />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="submitBtn " >
            <NearMeIcon  className="hover_pointer" onClick={() => handleSubmit()}/>
            <div className="hover_pointer" onClick={() => handleSubmit()}>Submit</div>
          </div>
        </>
      )}
    </>
  );
}
export default Form;
