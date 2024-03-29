import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import DoctorRow from './DoctorRow';

const ManageDoctor = () => {
    
    const { data: doctors, isLoading , refetch} = useQuery('doctors', () => fetch('http://localhost:5000/doctor', {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h1 className='text-2xl'> Manage Doctors : {doctors.length}</h1>



            <div class="overflow-x-auto">
                <table class="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, index) => <DoctorRow
                                key={doctor._id}
                                refetch={refetch}
                                doctor={doctor}
                                index={index}></DoctorRow>)
                        }
                    </tbody>
                </table>
            </div>


        </div>

    );
};

export default ManageDoctor;