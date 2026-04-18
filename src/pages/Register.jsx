import { useState, useRef } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function RegistrationForm() {

  const API = import.meta.env.VITE_API_URL || ""
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    dob: "",
    gender: "",
    email: "",
    password: "",
    // confirmPassword: "",
    mobile: "",
    altMobile: "",
    agree: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "fullName",
      "fatherName",
      "motherName",
      "dob",
      "gender",
      "email",
      "password",
      "confirmPassword",
      "mobile"
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        setError("⚠️ Please fill in all required fields before submitting.");
        formRef.current?.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    if (!formData.agree) {
      setError("⚠️ You must agree to the declaration before submitting.");
      formRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("⚠️ Passwords do not match.");
      formRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    setError("");
    setLoading(true);

    try {
      const dataToSend = new FormData();
      for (const key in formData) {
        dataToSend.append(key, formData[key]);
      }
      const response = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        body: dataToSend,
      });

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again.");
      }
      setFormData({
        fullName: "",
        fatherName: "",
        motherName: "",
        dob: "",
        gender: "",
        email: "",
        password: "",
        // confirmPassword: "",
        mobile: "",
        altMobile: "",
        agree: false
      });
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center bg-white px-4 sm:px-6 py-12 font-poppins relative">
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-8 text-center">
          MOCK AP EAPCET Registration Form
        </h1>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-xl w-full max-w-md p-6 sm:p-8"
        >
          {error && (
            <div className="bg-red-100 text-red-700 border border-red-300 rounded-md p-3 mb-4 text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* Personal Information */}
            <Section title="Personal Information">
              <Input label="Full Name*" name="fullName" value={formData.fullName} onChange={handleChange} />
              <Input label="Father's Name*" name="fatherName" value={formData.fatherName} onChange={handleChange} />
              <Input label="Mother's Name*" name="motherName" value={formData.motherName} onChange={handleChange} />
              <Input label="Date of Birth*" type="date" name="dob" value={formData.dob} onChange={handleChange} />
              <Select label="Gender*" name="gender" value={formData.gender} onChange={handleChange} options={["Male", "Female", "Other"]} />
              
              {/* Password fields placed in Personal Information as requested */}
              <Input label="Password*" type="password" name="password" value={formData.password} onChange={handleChange} />
              <Input label="Confirm Password*" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
            </Section>

            {/* Contact Information */}
            <Section title="Contact Information">
              <Input label="Email Address*" type="email" name="email" value={formData.email} onChange={handleChange} />
              <Input label="Mobile Number*" name="mobile" value={formData.mobile} onChange={handleChange} />
              <Input label="Alternative Mobile Number (optional)" name="altMobile" value={formData.altMobile} onChange={handleChange} />
            </Section>

            {/* // Academic Information
            // <Section title="Academic Information">
            //   <Select label="Stream" name="stream" value={formData.stream} onChange={handleChange} options={["ENGINEERING", "PHARMACY"]} />
            //   <Select label="Qualifying Exam" name="qualifyingExam" value={getSelectedQualifyingExam()} onChange={(e) => handleQualifyingExams(e.target.value)} options={["Intermediate (Regular)", "Intermediate (Vocational)", "Bridge Course"]} />
            //   <Select label="Year of Passing" name="yearOfPassing" value={formData.yearOfPassing} onChange={handleChange} options={["2024", "2023", "2022"]} />
            //   <Select label="Medium of Instruction" name="medium" value={formData.medium} onChange={handleChange} options={["English", "Telugu"]} />
            //   <Select label="Place of Study" name="placeOfStudy" value={formData.placeOfStudy} onChange={handleChange} options={["Urban", "Rural"]} />
            //   <Input label="Intermediate (XII) Marks Percentage" name="marks" value={formData.marks} onChange={handleChange} />
            //   <Input label="Intermediate (XII) College Name" name="collegeName" value={formData.collegeName} onChange={handleChange} />
            //   <Input label="Intermediate (XII) College Address" name="collegeAddress" value={formData.collegeAddress} onChange={handleChange} />
            // </Section> */}

            {/* Category Information */}
            {/* <Section title="Category Information">
              <Select label="Category" name="category" value={formData.category} onChange={handleChange} options={["OC", "BC_A", "BC_B", "BC_C", "BC_D", "BC_E", "SC", "ST", "EWS"]} />
              <RadioGroup
                label="Minority Status"
                name="minorityStatus"
                options={["Non-Minority", "Minority"]}
                selected={formData.minorityStatus}
                onChange={handleChange}
              />
            </Section> */}

            {/* Address Information */}
            {/* <Section title="Address Information">
              <TextArea label="Complete Address" name="address" value={formData.address} onChange={handleChange} />
              <Input label="City/District" name="city" value={formData.city} onChange={handleChange} />
              <Input label="State" name="state" value={formData.state} onChange={handleChange} />
              <Input label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
            </Section> */}


            {/* Declaration */}
            <div className="flex items-start space-x-2 mt-3">
              <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} className="mt-1 accent-[#003973]" />
              <p className="text-xs text-gray-700">
                I hereby declare that the information provided above is true and correct to the best of my knowledge.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 rounded-md text-white shadow-md transition duration-300 ${
                  (loading || formData.agree === false) ? "bg-gray-400 cursor-not-allowed" : "bg-[#003973] hover:bg-[#002952]"
                }`}
              >
                {loading ? "Submitting..." : "SUBMIT"}
              </button>     
            </div>

            {/* Already have account */}
            <div className="flex flex-col items-center mt-6 space-y-2">
              <span
                onClick={() => navigate("/login")}
                className="text-[#003973] font-medium cursor-pointer hover:text-[#002952] transition-colors duration-300 underline-offset-2 hover:underline"
              >
                Already have an account?
              </span>
              <span
                onClick={() => navigate("/")}
                className="text-[#003973] font-medium cursor-pointer hover:text-[#002952] transition-colors duration-300 underline-offset-2 hover:underline"
              >
                Back to Home
              </span>
            </div>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
}

function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-[#003973] mb-2 border-b border-gray-200 pb-1">{title}</h2>
      <div className="space-y-4 mt-3">{children}</div>
    </section>
  );
}

function Input({ label, name, value, onChange, type = "text" }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";
  const currentType = isPasswordType && showPassword ? "text" : type;

  return (
    <div>
      <label className="block font-medium mb-1 text-black">{label}:</label>
      <div className="relative">
        <input
          type={currentType}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-[#EFF7FF] border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#003973] outline-none shadow-[0_4px_4px_rgba(0,0,0,0.25)] pr-10"
        />
        {isPasswordType && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}

function TextArea({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block font-medium mb-1 text-black">{label}:</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows="3"
        className="w-full bg-[#EFF7FF] border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#003973] outline-none shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      />
    </div>
  );
}

function Select({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block font-medium mb-1 text-black">{label}:</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-[#EFF7FF] border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#003973] outline-none shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      >
        <option value="">Select {label}</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function RadioGroup({ label, name, options, selected, onChange }) {
  return (
    <div>
      <label className="block font-medium mb-1 text-black">{label}:</label>
      <div className="flex gap-4 mt-1">
        {options.map((opt, i) => (
          <label key={i} className="flex items-center gap-2 text-gray-700">
            <input
              type="radio"
              name={name}
              value={opt}
              checked={selected === opt}
              onChange={onChange}
              className="accent-[#003973]"
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}

export default RegistrationForm;