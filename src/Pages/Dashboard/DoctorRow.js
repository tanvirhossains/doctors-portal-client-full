import React, { useState } from 'react';
import DoctorModal from './DoctorModal';

const DoctorRow = ({ doctor, index, refetch }) => {
    const [deletingDoctor, setDeletingDoctor] = useState(null)

    const { name, specialty, img } = doctor





    return (
        <tr>
            <th>{index + 1}</th>
            <td><div class="avatar">
                <div class="w-8 rounded">
                    <img src={img} alt="Tailwind-CSS-Avatar-component" />
                </div>
            </div></td>
            <td>{name}</td>
            <td>{specialty}</td>

            <td>
                <label onClick={() => setDeletingDoctor(doctor)} for="deleting-doctor-modal" class="btn btn-xs btn-error">Delete</label>

                {
                    deletingDoctor && <DoctorModal
                        setDeletingDoctor={setDeletingDoctor}
                        refetch={refetch}
                        doctor={doctor}
                    ></DoctorModal>
                }
            </td>
        </tr>

    );
};

export default DoctorRow;