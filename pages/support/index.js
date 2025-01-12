import { Mail } from 'lucide-react';
import { useState } from 'react';

const SupportPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        subject: '',
        message: ''
    });
    const [submitStatus, setSubmitStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus('sending');

        try {
            // Here you would typically send the data to your backend
            // For now, we'll just simulate sending an email
            await new Promise(resolve => setTimeout(resolve, 1000));
            window.location.href = `mailto:support@ajp.dev?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`;
            setSubmitStatus('success');
            setFormData({ email: '', subject: '', message: '' });
        } catch (error) {
            setSubmitStatus('error');
        }
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <div className="max-w-2xl mx-auto px-4 py-16 sm:px-6 sm:py-24">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                        Support
                    </h1>
                    <p className="mt-4 text-lg text-gray-400">
                        Need help? We're here to assist you.
                    </p>
                </div>

                <div className="mt-12 bg-gray-800 shadow-xl rounded-lg">
                    <div className="px-6 py-8">
                        <div className="flex items-center justify-center space-x-3">
                            <Mail className="h-6 w-6 text-gray-400" />
                            <span className="text-lg font-medium text-white">Contact Support</span>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    id="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    placeholder="What can we help you with?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    placeholder="Describe your issue or question..."
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={submitStatus === 'sending'}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
                                </button>
                            </div>
                        </form>

                        {submitStatus === 'success' && (
                            <div className="mt-4 text-sm text-green-400 text-center">
                                Message sent successfully!
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="mt-4 text-sm text-red-400 text-center">
                                There was an error sending your message. Please try again.
                            </div>
                        )}

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-400">
                                Alternatively, you can email us directly at:
                            </p>
                            <a
                                href="mailto:support@ajp.dev"
                                className="mt-2 inline-block text-blue-400 hover:text-blue-300"
                            >
                                support@ajp.dev
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupportPage;