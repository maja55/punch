import React, { useRef } from 'react';
import Button from './Button'

import data from '../data.json'

const ContactForm = ({ full }) => {
  const { form, email } = data.contact;
  const ref = useRef();
  const onSubmit = (event, stuff) => {
    event.preventDefault()

    const { text, email } = event.target;
    alert(`Text: ${text.value}\nFrom: ${email.value}\nFor this to work we need to set up email service on the server once we have one`);
  }

  return (
    <div className="contact-form__wrapper">
      { full &&
        <div>
          <Button onClick={ () => ref.current.focus() }>
            <div className="contact-form__intro t-sm">
              <p>{ form.intro }</p>
              <p>{ form.focusline }
                <span className='arrow bounce-y'>↓</span>
              </p>
            </div>
          </Button>

          <form className="contact-form t-md" autoComplete="off" onSubmit={ onSubmit }>
            <textarea className="t-md" type="text" name="text" ref={ ref } required style={{}} />
            <div className="contact-form__bottom">
              <input
                className="t-md t-light"
                type="text"
                name="email"
                autoComplete="off"
                required
                placeholder={ form.emailPlaceholder}
              />
              <Button className="t-punch" type="submit">
                <div>
                  { form.submit }
                  <span className='arrow bounce-x'>-></span>
                </div>
              </Button>
            </div>
          </form>

          <p className="t-sm">{ email.intro }</p>

        </div>
      }

      <Button
        className="t-lg t-punch"
        href={ `mailto:${email.address}` }
      >
        { email.address }
      </Button>

    </div>
  );
};

export default ContactForm;
