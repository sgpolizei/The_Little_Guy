
import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';

import { UPDATE_APPLICATION, UPDATE_TENANT } from '../../apollo-client/mutations';

import { EDIT_APPLICATIONS, EDIT_MY_PROPERTY } from '../../store/actions';

import history from '../../config/history';

const SingleApplication = (props) => {
    // set up basic data for redux
    const dispatch = useDispatch();
    const application = useSelector((state) => state.applications[props.match.params.id]);

    // apollo config 
    const [updateApplication, { error }] = useMutation( UPDATE_APPLICATION );
    const [updateTenant] = useMutation(UPDATE_TENANT);

    // set local state for displayError
    const [displayError, setDisplayError] = useState(null);

    const handleApplication = async (newStatus) => {
        try {
            // update application and application state
            await updateApplication({
                variables: { 
                    _id: application._id, 
                    status: newStatus
                }
            });

            dispatch({
                type: EDIT_APPLICATIONS,
                payload: { _id: application._id, status: newStatus }
            });

            // ONLY IF APPROVED
            // update property records and state 
            if(newStatus === 'Approved') {
                await updateTenant({
                    variables: { 
                        _id: application.propertyId._id, 
                        tenant: application.applicant._id
                    }
                });

                dispatch({
                    type: EDIT_MY_PROPERTY,
                    payload: { 
                        _id: application.propertyId._id, 
                        tenant: {
                            firstName: application.applicant.firstName,
                            lastName: application.applicant.lastName
                        }
                    }
                })
            }

            // redirect user
            history.push('/landlord/applications');
        }
        catch {
            setDisplayError(error);
        }
    }

    return !application ? null : (
        <>
    {/* <div className="flex h-screen bg-white-200 items-center justify-center  mt-32 mb-32">
        <form className="grid bg-whitesmoke rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-1/2" onSubmit={(e) => e.preventDefault()}>
        <div className="flex justify-center py-4">
            <div className="flex bg-purple-200 rounded-full md:p-4 p-2 border-2 border-purple-300">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
            </div>
        </div>

        <div className="flex justify-center">
            <div className="flex">
            <h1 className="text-gray-600 font-bold md:text-2xl text-xl">Tenant Application</h1>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
            <div className="grid grid-cols-1">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
            >First Name</label>
            <input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="first"
                type="text"
                placeholder="First"
                value={application.applicant.firstName}
                readOnly
            />
            </div>
            <div className="grid grid-cols-1">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Last Name</label>
            <input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="last"
                type="text"
                placeholder="Last"
                value={application.applicant.lastName}
                readOnly
            />
            </div>
        </div>

        <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Street Address</label>
            <input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            name="street"
            type="text"
            placeholder=""
            value={application.addressStreet}
            readOnly
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 mt-5 mx-7">
            <div className="grid grid-cols-1">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">City</label>
            <input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="city"
                type="text"
                placeholder=""
                value={application.addressCity}
                readOnly
            />
            </div>
            <div className="grid grid-cols-1">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">State</label>
            <input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="state"
                type="text"
                placeholder=""
                value={application.addressState}
                readOnly
            />
            </div>
            <div className="grid grid-cols-1">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Zipcode</label>
            <input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="zip"
                type="text"
                placeholder=""
                value={application.addressZip}
                readOnly
            />
            </div>
        </div>

        <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Credit Score</label>
            <input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            name="creditScore"
            type="text"
            placeholder=""
            value={application.creditScore}
            readOnly
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
            <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Annual Gross Income</label>
            <input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="income"
                type="text"
                placeholder=""
                value={application.grossAnnualIncome}
                readOnly
            />
            </div>
            <div className="grid grid-cols-1 mt-5 mx-7 ">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Other Tenants</label>
            <input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="otherTenants"
                type="text"
                placeholder=""
                value={application.otherTenants}
                readOnly
            />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
            <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Employer</label>
            <input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="employer"
                type="text"
                placeholder=""
                value={application.employer}
                readOnly
            />
            </div>
            <div className="grid grid-cols-1 mt-5 mx-7 ">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Type of Employment</label>
            <input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="typeOfEmployment"
                type="text"
                placeholder=""
                value={application.typeOfEmployment}
                readOnly
            />
            </div>

        </div>
        <div className='flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5'>
            <button 
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-TLGOrange hover:bg-white hover:text-TLGOrange"
            onClick={() => history.push('/landlord/applications')}
            >
                Back
            </button>

            <button 
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-TLGOrange hover:bg-white hover:text-TLGOrange" 
            onClick={() => handleApplication('Approved')}
            >
                Approve</button>
            <button 
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-TLGOrange hover:bg-white hover:text-TLGOrange" 
            onClick={() => handleApplication('Denied')}
            >
                Deny</button>
        </div>
        <h6 className="text-center text-red-500 mb-2">{ displayError }</h6>
        </form>
    </div> */}





    

          <div className="min-h-screen flex  justify-center py-20 bg-CPgray py-12 px-4 sm:px-6 lg:px-8">
          <div className="md:grid md:grid-cols-3 md:gap-6 ">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6">Tenant Application</h3>
              <p className="mt-1 text-sm">Use a permanent address where you can receive mail.</p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <input
                        name="first"
                        type="text"
                        placeholder="First"
                        value={application.applicant.firstName}
                        readOnly
                        className="mt-1 focus:ring-TLGOrange focus:border-TLGOrange block w-full shadow-sm sm:text-sm rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <input
                         name="last"
                         type="text"
                         placeholder="Last"
                         value={application.applicant.lastName}
                         readOnly
                        className="mt-1 focus:ring-TLGOrange focus:border-TLGOrange block w-full shadow-sm sm:text-sm rounded-md"
                      />
                    </div>

                    <div className="col-span-6">
                      <label className="block text-sm font-medium">
                        Street address
                      </label>
                      <input
                        name="street"
                        type="text"
                        placeholder=""
                        value={application.addressStreet}
                        readOnly
                        className="mt-1 focus:ring-TLGOrange focus:border-TLGOrange block w-full shadow-sm sm:text-sm rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label className="block text-sm font-medium">
                        City
                      </label>
                      <input
                        name="city"
                        type="text"
                        placeholder=""
                        value={application.addressCity}
                        readOnly
                        className="mt-1 focus:ring-TLGOrange focus:border-TLGOrange block w-full shadow-sm sm:text-sm rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label className="block text-sm font-medium">
                        State
                      </label>
                      <input
                        name="state"
                        type="text"
                        placeholder=""
                        value={application.addressState}
                        readOnly
                        className="mt-1 focus:ring-TLGOrange focus:border-TLGOrange block w-full shadow-sm sm:text-sm rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label className="block text-sm font-medium">
                        ZIP code
                      </label>
                      <input
                        name="zip"
                        type="text"
                        placeholder=""
                        value={application.addressZip}
                        readOnly
                        className="mt-1 focus:ring-TLGOrange focus:border-TLGOrange block w-full shadow-sm sm:text-sm rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label className="block text-sm font-medium">
                        Credit Score
                      </label>
                      <input
                        name="creditScore"
                        type="text"
                        placeholder=""
                        value={application.creditScore}
                        readOnly
                        className="mt-1 focus:ring-TLGOrange focus:border-TLGOrange block w-full shadow-sm sm:text-sm rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label className="block text-sm font-medium">
                        Annual Gross Income
                      </label>
                      <input
                        name="income"
                        type="text"
                        placeholder=""
                        value={application.grossAnnualIncome}
                        readOnly
                        className="mt-1 focus:ring-TLGOrange focus:border-TLGOrange block w-full shadow-sm sm:text-sm rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label className="block text-sm font-medium">
                        Other Tenants
                      </label>
                      <input
                        name="otherTenants"
                        type="text"
                        placeholder=""
                        value={application.otherTenants}
                        readOnly
                        className="mt-1 focus:ring-TLGOrange focus:border-TLGOrange block w-full shadow-sm sm:text-sm rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium">
                        Employer
                      </label>
                      <input
                        name="employer"
                        type="text"
                        placeholder=""
                        value={application.employer}
                        readOnly
                        className="mt-1 focus:ring-TLGOrange focus:border-TLGOrange block w-full shadow-sm sm:text-sm rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium">
                        Type of Employment
                      </label>
                      <input
                        name="typeOfEmployment"
                        type="text"
                        placeholder=""
                        value={application.typeOfEmployment}
                        readOnly
                        className="mt-1 focus:ring-TLGOrange focus:border-TLGOrange block w-full shadow-sm sm:text-sm rounded-md"
                      />
                    </div>
                    
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button 
            className="inline-flex m-2 justify-between py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-TLGOrange hover:bg-white hover:text-TLGOrange"
            onClick={() => history.push('/landlord/applications')}
            >
                Back
            </button>

            <button 
            className="inline-flex m-2 justify-between py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-TLGOrange hover:bg-white hover:text-TLGOrange" 
            onClick={() => handleApplication('Approved')}
            >
                Approve</button>
            <button 
            className="inline-flex m-2 justify-between py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-TLGOrange hover:bg-white hover:text-TLGOrange" 
            onClick={() => handleApplication('Denied')}
            >
                Deny</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>

    )
    };

    export default SingleApplication;

