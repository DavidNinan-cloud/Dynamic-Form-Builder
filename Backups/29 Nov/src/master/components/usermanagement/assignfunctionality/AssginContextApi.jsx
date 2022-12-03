import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {  createContext } from "react";
import useDidMountEffect from '../../../../Common Components/Custom Hooks/useDidMountEffect'
let dummyData = [
    {
      "id": 1,
      "functionality": "Dashboard",
      "isChecked": true
    },
    {
      "id": 2,
      "functionality": "Registration",
      "isChecked": true,
      "subFunction": [
        {
          "id": 3,
          "functionality": "Pre Registration",
          "isChecked": true,
          "permissions": [
            {
              "id": 1,
              "permission": "Create",
              "isChecked": true
            }
          ]
        },
        {
          "id": 4,
          "functionality": "Quick Registration",
          "isChecked": true,
          "permissions": [
            {
              "id": 1,
              "permission": "Create",
              "isChecked": true
            }
          ]
        },
        {
          "id": 5,
          "functionality": "Search Patient",
          "isChecked": true,
          "permissions": [
            {
              "id": 2,
              "permission": "View",
              "isChecked": true
            },
            {
              "id": 3,
              "permission": "Edit",
              "isChecked": true
            }
          ]
        }
      ]
    },
    {
      "id": 6,
      "functionality": "Appointment",
      "isChecked": true,
      "subFunction": [
        {
          "id": 7,
          "functionality": "Book Appointment",
          "isChecked": true,
          "permissions": [
            {
              "id": 1,
              "permission": "Create",
              "isChecked": true
            }
          ]
        },
        {
          "id": 8,
          "functionality": "Appointment List",
          "isChecked": true,
          "permissions": [
            {
              "id": 1,
              "permission": "Create",
              "isChecked": true
            },
            {
              "id": 2,
              "permission": "View",
              "isChecked": true
            },
            {
              "id": 5,
              "permission": "Confirm",
              "isChecked": true
            },
            {
              "id": 6,
              "permission": "Reschedule",
              "isChecked": true
            },
            {
              "id": 7,
              "permission": "Cancel",
              "isChecked": true
            },
            {
              "id": 8,
              "permission": "Bill",
              "isChecked": true
            }
          ]
        }
      ]
    },
    {
      "id": 9,
      "functionality": "Queue Management",
      "isChecked": true,
      "subFunction": [
        {
          "id": 10,
          "functionality": "Patient Queue",
          "isChecked": true,
          "permissions": [
            {
              "id": 7,
              "permission": "Cancel",
              "isChecked": true
            },
            {
              "id": 8,
              "permission": "Bill",
              "isChecked": true
            },
            {
              "id": 9,
              "permission": "Close",
              "isChecked": true
            },
            {
              "id": 10,
              "permission": "Visit",
              "isChecked": true
            },
            {
              "id": 11,
              "permission": "VItals",
              "isChecked": true
            },
            {
              "id": 12,
              "permission": "Call",
              "isChecked": true
            }
          ]
        }
      ]
    },
    {
      "id": 11,
      "functionality": "Masters",
      "isChecked": true,
      "subFunction": [
        {
          "id": 12,
          "functionality": "Organization",
          "isChecked": true,
          "subFunction": [
            {
              "id": 13,
              "functionality": "Organizations",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 14,
              "functionality": "Unit",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 15,
              "functionality": "Department",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 16,
              "functionality": "Sub Department",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 17,
              "functionality": "Cabin",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 18,
              "functionality": "Blocks",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 19,
              "functionality": "Wards",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 20,
              "functionality": "Rooms",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 21,
              "functionality": "Floors",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 22,
              "functionality": "DischargeType",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 23,
              "functionality": "Beds",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            }
          ]
        },
        {
          "id": 24,
          "functionality": "Referral",
          "isChecked": true,
          "subFunction": [
            {
              "id": 25,
              "functionality": "Refer Type",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 26,
              "functionality": "Refer By",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            }
          ]
        },
        {
          "id": 27,
          "functionality": "User Management",
          "isChecked": true,
          "subFunction": [
            {
              "id": 28,
              "functionality": "Employee Type",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 29,
              "functionality": "Employee",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 30,
              "functionality": "Role",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 31,
              "functionality": "AssignFunctionality",
              "isChecked": true
            },
            {
              "id": 32,
              "functionality": "Users",
              "isChecked": true
            }
          ]
        },
        {
          "id": 33,
          "functionality": "Doctor Scheduling",
          "isChecked": true,
          "subFunction": [
            {
              "id": 34,
              "functionality": "Doctor Schedule",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 35,
              "functionality": "Week Day",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 105,
              "functionality": "Doctor Schedule List",
              "isChecked": true
            }
          ]
        },
        {
          "id": 36,
          "functionality": "Appointments",
          "isChecked": true,
          "subFunction": [
            {
              "id": 37,
              "functionality": "Appoinment Booking Source",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 38,
              "functionality": "Type of Appointment",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            }
          ]
        },
        {
          "id": 39,
          "functionality": "Areas",
          "isChecked": true,
          "subFunction": [
            {
              "id": 40,
              "functionality": "Country",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 41,
              "functionality": "State",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 42,
              "functionality": "District",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 43,
              "functionality": "Tehsil",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 44,
              "functionality": "City",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 45,
              "functionality": "Pincode",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 46,
              "functionality": "Area",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            }
          ]
        },
        {
          "id": 47,
          "functionality": "OPD",
          "isChecked": true,
          "subFunction": [
            {
              "id": 48,
              "functionality": "EMR",
              "isChecked": true,
              "subFunction": [
                {
                  "id": 49,
                  "functionality": "Allergy",
                  "isChecked": true,
                  "permissions": [
                    {
                      "id": 1,
                      "permission": "Create",
                      "isChecked": true
                    },
                    {
                      "id": 2,
                      "permission": "View",
                      "isChecked": true
                    },
                    {
                      "id": 3,
                      "permission": "Edit",
                      "isChecked": true
                    },
                    {
                      "id": 4,
                      "permission": "Delete",
                      "isChecked": true
                    }
                  ]
                },
                {
                  "id": 50,
                  "functionality": "History Template",
                  "isChecked": true,
                  "permissions": [
                    {
                      "id": 1,
                      "permission": "Create",
                      "isChecked": true
                    },
                    {
                      "id": 2,
                      "permission": "View",
                      "isChecked": true
                    },
                    {
                      "id": 3,
                      "permission": "Edit",
                      "isChecked": true
                    },
                    {
                      "id": 4,
                      "permission": "Delete",
                      "isChecked": true
                    }
                  ]
                },
                {
                  "id": 51,
                  "functionality": "Vital",
                  "isChecked": true,
                  "permissions": [
                    {
                      "id": 1,
                      "permission": "Create",
                      "isChecked": true
                    },
                    {
                      "id": 2,
                      "permission": "View",
                      "isChecked": true
                    },
                    {
                      "id": 3,
                      "permission": "Edit",
                      "isChecked": true
                    },
                    {
                      "id": 4,
                      "permission": "Delete",
                      "isChecked": true
                    }
                  ]
                },
                {
                  "id": 52,
                  "functionality": "Symptoms",
                  "isChecked": true,
                  "permissions": [
                    {
                      "id": 1,
                      "permission": "Create",
                      "isChecked": true
                    },
                    {
                      "id": 2,
                      "permission": "View",
                      "isChecked": true
                    },
                    {
                      "id": 3,
                      "permission": "Edit",
                      "isChecked": true
                    },
                    {
                      "id": 4,
                      "permission": "Delete",
                      "isChecked": true
                    }
                  ]
                },
                {
                  "id": 53,
                  "functionality": "Complaint",
                  "isChecked": true,
                  "permissions": [
                    {
                      "id": 1,
                      "permission": "Create",
                      "isChecked": true
                    },
                    {
                      "id": 2,
                      "permission": "View",
                      "isChecked": true
                    },
                    {
                      "id": 3,
                      "permission": "Edit",
                      "isChecked": true
                    },
                    {
                      "id": 4,
                      "permission": "Delete",
                      "isChecked": true
                    }
                  ]
                },
                {
                  "id": 54,
                  "functionality": "ICD Code",
                  "isChecked": true,
                  "permissions": [
                    {
                      "id": 1,
                      "permission": "Create",
                      "isChecked": true
                    },
                    {
                      "id": 2,
                      "permission": "View",
                      "isChecked": true
                    },
                    {
                      "id": 3,
                      "permission": "Edit",
                      "isChecked": true
                    },
                    {
                      "id": 4,
                      "permission": "Delete",
                      "isChecked": true
                    }
                  ]
                },
                {
                  "id": 55,
                  "functionality": "Doctor Advice",
                  "isChecked": true,
                  "permissions": [
                    {
                      "id": 1,
                      "permission": "Create",
                      "isChecked": true
                    },
                    {
                      "id": 2,
                      "permission": "View",
                      "isChecked": true
                    },
                    {
                      "id": 3,
                      "permission": "Edit",
                      "isChecked": true
                    },
                    {
                      "id": 4,
                      "permission": "Delete",
                      "isChecked": true
                    }
                  ]
                },
                {
                  "id": 56,
                  "functionality": "Dose Frequency",
                  "isChecked": true,
                  "permissions": [
                    {
                      "id": 1,
                      "permission": "Create",
                      "isChecked": true
                    },
                    {
                      "id": 2,
                      "permission": "View",
                      "isChecked": true
                    },
                    {
                      "id": 3,
                      "permission": "Edit",
                      "isChecked": true
                    },
                    {
                      "id": 4,
                      "permission": "Delete",
                      "isChecked": true
                    }
                  ]
                },
                {
                  "id": 57,
                  "functionality": "Instruction",
                  "isChecked": true,
                  "permissions": [
                    {
                      "id": 1,
                      "permission": "Create",
                      "isChecked": true
                    },
                    {
                      "id": 2,
                      "permission": "View",
                      "isChecked": true
                    },
                    {
                      "id": 3,
                      "permission": "Edit",
                      "isChecked": true
                    },
                    {
                      "id": 4,
                      "permission": "Delete",
                      "isChecked": true
                    }
                  ]
                },
                {
                  "id": 58,
                  "functionality": "Route",
                  "isChecked": true,
                  "permissions": [
                    {
                      "id": 1,
                      "permission": "Create",
                      "isChecked": true
                    },
                    {
                      "id": 2,
                      "permission": "View",
                      "isChecked": true
                    },
                    {
                      "id": 3,
                      "permission": "Edit",
                      "isChecked": true
                    },
                    {
                      "id": 4,
                      "permission": "Delete",
                      "isChecked": true
                    }
                  ]
                },
                {
                  "id": 59,
                  "functionality": "Generic",
                  "isChecked": true,
                  "permissions": [
                    {
                      "id": 1,
                      "permission": "Create",
                      "isChecked": true
                    },
                    {
                      "id": 2,
                      "permission": "View",
                      "isChecked": true
                    },
                    {
                      "id": 3,
                      "permission": "Edit",
                      "isChecked": true
                    },
                    {
                      "id": 4,
                      "permission": "Delete",
                      "isChecked": true
                    }
                  ]
                },
                {
                  "id": 60,
                  "functionality": "Drug Master",
                  "isChecked": true,
                  "permissions": [
                    {
                      "id": 1,
                      "permission": "Create",
                      "isChecked": true
                    },
                    {
                      "id": 2,
                      "permission": "View",
                      "isChecked": true
                    },
                    {
                      "id": 3,
                      "permission": "Edit",
                      "isChecked": true
                    },
                    {
                      "id": 4,
                      "permission": "Delete",
                      "isChecked": true
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": 61,
          "functionality": "Billing",
          "isChecked": true,
          "subFunction": [
            {
              "id": 62,
              "functionality": "Patient Category",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 63,
              "functionality": "Payment Type",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 64,
              "functionality": "Tariff",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 65,
              "functionality": "Discount Details",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 66,
              "functionality": "Group",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 67,
              "functionality": "Sub Group",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 68,
              "functionality": "Admin Charges",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 69,
              "functionality": "Class",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 70,
              "functionality": "Services",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            }
          ]
        },
        {
          "id": 71,
          "functionality": "Common",
          "isChecked": true,
          "subFunction": [
            {
              "id": 72,
              "functionality": "Patient Gender",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 73,
              "functionality": "Patient Prefix",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            },
            {
              "id": 74,
              "functionality": "Citizen ID Proof",
              "isChecked": true,
              "permissions": [
                {
                  "id": 1,
                  "permission": "Create",
                  "isChecked": true
                },
                {
                  "id": 2,
                  "permission": "View",
                  "isChecked": true
                },
                {
                  "id": 3,
                  "permission": "Edit",
                  "isChecked": true
                },
                {
                  "id": 4,
                  "permission": "Delete",
                  "isChecked": true
                }
              ]
            }
          ]
        },
        {
          "id": 75,
          "functionality": "LIMS",
          "isChecked": true,
          "subFunction": [
            {
              "id": 76,
              "functionality": "Pathology",
              "isChecked": true,
              "subFunction": [
                {
                  "id": 77,
                  "functionality": "Category",
                  "isChecked": true,
                  "permissions": [
                    {
                      "id": 1,
                      "permission": "Create",
                      "isChecked": true
                    },
                    {
                      "id": 2,
                      "permission": "View",
                      "isChecked": true
                    },
                    {
                      "id": 3,
                      "permission": "Edit",
                      "isChecked": true
                    },
                    {
                      "id": 4,
                      "permission": "Delete",
                      "isChecked": true
                    }
                  ]
                },
                {
                  "id": 78,
                  "functionality": "Parameter",
                  "isChecked": true,
                  "permissions": [
                    {
                      "id": 1,
                      "permission": "Create",
                      "isChecked": true
                    },
                    {
                      "id": 2,
                      "permission": "View",
                      "isChecked": true
                    },
                    {
                      "id": 3,
                      "permission": "Edit",
                      "isChecked": true
                    },
                    {
                      "id": 4,
                      "permission": "Delete",
                      "isChecked": true
                    }
                  ]
                },
                {
                  "id": 79,
                  "functionality": "ParameterUnit",
                  "isChecked": true,
                  "permissions": [
                    {
                      "id": 1,
                      "permission": "Create",
                      "isChecked": true
                    },
                    {
                      "id": 2,
                      "permission": "View",
                      "isChecked": true
                    },
                    {
                      "id": 3,
                      "permission": "Edit",
                      "isChecked": true
                    },
                    {
                      "id": 4,
                      "permission": "Delete",
                      "isChecked": true
                    }
                  ]
                },
                {
                  "id": 80,
                  "functionality": "Template",
                  "isChecked": true,
                  "permissions": [
                    {
                      "id": 1,
                      "permission": "Create",
                      "isChecked": true
                    },
                    {
                      "id": 2,
                      "permission": "View",
                      "isChecked": true
                    },
                    {
                      "id": 3,
                      "permission": "Edit",
                      "isChecked": true
                    },
                    {
                      "id": 4,
                      "permission": "Delete",
                      "isChecked": true
                    }
                  ]
                },
                {
                  "id": 81,
                  "functionality": "Antibiotic",
                  "isChecked": true,
                  "permissions": [
                    {
                      "id": 1,
                      "permission": "Create",
                      "isChecked": true
                    },
                    {
                      "id": 2,
                      "permission": "View",
                      "isChecked": true
                    },
                    {
                      "id": 3,
                      "permission": "Edit",
                      "isChecked": true
                    },
                    {
                      "id": 4,
                      "permission": "Delete",
                      "isChecked": true
                    }
                  ]
                },
                {
                  "id": 82,
                  "functionality": "Pathologist",
                  "isChecked": true,
                  "permissions": [
                    {
                      "id": 1,
                      "permission": "Create",
                      "isChecked": true
                    },
                    {
                      "id": 2,
                      "permission": "View",
                      "isChecked": true
                    },
                    {
                      "id": 3,
                      "permission": "Edit",
                      "isChecked": true
                    },
                    {
                      "id": 4,
                      "permission": "Delete",
                      "isChecked": true
                    }
                  ]
                },
                {
                  "id": 83,
                  "functionality": "Machine",
                  "isChecked": true,
                  "permissions": [
                    {
                      "id": 1,
                      "permission": "Create",
                      "isChecked": true
                    },
                    {
                      "id": 2,
                      "permission": "View",
                      "isChecked": true
                    },
                    {
                      "id": 3,
                      "permission": "Edit",
                      "isChecked": true
                    },
                    {
                      "id": 4,
                      "permission": "Delete",
                      "isChecked": true
                    }
                  ]
                },
                {
                  "id": 84,
                  "functionality": "Machine Parameter",
                  "isChecked": true,
                  "permissions": [
                    {
                      "id": 1,
                      "permission": "Create",
                      "isChecked": true
                    },
                    {
                      "id": 2,
                      "permission": "View",
                      "isChecked": true
                    },
                    {
                      "id": 3,
                      "permission": "Edit",
                      "isChecked": true
                    },
                    {
                      "id": 4,
                      "permission": "Delete",
                      "isChecked": true
                    }
                  ]
                },
                {
                  "id": 85,
                  "functionality": "Organism",
                  "isChecked": true,
                  "permissions": [
                    {
                      "id": 1,
                      "permission": "Create",
                      "isChecked": true
                    },
                    {
                      "id": 2,
                      "permission": "View",
                      "isChecked": true
                    },
                    {
                      "id": 3,
                      "permission": "Edit",
                      "isChecked": true
                    },
                    {
                      "id": 4,
                      "permission": "Delete",
                      "isChecked": true
                    }
                  ]
                },
                {
                  "id": 86,
                  "functionality": "PathologyProfile",
                  "isChecked": true,
                  "permissions": [
                    {
                      "id": 1,
                      "permission": "Create",
                      "isChecked": true
                    },
                    {
                      "id": 2,
                      "permission": "View",
                      "isChecked": true
                    },
                    {
                      "id": 3,
                      "permission": "Edit",
                      "isChecked": true
                    },
                    {
                      "id": 4,
                      "permission": "Delete",
                      "isChecked": true
                    }
                  ]
                },
                {
                  "id": 113,
                  "functionality": "Tests",
                  "isChecked": false
                }
              ]
            },
            {
              "id": 87,
              "functionality": "Radiology",
              "isChecked": true,
              "subFunction": [
                {
                  "id": 88,
                  "functionality": "Category",
                  "isChecked": true,
                  "permissions": [
                    {
                      "id": 1,
                      "permission": "Create",
                      "isChecked": true
                    },
                    {
                      "id": 2,
                      "permission": "View",
                      "isChecked": true
                    },
                    {
                      "id": 3,
                      "permission": "Edit",
                      "isChecked": true
                    },
                    {
                      "id": 4,
                      "permission": "Delete",
                      "isChecked": true
                    }
                  ]
                },
                {
                  "id": 89,
                  "functionality": "Template",
                  "isChecked": true,
                  "permissions": [
                    {
                      "id": 1,
                      "permission": "Create",
                      "isChecked": true
                    },
                    {
                      "id": 2,
                      "permission": "View",
                      "isChecked": true
                    },
                    {
                      "id": 3,
                      "permission": "Edit",
                      "isChecked": true
                    },
                    {
                      "id": 4,
                      "permission": "Delete",
                      "isChecked": true
                    }
                  ]
                },
                {
                  "id": 90,
                  "functionality": "Radiologist",
                  "isChecked": true,
                  "permissions": [
                    {
                      "id": 1,
                      "permission": "Create",
                      "isChecked": true
                    },
                    {
                      "id": 2,
                      "permission": "View",
                      "isChecked": true
                    },
                    {
                      "id": 3,
                      "permission": "Edit",
                      "isChecked": true
                    },
                    {
                      "id": 4,
                      "permission": "Delete",
                      "isChecked": true
                    }
                  ]
                },
                {
                  "id": 91,
                  "functionality": "Modality",
                  "isChecked": true,
                  "permissions": [
                    {
                      "id": 1,
                      "permission": "Create",
                      "isChecked": true
                    },
                    {
                      "id": 2,
                      "permission": "View",
                      "isChecked": true
                    },
                    {
                      "id": 3,
                      "permission": "Edit",
                      "isChecked": true
                    },
                    {
                      "id": 4,
                      "permission": "Delete",
                      "isChecked": true
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": 92,
      "functionality": "IPD",
      "isChecked": false,
      "subFunction": [
        {
          "id": 93,
          "functionality": "Admission",
          "isChecked": true
        },
        {
          "id": 94,
          "functionality": "Bed Selection Card",
          "isChecked": true
        },
        {
          "id": 95,
          "functionality": "Patient Discharge Cards",
          "isChecked": true
        },
        {
          "id": 96,
          "functionality": "Patient Pain Assessment",
          "isChecked": true
        },
        {
          "id": 97,
          "functionality": "Patient Transfer",
          "isChecked": true
        }
      ]
    },
    {
      "id": 98,
      "functionality": "Billing",
      "isChecked": false,
      "subFunction": [
        {
          "id": 99,
          "functionality": "Company Settlement",
          "isChecked": false
        },
        {
          "id": 100,
          "functionality": "Patient Advance",
          "isChecked": false
        },
        {
          "id": 101,
          "functionality": "Payment Settlement",
          "isChecked": false
        },
        {
          "id": 102,
          "functionality": "Payment Refund",
          "isChecked": false
        },
        {
          "id": 103,
          "functionality": "IPD Charges",
          "isChecked": false
        },
        {
          "id": 104,
          "functionality": "IPD Bill",
          "isChecked": false
        }
      ]
    },
    {
      "id": 106,
      "functionality": "LIMS",
      "isChecked": false,
      "subFunction": [
        {
          "id": 107,
          "functionality": "Machine Parameter Linking",
          "isChecked": true
        },
        {
          "id": 108,
          "functionality": "Test Details",
          "isChecked": true
        },
        {
          "id": 109,
          "functionality": "Work Order",
          "isChecked": true
        },
        {
          "id": 110,
          "functionality": "Sample Collection",
          "isChecked": true
        },
        {
          "id": 111,
          "functionality": "Report Details",
          "isChecked": true
        },
        {
          "id": 112,
          "functionality": "Work Order Status",
          "isChecked": true
        }
      ]
    },
    {
      "id": 114,
      "functionality": "Nursing",
      "isChecked": false,
      "subFunction": [
        {
          "id": 115,
          "functionality": "Patient Pain Assessment Scale",
          "isChecked": false
        }
      ]
    },
    {
      "id": 116,
      "functionality": "Emergency",
      "isChecked": false,
      "subFunction": [
        {
          "id": 117,
          "functionality": "Emergency",
          "isChecked": false
        }
      ]
    }
  ]
  let styleUsingButtons = [{
        default:true,
        isSelected:true,
        label:'All'
    },{
        isSelected:false,
        label:'Active'
    },{
        isSelected:false,
        label:'Inactive'
    }]
export const ElementsContext = createContext({});
export const ElementsContextProvider = ({children}) => {

  const [contextData, setContextData] = useState([]);
  const [showSubfunctionalities, setShowSubfunctionalities] = useState(true);
  const [buttonsArr, setButtonsArr] = useState(styleUsingButtons);
  const [currentButton, setCurrentButton] = useState('All');


useDidMountEffect(()=>{
  for(let value of buttonsArr){
    if(value.isSelected){
      setCurrentButton(value.label)
    }
  }
},[buttonsArr])


  ///
  // //
  //   //
  // The Functions
  const setDefaultButton = () => {
    let arr = [...buttonsArr]
    for(let item of arr){
        if( item.isSelected && !item.default){
            item.isSelected=false
        }else if(item.default){
            item.isSelected=true
        }
    }
    setButtonsArr(arr)
  }
  const checkAllButtonsSelected = (arr) =>{
    let allTrue = true
    let allFalse = true
    for(let item of arr){
        if(!item.isSelected){
            allTrue = false
        }else{
            allFalse = false
        }
    }
    return allFalse;
  }
  // for permissions
const setPermissionParents = (value,indexArr) => {
  console.log("value",value)
  console.log("indexArr",indexArr)
  let arr = [...contextData]

  if(value){
    arr = seekPermissionParents(arr,indexArr,value)
  }else {
      arr = setPermissionParentFalse(arr,indexArr,value)
  }
  console.log("arr",arr)
  setContextData(arr)
}
// true
const seekPermissionParents = (arr,indexArr,value) => {
  arr[indexArr[0]].isChecked = value
  let depth = indexArr.length - 1
  console.log("depth",depth)
    if(depth ==  1){
    arr[indexArr[0]].permissions[indexArr[1]].isChecked = value
    }else if(depth == 2){
    arr[indexArr[0]].subFunction[indexArr[1]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].permissions[indexArr[2]].isChecked = value
    }else if(depth == 3){
    arr[indexArr[0]].subFunction[indexArr[1]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].permissions[indexArr[3]].isChecked = value
    }else if(depth == 4){
    arr[indexArr[0]].subFunction[indexArr[1]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].permissions[indexArr[4]].isChecked = value
  
  }else if(depth == 5){
    arr[indexArr[0]].subFunction[indexArr[1]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].permissions[indexArr[5]].isChecked = value
  
  }else if(depth == 6){
    arr[indexArr[0]].subFunction[indexArr[1]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].permissions[indexArr[6]].isChecked = value
  
  }else if(depth == 7){
    arr[indexArr[0]].subFunction[indexArr[1]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].isChecked = value
  
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].isChecked = value
  
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].permissions[indexArr[6]].permissions[indexArr[7]].isChecked = value
  
  }else if(depth == 8){
    arr[indexArr[0]].subFunction[indexArr[1]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].isChecked = value
  
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].isChecked = value
  
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].isChecked = value
  
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].subFunction[indexArr[7]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].subFunction[indexArr[7]].permissions[indexArr[8]].isChecked = value
  
  }else {
    console.log("grand parent called",arr[indexArr[0]])
  }
  
  return arr;
}
// false
const setPermissionParentFalse = (arr,indexArr,value) => {
  console.log("value",value)
  console.log("indexArr",indexArr)

  
  let depth = indexArr.length - 1
  console.log("depth permission",depth)
  if(depth == 1){
    arr[indexArr[0]].permissions[indexArr[1]].isChecked = value
    arr[indexArr[0]] = checkAllPermissionsFalse(arr[indexArr[0]])
    // different scenario
  }else if(depth == 2){
    arr[indexArr[0]].subFunction[indexArr[1]].permissions[indexArr[2]].isChecked = value
    // set parents false
    arr[indexArr[0]].subFunction[indexArr[1]] = checkAllPermissionsFalse(arr[indexArr[0]].subFunction[indexArr[1]])
    arr[indexArr[0]] = setParentsFalse(arr[indexArr[0]])
  }else if(depth == 3){
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].permissions[indexArr[3]].isChecked = value
    
    // set parents false
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]] = checkAllPermissionsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]])
    arr[indexArr[0]].subFunction[indexArr[1]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]])
    arr[indexArr[0]] = setParentsFalse(arr[indexArr[0]])

  }else if(depth == 4){
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].permissions[indexArr[4]].isChecked = value

  // set parents false
  arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]] = checkAllPermissionsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]])
  arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]])
  arr[indexArr[0]].subFunction[indexArr[1]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]])
  arr[indexArr[0]] = setParentsFalse(arr[indexArr[0]])
  }else if(depth == 5){
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].permissions[indexArr[5]].isChecked = value
  
    // set parents false
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]] = checkAllPermissionsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]])
    arr[indexArr[0]].subFunction[indexArr[1]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]])
    arr[indexArr[0]] = setParentsFalse(arr[indexArr[0]])
  }else if(depth == 6){
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].permissions[indexArr[6]].isChecked = value
  
    // set parents false
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]] = checkAllPermissionsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]])
    arr[indexArr[0]].subFunction[indexArr[1]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]])
    arr[indexArr[0]] = setParentsFalse(arr[indexArr[0]])
  
  }else if(depth == 7){
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].permissions[indexArr[7]].isChecked = value
  
    // set parents false
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]] = checkAllPermissionsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]])
    arr[indexArr[0]].subFunction[indexArr[1]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]])
    arr[indexArr[0]] = setParentsFalse(arr[indexArr[0]])
  
  }else if(depth == 8){
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].subFunction[indexArr[7]].permissions[indexArr[8]].isChecked = value
  
    // set parents false
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].subFunction[indexArr[7]] = checkAllPermissionsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].subFunction[indexArr[7]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]])
    arr[indexArr[0]].subFunction[indexArr[1]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]])
    arr[indexArr[0]] = setParentsFalse(arr[indexArr[0]])
  }
  
  return arr
}

