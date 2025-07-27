import { motion } from 'framer-motion';
export default function TestimonialsCard(){

    const testimonials = [
  {
    text: '“VendorMitra ne humare group ko ek saath la diya! Ab hum sab milke sasta samaan kharidte hain aur tension free hain.”',
    name: '👨‍🍳 Ramesh Bhai, Vada Pav Stall',
  },
  {
    text: '“Payment aur delivery sab kuch app mein dikh jata hai. Bahut easy aur transparent hai!”',
    name: '👩‍🍳 Sunita Didi, Chai Tapri',
  },
  {
    text: '“Ab delivery time par milta hai, aur supplier bhi verified hai. Tension khatam!”',
    name: '👨‍🍳 Dinesh Bhai, Dosa Corner',
  },
];


return(

<section className="relative mb-20 mt-20 overflow-hidden w-full">
  <h3 className="text-2xl font-extrabold text-center text-orange-700 mb-8 ">
    What Our Vendors Say
  </h3>

  <div className="overflow-hidden">
    <motion.div
      className="flex gap-6"
      style={{ width: '200%' }} // make this container extra wide
      animate={{ x: ['0%', '-50%'] }}
      transition={{
        repeat: Infinity,
        duration: 30,
        ease: 'linear',
      }}
    >
      {[...testimonials, ...testimonials].map((t, i) => (
        <div
          key={i}
          className="inline-block min-w-[18rem] max-w-sm bg-white p-4 rounded-xl shadow border border-orange-200"
        >
          <p className="text-orange-800 italic break-words">{t.text}</p>
          <p className="mt-3 font-bold text-orange-700 text-sm">{t.name}</p>
        </div>
      ))}
    </motion.div>
  </div>
</section>
);
};