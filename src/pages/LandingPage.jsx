import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import AutoCarousel from "../components/AutoCarousel";
import NBA from "../assets/NBA.png";
import NAAC from "../assets/NAAC.png";
import Vasu from "../assets/vasu_ai&ds.png";
import NIRF from "../assets/NIRF.png";
import UGC from "../assets/UGC.png";
import PencilPaper from "../assets/PencilPaper.jpg";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/LogoV1.png";
import OurRecruiters from "../components/OurRecruiters";
import { motion } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import MobileSideBar from "../components/MobileSideBar";
import Banner from "../assets/AdmissionBanner.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

const StatsFade = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Counter = ({ value, trigger }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    const end = parseInt(value.replace(/\D/g, ""));
    let start = 0;
    const duration = 1000;
    const steps = 60;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, trigger]);

  return (
    <>
      {count.toLocaleString()}
      {value.includes("+") && "+"}
    </>
  );
};

function LandingPage() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="font-poppins text-gray-900 relative">
      <NavBar onMenuToggle={() => setIsSidebarOpen(true)} />
      <MobileSideBar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}

          className="mt-6 mb-8 md:mt-10 md:mb-12 bg-white rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 hover:shadow-lg transition-shadow duration-300"
        >
          <div className="max-w-xl text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold mt-3 text-[#003973]">
              MOCK AP EAPCET
            </h1>
            <h3 className="text-base sm:text-lg font-medium text-gray-700">
              Vignan’s Institute of Information Technology Common Entrance Test
            </h3>
            <p className="mt-4 text-gray-700 text-sm sm:text-base">
              Secure. Seamless. Smart. Take your exams online with confidence
              and ease.
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate("/register")}
                className="px-6 py-2 bg-[#003973] text-white rounded-lg hover:bg-blue-800 transition-all duration-300 hover:scale-105 shadow-md"
              >
                Start Your Journey!
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <AutoCarousel
              items={[
                { image: "https://blr1.digitaloceanspaces.com/vignan/placements/studentImages/7415a3d9-2fc7-4e0d-83aa-71444b973aa0-07_copy.png", companyLogo: "https://blr1.digitaloceanspaces.com/vignan/placements/companyLogos/15019a1b-5cdc-4cf4-be7a-966dba41a84b-infoblox.svg", package: "13 LPA", name: "B Gayatri" },
                { image: "https://blr1.digitaloceanspaces.com/vignan/placements/studentImages/431bf7d5-7e8b-4c6d-9983-9342e830dbbb-03_copy.png", companyLogo: "https://blr1.digitaloceanspaces.com/vignan/placements/companyLogos/9bb27556-80f4-4d79-9c7e-13c5494c73c5-Amazon_logo.webp", package: "27 LPA", name: "Umakanth" },
                { image: Vasu, companyLogo: "https://blr1.digitaloceanspaces.com/vignan/placements/companyLogos/654a47b1-e426-47c2-8c07-08f2ed0a0ab8-Meesho_logo.png", package: "37 LPA", name: "Vasu Surisetty" },
                { image: "https://blr1.digitaloceanspaces.com/vignan/placements/studentImages/dffc6229-d9bf-4d95-9875-0b8711965534-04_copy.png", companyLogo: "https://blr1.digitaloceanspaces.com/vignan/placements/companyLogos/4c385863-5652-4880-b37b-101756e2f311-Cisco_logo.png", package: "23 LPA", name: "K Seshu" },
                { image: "https://blr1.digitaloceanspaces.com/vignan/placements/studentImages/cb71223f-59d3-444e-8643-1eaf4e60aaae-05_copy.png", companyLogo: "https://blr1.digitaloceanspaces.com/vignan/placements/companyLogos/988acd0b-14b5-4d06-ba98-2a273bbdda0d-SAP_logo.png", package: "18 LPA", name: "Alla Pooja" },
              ]}
            />
            <div className="w-full max-w-[520px] mt-6 mb-6">
              <img
                src={Banner}
                alt="Admission Banner"
                className="w-full h-auto rounded-lg shadow-md object-cover transition-shadow duration-300 hover:shadow-xl"
              />
            </div>
          </div>
        </motion.div>
        {/* ABOUT Mock AP EAPCET */}
        <motion.section
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeInUp}
          className="mb-8 md:mb-12"
        >
          <div className="flex justify-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center relative after:content-[''] after:block after:w-[80px] sm:after:w-[120px] after:h-[2px] after:bg-[#003973] after:mx-auto after:mt-2 mb-8 md:mb-10">
              About MOCK AP EAPCET
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={PencilPaper}
                alt="About MOCK AP EAPCET"
                className="rounded-xl w-full max-w-[300px] h-auto sm:w-[320px] sm:h-[240px] object-cover shadow-md"
              />
            </motion.div>

            <div className="max-w-xl text-center md:text-justify text-gray-800 leading-relaxed px-2 text-sm sm:text-base">
              <p className="font-medium">
                Vignan’s Institute of Information Technology MOCK AP EAPCET is a
                premier institution dedicated to excellence in technical
                education, innovation, and research. Established with a vision
                to empower students with knowledge and skills for a dynamic
                future, MOCK AP EAPCET provides a vibrant academic environment supported
                by experienced faculty and modern infrastructure. The college
                emphasizes holistic development through a blend of academics,
                hands-on learning, and extracurricular activities.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ACCREDITATIONS */}
        <motion.section
          id="accreditations"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="bg-gray-50 py-10 rounded-xl px-4 sm:px-8 mb-8 md:mb-12 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex justify-center mb-6">
            {/* Reduced heading size and underline width for mobile */}
            <h2 className="text-2xl sm:text-3xl font-bold text-center relative after:content-[''] after:block after:w-[80px] sm:after:w-[120px] after:h-[2px] after:bg-[#003973] after:mx-auto after:mt-2">
              Accreditations
            </h2>
          </div>

          {/* Reduced image size and gap for mobile */}
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-8 sm:gap-10">
            {[
              {
                src: NBA,
                labelTop: "CSE | ECE | MECH",
                labelBottom: "IT | EEE",
              },
              {
                src: NAAC,
                labelTop: "3.40 / 4.00",
                labelBottom: "CYCLE - III",
              },
              {
                src: NIRF,
                labelTop: "RANKING 201–300",
                labelBottom: "Engineering",
              },
              { src: UGC, labelTop: "Autonomous", labelBottom: "Institution" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 250 }}
                className="text-center"
              >
                {/* Smaller images on mobile */}
                <img
                  src={item.src}
                  alt={`logo-${i}`}
                  className="w-28 sm:w-40 mx-auto"
                />
                <p className="text-xs sm:text-sm mt-2 text-[#003973]">
                  <span className="block">{item.labelTop}</span>
                  {item.labelBottom && (
                    <span className="block">{item.labelBottom}</span>
                  )}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* OUR ACHIEVEMENTS */}
        <motion.section
          ref={sectionRef}
          id="stats"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="py-10 rounded-xl px-4 sm:px-8 mb-8 md:mb-12 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex justify-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-center relative after:content-[''] after:block after:w-[80px] sm:after:w-[120px] after:h-[2px] after:bg-[#003973] after:mx-auto after:mt-2">
              Our Achievements
            </h2>
          </div>
          <p className="text-gray-600 text-center text-sm md:text-base mb-8">
            A snapshot of our achievements and community
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-6">
            {[
              ["15,000+", "New Student Registrations Every Month"],
              ["400+", "Faculty Members (30% PhDs)"],
              ["150+", "Recruiting Companies"],
              ["7000+", "Students from 4+ Countries"],
            ].map(([num, text], i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.06 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-[#f9fbff] shadow-md p-6 rounded-xl text-center w-full max-w-xs sm:w-64"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-[#003973]">
                  <Counter value={num} trigger={visible} />
                </h3>
                <p className="text-gray-600 text-sm mt-1">{text}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="programs"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="py-10 mb-8 md:mb-12"
        >
          {/* Heading */}
          <div className="flex justify-center mb-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center relative after:content-[''] after:block after:w-[80px] sm:after:w-[120px] after:h-[2px] after:bg-[#003973] after:mx-auto after:mt-2">
              Programs
            </h2>
          </div>

          <p className="text-gray-600 text-center max-w-2xl mx-auto mt-3 text-sm md:text-base mb-10">
            Explore our diverse range of undergraduate and postgraduate programs
            designed for future leaders and innovators.
          </p>

          {/* Program Cards */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-10 md:mb-12">
            {["Engineering", "Pharmacy"].map((title, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.3 }}
                className="bg-[#f0f8ff] rounded-2xl shadow-md hover:shadow-lg transition p-6 w-36 sm:w-48 text-center border border-blue-100"
              >
                <img
                  src={Logo}
                  alt={title}
                  className="w-10 sm:w-12 mx-auto mb-3"
                />
                <h3 className="font-semibold text-base sm:text-lg text-gray-800">
                  {title}
                </h3>
              </motion.div>
            ))}
          </div>

          {/* Programs List with Divider */}
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-10 md:gap-0 relative">
            {/* Left Column — Engineering */}
            <div className="md:w-1/2 md:pr-10">
              <ul className="space-y-4 pl-4 sm:pl-8">
                {[
                  "Computer Science and Engineering",
                  "Civil Engineering",
                  "Electrical and Electronics Engineering",
                  "Mechanical Engineering",
                  "Information Technology",
                  "Electronics and Computer Engineering (ECM)",
                  "Artificial Intelligence and Data Science (AI & DS)",
                  "Electronics & Communication Engineering (ECE)",
                  "CSE (Artificial Intelligence)",
                  "CSE (Cyber Security)",
                  "CSE (Data Science)",
                ].map((course, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-400 rounded-full mt-2 sm:mt-1 mr-3 sm:mr-4 flex-shrink-0" />
                    <span className="text-gray-800 text-sm md:text-base font-medium">
                      {course}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider Line */}
            <div className="hidden md:block w-[1px] bg-gray-300 mx-8" />

            {/* Right Column — Pharmacy */}
            <div className="md:w-1/2 md:pl-10">
              <ul className="space-y-4 pl-4 sm:pl-8">
                {[
                  "Bachelor of Pharmacy (B.Pharm)",
                  "Master of Pharmacy (M.Pharm)",
                  "Pharmaceutical Analysis",
                  "Pharmaceutics",
                  "Pharmacology",
                  "Pharmacognosy",
                ].map((pharma, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-400 rounded-full mt-2 sm:mt-1 mr-3 sm:mr-4 flex-shrink-0" />
                    <span className="text-gray-800 text-sm md:text-base font-medium">
                      {pharma}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* PLACEMENTS SECTION */}
        <motion.section
          id="placements"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="py-10 mb-12 md:mb-20 text-center relative"
        >

          <div className="flex justify-center mb-4">
            {/* Reduced heading size and underline width for mobile */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center relative after:content-[''] after:block after:w-[80px] sm:after:w-[120px] after:h-[2px] after:bg-[#003973] after:mx-auto after:mt-2">
              A Legacy of Placement Excellence
            </h2>
          </div>

          <p className="text-gray-600 max-w-2xl mx-auto mt-3 text-sm md:text-base mb-8">
            Our students are shaping the future at the world's leading
            technology companies.
          </p>

          {/* Adjusted gap for mobile grid */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 sm:gap-10 md:gap-20 mb-10">
            {[
              ["37", "LPA", "Highest Package"],
              ["4.2", "LPA", "Average Package"],
              ["1893", "+", "Total Offers (2024–2025)"],
              ["163", "+", "Companies Visited"],
            ].map(([num, unit, desc], i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="cursor-default"
              >
                {/* Reduced heading size for mobile */}
                <h3 className="text-2xl sm:text-3xl font-bold text-black">
                  {num} <span className="text-[#003973]">{unit}</span>
                </h3>
                <p className="text-gray-600 text-sm mt-1">{desc}</p>
              </motion.div>
            ))}
          </div>

          <OurRecruiters />

          {/* Reduced link text size for mobile */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="mt-10"
          >
            <a
              href="https://www.vignaniit.edu.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base md:text-lg font-semibold text-black inline-block relative after:content-[''] after:block after:w-[60px] after:h-[2px] after:bg-[#003973] after:mx-auto after:mt-2 hover:text-[#003973] transition-colors duration-300"
            >
              Visit VIIT Now!
            </a>
          </motion.div>
        </motion.section>
      </div>

      <Footer />
    </div>
  );
}

export default LandingPage;
