import React from 'react';
import styles from './formFields.css';

const FormFields = ({ id, formData, change }) => {
  const showError = () => {
    let errorMessage = null;

    if (formData.validation && !formData.valid) {
      errorMessage = (
        <div className={styles.labelError}>{formData.validationMessage}</div>
      );
    }

    return errorMessage;
  };

  const renderTemplate = () => {
    let formTemplate = null;

    switch (formData.element) {
      case 'input':
        formTemplate = (
          <div>
            <input
              {...formData.config}
              value={formData.value}
              onChange={event => change({ event, id, blur: false })}
              onBlur={event => change({ event, id, blur: true })}
            />
            {showError()}
          </div>
        );
        break;
      case 'select':
        formTemplate = (
          <div>
            <select
              value={formData.value}
              name={formData.config.name}
              onChange={event => change({ event, id, blur: false })}
              onBlur={event => change({ event, id, blur: true })}
            >
              {formData.config.options.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        );
        break;
      default:
        formTemplate = null;
    }
    return formTemplate;
  };

  return <div>{renderTemplate()}</div>;
};

export default FormFields;
