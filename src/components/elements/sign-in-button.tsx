import { buttonVariants } from '../ui/button';
import Link from 'next/link';

const SignInButton = () => {
  return (
    <Link
      href={'/sign-in'}
      className={buttonVariants()}
    >
      Sign in
    </Link>
  )
}

export default SignInButton
