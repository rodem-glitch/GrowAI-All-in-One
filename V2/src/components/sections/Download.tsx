"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardContent } from "@/components/ui/card";

const platforms = [
  {
    name: "macOS",
    size: "334 MB",
    icon: (
      <svg
        className="w-12 h-12 mx-auto"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
      </svg>
    ),
  },
  {
    name: "Windows",
    size: "417 MB",
    icon: (
      <svg
        className="w-12 h-12 mx-auto"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
      </svg>
    ),
  },
  {
    name: "Linux",
    size: "258 MB",
    icon: (
      <svg
        className="w-12 h-12 mx-auto"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M12.504 0c-.155 0-.315.008-.48.021C7.309.332 3.926 3.694 3.926 8.138c0 1.53.427 2.98 1.26 4.312-.234 1.041-.292 2.09-.116 3.09.416 2.386 1.657 3.798 2.855 4.9.463.42.926.822 1.352 1.224.212.195.39.403.512.61.12.206.17.413.111.614-.17.6-.615 1.013-1.02 1.376-.527.47-1.03.886-1.15 1.48-.127.614.123 1.3.783 2.054C9.017 28.378 10.47 29 12 29c1.53 0 2.983-.622 4.04-1.741.66-.754.91-1.44.784-2.055-.12-.593-.623-1.009-1.151-1.48-.404-.362-.85-.775-1.02-1.375-.058-.2-.008-.408.112-.614.122-.207.3-.415.512-.61.426-.402.89-.803 1.352-1.224 1.198-1.102 2.44-2.514 2.855-4.9.176-1 .118-2.049-.116-3.09.833-1.332 1.26-2.782 1.26-4.312 0-4.444-3.383-7.806-8.098-8.117A7.539 7.539 0 0012.504 0zm.027 1.557c.077 0 .153.003.23.008 4.1.27 7.045 3.163 7.045 6.573 0 1.39-.41 2.703-1.219 3.908l-.148.22.065.257c.222.88.295 1.832.12 2.784-.348 1.992-1.422 3.218-2.58 4.283-.463.426-.93.833-1.39 1.26-.295.272-.556.571-.733.9-.179.33-.268.705-.168 1.07.253.902.78 1.4 1.26 1.824.443.393.858.744.944 1.148.083.4-.097.898-.618 1.47-.816.933-1.96 1.46-3.14 1.46-1.18 0-2.324-.527-3.14-1.46-.52-.572-.7-1.07-.617-1.47.086-.404.5-.755.944-1.148.48-.424 1.007-.922 1.26-1.824.1-.365.01-.74-.168-1.07-.177-.329-.438-.628-.733-.9-.46-.427-.927-.834-1.39-1.26-1.158-1.065-2.232-2.29-2.58-4.283-.175-.952-.102-1.904.12-2.784l.065-.257-.148-.22C5.91 11.833 5.5 10.52 5.5 9.13c0-3.41 2.945-6.303 7.045-6.573a5.98 5.98 0 01.986 0l-.001.001zm-2.62 3.967c-.376 0-.727.11-.977.345-.33.308-.456.79-.456 1.456 0 .63.15 1.056.413 1.37.264.315.636.48 1.042.48.386 0 .729-.12.987-.348.258-.23.415-.568.415-1.003v-.066c.025-.487-.1-.92-.37-1.252-.27-.33-.647-.482-1.054-.982zm5.235 0c-.407.5-.785.652-1.054.982-.27.333-.395.765-.37 1.252v.066c0 .435.157.772.415 1.003.258.228.6.348.987.348.406 0 .778-.165 1.042-.48.264-.314.413-.74.413-1.37 0-.666-.126-1.148-.456-1.456-.25-.234-.6-.345-.977-.345zm-2.617 1.29c.152 0 .304.057.418.163.113.106.18.254.18.413 0 .158-.067.306-.18.412-.114.107-.266.163-.418.163-.153 0-.305-.056-.418-.163-.114-.106-.18-.254-.18-.412 0-.159.066-.307.18-.413.113-.106.265-.163.418-.163zm5.234 0c.153 0 .305.057.418.163.114.106.18.254.18.413 0 .158-.066.306-.18.412-.113.107-.265.163-.418.163-.152 0-.304-.056-.418-.163-.113-.106-.18-.254-.18-.412 0-.159.067-.307.18-.413.114-.106.266-.163.418-.163z" />
      </svg>
    ),
  },
];

export default function Download() {
  const { t } = useLanguage();
  const { colors } = useTheme();

  return (
    <section className="py-24 px-6 bg-[#fbfbfb] dark:bg-gray-900">
      <div className="max-w-[800px] mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#242727] dark:text-white">
          {t.download.title}
        </h2>
        <p className="text-sm text-[#555c5d] dark:text-gray-400 mt-2">{t.download.version}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {platforms.map((platform) => (
            <Card
              key={platform.name}
              className="rounded-2xl border-[#d7dadb] dark:border-gray-700 hover:shadow-lg transition-shadow p-0"
            >
              <CardContent className="p-8 text-center">
                <div className="text-[#242727] dark:text-white">{platform.icon}</div>
                <p className="text-xl font-semibold text-[#242727] dark:text-white mt-4">
                  {platform.name}
                </p>
                <p className="text-sm text-[#555c5d] dark:text-gray-400 mt-1">{platform.size}</p>
                <a
                  href="#"
                  className="mt-4 text-white px-6 py-2.5 rounded-lg font-medium inline-block transition-colors"
                  style={{ backgroundColor: colors.primary }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.primaryDark)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.primary)}
                >
                  {t.download.downloadBtn}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-sm text-[#555c5d] dark:text-gray-400 mt-8">
          {t.download.requirements}
        </p>
      </div>
    </section>
  );
}
