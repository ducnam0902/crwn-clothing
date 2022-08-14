import { useState, useEffect } from "react";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
  // createAuthUserWithEmailAndPassword,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import { getRedirectResult } from "firebase/auth";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (e) {
      switch (e.code) {
        case "auth/wrong-password":
          alert("incorrect password for email ");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email  ");
          break;
        default:
          console.log(e);
      }
    }
  };

  const signInWithGoogle = async () => {
    await signInWithGoogleRedirect();
  };

  const getRedirectWhenUserLogin = async () => {
    const response = await getRedirectResult(auth);
    if (response) {
      await createUserDocumentFromAuth(response.user);
    }
  };

  useEffect(() => {
    getRedirectWhenUserLogin();
  }, []);
  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
