// 섹션 제목 공통 컴포넌트
import { motion } from 'motion/react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="text-center mb-10"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-[var(--color-text-secondary)] text-sm sm:text-base max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
