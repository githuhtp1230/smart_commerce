import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, Clock, MapPin } from "lucide-react"
import { useState } from "react"
import { sendEmailContact } from "@/services/me.service"
import { toastSuccess, toastError } from "@/components/common/sonner"
import CustomInput from "@/components/common/input/CustomInput"
import { useTranslation } from "react-i18next"

const Contact = () => {
    const { t } = useTranslation()
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [errors, setErrors] = useState<{ title?: string; message?: string }>({})
    const [loading, setLoading] = useState(false)
    // const [success, setSuccess] = useState<string>("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const newErrors: typeof errors = {}
        if (!title.trim()) newErrors.title = t("contact.title_required")
        if (!message.trim()) newErrors.message = t("contact.message_required")

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setLoading(true)
        setErrors({})
        try {
            await sendEmailContact({ title, message })
            toastSuccess(t("contact.send_success"))
            setTitle("")
            setMessage("")
        } catch (err) {
            console.error("Send email error:", err)
            toastError(t("contact.send_error"))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background-primary py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-12">
                    <p className="text-txt-blue font-medium mb-2">{t("contact.contact_us")}</p>
                    <h1 className="text-4xl font-bold text-txt-primary mb-4">{t("contact.get_in_touch")}</h1>
                    <p className="text-txt-tertiary max-w-2xl">{t("contact.intro")}</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div>
                        <Card className="shadow-sm">
                            <CardContent className="p-8">
                                <h2 className="text-2xl font-semibold text-txt-primary mb-6">
                                    {t("contact.support_you")}
                                </h2>

                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div className="flex flex-col gap-1">
                                        <Label htmlFor="title" className="text-sm font-medium text-txt-secondary">
                                            {t("contact.title")}
                                        </Label>
                                        <CustomInput
                                            id="title"
                                            type="text"
                                            placeholder={t("contact.enter_title")}
                                            className="h-10 text-sm"
                                            containerClassName={"min-h-[42px]" + (errors.title ? " border-icon-system-danger" : "")}
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            hasError={!!errors.title}
                                        />
                                        <div className="min-h-[20px]">
                                            {errors.title && <p className="text-red-500 text-xs mt-0.5">{errors.title}</p>}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <Label htmlFor="message" className="text-sm font-medium text-txt-secondary">
                                            {t("contact.message")}
                                        </Label>
                                        <Textarea
                                            id="message"
                                            placeholder={t("contact.tell_us_help")}
                                            rows={4}
                                            className={
                                                "mt-1 h-24 text-sm px-2 py-2 min-h-[42px]" +
                                                (errors.message
                                                    ? " border border-icon-system-danger focus:border-icon-system-danger focus:ring-0"
                                                    : " border border-border-primary focus:border-blue-400 focus:ring-0")
                                            }
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                        <div className="min-h-[20px]">
                                            {errors.message && <p className="text-red-500 text-xs mt-0.5">{errors.message}</p>}
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 h-10"
                                        disabled={loading}
                                    >
                                        {loading ? t("contact.sending") : t("contact.send_email")}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Information & Map */}
                    <div className="space-y-8">
                        <Card className="shadow-sm">
                            <CardContent className="p-8">
                                <h3 className="text-xl font-semibold text-txt-primary mb-6">{t("contact.prefer_direct")}</h3>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Phone className="h-5 w-5 text-txt-blue" />
                                        <span className="text-txt-secondary">{t("contact.phone")}</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Mail className="h-5 w-5 text-txt-blue" />
                                        <span className="text-txt-secondary">{t("contact.email")}</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Clock className="h-5 w-5 text-txt-blue" />
                                        <span className="text-txt-secondary">{t("contact.work_time")}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-sm">
                            <CardContent className="p-0">
                                <div className="h-64 rounded-t-lg overflow-hidden">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.8026886778493!2d108.16738507490427!3d16.0757255846047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219b509a30cfb%3A0xb93a05e26b3b28ff!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2s!4v1755751310616!5m2!1svi!2s"
                                        width="100%" height="100%" style={{ border: 0 }} loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade" title="Google Map" >
                                    </iframe>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-txt-primary mb-4">{t("contact.visit_office")}</h3>
                                    <div className="flex items-start gap-3 mb-4">
                                        <MapPin className="h-5 w-5 text-txt-blue mt-0.5" />
                                        <span className="text-txt-tertiary">{t("contact.address")}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
