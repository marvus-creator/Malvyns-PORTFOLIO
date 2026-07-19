import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Check } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:andagijimana2020@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset form after success animation
      setTimeout(() => {
        setName('');
        setEmail('');
        setMessage('');
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-lg bg-[#0C0C0C] border-2 border-[#D7E2EA] rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 md:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.9)] z-10 overflow-hidden text-[#D7E2EA] font-sans"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full border border-[#D7E2EA]/20 hover:bg-[#D7E2EA]/10 transition-colors text-[#D7E2EA] cursor-pointer z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#D7E2EA] opacity-60">
                      Get In Touch
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mt-1">
                      Let&apos;s build together
                    </h3>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs uppercase tracking-wider font-medium opacity-70">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#151515] border border-[#D7E2EA]/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#B600A8] focus:ring-1 focus:ring-[#B600A8] transition-all"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs uppercase tracking-wider font-medium opacity-70">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#151515] border border-[#D7E2EA]/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#B600A8] focus:ring-1 focus:ring-[#B600A8] transition-all"
                        placeholder="jack@example.com"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs uppercase tracking-wider font-medium opacity-70">
                        Message
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-[#151515] border border-[#D7E2EA]/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#B600A8] focus:ring-1 focus:ring-[#B600A8] transition-all resize-none"
                        placeholder="Tell me about your project or idea..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-2 relative rounded-full font-medium uppercase tracking-widest text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer py-3.5 sm:py-4 text-xs sm:text-sm flex items-center justify-center gap-2"
                      style={{
                        background:
                          'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                        boxShadow:
                          '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
                        outline: '2px solid white',
                        outlineOffset: '-3px',
                      }}
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center py-12 text-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/15 border-2 border-green-500 flex items-center justify-center text-green-400 mb-2">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight">
                    Message Sent!
                  </h3>
                  <p className="text-sm opacity-70 max-w-[280px]">
                    Thank you for reaching out, Malvyn will get back to you as soon as possible.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
