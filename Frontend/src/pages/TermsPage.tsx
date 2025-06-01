import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Terms and Conditions</h1>
        </div>

        {/* Terms content */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing and using Zoneout, you agree to be bound by these Terms and Conditions. 
              If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. User Accounts</h2>
            <p className="text-gray-600 leading-relaxed">
              You must be at least 13 years old to create an account. You are responsible for maintaining 
              the confidentiality of your account information and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Conduct</h2>
            <p className="text-gray-600 leading-relaxed">
              Users agree to:
            </p>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed ml-4 mt-2">
              <li>Provide accurate and truthful information</li>
              <li>Not engage in any illegal activities</li>
              <li>Not harass, abuse, or harm others</li>
              <li>Not post inappropriate or offensive content</li>
              <li>Respect the privacy and rights of other users</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Privacy and Data Protection</h2>
            <p className="text-gray-600 leading-relaxed">
              We collect and process your personal data in accordance with our Privacy Policy. 
              By using our service, you consent to such processing and warrant that all data 
              provided by you is accurate.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Content Guidelines</h2>
            <p className="text-gray-600 leading-relaxed">
              Users are responsible for the content they post. Content must not:
            </p>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed ml-4 mt-2">
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Contain harmful or malicious code</li>
              <li>Be spam or unauthorized advertising</li>
              <li>Be discriminatory or offensive</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Location Services</h2>
            <p className="text-gray-600 leading-relaxed">
              Our service uses location data to provide relevant features. By using our service, 
              you consent to the collection and use of your location data. You can control location 
              permissions through your device settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Modifications to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify these terms at any time. Users will be notified of 
              significant changes. Continued use of the service after changes constitutes acceptance 
              of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Termination</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to terminate or suspend accounts that violate these terms or 
              engage in inappropriate behavior. Users may terminate their accounts at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Information</h2>
            <p className="text-gray-600 leading-relaxed">
              For questions about these terms, please contact us at support@zoneout.com
            </p>
          </section>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage; 