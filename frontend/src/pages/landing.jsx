import '../assets/streetfood-theme.css';
import TestimonialsCard from '../components/testimonials.jsx';

import { motion } from 'framer-motion';

import marketimage from '../assets/marketimage.jpg'
import { Link } from 'react-router-dom';

export default function Home() {
  const MotionLink = motion.create(Link);
  return (
    <div className="min-h-screen w-full  streetfood-bg p-6">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="streetfood-navbar mb-12"
      >
        <h1 className="streetfood-title">VendorMitra</h1>
        <nav>
          <MotionLink
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            to='/login'
            className="streetfood-btn mr-2"
          >
            Login
          </MotionLink>
          <MotionLink
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            to='/signup'
            className="streetfood-btn"
          >
            Get Started
          </MotionLink>
        </nav>
      </motion.header>

      {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-10 items-center mb-20 ml-20 mt-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
         <h2 className="text-4xl font-extrabold text-orange-700 mb-4">
  Empowering Street Vendors with Smart Buying and Stronger  Networks
</h2>
<p className="mt-9 text-lg text-orange-800">
  Collaborate with fellow vendors, place bulk orders, and connect with trusted suppliers — all through a single, easy-to-use platform. <br />
  <span className="font-bold">Save more, grow faster, and be part of a united vendor community!</span>
</p>
          <motion.div
            className="mt-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/signup" className="streetfood-btn">Join the Community</Link>
          </motion.div>
        </motion.div>
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <img
            src={marketimage}
            alt="Street Food Market"
            className="rounded-xl shadow-xl border-4 border-orange-200 w-500 max-w-md"
          />
        </motion.div>
      </section>

      {/* Statistics Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-20 mt-[65px]"
      >
        <h3 className="text-2xl font-extrabold text-center text-orange-700 mb-8">Our Impact in Numbers</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <motion.div
            className="streetfood-card text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-4xl mb-2">👨‍👩‍👧‍👦</span>
            <div className="text-3xl font-bold text-orange-700">2,500+</div>
            <div className="text-orange-800">Happy Vendors</div>
          </motion.div>
          <motion.div
            className="streetfood-card text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-4xl mb-2">💰</span>
            <div className="text-3xl font-bold text-orange-700">₹50L+</div>
            <div className="text-orange-800">Total Savings</div>
          </motion.div>
          <motion.div
            className="streetfood-card text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-4xl mb-2">🏪</span>
            <div className="text-3xl font-bold text-orange-700">500+</div>
            <div className="text-orange-800">Trusted Suppliers</div>
          </motion.div>
          <motion.div
            className="streetfood-card text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-4xl mb-2">📦</span>
            <div className="text-3xl font-bold text-orange-700">10K+</div>
            <div className="text-orange-800">Orders Delivered</div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-20 mt-30"
      >
        <h3 className="text-3xl font-extrabold text-center text-orange-700 mb-10">Why VendorMitra?</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            className="streetfood-card text-center flex flex-col items-center"
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-5xl mb-2">🥙</span>
            <h4 className="text-xl font-bold text-orange-700 mb-2">Sajha Thali</h4>
            <p className="text-orange-800">Group up with local vendors for bulk savings—just like sharing a plate of chaat!</p>
          </motion.div>
          <motion.div
            className="streetfood-card text-center flex flex-col items-center"
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-5xl mb-2">🍵</span>
            <h4 className="text-xl font-bold text-orange-700 mb-2">Trusted Bhaiyas & Didis</h4>
            <p className="text-orange-800">Choose from verified, rated suppliers—just like picking your favorite chaiwala!</p>
          </motion.div>
          <motion.div
            className="streetfood-card text-center flex flex-col items-center"
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-5xl mb-2">🍛</span>
            <h4 className="text-xl font-bold text-orange-700 mb-2">Zyada Bachat, Zyada Maza</h4>
            <p className="text-orange-800">Save more on every order and enjoy the extra maza of smooth, transparent group buying!</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <h3 className="text-2xl font-extrabold text-center text-orange-700 mb-8">Benefits for Street Food Vendors</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            className="streetfood-card"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="font-bold text-orange-700 mb-3 text-lg">💰 Save Money</h4>
            <ul className="text-orange-800 space-y-2">
              <li>• Bulk discounts up to 30%</li>
              <li>• No middleman commission</li>
              <li>• Transparent pricing</li>
              <li>• Group buying power</li>
            </ul>
          </motion.div>
          <motion.div
            className="streetfood-card"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="font-bold text-orange-700 mb-3 text-lg">⏰ Save Time</h4>
            <ul className="text-orange-800 space-y-2">
              <li>• One-click ordering</li>
              <li>• Automated payments</li>
              <li>• Real-time tracking</li>
              <li>• Group coordination</li>
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <TestimonialsCard />
      </motion.div>

      {/* Mission */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-20 max-w-4xl mx-auto text-center"
      >
        <h3 className="text-2xl font-extrabold text-orange-700 mb-4">Our Mission</h3>
        <p className="text-lg text-orange-800">
          At <span className="font-bold">VendorMitra</span>, our goal is simple:
          <br />To support street vendors with smart tools, trusted suppliers, and the power of community buying.
          <br />We believe in <span className="text-orange-600 font-semibold">"Sath milke kharido, sath milke badho."</span>
        </p>
      </motion.section>

      {/* How it works - New Design */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <h3 className="text-3xl font-extrabold text-center text-orange-700 mb-12">How VendorMitra Works</h3>

        {/* Step 1 */}
        <motion.div
          className="flex flex-col md:flex-row items-center mb-16"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="md:w-1/2 mb-6 md:mb-0">
            <div className="streetfood-card p-8">
              <div className="flex items-center mb-4">
                <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-4">1</div>
                <h4 className="text-2xl font-bold text-orange-700">Join Your Local Group</h4>
              </div>
              <p className="text-orange-800 text-lg mb-4">
                Find vendors in your area or create a new group. Connect with fellow street food vendors who share your location and buying needs.
              </p>
              <ul className="text-orange-700 space-y-2">
                <li>• Search by your area/locality</li>
                <li>• Join existing groups or start new ones</li>
                <li>• Connect with 5-15 vendors nearby</li>
              </ul>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="text-8xl">👥</div>
          </div>
        </motion.div>

        {/* Step 2 */}
        <motion.div
          className="flex flex-col md:flex-row-reverse items-center mb-16"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="md:w-1/2 mb-6 md:mb-0">
            <div className="streetfood-card p-8">
              <div className="flex items-center mb-4">
                <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-4">2</div>
                <h4 className="text-2xl font-bold text-orange-700">Place Your Daily Order</h4>
              </div>
              <p className="text-orange-800 text-lg mb-4">
                Select your required items from the shared catalog. Add quantities and let the system combine orders for maximum savings.
              </p>
              <ul className="text-orange-700 space-y-2">
                <li>• Choose from 100+ items (oil, veggies, masalas)</li>
                <li>• Set your quantities and preferences</li>
                <li>• Orders automatically combine for bulk discounts</li>
              </ul>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="text-8xl">🛒</div>
          </div>
        </motion.div>

        {/* Step 3 */}
        <motion.div
          className="flex flex-col md:flex-row items-center mb-16"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="md:w-1/2 mb-6 md:mb-0">
            <div className="streetfood-card p-8">
              <div className="flex items-center mb-4">
                <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-4">3</div>
                <h4 className="text-2xl font-bold text-orange-700">Pay & Track Securely</h4>
              </div>
              <p className="text-orange-800 text-lg mb-4">
                Pay your share via UPI, wallet, or in-app payment. Track the entire process from order to delivery in real-time.
              </p>
              <ul className="text-orange-700 space-y-2">
                <li>• Multiple payment options (UPI, Paytm, GPay)</li>
                <li>• Real-time payment tracking</li>
                <li>• Transparent bill splitting</li>
              </ul>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="text-8xl">💳</div>
          </div>
        </motion.div>

        {/* Step 4 */}
        <motion.div
          className="flex flex-col md:flex-row-reverse items-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="md:w-1/2 mb-6 md:mb-0">
            <div className="streetfood-card p-8">
              <div className="flex items-center mb-4">
                <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-4">4</div>
                <h4 className="text-2xl font-bold text-orange-700">Collect & Enjoy Savings</h4>
              </div>
              <p className="text-orange-800 text-lg mb-4">
                Your group delivery arrives at a shared location. Collect your share and enjoy fresh supplies with big savings!
              </p>
              <ul className="text-orange-700 space-y-2">
                <li>• Fresh supplies delivered to your area</li>
                <li>• Save 20-30% on every order</li>
                <li>• No more solo buying stress</li>
              </ul>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="text-8xl">🎉</div>
          </div>
        </motion.div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <h3 className="text-2xl font-extrabold text-center text-orange-700 mb-8">Frequently Asked Questions</h3>
        <div className="max-w-3xl mx-auto space-y-4">
          <motion.div
            className="streetfood-card"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="font-bold text-orange-700 mb-2">Is VendorMitra free to use?</h4>
            <p className="text-orange-800">Yes! Joining and using VendorMitra is completely free for vendors. We only charge a small commission on successful orders.</p>
          </motion.div>

          <motion.div
            className="streetfood-card"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="font-bold text-orange-700 mb-2">How do I join a group?</h4>
            <p className="text-orange-800">Just sign up and search for your area. You can join an existing group or create a new one with other vendors in your locality!</p>
          </motion.div>

          <motion.div
            className="streetfood-card"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="font-bold text-orange-700 mb-2">What if I have a problem with my order?</h4>
            <p className="text-orange-800">You can report issues directly in the app, and our support team or group leader will help resolve it quickly. We have a 24/7 support system.</p>
          </motion.div>

          <motion.div
            className="streetfood-card"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="font-bold text-orange-700 mb-2">Which languages do you support?</h4>
            <p className="text-orange-800">We support Hindi, Marathi, Bengali, and English. Our app is designed to be simple and accessible for everyone!</p>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <div className="streetfood-card bg-gradient-to-r from-orange-100 to-pink-100 p-8 text-center">
          <h2 className="text-3xl font-extrabold text-orange-700 mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-orange-800 mb-6">
            Join thousands of vendors who are already saving money and growing their businesses with VendorMitra!
          </p>
          <motion.div
            className="flex flex-col md:flex-row gap-4 justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="/signup" className="streetfood-btn">Join as Vendor</a>
            <a href="/supplier-signup" className="streetfood-btn bg-green-500 hover:bg-green-600">Register as Supplier</a>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-24 text-center text-sm text-orange-700 font-semibold"
      >
        &copy; {new Date().getFullYear()} VendorMitra. Khushiyon ki Guarantee, Street Food ki Masti!
      </motion.footer>
    </div>
  );
}
