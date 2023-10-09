import * as yup from "yup"

// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const replySchema = yup.object().shape({
    content: yup.string().max(250).required("Required"),
});

export const postSchema = yup.object().shape({
    title: yup.string().max(100, "Must be less than 100 characters").required("Required"),
    body: yup.string().max(250).required("Required"),
    category: yup.string().oneOf(["All", "Spoilers", "Memes", "Info", "General", "Game"]).required("Required"),
})

export const loginSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Required"),
    password: yup.string().required("Required"),
})

export const signupSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Required").max(250),
    username: yup.string().required("Required").max(250),
    password: yup.string().matches(passwordRules, { message: "Please create a stronger password" }).required("Required").max(250),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Required"),
    checkbox1: yup.boolean(),
    checkbox2: yup.boolean().oneOf([true], "Please accept the terms of service"),
})
