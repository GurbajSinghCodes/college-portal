import { userContext } from './user-context.jsx'
import { useEffect, useContext, useState, useRef } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Key, FolderPen, KeyRound, KeySquare, User } from 'lucide-react'
import backend from "../assets/backend.jsx";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Forgot_password = () => {
    const navigate = useNavigate()
    const otpCount = useRef(0);

    const { setLoggedIn, setUsername } = useContext(userContext)
    const [step, setStep] = useState("enter-email")
    const {
        register,
        handleSubmit,
        setFocus,
        setValue,
        watch,
        formState: { errors, isSubmitting }
    } = useForm()
    const password = watch('password')

    useEffect(() => {
        setFocus('email')
    }, [])
    const sendOtp = async (data) => {
        try {
            const res = await axios.post(
                `${backend}/existinguser`,
                { email: data.email.toLowerCase() },
                { withCredentials: true }
            );
            if (!res.data.exists) {
                toast.error("User not found")
                return
            }
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
                    setStep("enter-password")
                    toast.success("OTP verified");
                }

            }
        } catch (error) {
            otpCount.current += 1;
            const isExpired = error.response?.data?.expired;
            const message = error.response?.data?.message || "Verification failed";

            if (isExpired) {
                toast.error(message);
                setStep("enter-email")
                setValue('otp', '')

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
    const updatePassword = async (data) => {
        try {

            const res = await axios.post(`${backend}/updatepassword`,
                {
                    email: data.email.toLowerCase(),
                    password: data.password
                }, { withCredentials: true })
            if (res.data?.success) {
                toast.success(res.data.message)
                setLoggedIn(true)
                setUsername(res.data.fullname)
                setTimeout(() => {
                    navigate("/starred")
                }, 1000);
            }
            else {
                toast.error(res.data.message)

            }
        } catch (error) {
            if (error.response) {
                if (error.response.status >= 500) {
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
    return (
        <form onSubmit={handleSubmit(async (data) => {
            if (step === "enter-email") {
                return sendOtp(data);
            }
            else if (step === "enter-otp") {
                return verifyOtp(data)
            }
            else if (step === "enter-password") {
                return updatePassword(data)
            }

        }
        )}>
            <fieldset>
                <div className="inputWrapper">
                    <User className='inputIcon' />
                    <input
                        disabled={step === "enter-otp" || step === "enter-password"}
                        {...register('email', { required: { value: true, message: "Field can't be empty" } })}
                        type="email"
                        placeholder='Enter email associated with your account'
                        className={`inputs ${errors.email ? 'inputError' : ""}`} />
                    {errors.email && <p className='errors'>{errors.email.message}</p>}
                </div>
                {step === "enter-otp" && <>
                    <div className="inputWrapper">

                        <Key className="inputIcon" />
                        <input
                            {...register('otp', {
                                required: { value: true, message: "Field can't be empty" },
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Only numbers allowed"
                                }
                            })}
                            type="text"
                            inputMode="numeric"
                            className={`inputs ${errors.otp ? 'inputError' : ''}`}
                            placeholder="Enter OTP"
                            onKeyDown={(e) => {
                                const allowedKeys = [
                                    'Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'
                                ];
                                if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                        />
                        {errors.otp && <p className="errors">{errors.otp.message}</p>}
                    </div>
                </>}
                {step === "enter-password" &&
                    <>
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
                                placeholder="Create new password"
                            />
                            {errors.password && <p className="errors">{errors.password.message}</p>}
                        </div>
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
                            {errors.confirmPassword && <p className="errors">{errors.confirmPassword.message}</p>}
                        </div>
                    </>}
                <input type="submit" className='submit' disabled={isSubmitting} value={isSubmitting ? 'Validating' : 'Submit'} />
            </fieldset>
        </form>

    )
}

export default Forgot_password
