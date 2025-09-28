import React, { useState } from "react";
import axios from "axios";

export default function Contact() {

  let [form, setForm] = useState({});

  let changeData = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  let addFeedback = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("http://localhost:3000/feedback", {
        name: form.name,
        email: form.email,
        message: form.message
      });

      alert(res.data.msg || res.data);
      setForm({name: "", email: "", message: ""});
    } catch (err) {
      console.log(err);

    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
        Contact Us
      </h1>
      <p className="text-gray-700 text-lg text-center mb-6">
        Have questions or feedback? We’d love to hear from you!
        Please fill out the form below or reach us directly.
      </p>

      <form className="space-y-4 max-w-lg mx-auto" onSubmit={addFeedback}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          onChange={(e) => changeData(e)}
          value={form.name}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          onChange={(e) => changeData(e)}
          value={form.email}
        />
        <textarea
          placeholder="Your Message"
          rows="4"
          name="message"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          onChange={(e) => changeData(e)}
          value={form.message}
        ></textarea>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"

        >
          Send Message
        </button>
      </form>

      <div className="mt-8 text-center text-gray-600">
        <p>Email: support@votingapp.com</p>
        <p>Phone: +91 98765 43210</p>
      </div>
    </div>
  );
}
