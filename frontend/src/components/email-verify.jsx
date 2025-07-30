import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import backend from "../assets/backend.jsx";
import { userContext } from "./user-context.jsx";
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, User, Key, FolderPen, KeyRound, KeySquare, ToolCase } from 'lucide-react'
import { Link } from "react-router-dom";


const Verify = () => {

    const { loggedIn, setLoggedIn, setUsername, checkLogin } = useContext(userContext)
    const [showPassword1, setShowPassword1] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)
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
        scrollTo()
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
    const checkInputs = () => {
        if (errors.password || errors.email || errors.otp || errors.fullname || errors.password || errors.confirmPassword) {
            toast.error("Something isn't right. Check inputs and retry")
        }
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
                toast.success("OTP verified");
                if (res.data.exists) {
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
                navigate("/starred")

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

            <>
                <form onSubmit={handleSubmit(async (data) => {
                    if (step === "enter-email")
                        return sendOtp(data)
                    else if (step === "enter-otp")
                        return verifyOtp(data)
                    else if (step === "enter-details")
                        return userDataSubmit(data)
                })}>
                    <fieldset>
                        <div className="inputWrapper">
                            <User className="inputIcon" />
                            <input
                                disabled={!(step === "enter-email") || isSubmitting}
                                {...register('email', { required: { value: true, message: 'Email is required' } })}
                                className={`inputs ${errors.email ? 'inputError' : ''}`}
                                placeholder="Enter your email"
                                type="email"
                            />
                            {errors.email && <p className="errors">{errors.email.message}</p>}
                        </div>
                        {step === 'enter-otp' &&
                            <>

                                <div className="inputWrapper">

                                    <Key className="inputIcon" />
                                    <input
                                        disabled={isSubmitting}
                                        {...register('otp', { required: { value: true, message: "Field can't be empty" } })}
                                        type="number"
                                        className={`inputs ${errors.otp ? 'inputError' : ''}`}
                                        placeholder="Enter OTP"
                                    />
                                    {errors.otp && <p className="errors">{errors.otp.message}</p>}
                                </div>
                            </>
                        }
                        {step === 'enter-details' &&
                            <>

                                <div className="inputWrapper">
                                    <FolderPen className="inputIcon" />
                                    <input
                                        disabled={isSubmitting}

                                        {...register('fullname', {
                                            required: { value: true, message: "Field can't be empty" }, pattern: {
                                                value: /^[A-Za-z\s]+$/,
                                                message: "Only alphabets are allowed"
                                            }, minLength: { value: 3, message: "Use atleast 3 characters in fullname" }
                                        })}
                                        className={`inputs ${errors.fullname ? 'inputError' : ''}`}
                                        placeholder="Enter fullname"
                                    />
                                    {errors.fullname && <p className="errors">{errors.fullname.message}</p>}
                                </div>
                                <div className="inputWrapper">
                                    <KeyRound className="inputIcon" />
                                    <input
                                        disabled={isSubmitting}

                                        {...register('password', {
                                            required: { value: true, message: "Field can't be empty" },
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                                                message:
                                                    'Password must be at least 8 characters, include uppercase, lowercase, number, and special character'
                                            }
                                        })}
                                        type={showPassword1 ? "text" : "password"}
                                        onBlur={() => setShowPassword1(false)}
                                        className={`no-eye inputs ${errors.password ? 'inputError' : ''}`}
                                        placeholder="Create password"
                                    />
                                    <span
                                        className="eyeIcon"
                                        tabIndex="0"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                setShowPassword1(!showPassword1)
                                            }
                                        }}
                                        onClick={() => setShowPassword1(!showPassword1)} >
                                        {showPassword1 ? <EyeOff className='inputIcon' /> : <Eye className='inputIcon' />}
                                    </span>
                                    {errors.password && <p className="errors">{errors.password.message}</p>}
                                </div>
                                <div className="inputWrapper">
                                    <KeySquare className="inputIcon" />
                                    <input
                                        disabled={isSubmitting}
                                        {...register('confirmPassword', {
                                            required: { value: true, message: "Field can't be empty" },
                                            validate:
                                                (value) => value === password || "Passwords donot match"
                                        })}
                                        onBlur={() => setShowPassword2(false)}

                                        type={showPassword2 ? "text" : "password"}
                                        className={`no-eye inputs ${errors.confirmPassword ? 'inputError' : ''}`}
                                        placeholder="Confirm password"
                                    />
                                    <span
                                        className="eyeIcon"
                                        tabIndex="0"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                setShowPassword2(!showPassword2)
                                            }
                                        }}
                                        onClick={() => setShowPassword2(!showPassword2)} >
                                        {showPassword2 ? <EyeOff className='inputIcon' /> : <Eye className='inputIcon' />}
                                    </span>
                                    {errors.confirmPassword && <p className="errors">{errors.confirmPassword.message}</p>}
                                </div>

                            </>}
                        <input className="submit" id="sendBtn" type="submit" onClick={checkInputs} disabled={isSubmitting} value={isSubmitting ? "Submitting" : "Submit"} />
                    </fieldset>
                </form>
            </>



        </div>
    );
};

export default Verify;
