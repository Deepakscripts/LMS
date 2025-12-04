import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Calendar, Shield, Lock, FileText, AlertTriangle, Scale } from 'lucide-react';

const PrivacyPolicy = () => {
  const lastUpdated = '4 December 2025';
  const [activeSection, setActiveSection] = useState('');

  // Smooth scroll to section
  const scrollToSection = id => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]');
      let current = '';

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('data-section');
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tableOfContents = [
    { id: 'introduction', title: 'Introduction', icon: '1' },
    { id: 'information-collection', title: 'Information We Collect', icon: '2' },
    { id: 'information-usage', title: 'How We Use Info', icon: '3' },
    { id: 'cookies', title: 'Cookies & Tracking', icon: '4' },
    { id: 'disclosure', title: 'Disclosure of Info', icon: '5' },
    { id: 'security', title: 'Data Security', icon: '6' },
    { id: 'user-rights', title: 'User Rights', icon: '7' },
    { id: 'grievance-officer', title: 'Grievance Officer', icon: '8' },
    { id: 'policy-changes', title: 'Changes to Policy', icon: '9' },
  ];

  const grievanceOfficer = {
    name: 'Deepak Agrawal',
    email: 'info@code2dbug.com',
    phone: '9827563406',
    address: [
      'House No C-17,',
      'Behind 80 LIG Dhancha Bhawan,',
      'ACC Employees (2 labour) housing society,',
      'VTC: Kurud, District: Durg,',
      'State: Chhattisgarh, PIN Code: 490024',
    ],
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Shield className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
          </div>
          <div className="flex items-center gap-2 text-indigo-100">
            <Calendar className="w-5 h-5" />
            <p className="text-lg">Last Updated: {lastUpdated}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Table of Contents - Sticky Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <nav
              className="sticky top-20 bg-zinc-900 rounded-lg shadow-md p-6"
              aria-label="Table of Contents"
            >
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-700">
                <FileText className="w-5 h-5 text-indigo-500" />
                <h2 className="font-bold text-white">Contents</h2>
              </div>
              <ul className="space-y-2">
                {tableOfContents.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-2 ${
                        activeSection === item.id
                          ? 'bg-indigo-900/50 text-indigo-300 font-semibold border border-indigo-700'
                          : 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                      }`}
                    >
                      <span className={`shrink-0 w-6 h-6 rounded-full text-xs flex items-center justify-center ${activeSection === item.id ? 'bg-indigo-600 text-white' : 'bg-zinc-700 text-gray-300'}`}>
                        {item.icon}
                      </span>
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9">
            {/* Introduction */}
            <div 
              id="introduction"
              data-section="introduction"
              className="bg-zinc-900 rounded-lg shadow-md p-8 mb-8 scroll-mt-20"
            >
              <div className="flex items-start gap-4 p-4 bg-amber-900/20 border-l-4 border-amber-500 rounded-r-lg mb-6">
                <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-amber-100 mb-2">Commitment to Privacy</h3>
                  <p className="text-amber-200/80 leading-relaxed">
                    Code2dbug, a proprietary of <span className="font-semibold">NAIR Solutions</span> ("we,"
                    "our," or "us"), recognizes the importance of maintaining your privacy.
                  </p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-4">
                We are committed to maintaining the confidentiality, integrity, and security of all information of our
                users. This Privacy Policy describes how we collect, store, handle, and transfer certain
                information of yours when you visit our website or use our mobile application
                (collectively, the "Platform").
              </p>
              <p className="text-gray-300 leading-relaxed">
                This Privacy Policy is published in compliance with{' '}
                <span className="font-semibold text-white">
                  Section 43A of the Information Technology Act, 2000
                </span>
                , and{' '}
                <span className="font-semibold text-white">
                  Rule 4 of the Information Technology (Reasonable Security Practices and Procedures and
                  Sensitive Personal Data or Information) Rules, 2011
                </span>
                .
              </p>
            </div>

            {/* Section 2: Information Collection */}
            <section
              id="information-collection"
              data-section="information-collection"
              className="bg-zinc-900 rounded-lg shadow-md p-8 mb-8 scroll-mt-20"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-bold">
                  2
                </span>
                Information We Collect
              </h2>
              <div className="space-y-6">
                <div className="pl-4 border-l-4 border-indigo-600">
                  <h3 className="font-semibold text-white mb-2">Personal Information</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Name, email address, mobile number, educational qualifications, college/university name, and mailing address.
                  </p>
                </div>
                <div className="pl-4 border-l-4 border-indigo-600">
                  <h3 className="font-semibold text-white mb-2">Payment Information</h3>
                  <p className="text-gray-300 leading-relaxed">
                    When you purchase a course (e.g., the ₹500 enrollment fee), your credit/debit card information or UPI details are processed by our secure third-party payment gateways. We do not store your sensitive financial data on our servers.
                  </p>
                </div>
                <div className="pl-4 border-l-4 border-indigo-600">
                  <h3 className="font-semibold text-white mb-2">Project & Assessment Data</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Assignments, code repositories, Capstone project submissions, and assessment scores required for certification.
                  </p>
                </div>
                <div className="pl-4 border-l-4 border-indigo-600">
                  <h3 className="font-semibold text-white mb-2">Usage Data</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Information about how you interact with our Platform, including IP address, browser type, device information, and pages visited.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: Usage */}
            <section
              id="information-usage"
              data-section="information-usage"
              className="bg-zinc-900 rounded-lg shadow-md p-8 mb-8 scroll-mt-20"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-bold">
                  3
                </span>
                How We Use Your Information
              </h2>
              <div className="space-y-3 text-gray-300">
                {[
                  'To process your enrollment in streams such as Full Stack Web Development, Data Science, etc.',
                  'To grant access to learning materials and track your progress towards certification.',
                  'To verify your identity for the issuance of "Verified Certifications."',
                  'To manage the "Campus Ambassador Program" and calculate rewards/referrals.',
                  'To communicate regarding course updates, mentorship sessions, and support.',
                  'To comply with legal obligations and resolve disputes.',
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="shrink-0 w-2 h-2 mt-2 rounded-full bg-indigo-600" />
                    <p className="text-gray-300 leading-relaxed flex-1">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4: Cookies */}
            <section
              id="cookies"
              data-section="cookies"
              className="bg-zinc-900 rounded-lg shadow-md p-8 mb-8 scroll-mt-20"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-bold">
                  4
                </span>
                Cookies and Tracking Technologies
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Platform.
              </p>
            </section>

            {/* Section 5: Disclosure */}
            <section
              id="disclosure"
              data-section="disclosure"
              className="bg-zinc-900 rounded-lg shadow-md p-8 mb-8 scroll-mt-20"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-bold">
                  5
                </span>
                Disclosure of Information
              </h2>
              <div className="space-y-6">
                <div className="pl-4 border-l-4 border-indigo-600">
                  <h3 className="font-semibold text-white mb-2">Service Providers</h3>
                  <p className="text-gray-300 leading-relaxed">
                    With third-party vendors (e.g., payment processors, email services, cloud hosting) who assist in operating the Platform.
                  </p>
                </div>
                <div className="pl-4 border-l-4 border-indigo-600">
                  <h3 className="font-semibold text-white mb-2">Legal Requirements</h3>
                  <p className="text-gray-300 leading-relaxed">
                    If required by Indian law, court order, or government agency to disclose information for identity verification, or for the prevention, detection, or investigation of cyber incidents.
                  </p>
                </div>
                <div className="pl-4 border-l-4 border-indigo-600">
                  <h3 className="font-semibold text-white mb-2">Business Transfers</h3>
                  <p className="text-gray-300 leading-relaxed">
                    In connection with any merger, sale of company assets, or acquisition of all or a portion of our business by another company.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6: Security */}
            <section
              id="security"
              data-section="security"
              className="bg-zinc-900 rounded-lg shadow-md p-8 mb-8 scroll-mt-20"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-bold">
                  6
                </span>
                Data Security
              </h2>
              <div className="flex items-start gap-4">
                 <Lock className="w-12 h-12 text-indigo-500 shrink-0 opacity-80" />
                 <p className="text-gray-300 leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your data from unauthorized access, misuse, loss, or alteration. Standard encryption protocols (SSL) are used for data transmission. However, no method of transmission over the internet is 100% secure.
                </p>
              </div>
            </section>

             {/* Section 7: User Rights */}
            <section
              id="user-rights"
              data-section="user-rights"
              className="bg-zinc-900 rounded-lg shadow-md p-8 mb-8 scroll-mt-20"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-bold">
                  7
                </span>
                User Rights
              </h2>
              <p className="text-gray-300 leading-relaxed">
                You have the right to review the information you have provided and ensure that any personal information or sensitive personal data or information found to be inaccurate or deficient be corrected or amended as feasible.
              </p>
            </section>

            {/* Section 8: Grievance Officer */}
            <section
              id="grievance-officer"
              data-section="grievance-officer"
              className="bg-zinc-800 rounded-lg shadow-md p-8 border border-zinc-700 scroll-mt-20"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-bold">
                  8
                </span>
                Grievance Officer
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                In accordance with the Information Technology Act, 2000, and Rules made thereunder, the
                name and contact details of the Grievance Officer are provided below:
              </p>

              <div className="bg-zinc-900 rounded-lg p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-indigo-900/50 rounded-full flex items-center justify-center shrink-0 border border-indigo-700">
                    <span className="text-indigo-400 font-bold text-lg">
                      {grievanceOfficer.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-white text-lg">{grievanceOfficer.name}</p>
                    <p className="text-sm text-indigo-300">Grievance Redressal Officer</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-indigo-500 shrink-0" />
                  <a
                    href={`mailto:${grievanceOfficer.email}`}
                    className="hover:text-indigo-400 transition-colors underline"
                  >
                    {grievanceOfficer.email}
                  </a>
                </div>

                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-5 h-5 text-indigo-500 shrink-0" />
                  <a
                    href={`tel:+91${grievanceOfficer.phone}`}
                    className="hover:text-indigo-400 transition-colors"
                  >
                    +91 {grievanceOfficer.phone}
                  </a>
                </div>

                <div className="flex items-start gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-indigo-500 shrink-0 mt-1" />
                  <div>
                    {grievanceOfficer.address.map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Section 9: Changes to Policy */}
            <section
              id="policy-changes"
              data-section="policy-changes"
              className="bg-zinc-900 rounded-lg shadow-md p-8 mb-8 scroll-mt-20"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-bold">
                  9
                </span>
                Changes to This Policy
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by
                posting the new Privacy Policy on this page.
              </p>
            </section>

             {/* Footer Note */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg shadow-lg p-8 text-center mt-10">
              <p className="text-lg font-semibold mb-2">
                 If you have any questions about this Privacy Policy, please contact our Grievance Officer.
              </p>
              <p className="text-indigo-200 text-sm">Last updated on {lastUpdated}</p>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;