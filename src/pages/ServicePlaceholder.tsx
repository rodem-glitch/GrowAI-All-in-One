import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

interface ServicePlaceholderProps {
  code: string;
  name: string;
  desc: string;
}

export default function ServicePlaceholder({ code, name, desc }: ServicePlaceholderProps) {
  const { colors } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center px-6 dark:bg-[#0f1112]">
      <div className="text-center max-w-lg">
        <span
          className="inline-block text-2xl font-bold px-6 py-3 rounded-xl text-white mb-6"
          style={{ backgroundColor: colors.primary }}
        >
          {code}
        </span>
        <h1 className="text-4xl font-bold text-[#242727] dark:text-white">{name}</h1>
        <p className="text-lg text-[#555c5d] dark:text-gray-400 mt-3">{desc}</p>
        <div className="mt-8 inline-block px-6 py-3 rounded-lg border-2 text-[#555c5d] dark:text-gray-400 border-[#d7dadb] dark:border-gray-700">
          Coming Soon
        </div>
        <div className="mt-8">
          <Link
            to="/"
            className="text-sm font-medium hover:underline"
            style={{ color: colors.primary }}
          >
            ← Back to Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
