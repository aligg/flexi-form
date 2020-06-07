import React, { useEffect, useState, useCallback } from "react";
import { input1 } from "../sampleFormInputs";

const Form = () => {
    const [formData, setFormData] = useState([]);
    const [formState, setFormState] = useState(null);

    const constructState = useCallback(() => {
        const tempState = {};
        formData.map((obj) => {
            // only initialize non-conditional
            if (!obj.conditional) {
                tempState[obj.name] = null;
            }
        });
        setFormState(tempState);
    }, [formData]);

    // on page load, fetch and store form data, initialize form state
    useEffect(() => {
        setFormData(input1);
        constructState();
    }, [constructState]);

    const checkConditional = (name, showIf) => {
        return showIf(formState[name]);
    };

    const handleOnChange = (evt) => {
        let modifiedValue = evt.target.value;

        // if type date, properly format
        if (evt.target.type === "date") {
            modifiedValue = new Date(evt.target.value);
        }
        // if type checkbox, set bool w/ checked
        if (evt.target.type === "checkbox") {
            modifiedValue = evt.target.checked;
        }
        setFormState({ ...formState, [evt.target.name]: modifiedValue });
    };

    const renderForm = () => {
        const formJSX = [];
        formData.map((obj) => {
            if (
                !obj.conditional ||
                (obj.conditional &&
                    checkConditional(
                        obj.conditional.name,
                        obj.conditional.show_if,
                    ))
            ) {
                formJSX.push(
                    <div
                        key={obj.name}
                        className={
                            obj.type === "checkbox"
                                ? "formFieldCheckbox"
                                : "formField"
                        }
                    >
                        <label>{obj.human_label}</label>
                        <input
                            type={obj.type}
                            name={obj.name}
                            onChange={handleOnChange}
                            value={formState.name}
                        ></input>
                    </div>,
                );
            }
        });
        return formJSX;
    };

    const handleSubmission = () => {
        alert(`Submit success: " ${JSON.stringify(formState, null, 4)}`);
    };

    const submissionDisabled = () => {
        let nullFieldValue = false;
        if (formState) {
            Object.values(formState).map((val) => {
                console.log(val);
                if (!val) {
                    nullFieldValue = true;
                }
            });
        }

        return nullFieldValue;
    };

    return (
        <div className="formContainer">
            {renderForm()}
            <button
                type="submit"
                onClick={handleSubmission}
                disabled={submissionDisabled()}
            >
                Submit
            </button>
        </div>
    );
};

export default Form;
