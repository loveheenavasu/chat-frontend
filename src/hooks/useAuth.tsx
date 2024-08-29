import { ChangeEvent, FormEvent, useState } from "react";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface useFormProps {
  onSubmit: (values: FormInputs) => void;
  formType?: "login" | "signup" | "resetpassword" | "forgotpassword";
}

export interface FormInputs {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  image?: string;
  socialToken?: string;
  isAdmin?: boolean;
}

export const useAuth = ({ onSubmit, formType }: useFormProps) => {
  const [value, setValue] = useState<FormInputs>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  console.log(value, "dbecbi");

  const validate = (): boolean => {
    const errors: FormErrors = {};
    let formIsValid = true;
    if (formType === 'login') {
      if (!value.email) {
        formIsValid = false;
        errors.email = "Please enter your email.";
      } else if (!/\S+@\S+\.\S+/.test(value.email!)) {
        formIsValid = false;
        errors.email = "Email is not valid.";
      }

      if (!value.password) {
        formIsValid = false;
        errors.password = "Password is required.";
      } else if (value.password.length < 8) {
        formIsValid = false;
        errors.password = "Password must be at least 8 characters long.";
      }
    }

    if (formType === "signup") {
      if (!value.firstName) {
        formIsValid = false;
        errors.firstName = "First name is required.";
      }
      if (!value.email) {
        formIsValid = false;
        errors.email = "Please enter your email.";
      } else if (!/\S+@\S+\.\S+/.test(value.email!)) {
        formIsValid = false;
        errors.email = "Email is not valid.";
      }
      if (!value.password) {
        formIsValid = false;
        errors.password = "Password is required.";
      } else if (value.password.length < 8) {
        formIsValid = false;
        errors.password = "Password must be at least 8 characters long.";
      }
      if (!value.confirmPassword) {
        formIsValid = false;
        errors.confirmPassword = "Please confirm your password.";
      } else if (value.password !== value.confirmPassword) {
        formIsValid = false;
        errors.confirmPassword = "Password do not match.";
      }
    }
    if (formType === "forgotpassword") {
      if (!value.email) {
        formIsValid = false;
        errors.email = "Please enter your email.";
      } else if (!/\S+@\S+\.\S+/.test(value.email!)) {
        formIsValid = false;
        errors.email = "Email is not valid.";
      }
    }
    if (formType === "resetpassword") {
      if (!value.password) {
        formIsValid = false;
        errors.password = "Password is required.";
      } else if (value.password.length < 8) {
        formIsValid = false;
        errors.password = "Password must be at least 8 characters long.";
      }
      if (!value.confirmPassword) {
        formIsValid = false;
        errors.confirmPassword = "Please confirm your password.";
      } else if (value.password !== value.confirmPassword) {
        formIsValid = false;
        errors.confirmPassword = "Passwords do not match.";
      }
    }
    setErrors(errors);
    return formIsValid;
  };

  // const signUpValidate = () => {
  //     let formIsValid = true;
  //     const errors: FormErrors = {};
  //     if (!value.firstName) {
  //         formIsValid = false;
  //         errors.firstName = "First name is required";
  //     }
  //     if (!value.email) {
  //         formIsValid = false;
  //         errors.email = "Please enter your email.";
  //     } else if (!/\S+@\S+\.\S+/.test(value.email!)) {
  //         formIsValid = false;
  //         errors.email = "Email is not valid.";
  //     }
  //     if (!value.password) {
  //         formIsValid = false;
  //         errors.password = "Password is required.";
  //     } else if (value.password.length < 8) {
  //         formIsValid = false;
  //         errors.password = "Password must be at least 8 characters long.";
  //     }
  //     if (!value.confirmPassword) {
  //         formIsValid = false;
  //         errors.confirmPassword = "Please confirm your password.";
  //     } else if (value.password !== value.confirmPassword) {
  //         formIsValid = false;
  //         errors.confirmPassword = "Passwords do not match.";
  //     }
  //     setErrors(errors)
  //     return formIsValid;
  // }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Form Submitted:", value);
    if (validate()) {
      setLoading(true);
      try {
        console.log("deiebci");
        onSubmit(value);
      } catch (error) {
        console.error("Error during submission", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    value,
    setValue,
    errors,
    loading,
    setLoading,
    setErrors,
    handleChange,
    handleSubmit,
    onSubmit,
  };
};
