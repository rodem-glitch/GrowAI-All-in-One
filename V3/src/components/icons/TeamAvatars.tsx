/**
 * 단정한 비즈니스 인물 프로필 아바타
 */
import { useTheme } from "@/contexts/ThemeContext";

function Avatar({ initial, bg }: { initial: string; bg: string }) {
  const { colors } = useTheme();
  return (
    <div
      className="w-full h-full rounded-full flex items-center justify-center text-2xl font-bold text-white"
      style={{ backgroundColor: bg || colors.primary }}
    >
      {initial}
    </div>
  );
}

export function AvatarEntion() {
  return <Avatar initial="E" bg="#1e3a5f" />;
}

export function AvatarElliot() {
  return <Avatar initial="E" bg="#2563eb" />;
}

export function AvatarRodem() {
  return <Avatar initial="R" bg="#7c3aed" />;
}

export function AvatarScarlet() {
  return <Avatar initial="S" bg="#db2777" />;
}