const checkAllPermissionsFalse = (parentArr) => {
  let subArr = parentArr.permissions

  let falseTotal = 0
  for (let i = 0;i<subArr.length;i++){
    if(!subArr[i].isChecked){
      falseTotal += 1
    }
  }
  if(falseTotal == subArr.length){
    parentArr.isChecked = false
  }
  // then

  return parentArr
}
// subfunctions *
const dynamicSubFunc = (value,indexArr) => {
    console.log("funnc value",value);
    console.log("funnc indexArr",indexArr);
    let arr = [...contextData]

    // true
    if(value){
        arr = seekParents(arr,indexArr,value)
    }else {
        arr = setAllChildrenFalse(arr,indexArr,value)
    }
    // false

    console.log("arr",arr)
    setContextData(arr)
}

// for false
// for all Children
const setAllChildrenFalse = (arr,indexArr,value) =>{
  
  let depth = indexArr.length
  console.log("depth",depth)
  if(depth == 1){
    arr[indexArr[0]].isChecked = value
    arr[indexArr[0]] = seekChildren(arr[indexArr[0]],value)
  }else if(depth == 2){
    arr[indexArr[0]].subFunction[indexArr[1]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]] = seekChildren(arr[indexArr[0]].subFunction[indexArr[1]],value)

    // set parents false
    arr[indexArr[0]] = setParentsFalse(arr[indexArr[0]])
  }else if(depth == 3){
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]] = seekChildren(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]],value)
    
    // set parents false
    arr[indexArr[0]].subFunction[indexArr[1]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]])
    arr[indexArr[0]] = setParentsFalse(arr[indexArr[0]])
  }else if(depth == 4){
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]] = seekChildren(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]],value)

  // set parents false
  arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]])
  arr[indexArr[0]].subFunction[indexArr[1]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]])
  arr[indexArr[0]] = setParentsFalse(arr[indexArr[0]])
  }else if(depth == 5){
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]] = seekChildren(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]],value)
  
    // set parents false
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]])
    arr[indexArr[0]].subFunction[indexArr[1]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]])
    arr[indexArr[0]] = setParentsFalse(arr[indexArr[0]])
  }else if(depth == 6){
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]] = seekChildren(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]],value)
  
    // set parents false
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]])
    arr[indexArr[0]].subFunction[indexArr[1]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]])
    arr[indexArr[0]] = setParentsFalse(arr[indexArr[0]])
  
  }else if(depth == 7){
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]] = seekChildren(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]],value)
  
    // set parents false
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]])
    arr[indexArr[0]].subFunction[indexArr[1]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]])
    arr[indexArr[0]] = setParentsFalse(arr[indexArr[0]])
  
  }else if(depth == 8){
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].subFunction[indexArr[7]].isChecked = value
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].subFunction[indexArr[7]] = seekChildren(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].subFunction[indexArr[7]],value)
  
    // set parents false
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]])
    arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]])
    arr[indexArr[0]].subFunction[indexArr[1]] = setParentsFalse(arr[indexArr[0]].subFunction[indexArr[1]])
    arr[indexArr[0]] = setParentsFalse(arr[indexArr[0]])
  }
  
  return arr;
}

