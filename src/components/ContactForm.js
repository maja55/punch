import React, { useRef, useState } from 'react';
import Button from './Button'

import data from '../data.json'

const ContactForm = ({ full }) => {
  const { form, email } = data.contact;
  const [status, setStatus] = useState(0);
  const ref = useRef();
  const onSubmit = (event) => {
    event.preventDefault()
    setStatus(1);

    fetch('http://localhost:1337/email', {
      method: 'POST',
      body: JSON.stringify({
        to: email.address,
        from: event.target.email.value,
        replyTo: event.target.email.value,
        subject: email.subject,
        text: event.target.text.value,
        html: event.target.text.value,
      }),
      headers:{ 'Content-Type': 'application/json' }
    }).then(res => setStatus(res.status))
      .catch(error => setStatus(error.status))
  }
  const resetStatus = () => {
    if (status) setStatus(0);
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

          <div className="contact-form__mb">
            <form className="contact-form t-md" autoComplete="off" onSubmit={ onSubmit }>
              <textarea
                ref={ ref }
                className="t-md"
                type="text"
                name="text"
                required
                onChange={ resetStatus }
                onFocus={ resetStatus }
              />
              <div className="contact-form__bottom">
                <input
                  className="t-md t-light"
                  type="text"
                  name="email"
                  autoComplete="off"
                  required
                  placeholder={ form.emailPlaceholder}
                  onChange={ resetStatus }
                  onFocus={ resetStatus }
                />
                <Button className="t-punch" type="submit" disabled={ status === 1 }>
                  <div>
                    { status === 1 ?
                      form.sending :
                      <span>
                        { form.submit }
                        <span className='arrow bounce-x'>-></span>
                      </span>
                    }
                  </div>
                </Button>
              </div>
            </form>
            { status === 200 && <p className="t-sm mt-2">{ form.success }</p> }
            { status > 399 && <p className="t-sm t-punch mt-2">{ form.error }</p> }
          </div>

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
