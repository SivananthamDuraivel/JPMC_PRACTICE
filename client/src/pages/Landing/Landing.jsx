import React from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'

const Landing = () => {
  return (
    <div>
      <Button colorScheme='blue'><a href="/signUp">SignUp</a></Button>
      <a href="/signIn">SignIn</a>
    </div>
  )
}

export default Landing
