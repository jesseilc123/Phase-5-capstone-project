import * as yup from "yup"

// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const replySchema = yup.object().shape({
    content: yup.string().max(250).required("Required"),
});

export const postSchema = yup.object().shape({
    title: yup.string().max(100, "Must be less than 100 characters").required("Required"),
    content: yup.string().max(250).required("Required"),
})