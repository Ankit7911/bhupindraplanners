import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';

const testimonials = [
  {
    name: "RAJDEEP SHARMA",
    role: "Client",
    text: "They offer exceptional services, with their flexibility being a particular highlight. They are able to customize their offerings to suit individual requirements. My experience working with Ankit Pathak has been extraordinary, and I would highly recommend his professional services to everyone.",
    rating: 5,
  },
  {
    name: "Ambika Pipersenia",
    role: "Client",
    text: "I've had a wonderful experience with Bhupindra Planners. Their design team is truly one of the best I've come across. They understood exactly what I was hoping for my home—plenty of natural light and comfort—and delivered right on time. They are extremely professional, respectful, and pay attention to even the smallest preferences. I highly recommend them for thoughtful and creative design work.",
    rating: 5,
  },
  {
    name: "Japanjot Singh",
    role: "Client",
    text: "Er.Ankit Pathak and team shows an exceptional blend of creativity, professionalism, and genuine care. Their vision is thoughtful, beautifully crafted design that exceeds expectations, their dedication and the heart they put into their work is exceptional,If you're lookingfor a team that treats your project as if it were their own, BHUPINDRA PLANNERS is an outstanding choice.",
    rating: 5,
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto bg-white/50 rounded-3xl my-16 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Client Stories</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Don't just take our word for it. Here's what our clients have to say about working with Bhupindra Planners.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {testimonials.map((testimonial, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative h-full flex flex-col"
          >
            <Quote className="absolute top-6 right-6 w-8 h-8 text-gray-200" />
            <div className="flex gap-1 mb-6">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-700 mb-8 leading-relaxed italic whitespace-pre-line flex-grow">"{testimonial.text}"</p>
            <div className="mt-auto">
              <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
