import React from 'react';
import { toast } from 'react-toastify';

const DoctorModal = ({ setDeletingDoctor, refetch, doctor }) => {


    const { name, email } = doctor

    const deleteDoctor = (email) => {

        fetch(`http://localhost:5000/doctor/${email}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount) {
                    toast.success(`Doctor: ${name} is deleted`)
                    setDeletingDoctor(null)
                    refetch()
                }
            })

    }
    return (
        <div>
            <input type="checkbox" id="deleting-doctor-modal" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box  w-none h-none">
                    <h3 class="font-bold text-lg text-red-600">Do you want to delete doctor {name} !</h3>
                    <p class="py-4">If you delete doctor will be deleted permanently , you won't be able to get appointment for this doctor for the next time !!!!</p>
                    <div class="modal-action">
                        <label onClick={() => deleteDoctor(email)} class="btn btn-xs btn-error">Delete</label>
                        <label for="deleting-doctor-modal" class="btn btn-xs">Cancel</label>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default DoctorModal;