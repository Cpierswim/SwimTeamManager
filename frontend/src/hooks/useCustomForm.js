import { useState } from "react";

const useCustomForm = (initialValues = {}, onSubmit) => {
  const [formData, setFormValues] = useState(initialValues);

  const handleInputChange = (e) => {
    // debugger;
    if (e.target.type === "checkbox")
      setFormValues({ ...formData, [e.target.name]: e.target.checked });
    else setFormValues({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e, swimmers = []) => {
    e.preventDefault();
    onSubmit(formData, swimmers);
  };

  const reset = () => {
    setFormValues(initialValues);
  };

  return [formData, handleInputChange, handleSubmit, reset];
};

export default useCustomForm;
