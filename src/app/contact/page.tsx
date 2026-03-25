export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
      <div className="relative max-w-xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Contact Us</h2>
          <p className="mt-4 text-lg leading-6 text-gray-500">
            Have questions about your order, our products, or need styling advice? Reach out to the Visionary Optics team.
          </p>
        </div>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div className="sm:col-span-2">
              <h3 className="text-lg font-medium text-gray-900">Email</h3>
              <p className="mt-1 text-gray-600">support@visionaryoptics.in</p>
            </div>
            <div className="sm:col-span-2">
              <h3 className="text-lg font-medium text-gray-900">Phone</h3>
              <p className="mt-1 text-gray-600">+91 98765 43210</p>
            </div>
            <div className="sm:col-span-2">
              <h3 className="text-lg font-medium text-gray-900">Operating Address</h3>
              <p className="mt-1 text-gray-600">
                123 Visionary Street, Optics Hub<br />
                Mumbai, Maharashtra, 400001<br />
                India
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
