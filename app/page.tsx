import VapiWidget from '@/components/VoiceAgent';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <VapiWidget 
        apiKey={process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || ''}
      />
    </div>
  );
}
