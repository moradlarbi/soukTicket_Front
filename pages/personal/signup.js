/**
 * This is a React component that renders a landing page with a sign-up form for organizers.
 * @returns The Signup component is returning the Landing component with the SignUpForm component
 * passed as a prop.
 */
import Landing from '@/components/organizer/landing'
import SignUpForm from '@/components/organizer/signup'
import React from 'react'

const Signup = () => {
    return (
        <Landing component={<SignUpForm />} />
    )
}

export default Signup