/**
 * This is a React component that renders a landing page with a login form for organizers.
 * @returns The Login component is returning a Landing component with a LoginForm component as a prop.
 */
import Landing from '@/components/organizer/landing'
import LoginForm from '@/components/organizer/loginform'
import React from 'react'

const Login = () => {
    return (
        <Landing component={<LoginForm />} />

    )
}

export default Login