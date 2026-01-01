import { AnimatePresence, motion } from 'motion/react'

function LogoSvg() {
  return (
    <svg
      width={31}
      height={20}
      viewBox="0 0 51 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.704 0l10.334 8.829c.613.524.967 1.293.967 2.103v6.654L13.671 8.757a2.766 2.766 0 01-.967-2.103V0zM12.704 40l10.334-8.829a2.766 2.766 0 00.967-2.103v-6.654l-10.334 8.829a2.766 2.766 0 00-.967 2.103V40zM.375 9.31l10.194 8.66c.494.42 1.12.65 1.766.65h8.221L10.387 9.964a2.728 2.728 0 00-1.769-.653H.375zM.375 30.69l10.13-8.655a2.729 2.729 0 011.773-.656h8.303l-10.194 8.66c-.494.42-1.12.65-1.767.65H.375zM38.046 0L27.712 8.829a2.766 2.766 0 00-.967 2.103v6.654l10.334-8.829a2.766 2.766 0 00.967-2.103V0zM38.046 40l-10.334-8.829a2.766 2.766 0 01-.967-2.103v-6.654l10.334 8.829c.614.524.967 1.293.967 2.103V40zM50.375 9.31l-10.194 8.66c-.494.42-1.12.65-1.766.65h-8.221l10.168-8.657a2.728 2.728 0 011.77-.653h8.243zM50.375 30.69l-10.13-8.655a2.729 2.729 0 00-1.773-.656h-8.303l10.194 8.66c.494.42 1.12.65 1.767.65h8.245z"
        fill="#fff"
      />
    </svg>
  )
}

interface LogoProps {
  size?: 'sm' | 'default'
}

export function Logo({ size = 'default' }: LogoProps) {
  return (
    <AnimatePresence mode="wait">
      {size === 'sm' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LogoSvg />
        </motion.div>
      )}
      {size === 'default' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-x-1"
        >
          <LogoSvg />

          <h1 className="text-xl font-logo tracking-wider">Projetoteca</h1>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
