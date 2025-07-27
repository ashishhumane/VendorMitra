// components/StatusPopup.jsx
import { motion, AnimatePresence } from 'framer-motion';

export default function StatusPopup({status}) {
  const bgColor = {
    200: 'bg-green-500',
    500: 'bg-red-500',
    401: 'bg-blue-500',
    400: 'bg-yellow-500',
  }[status && status.status] || 'bg-gray-700';

  return (
    <AnimatePresence>
      {status && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 20, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-md text-white shadow-lg ${bgColor}`}
        >
          {status.data.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
