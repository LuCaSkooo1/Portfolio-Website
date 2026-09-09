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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  }

  const inputClass = `rounded-md p-5 h-11 font-mono bg-white/60 dark:bg-black/60 border-[#00d97e]/40 dark:border-[#00ff88]/30 text-foreground focus-visible:border-[#00d97e] dark:focus-visible:border-[#00ff88] focus-visible:ring-[#00d97e]/20 dark:focus-visible:ring-[#00ff88]/20`

  const title = t("contact.hero.title") ?? "$ cat contact.md"
  const subtitle = t("contact.hero.subtitle") ?? ""

  if (!isLoaded) {
    return (
      <div className="hero">
        <div className="w-full flex flex-col justify-center items-center px-5">
          <h1 className="text-2xl md:text-4xl mt-32 text-center font-bold font-mono text-cyber">
            {title}
          </h1>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="hero">
        <motion.div
          className="w-full flex flex-col justify-center items-center px-5 pb-16"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            className="text-2xl md:text-4xl mt-32 text-center font-bold font-mono text-cyber w-full max-w-4xl"
            variants={fadeInUp}
          >
            {title}
            <span className="caret-inline" />
          </motion.h1>

          <motion.p
            className="font-mono text-sm md:text-base mt-4 text-center text-foreground2/80 opacity-90"
            variants={fadeInUp}
          >
            {subtitle}
          </motion.p>

          {/* Contact info block — styled as terminal readout */}
          <motion.div
            className="w-full max-w-lg mt-10 rounded-md border border-[#00d97e]/40 dark:border-[#00ff88]/30 bg-white/60 dark:bg-black/60 backdrop-blur-sm p-4 md:p-5 font-mono text-sm md:text-base"
            variants={fadeInUp}
          >
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-cyber shrink-0" />
                <span className="text-cyber min-w-[70px]">phone</span>
                <span className="opacity-50">:</span>
                <a
                  href="tel:+421908836366"
                  className="text-foreground hover:text-cyber transition-colors break-all"
                >
                  +421 908 836 366
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-cyber shrink-0" />
                <span className="text-cyber min-w-[70px]">email</span>
                <span className="opacity-50">:</span>
                <a
                  href="mailto:lucasligas15@gmail.com"
                  className="text-foreground hover:text-cyber transition-colors break-all"
                >
                  lucasligas15@gmail.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form — styled as terminal-inspired inputs */}
          <motion.form
            className="w-full max-w-lg mt-8 font-mono"
            variants={fadeInUp}
            onSubmit={handleSubmit}
          >
            <motion.div variants={fadeInUp}>
              <label
                htmlFor="name"
                className="text-sm text-cyber flex items-center gap-2"
              >
                <span className="opacity-60">&gt;</span>
                {t("contact.input1")}
              </label>
              <Input
                id="name"
                type="text"
                placeholder={t("contact.labelName")}
                className={`${inputClass} mb-1 ${
                  errors.name ? "border-red-500" : ""
                }`}
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && (
                <p className="text-red-400 text-xs mb-2">{errors.name}</p>
              )}
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-3">
              <label
                htmlFor="email"
                className="text-sm text-cyber flex items-center gap-2"
              >
                <span className="opacity-60">&gt;</span>
                email
              </label>
              <Input
                id="email"
                type="email"
                placeholder={t("contact.labelEmail")}
                className={`${inputClass} mb-1 ${
                  errors.email ? "border-red-500" : ""
                }`}
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mb-2">{errors.email}</p>
              )}
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-3">
              <label
                htmlFor="message"
                className="text-sm text-cyber flex items-center gap-2"
              >
                <span className="opacity-60">&gt;</span>
                {t("contact.input2")}
              </label>
              <Textarea
                id="message"
                className={`${inputClass} rounded-md resize-none overflow-auto mb-1 h-auto ${
                  errors.message ? "border-red-500" : ""
                }`}
                placeholder={t("contact.labelMessage")}
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
              />
              {errors.message && (
                <p className="text-red-400 text-xs mb-2">{errors.message}</p>
              )}
            </motion.div>

            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 border border-[#00d97e]/50 bg-[#00d97e]/10 text-cyber rounded-md text-sm"
              >
                [ OK ] message delivered.
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 border border-red-500/50 bg-red-500/10 text-red-400 rounded-md text-sm"
              >
                [ FAIL ] delivery failed. try again.
              </motion.div>
            )}

            <motion.button
              type="submit"
              className="mt-6 bg-[#00d97e] hover:bg-[#00c26f] dark:bg-black dark:hover:bg-[#00ff88]/10 dark:border dark:border-[#00ff88] dark:text-[#00ff88] text-black font-mono w-full p-3 rounded-md active:bg-[#00b364] dark:active:bg-[#00ff88]/20 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              variants={fadeInUp}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "sending..." : t("contact.submit")}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </div>
  )
}
