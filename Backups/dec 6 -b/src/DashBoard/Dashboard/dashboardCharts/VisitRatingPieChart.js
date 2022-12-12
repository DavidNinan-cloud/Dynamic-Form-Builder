import { Card, CardContent } from "@mui/material";
import React from "react";
import { Cell,  Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { getCustomerSatisfactionCount } from "../../services/dashboardServices/CustomerSatisfactionService";


let COLORS = ["#FF0000", "#fef500", "#BADC58", "#FF8024","#0088FE"];



const VisitRatingPieChart = () => {
  const [chartSatisfactionData, setChartSatisfactionData] = React.useState([]);

  function getCustomerCount() {
   
    getCustomerSatisfactionCount()
      .then((response) => {
        const resData = JSON.stringify(response);
        console.log("hellhiii",resData);
        console.log("The list of all the chartStatisfactionData are as follows" + response);
        console.log(JSON.stringify(response));
        console.log("hiiiiiii",response.data.result);
        
        let satisfactionData=[]
        response.data.result.forEach(element => {
          let patientSatisfactionObj={}
              patientSatisfactionObj.name=element.type 
              patientSatisfactionObj.value=element.count 
              satisfactionData.push(patientSatisfactionObj)
        });
        console.log(satisfactionData);
        setChartSatisfactionData(satisfactionData);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  React.useEffect(() => {
    console.log("getCustomerCount() is going to be executed");
    getCustomerCount();
  }, []);

  return (
    <div>
      <Card elevation={5} sx={{ borderRadius: "10px" }}>
        <CardContent>
          <h1 className="p-2 font-bold text-gray-800 text-base font-Poppins">
            Patient Satisfaction
          </h1>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart width={400} height={400}>
              <Pie
                data={chartSatisfactionData}
                cx={280}
                cy={140}
                width={200}
                height={200}
                innerRadius={60}
                outerRadius={100}              
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  index
                }) => {
                  console.log("handling label?");
                  const RADIAN = Math.PI / 180;
                  // eslint-disable-next-line
                  const radius = 25 + innerRadius + (outerRadius - innerRadius);
                  // eslint-disable-next-line
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  // eslint-disable-next-line
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);
        
                  return (
                    <text
                      x={x}
                      y={y}
                      fill="#8884d8"
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="central"
                    >
                      {chartSatisfactionData[index].name} ({value})
                    </text>
                  );
                }}
              >
                {chartSatisfactionData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
           
              </Pie>
  
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisitRatingPieChart;
