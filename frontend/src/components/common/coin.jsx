import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'


export default function CoinWalletAnimation() {
  const [dropCoin, setDropCoin] = useState(false)
  const [closeWallet, setCloseWallet] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setDropCoin(true), 700)
    const t2 = setTimeout(() => setCloseWallet(true), 2600)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="relative h-80 w-80">
        <AnimatePresence>
          {!closeWallet && (
            <motion.div
              className="absolute bottom-16 left-1/2 z-20 -translate-x-1/2 rounded-t-3xl bg-amber-700 px-10 py-4 shadow-2xl"
              initial={{ rotateX: 0 }}
              animate={{ rotateX: 0 }}
              exit={{ rotateX: -85, y: 10 }}
              transition={{ duration: 0.7 }}
              style={{ transformOrigin: 'bottom center' }}
            >
              <div className="h-2 w-16 rounded-full bg-amber-500" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="absolute bottom-10 left-1/2 z-10 flex h-28 w-52 -translate-x-1/2 items-center justify-center rounded-3xl bg-amber-600 shadow-2xl"
          animate={closeWallet ? { scale: 0.98 } : { scale: 1 }}
        >
          <div className="relative h-14 w-16 rounded-xl border-2 border-white">
            <div className="absolute right-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white" />
          </div>
        </motion.div>

        <AnimatePresence>
          {!closeWallet && (
            <motion.div
              className="absolute left-10 top-10 z-30"
              initial={{ x: 0, y: 0, rotateY: 0, rotateX: 8, scale: 1 }}
              animate={dropCoin ? { x: 110, y: 145, rotateY: 1080, rotateX: -20, scale: 0.2 } : { rotateY: 360 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: 'easeInOut', rotateY: { duration: 0.35, repeat: Infinity, ease: 'linear' } }}
            >
              <div className="rounded-full bg-yellow-400 p-4 shadow-xl"
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-yellow-900 bg-yellow-300 text-xl font-bold text-yellow-900 shadow-inner">
                  ₹
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {closeWallet && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-0 w-full text-center text-lg font-semibold text-white"
          >
            Coin safely stored in wallet
          </motion.p>
        )}
      </div>
    </div>
  )
}
