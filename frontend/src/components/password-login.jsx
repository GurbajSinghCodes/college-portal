import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import backend from '../assets/backend.jsx'
import { useNavigate } from 'react-router-dom'
import { userContext } from './user-context.jsx'
import { toast } from 'react-toastify'
import { Eye, EyeOff, Lock, User } from 'lucide-react'
import { Link } from 'react-router-dom'
const PasswordLogin = () => {
  const navigate = useNavigate();
  const { setLoggedIn, setUsername } = useContext(userContext)
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting }

  } = useForm()
  useEffect(() => {
    setFocus('email')
  }, [])

  const verifyCredentials = async (data) => {
    try {
      const res = await axios.post(`${backend}/passwordlogin`, {
        email: data.email.toLowerCase(),
        password: data.password
      }, {
        withCredentials: true
      })

      if (res.data.success) {

        setLoggedIn(true)
        setUsername(res.data.fullname)
        toast.success('Credentials Verified. Navigating.....')
        setTimeout(() => {
          navigate("/starred")
        }, 2000);
      }
    }
    catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong. Please try again later")
    }
  }

  return (
    <form onSubmit={handleSubmit(verifyCredentials)}>
      <fieldset>
        <div className="inputWrapper">
          <User className='inputIcon' />
          <input
            {...register('email', { required: { value: true, message: "Field can't be empty" } })}
            type="email"
            placeholder='Enter email'
            className={`inputs ${errors.email ? 'inputError' : ""}`} />
          {errors.email && <p className='errors'>{errors.email.message}</p>}
        </div>
        <div className="inputWrapper">
          <Lock className="inputIcon" />
          <input {...register('password', { required: { value: true, message: 'Password is required' } })}
            type={showPassword ? "text" : "password"}
            className={`no-eye inputs ${errors.password ? 'inputError' : ""}`}
            placeholder='Enter password' />
          <span
            className="eyeIcon"
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setShowPassword(!showPassword)
              }
            }}
            onClick={() => setShowPassword(!showPassword)} >
            {showPassword ? <EyeOff className='inputIcon' /> : <Eye className='inputIcon' />}
          </span>
          {errors.password && <p className='errors'>{errors.password.message}</p>}
        </div>
        <div className="forgotpass"><Link id="forgot" to="/login/forgotpassword">Forgot password ?</Link></div>
        <input type="submit" className='submit' disabled={isSubmitting} value={isSubmitting ? 'Verifying' : 'Login'} />
      </fieldset>
    </form>
  )
}

export default PasswordLogin
