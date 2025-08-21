import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, Clock, MapPin } from "lucide-react"
import { useState } from "react"

const Contact = () => {

    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [errors, setErrors] = useState<{ title?: string; message?: string }>({})

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const newErrors: typeof errors = {}
        if (!title.trim()) newErrors.title = "Title is required"
        if (!message.trim()) newErrors.message = "Message is required"

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        // ✅ Submit logic here (e.g. send to API)
        console.log("Sending:", { title, message })
        setErrors({})
    }

    return (
        <div className="min-h-screen bg-background-primary py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-12">
                    <p className="text-txt-blue font-medium mb-2">Contact us</p>
                    <h1 className="text-4xl font-bold text-txt-primary mb-4">Get in Touch with Our Team</h1>
                    <p className="text-txt-tertiary max-w-2xl">
                        We're here to answer your questions, discuss your project, and help you find the best solutions for your
                        software needs. Reach out to us, and let's start building something great together.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div>
                        <Card className="shadow-sm">
                            <CardContent className="p-8">
                                <h2 className="text-2xl font-semibold text-txt-primary mb-6">We’re Here to Support You</h2>

                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div>
                                        <Label htmlFor="title" className="text-sm font-medium text-txt-secondary">
                                            Title
                                        </Label>
                                        <Input
                                            id="title"
                                            type="text"
                                            placeholder="Enter your title"
                                            className="mt-1"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="message" className="text-sm font-medium text-txt-secondary">
                                            Message
                                        </Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Tell us how we can help"
                                            rows={4}
                                            className="mt-1"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                                    </div>

                                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 h-10">
                                        Send Email
                                    </Button>
                                </form>

                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Information & Map */}
                    <div className="space-y-8">
                        {/* Direct Contact */}
                        <Card className="shadow-sm">
                            <CardContent className="p-8">
                                <h3 className="text-xl font-semibold text-txt-primary mb-6">Prefer a Direct Approach?</h3>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Phone className="h-5 w-5 text-txt-blue" />
                                        <span className="text-txt-secondary">(+84) 728 829 110</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Mail className="h-5 w-5 text-txt-blue" />
                                        <span className="text-txt-secondary">smartcommerce@gmail.com</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Clock className="h-5 w-5 text-txt-blue" />
                                        <span className="text-txt-secondary">Monday to Friday, 9 AM - 6 PM </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Map Placeholder */}
                        <Card className="shadow-sm">
                            <CardContent className="p-0">
                                <div className="h-64 rounded-t-lg overflow-hidden">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.8026886778493!2d108.16738507490427!3d16.0757255846047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219b509a30cfb%3A0xb93a05e26b3b28ff!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2s!4v1755751310616!5m2!1svi!2s"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}

                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Google Map"
                                    ></iframe>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-txt-primary mb-4">Visit Our Office</h3>

                                    <div className="flex items-start gap-3 mb-4">
                                        <MapPin className="h-5 w-5 text-txt-blue mt-0.5" />
                                        <span className="text-txt-tertiary">137 Đường Nguyễn Thị Thập, Thanh Khê Tây, Liên Chiểu, Đà Nẵng, Việt Nam</span>
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
