import React, { useRef } from 'react';
import Button from './Button'
import './ContactForm.scss';

import data from '../data.json'

const ContactForm = ({ full }) => {
  const { form, email } = data.contact;
  const ref = useRef();
  const onSubmit = (event, stuff) => {
    event.preventDefault()

    const { text, email } = event.target;
    console.log(text.value, email.value);
  }

  return (
    <div className="t-md contact-form__wrapper">
      { full &&
        <div>
          <Button onClick={ () => ref.current.focus() }>
            <div className="contact-form__intro">
              <p>{ form.intro }</p>
              <p>{ form.focusline }
                <span className='arrow bounce-y'>↓</span>
              </p>
            </div>
          </Button>

          <form className="contact-form" autoComplete="off" onSubmit={ onSubmit }>
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
        </div>
      }

      <div className="">
        <p>{ email.intro }</p>
        <Button
          className="t-lg t-punch"
          href={ `mailto:${email.address}` }
        >
          { email.address }
        </Button>
      </div>

    </div>
  );
};

export default ContactForm;
