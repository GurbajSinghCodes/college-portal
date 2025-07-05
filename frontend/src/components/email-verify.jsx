import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import backend from "../assets/backend.jsx";
import { userContext } from "./user-context.jsx";
import { useForm } from 'react-hook-form';
import { Key, FolderPen, KeyRound, KeySquare } from 'lucide-react'


const Verify = () => {

    const { loggedIn, setLoggedIn, setUsername, checkLogin } = useContext(userContext)

    const [step, setStep] = useState("enter-email");

    const otpCount = useRef(0);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        setFocus,
        formState: { errors, isSubmitting }
    } = useForm();

    const password = watch('password')
    const email = watch('email')

    useEffect(() => {
        setFocus('email')
    }, []);

    useEffect(() => {
        if (step === "enter-otp") {
            setFocus('otp')
        }
    }, [step]);
    useEffect(() => {
        if (step === "enter-details") {
            setFocus('fullname')
        }
    }, [step]);

    const resetAllStates = () => {
        setStep("enter-email");
        setValue('otp', "")
        setValue('email', "")
        setFocus('email')
    };

    const sendOtp = async (data) => {
        try {
            await axios.post(
                `${backend}/send-otp`,
                { email: data.email.toLowerCase() },
                { withCredentials: true }
            );
            setStep("enter-otp");
            toast.success("OTP sent");
            setTimeout(() => setFocus('otp'), 0);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    toast.warning("Enter valid email address");
                    setFocus('email');
                }
                else if (error.response.status >= 500) {
                    toast.error("Interal Server Error. Please try again later.");
                } else {
                    toast.error("Something went wrong. Please try again.");
                }
            }
            else if (error.request) {
                toast.error("Server is unavailable. Please try again later.");
            }
            else {
                toast.error("Something went wrong. Please try again.");
            }
        }
    };

    const verifyOtp = async (data) => {

        try {
            const res = await axios.post(
                `${backend}/verify-otp`,
                {
                    email: data.email.toLowerCase(),
                    otp: data.otp
                },
                { withCredentials: true }
            );

            if (res.data.success) {
                if (res.data.exists) {
                    toast.success("OTP verified");
                    setLoggedIn(true)
                    setUsername(res.data.fullname)
                    setTimeout(() => {
                        navigate("/starred")
                    }, 2000);
                }
                else {

                    setStep("enter-details")
                }
            }
        } catch (error) {
            otpCount.current += 1;
            const isExpired = error.response?.data?.expired;
            const message = error.response?.data?.message || "Verification failed";

            if (isExpired) {
                toast.error(message);
                resetAllStates();
            } else {
                if (otpCount.current < 3) {
                    toast.error("Invalid OTP");
                    setValue('otp', '')
                } else {
                    toast.error("Too many attempts. Please try again later");
                    setTimeout(() => window.location.reload(), 2000);
                }
            }
        }
    };
    const userDataSubmit = async (data) => {
        try {
            const res = await axios.post(`${backend}/adddetails`, {
                email: data.email.toLowerCase(),
                fullname: data.fullname
                    .toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' '),
                password: data.password,

            }, { withCredentials: true })
            if (res.data.success) {

                setUsername(res.data.fullname)
                toast.success(res.data.message)
                setLoggedIn(true)

                setTimeout(() => {
                    navigate("/starred")
                }, 2000);

            } else {
                toast.error(res.data.message)
            }

        }
        catch (error) {
            toast.error("Error submitting details. Please try again")
        }
    }
    return (
        <div className="verify">
            {step === "enter-email" &&
                <>
                    <form onSubmit={handleSubmit(sendOtp)}>
                        <fieldset>
                            <div className="inputWrapper">
                                <img src="/svg/mail-icon.svg" className="inputIcon" />
                                <input
                                    {...register('email', { required: { value: true, message: 'Email is required' } })}
                                    className={`inputs ${errors.email ? 'inputError' : ''}`}
                                    placeholder="Enter your email"
                                    type="email"
                                />
                            </div>
                            {errors.email && <p className="errors">{errors.email.message}</p>}
                            <br />
                            <input className="submit" id="sendBtn" type="submit" disabled={isSubmitting} value={isSubmitting ? 'Sending OTP' : 'Send OTP'} />

                        </fieldset>
                    </form>
                </>
            }
            {step === 'enter-otp' &&
                <>
                    <form onSubmit={handleSubmit(verifyOtp)}>
                        <fieldset>
                            <div className="inputWrapper">

                                <Key className="inputIcon" />
                                <input
                                    {...register('otp', { required: { value: true, message: "Field can't be empty" } })}
                                    type="number"
                                    className={`inputs ${errors.otp ? 'inputError' : ''}`}
                                    placeholder="Enter OTP"

                                />
                            </div>
                            {errors.otp && <p className="errors">{errors.otp.message}</p>}

                            <input id="verifyBtn"
                                className="submit" type="submit" disabled={isSubmitting} value={isSubmitting ? 'Validating' : 'Validate'} />
                        </fieldset>
                    </form>
                </>
            }
            {step === 'enter-details' &&
                <>
                    <form onSubmit={handleSubmit(userDataSubmit)}>
                        <fieldset>
                            <legend> Enter details for user: {email ?? ""} </legend>
                            <div className="inputWrapper">
                                <FolderPen className="inputIcon" />
                                <input
                                    {...register('fullname', { required: { value: true, message: "Field can't be empty" } })}
                                    className={`inputs ${errors.fullname ? 'inputError' : ''}`}
                                    placeholder="Enter fullname"
                                />
                            </div>
                            {errors.fullname && <p className="errors">{errors.fullname.message}</p>}
                            <br />
                            <div className="inputWrapper">
                                <KeyRound className="inputIcon" />
                                <input
                                    {...register('password', {
                                        required: { value: true, message: "Field can't be empty" },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                                            message:
                                                'Password must be at least 8 characters, include uppercase, lowercase, number, and special character'
                                        }
                                    })}
                                    type="password"
                                    className={`inputs ${errors.password ? 'inputError' : ''}`}
                                    placeholder="Create password"
                                />
                            </div>
                            {errors.password && <p className="errors">{errors.password.message}</p>}
                            <br />
                            <div className="inputWrapper">
                                <KeySquare className="inputIcon" />
                                <input
                                    {...register('confirmPassword', {
                                        required: { value: true, message: "Field can't be empty" },
                                        validate:
                                            (value) => value === password || "Passwords donot match"

                                    })}
                                    type="password"
                                    className={`inputs ${errors.confirmPassword ? 'inputError' : ''}`}
                                    placeholder="Confirm password"
                                />
                            </div>
                            {errors.confirmPassword && <p className="errors">{errors.confirmPassword.message}</p>}
                            <input type="submit"
                                className="submit" disabled={isSubmitting} value={isSubmitting ? 'Submitting' : 'Submit '} />
                        </fieldset>
                    </form>
                </>}
        </div>
    );
};

export default Verify;
