import React, { useRef, useState } from 'react';
import Button from './Button'
import { ContactContext } from '../App'
import { fetchApi } from '../utils'


const ContactForm = ({ full }) => {
  const [status, setStatus] = useState(0);
  const ref = useRef();
  const onSubmit = (event) => {
    event.preventDefault()
    setStatus(1);

    fetchApi({
      url: '/email',
      method: 'POST',
      data: {
        to: 'majapodrug2@gmail.com',
        from: event.target.email.value,
        replyTo: event.target.email.value,
        subject: "Hello Punch",
        text: event.target.text.value,
        html: event.target.text.value,
      },
    }).then(res => setStatus(res.status))
      .catch(error => setStatus(error.status || 500))
  }
  const resetStatus = () => {
    if (status) setStatus(0);
  }

  return (
    <ContactContext.Consumer>
      {contact => (
        <div className="contact-form__wrapper">
          { full &&
            <div>
              <Button onClick={ () => ref.current.focus() }>
                <div className="contact-form__intro t-sm">
                  <p>{ contact.intro }</p>
                  <p>{ contact.focusline }
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
                      placeholder={ contact.emailPlaceholder}
                      onChange={ resetStatus }
                      onFocus={ resetStatus }
                    />
                    <Button className="t-punch" type="submit" disabled={ status === 1 }>
                      <div>
                        { status === 1 ?
                          contact.sending :
                          <span>
                            { contact.submit }
                            <span className='arrow bounce-x'>-></span>
                          </span>
                        }
                      </div>
                    </Button>
                  </div>
                </form>
                { status === 200 && <p className="t-sm mt-2">{ contact.success }</p> }
                { status > 399 && <p className="t-sm t-punch mt-2">{ contact.error }</p> }
              </div>

              <p className="t-sm">{ contact.emailIntro }</p>

            </div>
          }

          <Button
            className="t-lg t-punch"
            href={ `mailto:${contact.emailAddress}` }
          >
            { contact.emailAddress }
          </Button>

        </div>
      ) }
    </ContactContext.Consumer>
  );
};

export default ContactForm;
