import React, { useEffect, useState } from "react";

const FormGrp01 = (props) => {

    return(
        <div className={props.error ? "form-01-grp form-01-grp-error" : "form-01-grp"}>
            <label className="form-01-grp-label">
                {props.label}
            </label>
            <input 
                id={props.id}
                className="form-01-grp-input"
                type={props.type}
                value={props.value}
                placeholder={props.placeholder}
                name={props.name}
                onChange={(event)=>props.handle_change(event)}
            />
        </div>
    )
}

export default FormGrp01;