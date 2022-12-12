import React from 'react'
import OTCheckListTable from '../common/OTCheckListTable';

const OTCheckListData1 = {
message: "Special Instruction list found",
    result: [
      {
       "Before induction of anaesthesia": "Has the patient confirmed his/her identity,site, procedure, and consent?"
      },
      {
        "Before induction of anaesthesia": "Is the site marked?",
      },
      {
        "Before induction of anaesthesia": "Is the anaesthesia machine and medication check complete?"
       },
       {
        "Before induction of anaesthesia": "Is the pulse oximeter on the patient and functioning?"
       },
       {
        "Before induction of anaesthesia": "Does the patient have a Known allergy?"
       },
       {
        "Before induction of anaesthesia": "Difficult airway or aspiration risk?"
       },
       {
        "Before induction of anaesthesia": "Risk of >500ml blood loss (7ml/kg in children)?"
       },
    ],
    statusCode: 200,
    count: 3,
  };

  const OTCheckListData2 = {
    message: "Special Instruction list found",
        result: [
          {
           "A Before skin incision": "Confirm all team members have introduced themselves by name and role."
          },
          {
            "A Before skin incision": "Confirm the patient’s name, procedure,and where the incision will be made.",
          },
          {
            "A Before skin incision": "Has antibiotic prophylaxis been given within the last 60 minutes?"
           },
           {
            "A Before skin incision": "Anticipated Critical Events"
           },
           {
            "A Before skin incision": "To Surgeon: What are the critical or non-routine steps?"
           },
           {
            "A Before skin incision": "To Surgeon: How long will the case take?"
           },
           {
            "A Before skin incision": "To Surgeon: What is the anticipated blood loss?"
           },
           {
            "A Before skin incision": "To Anaesthetist: Are there any patient-specific concerns?"
           },
           {
            "A Before skin incision": "To Nursing Team: Has sterility (including indicator results) been confirmed?"
           },
           {
            "A Before skin incision": "To Nursing Team: Are there equipment issues or any concerns?"
           },
           {
            "A Before skin incision": "Is essential imaging displayed?"
           },
        ],
        statusCode: 200,
        count: 3,
      };

      const OTCheckListData3 = {
        message: "Special Instruction list found",
            result: [
              {
               "Before patient leaves operating room": "Nurse Verbally Confirms: The name of the procedure"
              },
              {
                "Before patient leaves operating room": "Nurse Verbally Confirms: Completion of instrument, sponge and needle counts",
              },
              {
                "Before patient leaves operating room": "Nurse Verbally Confirms: Specimen labelling (read specimen labels aloud,including patient name)"
               },
               {
                "Before patient leaves operating room": "Nurse Verbally Confirms: Whether there are any equipment problems to be addressed"
               },
               {
                "Before patient leaves operating room": "To Surgeon, Anaesthetist and Nurse: What are the key concerns for recovery and management of this patient?"
               },
            ],
            statusCode: 200,
            count: 3,
          };

const OTCheckList = () => {
  return (
    <div className="gap-y-3">
      <OTCheckListTable data={OTCheckListData1}/>
      <OTCheckListTable data={OTCheckListData2}/>
      <OTCheckListTable data={OTCheckListData3}/>
    </div>
  )
}

export default OTCheckList
