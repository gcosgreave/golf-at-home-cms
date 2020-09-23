import React from 'react';
import { navigate } from 'gatsby-link';
import Layout from '../../components/Layout';

function encode(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isValidated: false };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error));
  };

  render() {
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1
                className="has-text-weight-bold is-size-1"
                style={{
                  boxShadow: '#32CD32 0.5rem 0px 0px, #32CD32 -0.5rem 0px 0px',
                  backgroundColor: '#32CD32',
                  color: 'white',
                  padding: '1rem',
                }}
              >
                Contact Us
              </h1>
              <div className="columns">
                <div className="column">
                  <p>
                    Fill in the form below and we will have someone contact you
                    within the next 3 business days.
                  </p>
                  <form
                    name="contact"
                    method="post"
                    action="/contact/thanks/"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={this.handleSubmit}
                  >
                    {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                    <input type="hidden" name="form-name" value="contact" />
                    <div hidden>
                      <label>
                        Don’t fill this out:{' '}
                        <input name="bot-field" onChange={this.handleChange} />
                      </label>
                    </div>
                    <div className="field">
                      <label className="label" htmlFor="name">
                        Your name
                      </label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          name="name"
                          onChange={this.handleChange}
                          id="name"
                          required
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label" htmlFor="email">
                        Email
                      </label>
                      <div className="control">
                        <input
                          className="input"
                          type="email"
                          name="email"
                          onChange={this.handleChange}
                          id="email"
                          required
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label" htmlFor="message">
                        Message
                      </label>
                      <div className="control">
                        <textarea
                          className="textarea"
                          name="message"
                          onChange={this.handleChange}
                          id="message"
                          required
                        />
                      </div>
                    </div>
                    <div className="field">
                      <button className="button is-link" type="submit">
                        Send
                      </button>
                    </div>
                  </form>
                </div>
                <div className="column">Second column</div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
