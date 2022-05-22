import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const { isLoading, data: services } = useQuery('repoData', () =>
        fetch('http://localhost:5000/service').then(res =>
            res.json()
        )
    )

    if (isLoading) {
        return <Loading></Loading>
    }
    const onSubmit = async data => {
        console.log(data);
    }

    return (
        <div>
            <h1 className='text-3xl '>Add a doctor</h1>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="input input-bordered w-full max-w-xs"
                        {...register("name", {
                            required: {
                                value: true,
                                message: 'Name is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                    </label>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="input input-bordered w-full max-w-xs"
                        {...register("email", {
                            required: {
                                value: true,
                                message: 'Email is Required'
                            },
                            pattern: {
                                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                message: 'Provide a valid Email'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                    </label>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Specialty</span>
                    </label>
                    <select {...register("Specialty")} class="select w-full max-w-xs mb-2">
                        {
                            services.map((service, index) => <option
                                key={service._id}
                            >{index + 1} . {service.name}</option>)
                        }
                    </select>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="file"
                        placeholder="Your Name"
                        className="input input-bordered w-full max-w-xs"
                        {...register("name", {
                            required: {
                                value: true,
                                message: 'Name is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                    </label>
                </div>

                <input className='btn w-full max-w-xs text-white' type="submit" value="Add Doctor" />
            </form>
        </div>
    );
};

export default AddDoctor;