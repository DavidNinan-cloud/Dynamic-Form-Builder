import React, { useEffect, useState } from 'react'
import {  createContext } from "react";

const dummyData = [
    {
        "id": 1,
        "season": "Prev-Records",
        "type": "buy",
        "companyName": "Hindunilvr",
        "scrip": "hindunilvr",
        "date": "24-02-2022",
        "quantity": 2,
        "price": 2195.6
    },
    {
        "id": 2,
        "season": "Prev-Records",
        "type": "buy",
        "companyName": "Colpal",
        "scrip": "colpal",
        "date": "24-02-2022",
        "quantity": 3,
        "price": 1395.95
    },
    {
        "id": 3,
        "season": "Prev-Records",
        "type": "buy",
        "companyName": "hdfcbank",
        "scrip": "hdfcbank",
        "date": "24-02-2022",
        "quantity": 3,
        "price": 1440.25
    },
    {
        "id": 4,
        "season": "Prev-Records",
        "type": "buy",
        "companyName": "TCS",
        "scrip": "tcs",
        "date": "24-02-2022",
        "quantity": 4,
        "price": 3415.55
    },
    {
        "id": 5,
        "season": "Prev-Records",
        "type": "buy",
        "companyName": "tatasteel",
        "scrip": "tatasteel",
        "date": "24-02-2022",
        "quantity": 4,
        "price": 1082.95,
        "shouldNotCalculate": "Yes",
        "reason": "split 1:10  date - 28 july"
    },
    {
        "id": 6,
        "season": "Prev-Records",
        "type": "buy",
        "companyName": "tatasteel",
        "scrip": "tatasteel",
        "date": "24-02-2022",
        "quantity": 40,
        "price": 108.3
    },
    {
        "id": 7,
        "season": "Prev-Records",
        "type": "buy",
        "companyName": "tatapower",
        "scrip": "tatapower",
        "date": "24-02-2022",
        "quantity": 5,
        "price": 204.7
    },
    {
        "id": 8,
        "season": "Prev-Records",
        "type": "buy",
        "companyName": "hdfcamc",
        "scrip": "hdfcamc",
        "date": "24-02-2022",
        "quantity": 4,
        "price": 2035
    },
    {
        "id": 9,
        "season": "Q1",
        "type": "buy",
        "companyName": "Hindunilvr",
        "scrip": "hindunilvr",
        "date": "04-03-2022",
        "quantity": 2,
        "price": 2025.75
    },
    {
        "id": 10,
        "season": "Q1",
        "type": "buy",
        "companyName": "hdfcbank",
        "scrip": "hdfcbank",
        "date": "07-03-2022",
        "quantity": 2,
        "price": 1322.7
    },
    {
        "id": 11,
        "season": "Q1",
        "type": "buy",
        "companyName": "bajaj-auto",
        "scrip": "bajaj-auto",
        "date": "07-03-2022",
        "quantity": 2,
        "price": 3196.45
    },
    {
        "id": 12,
        "season": "Q1",
        "type": "buy",
        "companyName": "coalindia",
        "scrip": "coalindia",
        "date": "07-03-2022",
        "quantity": 5,
        "price": 184.55
    },
    {
        "id": 13,
        "season": "Q2",
        "type": "buy",
        "companyName": "tcs",
        "scrip": "tcs",
        "date": "17-06-2022",
        "quantity": 4,
        "price": 3050.9
    },
    {
        "id": 14,
        "season": "Q2",
        "type": "buy",
        "companyName": "tatasteel",
        "scrip": "tatasteel",
        "date": "17-06-2022",
        "quantity": 4,
        "price": 914.55,
        "shouldNotCalculate": "Yes",
        "reason": "split 1:10  date - 28 july"
    },
    {
        "id": 15,
        "season": "Q2",
        "type": "buy",
        "companyName": "tatasteel",
        "scrip": "tatasteel",
        "date": "17-06-2022",
        "quantity": 40,
        "price": 91.5
    },
    {
        "id": 16,
        "season": "Q2",
        "type": "buy",
        "companyName": "tatapower",
        "scrip": "tatapower",
        "date": "17-06-2022",
        "quantity": 18,
        "price": 211.3
    },
    {
        "id": 17,
        "season": "Q2",
        "type": "sell",
        "companyName": "HDFCBANK",
        "scrip": "hdfcbank",
        "date": "12-07-2022",
        "quantity": 5,
        "price": 1395.8
    },
    {
        "id": 18,
        "season": "Q2",
        "type": "buy",
        "companyName": "TATASTEEL",
        "scrip": "tatasteel",
        "date": "15-07-2022",
        "quantity": 10,
        "price": 890.1,
        "shouldNotCalculate": "Yes",
        "reason": "split 1:10  date - 28 july"
    },
    {
        "id": 19,
        "season": "Q2",
        "type": "buy",
        "companyName": "TATASTEEL",
        "scrip": "tatasteel",
        "date": "15-07-2022",
        "quantity": 100,
        "price": 89.01
    },
    {
        "id": 20,
        "season": "Q2",
        "type": "sell",
        "companyName": "TATASTEEL",
        "scrip": "tatasteel",
        "date": "15-07-2022",
        "quantity": 8,
        "price": 889.8,
        "shouldNotCalculate": "Yes",
        "reason": "split 1:10  date - 28 july"
    },
    {
        "id": 21,
        "season": "Q2",
        "type": "sell",
        "companyName": "TATASTEEL",
        "scrip": "tatasteel",
        "date": "15-07-2022",
        "quantity": 80,
        "price": 88.98
    },
    {
        "id": 22,
        "season": "Q2",
        "type": "sell",
        "companyName": "TATASTEEL",
        "scrip": "tatasteel",
        "date": "15-07-2022",
        "quantity": 2,
        "price": 889.85,
        "shouldNotCalculate": "Yes",
        "reason": "split 1:10  date - 28 july"
    },
    {
        "id": 23,
        "season": "Q2",
        "type": "sell",
        "companyName": "TATASTEEL",
        "scrip": "tatasteel",
        "date": "15-07-2022",
        "quantity": 20,
        "price": 88.985
    },
    {
        "id": 24,
        "season": "Q2",
        "type": "buy",
        "companyName": "TATASTEEL",
        "scrip": "tatasteel",
        "date": "18-07-2022",
        "quantity": 8,
        "price": 897.5,
        "shouldNotCalculate": "Yes",
        "reason": "split 1:10  date - 28 july"
    },
    {
        "id": 25,
        "season": "Q2",
        "type": "buy",
        "companyName": "TATASTEEL",
        "scrip": "tatasteel",
        "date": "18-07-2022",
        "quantity": 80,
        "price": 89.75
    },
    {
        "id": 26,
        "season": "Q2",
        "type": "sell",
        "companyName": "BAJAJ-AUTO",
        "scrip": "bajaj-auto",
        "date": "19-07-2022",
        "quantity": 2,
        "price": 3999.5
    },
    {
        "id": 27,
        "season": "Q2",
        "type": "buy",
        "companyName": "TATASTEEL",
        "scrip": "tatasteel",
        "date": "19-07-2022",
        "quantity": 14,
        "price": 918.55,
        "shouldNotCalculate": "Yes",
        "reason": "split 1:10  date - 28 july"
    },
    {
        "id": 28,
        "season": "Q2",
        "type": "buy",
        "companyName": "TATASTEEL",
        "scrip": "tatasteel",
        "date": "19-07-2022",
        "quantity": 140,
        "price": 91.855
    },
    {
        "id": 29,
        "season": "Q2",
        "type": "sell",
        "companyName": "TATASTEEL",
        "scrip": "tatasteel",
        "date": "19-07-2022",
        "quantity": 8,
        "price": 917.15,
        "shouldNotCalculate": "Yes",
        "reason": "split 1:10  date - 28 july"
    },
    {
        "id": 30,
        "season": "Q2",
        "type": "sell",
        "companyName": "TATASTEEL",
        "scrip": "tatasteel",
        "date": "19-07-2022",
        "quantity": 80,
        "price": 91.715
    },
    {
        "id": 31,
        "season": "Q2",
        "type": "sell",
        "companyName": "TATASTEEL",
        "scrip": "tatasteel",
        "date": "19-07-2022",
        "quantity": 6,
        "price": 917.15,
        "shouldNotCalculate": "Yes",
        "reason": "split 1:10  date - 28 july"
    },
    {
        "id": 32,
        "season": "Q2",
        "type": "sell",
        "companyName": "TATASTEEL",
        "scrip": "tatasteel",
        "date": "19-07-2022",
        "quantity": 60,
        "price": 91.715
    },
    {
        "id": 33,
        "season": "Q2",
        "type": "buy",
        "companyName": "TATASTEEL",
        "scrip": "tatasteel",
        "date": "20-07-2022",
        "quantity": 12,
        "price": 929.7,
        "shouldNotCalculate": "Yes",
        "reason": "split 1:10  date - 28 july"
    },
    {
        "id": 34,
        "season": "Q2",
        "type": "buy",
        "companyName": "TATASTEEL",
        "scrip": "tatasteel",
        "date": "20-07-2022",
        "quantity": 120,
        "price": 92.97
    },
    {
        "id": 35,
        "season": "Q2",
        "type": "buy",
        "companyName": "TATASTEEL",
        "scrip": "tatasteel",
        "date": "21-07-2022",
        "quantity": 12,
        "price": 930,
        "shouldNotCalculate": "Yes",
        "reason": "split 1:10  date - 28 july"
    },
    {
        "id": 36,
        "season": "Q2",
        "type": "buy",
        "companyName": "TATASTEEL",
        "scrip": "tatasteel",
        "date": "21-07-2022",
        "quantity": 120,
        "price": 93
    },
    {
        "id": 37,
        "season": "Q2",
        "type": "buy",
        "companyName": "TATAMOTORS",
        "scrip": "tatamotors",
        "date": "25-07-2022",
        "quantity": 8,
        "price": 450
    },
    {
        "id": 38,
        "season": "Q2",
        "type": "sell",
        "companyName": "TATAMOTORS",
        "scrip": "tatamotors",
        "date": "04-08-2022",
        "quantity": 8,
        "price": 469.6
    },
    {
        "id": 39,
        "season": "Q2",
        "type": "sell",
        "companyName": "TCS",
        "scrip": "tcs",
        "date": "04-08-2022",
        "quantity": 8,
        "price": 3373
    },
    {
        "id": 40,
        "season": "Q2",
        "type": "sell",
        "companyName": "HDFCAMC",
        "scrip": "hdfcamc",
        "date": "04-08-2022",
        "quantity": 4,
        "price": 2003.75
    },
    {
        "id": 41,
        "season": "Q2",
        "type": "buy",
        "companyName": "TATAMOTORS",
        "scrip": "tatamotors",
        "date": "08-08-2022",
        "quantity": 11,
        "price": 466.9
    },
    {
        "id": 42,
        "season": "Q2",
        "type": "buy",
        "companyName": "TATASTEEL",
        "scrip": "tatasteel",
        "date": "26-08-2022",
        "quantity": 100,
        "price": 107.6
    },
    {
        "id": 43,
        "season": "Q3",
        "type": "buy",
        "companyName": "TATASTEEL",
        "scrip": "tatasteel",
        "date": "13-10-2022",
        "quantity": 300,
        "price": 99.6
    },
    {
        "id": 44,
        "season": "Q3",
        "type": "buy",
        "companyName": "TATASTEEL",
        "scrip": "tatasteel",
        "date": "17-10-2022",
        "quantity": 200,
        "price": 98.2
    },
    {
        "id": 45,
        "season": "Q3",
        "type": "buy",
        "companyName": "COALINDIA",
        "scrip": "coalindia",
        "date": "17-10-2022",
        "quantity": 24,
        "price": 237.15
    },
    {
        "id": 46,
        "season": "Q3",
        "type": "buy",
        "companyName": "COALINDIA",
        "scrip": "coalindia",
        "date": "17-10-2022",
        "quantity": 21,
        "price": 237.1
    },
    {
        "id": 47,
        "season": "Q3",
        "type": "buy",
        "companyName": "COALINDIA",
        "scrip": "coalindia",
        "date": "18-10-2022",
        "quantity": 44,
        "price": 239.75
    },
    {
        "id": 48,
        "season": "Q3",
        "type": "buy",
        "companyName": "COALINDIA",
        "scrip": "coalindia",
        "date": "18-10-2022",
        "quantity": 21,
        "price": 239.75
    },
    {
        "id": 49,
        "season": "Q3",
        "type": "buy",
        "companyName": "TATASTEEL",
        "scrip": "tatasteel",
        "date": "18-10-2022",
        "quantity": 8,
        "price": 100.9
    },
    {
        "id": 50,
        "season": "Q3",
        "type": "buy",
        "companyName": "TATASTEEL",
        "scrip": "tatasteel",
        "date": "18-10-2022",
        "quantity": 72,
        "price": 100.95
    }
]

export const ElementsContext = createContext({});


export const ElementsContextProvider = ({ children}) => {

  //  State Variable
  const [data,setData] = React.useState(dummyData)
  return (
      <ElementsContext.Provider value={{
        data
       }}>
          {children}
      </ElementsContext.Provider>

  );
}