const setParentsFalse = (parentArr) => {
  let subArr = parentArr.subFunction

  let falseTotal = 0
  for (let i = 0;i<subArr.length;i++){
    if(!subArr[i].isChecked){
      falseTotal += 1
    }
  }
  if(falseTotal == subArr.length){
    parentArr.isChecked = false
  }
  // then

  return parentArr
}
// for true
const seekParents = (arr,indexArr,value) =>{
    arr[indexArr[0]].isChecked = value
    let depth = indexArr.length
    console.log("depth",depth)
    if(depth == 2){
      arr[indexArr[0]].subFunction[indexArr[1]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]] = seekChildren(arr[indexArr[0]].subFunction[indexArr[1]],value)
    }else if(depth == 3){
      arr[indexArr[0]].subFunction[indexArr[1]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].isChecked = value
      // 
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]] = seekChildren(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]],value)
    }else if(depth == 4){
      arr[indexArr[0]].subFunction[indexArr[1]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]] = seekChildren(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]],value)
    
    }else if(depth == 5){
      arr[indexArr[0]].subFunction[indexArr[1]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]] = seekChildren(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]],value)
    
    }else if(depth == 6){
      arr[indexArr[0]].subFunction[indexArr[1]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]] = seekChildren(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]],value)
    
    }else if(depth == 7){
      arr[indexArr[0]].subFunction[indexArr[1]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].isChecked = value
    
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].isChecked = value
    
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]] = seekChildren(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]],value)
    
    }else if(depth == 8){
      arr[indexArr[0]].subFunction[indexArr[1]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].isChecked = value
    
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].isChecked = value
    
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].isChecked = value
    
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].subFunction[indexArr[7]].isChecked = value
      arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].subFunction[indexArr[7]] = seekChildren(arr[indexArr[0]].subFunction[indexArr[1]].subFunction[indexArr[2]].subFunction[indexArr[3]].subFunction[indexArr[4]].subFunction[indexArr[5]].subFunction[indexArr[6]].subFunction[indexArr[7]],value)
    
    }else {
      console.log("grand parent called",arr[indexArr[0]])
      arr[indexArr[0]] = seekChildren(arr[indexArr[0]],value)
    }
    
    return arr;
}
const seekChildren = (arrChild,value) =>{
  if(arrChild.subFunction){
    let childSubFunc = arrChild.subFunction
    for (let i = 0; i<childSubFunc.length;i++){
      childSubFunc[i].isChecked = value;
      if (childSubFunc[i].subFunction){
        childSubFunc[i].subFunction = setChildren(childSubFunc[i].subFunction,value)
      }
      else if(childSubFunc[i].permissions){
        let childSubPermissions = childSubFunc[i].permissions
        for (let k = 0; k<childSubPermissions.length;k++){
          childSubPermissions[k].isChecked = value;
        }
        childSubFunc[i].permissions = childSubPermissions
      }
    }
    arrChild.subFunction = childSubFunc
  }else if(arrChild.permissions){
    let childSubPermissions = arrChild.permissions
    for (let i = 0; i<childSubPermissions.length;i++){
      childSubPermissions[i].isChecked = value;
    }
    arrChild.permissions = childSubPermissions
  }

  return arrChild
}

const setChildren = (childArr,value) => {
  for(let j = 0; j<childArr.length;j++){
    childArr[j].isChecked = value
    if(childArr[j].subFunction){
      childArr[j].subFunction = setChildren(childArr[j].subFunction,value)
    }
    // else 
    if(childArr[j].permissions){
      childArr[j].permissions = setPermissions(childArr[j].permissions,value)
    } 
    // else {
    //   return childArr
    // }
  }
  return childArr
}

const setPermissions = (childPermission,value) => {
  for (let i = 0; i<childPermission.length;i++){
    childPermission[i].isChecked = value;
  }
  return childPermission
}

  return (
      <ElementsContext.Provider 
        value={{ 
            contextData, 
            setContextData,
            setPermissionParents,
            seekPermissionParents,
            setPermissionParentFalse,
            checkAllPermissionsFalse,
            dynamicSubFunc,
            setAllChildrenFalse,
            setParentsFalse,
            seekParents,
            seekChildren,
            setChildren,
            setPermissions,
            buttonsArr,
            setButtonsArr,
            setDefaultButton,
            checkAllButtonsSelected,
            showSubfunctionalities,
            setShowSubfunctionalities,
            currentButton
        }}>
          {children}
      </ElementsContext.Provider>

  );
}
