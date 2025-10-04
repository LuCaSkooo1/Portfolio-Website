"use client"
import { Input } from "../components/ui/Input"
import { Textarea } from "../components/ui/TextArea"
import { Mail, Phone } from "lucide-react"
import { useTranslation } from "../lib/useTranslation"
import { motion, Variants } from "framer-motion"
import { useState, useEffect } from "react"
import emailjs from "@emailjs/browser"

export default function Contact() {
  const { t } = useTranslation()
  const [isLoaded, setIsLoaded] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle")

  useEffect(() => {
    setIsLoaded(true)
    emailjs.init("Ljy5wp2oPYZ5UvN5s")
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    message?: string
  }>({})

  const validateForm = () => {
    const newErrors: typeof errors = {}

    if (!formData.name.trim()) {
      newErrors.name = t("contact.error1")
    }

    if (!formData.email.trim()) {
      newErrors.email = t("contact.error2")
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("contact.error3")
    }

    if (!formData.message.trim()) {
      newErrors.message = t("contact.error4")
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t("contact.error5")
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: "lucasligas15@gmail.com",
      }

      await emailjs.send("service_pmn5yl8", "template_vntoitk", templateParams)

      setSubmitStatus("success")
      setFormData({ name: "", email: "", message: "" })

      setTimeout(() => setSubmitStatus("idle"), 3000)
    } catch (error) {
      console.error("Error sending email:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }
  const fadeInUp: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  if (!isLoaded) {
    return (
      <div className="hero">
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-3xl md:text-5xl mt-30 text-center font-extrabold">
            {t("contact.hero.title")}
          </h1>
          <p className="font-light mt-5 md:mt-10 w-[90%] text-center">
            {t("contact.hero.subtitle")}
          </p>
          <div className="w-[90%] lg:w-[30%] mt-10">
            <p className="flex flex-row gap-2">
              <Phone className="text-[#FFD287] dark:text-[#5e5e5e]" />
              +421 908 836 366
            </p>
            <p className="flex flex-row gap-2 mb-5 mt-2">
              <Mail className="text-[#FFD287] dark:text-[#5e5e5e]" />
              lucasligas15@gmail.com
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="hero">
        <motion.div
          className="w-full flex flex-col justify-center items-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            className="text-3xl md:text-5xl mt-30 text-center font-extrabold"
            variants={fadeInUp}
          >
            {t("contact.hero.title")}
          </motion.h1>

          <motion.p
            className="font-light mt-5 md:mt-10 w-[90%] text-center"
            variants={fadeInUp}
          >
            {t("contact.hero.subtitle")}
          </motion.p>

          <motion.div
            className="w-[90%] lg:w-[30%] mt-10 flex flex-col md:flex-row md:items-center md:justify-center gap-5 mb-5"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <motion.p className="flex flex-row gap-2" variants={fadeInUp}>
              <Phone className="text-[#FFD287] dark:text-[#5e5e5e]" />
              +421 908 836 366
            </motion.p>

            <motion.p
              className="flex flex-row gap-2"
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
            >
              <Mail className="text-[#FFD287] dark:text-[#5e5e5e]" />
              lucasligas15@gmail.com
            </motion.p>
          </motion.div>

          <motion.form
            className="w-[90%] lg:w-[30%]"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
          >
            {/* Full name */}
            <motion.div variants={fadeInUp} transition={{ delay: 0.4 }}>
              <label htmlFor="name" className="text-sm font-grotesk">
                {t("contact.input1")}
              </label>
              <Input
                id="name"
                type="text"
                placeholder={t("contact.labelName")}
                className={`rounded-xl p-5 bg-white mb-1 font-grotesk ${
                  errors.name ? "border-red-500" : ""
                }`}
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mb-2">{errors.name}</p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div variants={fadeInUp} transition={{ delay: 0.5 }}>
              <label htmlFor="email" className="text-sm font-grotesk">
                E-mail
              </label>
              <Input
                id="email"
                type="email"
                placeholder={t("contact.labelEmail")}
                className={`rounded-xl p-5 bg-white mb-1 font-grotesk ${
                  errors.email ? "border-red-500" : ""
                }`}
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mb-2">{errors.email}</p>
              )}
            </motion.div>

            {/* Message */}
            <motion.div variants={fadeInUp} transition={{ delay: 0.6 }}>
              <label htmlFor="message" className="text-sm font-grotesk">
                {t("contact.input2")}
              </label>
              <Textarea
                id="message"
                className={`bg-white rounded-xl resize-none overflow-auto mb-1 font-grotesk ${
                  errors.message ? "border-red-500" : ""
                }`}
                placeholder={t("contact.labelMessage")}
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
              />
              {errors.message && (
                <p className="text-red-500 text-xs mb-2">{errors.message}</p>
              )}
            </motion.div>

            {/* Success + Error states */}
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-green-100 text-green-800 rounded-xl text-sm"
              >
                Message sent successfully!
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-100 text-red-800 rounded-xl text-sm"
              >
                Failed to send message. Please try again.
              </motion.div>
            )}

            {/* Submit button */}
            <motion.button
              type="submit"
              className="mt-5 full bg-[#FFD287] dark:bg-[#494949] text-white font-grotesk w-full p-2 rounded-xl active:bg-[#e6b96b] dark:active:bg-[#5e5e5e] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              variants={fadeInUp}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : t("contact.submit")}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </div>
  )
}
