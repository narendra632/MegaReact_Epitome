
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";


import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/components/ui/use-toast";


import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { SigninValidation } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";




const SigninForm = () => {

  // toast hook to display alert messages
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  // react query hooks to sign in user account 
  const { mutateAsync: signInAccount } = useSignInAccount();

  
  // 1. Define your form validation schema
  // This will be used to validate the form values
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });
 

  // 2. Handle form submit.
  // This function will be called when the user clicks on the submit button
  const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
    try {
      
      // Sign in the user after the user is created
      // If the user is not signed in, display a toast message
      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });
  
      if(!session) {
        toast({ title: "Something went wrong. Please login your new account."});
        
        navigate('/sign-in');
        
        return;
      }
    
      // If the user is logged in, reset the form and redirect the user to the home page
      const isLoggedIn = await checkAuthUser();
  
      if(isLoggedIn) {
        form.reset();
  
        navigate('/');
      } else {
        toast({ title: 'Login failed, please try again.' });
  
        return;
      }
    } catch (error) {
      console.log(error);
    } 

  };

  


  return (

    <Form {...form}>
      <div className="sm:w-420 flex-centre flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Login to your account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">Welcome back, please enter your details</p>
      
        <form onSubmit={form.handleSubmit(handleSignin)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader />
                Loading...
              </div>
            ): ("Log in")
            }
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account? 
            <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1">Sign up</Link>
          </p>
        </form>

      </div>
    </Form>

  )
}

export default SigninForm;